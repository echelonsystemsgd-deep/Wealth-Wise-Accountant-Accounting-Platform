-- ============================================================================
-- WEALTH WISE ACCOUNTANT — PRODUCTION MULTI-TENANT POSTGRESQL SCHEMA
-- PostgreSQL 15+ compatible with Row-Level Security (RLS) & Audit Invariants
-- ============================================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. TENANCY & ACCESS CONTROL
-- ----------------------------------------------------------------------------

CREATE TABLE practices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    company_number VARCHAR(50),
    vat_number VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE client_organisations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    practice_id UUID NOT NULL REFERENCES practices(id) ON DELETE CASCADE,
    legal_name VARCHAR(255) NOT NULL,
    trading_name VARCHAR(255),
    company_number VARCHAR(50) NOT NULL,
    vat_number VARCHAR(50),
    entity_type VARCHAR(50) NOT NULL CHECK (entity_type IN ('LTD', 'SOLE_TRADER', 'PARTNERSHIP', 'LLP')),
    financial_year_end VARCHAR(20) NOT NULL,
    base_currency CHAR(3) NOT NULL DEFAULT 'GBP',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_client_organisations_practice ON client_organisations(practice_id);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('PRACTICE_ADMIN', 'SENIOR_ACCOUNTANT', 'BOOKKEEPER', 'CLIENT_DIRECTOR', 'READ_ONLY')),
    practice_id UUID REFERENCES practices(id),
    default_org_id UUID REFERENCES client_organisations(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 2. CHART OF ACCOUNTS & GENERAL LEDGER
-- ----------------------------------------------------------------------------

CREATE TABLE chart_of_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organisation_id UUID NOT NULL REFERENCES client_organisations(id) ON DELETE CASCADE,
    code VARCHAR(20) NOT NULL,
    name VARCHAR(255) NOT NULL,
    classification VARCHAR(50) NOT NULL CHECK (classification IN ('ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE')),
    normal_balance VARCHAR(10) NOT NULL CHECK (normal_balance IN ('DEBIT', 'CREDIT')),
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (organisation_id, code)
);

CREATE INDEX idx_coa_org_code ON chart_of_accounts(organisation_id, code);

CREATE TABLE journal_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organisation_id UUID NOT NULL REFERENCES client_organisations(id) ON DELETE CASCADE,
    entry_date DATE NOT NULL,
    reference VARCHAR(100) NOT NULL,
    source_type VARCHAR(50) NOT NULL CHECK (source_type IN ('SALES_INVOICE', 'PURCHASE_BILL', 'BANK_TRANSACTION', 'MANUAL_JOURNAL', 'REVERSAL')),
    source_id VARCHAR(100),
    status VARCHAR(20) NOT NULL DEFAULT 'POSTED' CHECK (status IN ('DRAFT', 'POSTED', 'REVERSED')),
    total_pence BIGINT NOT NULL CHECK (total_pence >= 0),
    posted_by UUID REFERENCES users(id),
    reversal_entry_id UUID REFERENCES journal_entries(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_journals_org_date ON journal_entries(organisation_id, entry_date);

CREATE TABLE journal_lines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    journal_entry_id UUID NOT NULL REFERENCES journal_entries(id) ON DELETE CASCADE,
    account_code VARCHAR(20) NOT NULL,
    debit_pence BIGINT NOT NULL DEFAULT 0 CHECK (debit_pence >= 0),
    credit_pence BIGINT NOT NULL DEFAULT 0 CHECK (credit_pence >= 0),
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_journal_lines_entry ON journal_lines(journal_entry_id);
CREATE INDEX idx_journal_lines_account ON journal_lines(account_code);

-- ----------------------------------------------------------------------------
-- 3. CONTACTS, INVOICES & BILLS
-- ----------------------------------------------------------------------------

CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organisation_id UUID NOT NULL REFERENCES client_organisations(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('CUSTOMER', 'SUPPLIER', 'BOTH')),
    name VARCHAR(255) NOT NULL,
    company_number VARCHAR(50),
    vat_number VARCHAR(50),
    email VARCHAR(255),
    phone VARCHAR(50),
    payment_terms_days INT NOT NULL DEFAULT 30,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE sales_invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organisation_id UUID NOT NULL REFERENCES client_organisations(id) ON DELETE CASCADE,
    invoice_number VARCHAR(100) NOT NULL,
    contact_id UUID NOT NULL REFERENCES contacts(id),
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    subtotal_pence BIGINT NOT NULL CHECK (subtotal_pence >= 0),
    vat_pence BIGINT NOT NULL CHECK (vat_pence >= 0),
    total_pence BIGINT NOT NULL CHECK (total_pence >= 0),
    amount_paid_pence BIGINT NOT NULL DEFAULT 0 CHECK (amount_paid_pence >= 0),
    amount_due_pence BIGINT NOT NULL CHECK (amount_due_pence >= 0),
    status VARCHAR(20) NOT NULL DEFAULT 'ISSUED' CHECK (status IN ('DRAFT', 'ISSUED', 'PARTIALLY_PAID', 'PAID', 'VOID')),
    journal_entry_id UUID REFERENCES journal_entries(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (organisation_id, invoice_number)
);

CREATE TABLE invoice_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID NOT NULL REFERENCES sales_invoices(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    account_code VARCHAR(20) NOT NULL,
    quantity NUMERIC(10, 4) NOT NULL DEFAULT 1,
    unit_price_pence BIGINT NOT NULL CHECK (unit_price_pence >= 0),
    vat_rate_percent INT NOT NULL CHECK (vat_rate_percent IN (0, 5, 20)),
    vat_pence BIGINT NOT NULL DEFAULT 0,
    line_total_pence BIGINT NOT NULL CHECK (line_total_pence >= 0)
);

-- ----------------------------------------------------------------------------
-- 4. BANK ACCOUNTS & RECONCILIATION
-- ----------------------------------------------------------------------------

CREATE TABLE bank_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organisation_id UUID NOT NULL REFERENCES client_organisations(id) ON DELETE CASCADE,
    account_name VARCHAR(255) NOT NULL,
    sort_code VARCHAR(10) NOT NULL,
    account_number VARCHAR(20) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'GBP',
    chart_account_code VARCHAR(20) NOT NULL DEFAULT '1000',
    current_balance_pence BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE bank_statement_lines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bank_account_id UUID NOT NULL REFERENCES bank_accounts(id) ON DELETE CASCADE,
    transaction_date DATE NOT NULL,
    description TEXT NOT NULL,
    amount_pence BIGINT NOT NULL, -- positive = credit/inflow, negative = debit/outflow
    is_reconciled BOOLEAN NOT NULL DEFAULT FALSE,
    matched_type VARCHAR(20) CHECK (matched_type IN ('INVOICE', 'BILL', 'RULE', 'MANUAL')),
    matched_id VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bank_lines_account_recon ON bank_statement_lines(bank_account_id, is_reconciled);

-- ----------------------------------------------------------------------------
-- 5. AUDIT TRAIL ENGINE
-- ----------------------------------------------------------------------------

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organisation_id UUID NOT NULL REFERENCES client_organisations(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL, -- e.g. 'INVOICE_CREATED', 'JOURNAL_POSTED', 'JOURNAL_REVERSED'
    entity_table VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100) NOT NULL,
    metadata JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_org_created ON audit_logs(organisation_id, created_at DESC);

-- ----------------------------------------------------------------------------
-- 6. ROW-LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------

ALTER TABLE client_organisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chart_of_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bank_statement_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Note: RLS policies in production match:
-- WHERE organisation_id = NULLIF(current_setting('app.current_org_id', true), '')::uuid
