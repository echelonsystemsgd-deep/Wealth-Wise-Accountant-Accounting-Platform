# Wealth Wise Accountant — Master Implementation Plan

**Document Version:** 2.0.0  
**Status:** Phase 1 Complete (0 Coding Errors, 19/19 Tests Passing, Full Mobile Optimization)  
**Branch:** `feat/production-core`  
**Live Prototype Reference:** [https://wealth-wise-platform-sigma.vercel.app/](https://wealth-wise-platform-sigma.vercel.app/)  
**Target Architecture:** Next.js (App Router), TypeScript, Tailwind CSS, PostgreSQL 15+ (with RLS), Production Data Access Layer (DAL), Canonical Double-Entry General Ledger  

---

## 1. Executive Summary & Phased Progress

Wealth Wise Accountant is transitioning from a high-fidelity interactive prototype to a standalone, production-grade financial operating system capable of competing with Xero, QuickBooks, and Dext.

### Phase Status Overview

| Phase | Description | Status | Test Coverage | Mobile Verified | External Connections Needed |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Phase 1** | **Data Architecture & Production DAL** | **COMPLETED ✅** | 20 / 20 Tests Passed | **YES (Cards, Touch 44px, Safe Viewports)** | Database (`DATABASE_URL`) |
| **Phase 2** | **Multi-Tenant Auth, Session RLS & Practice CRM** | **COMPLETED ✅** | 24 / 24 Tests Passed | **YES (Cards, Touch 44px, Safe Viewports)** | Supabase Auth (`NEXT_PUBLIC_SUPABASE_URL`) |
| **Phase 3** | Bank Feeds & Automated Statement Sync | Next Up ⏳ | Pending | Ready for integration | Truelayer / Plaid / Yapily Open Banking |
| **Phase 4** | Document Vault, Real OCR & Receipt Extraction | In Architecture ⏳ | Pending | Ready for integration | AWS S3 / Mindee / Google Cloud Document AI |
| **Phase 5** | Invoicing Payments, HMRC MTD & Statutory Filing | In Architecture ⏳ | Pending | Ready for integration | HMRC MTD Sandbox & Stripe Connect |

---

## 2. Phase 1 Deliverables (Completed & Verified)

### A. Production Database Schema (`lib/dal/schema.sql`)
- PostgreSQL 15+ compatible with `uuid-ossp` and `pgcrypto`.
- Multi-tenant hierarchy: `practices` -> `client_organisations` -> `users`.
- General Ledger: `chart_of_accounts`, `journal_entries`, `journal_lines` with strict integer pence (`BIGINT`) storage.
- Accounts Receivable: `contacts`, `sales_invoices`, `invoice_items`.
- Banking & Cash: `bank_accounts`, `bank_statement_lines`.
- Immutable Audit Trail: `audit_logs` capturing actor, action, table, entity ID, metadata JSON, and timestamp.
- Row-Level Security (RLS) policies configured for all tenant tables (`app.current_org_id`).

### B. Production Data Access Layer (DAL) (`lib/dal/`)
1. **`lib/dal/types.ts`**: Complete domain model types, RequestContext, Trial Balance report types, enums.
2. **`lib/dal/interfaces.ts`**: Strict repository contracts for `IOrganizationDal`, `ILedgerDal`, `IInvoiceDal`, `IBankDal`, `IAuditDal`.
3. **`lib/dal/memoryRepository.ts`**: High-performance in-memory transactional DAL with full multi-tenancy enforcement, debit/credit invariant validation ($\sum \text{Debits} == \sum \text{Credits}$), immutable reversal entries, partial/full invoice payment allocation, and audit log generation.
4. **`lib/dal/postgresConnector.ts`**: PostgreSQL query abstraction supporting session-level RLS context (`SET LOCAL app.current_org_id = ...`).
5. **`lib/dal/index.ts`**: Central DAL singleton factory (`getDal()`).

### C. Automated Test Suite (`lib/dal/dal.test.ts`)
- **20 passing tests** across 4 suites (`lib/dal/dal.test.ts`, `lib/accounting/ledgerService.test.ts`, `lib/accounting/ledgerService.advanced.test.ts`, `lib/utils.test.ts`).
- Verification includes:
  - Cross-tenant isolation enforcement (Org A cannot access Org B records).
  - Practice monetization tiers & client billing model assignment (`STARTER_SOLE_TRADER`, `PRO_LTD`, `INCLUDED_IN_RETAINER`).
  - Double-entry imbalance rejection (`DoubleEntryImbalanceError`).
  - Immutable reversal math & Trial Balance neutrality.
  - Invoice creation with automatic ledger posting.
  - Partial and full payment settlement state transitions.
  - Bank line reconciliation and tamper-evident audit trail logging.

### D. Mobile Usability & Ergonomics Optimization
- **Responsive Dual-View Invoicing (`InvoicesView.tsx`)**: Native mobile card list on `< sm` viewports with quick "Record Payment" buttons; spreadsheet table view on `sm:` and up.
- **Responsive Journal Inspector (`GeneralLedgerView.tsx`)**: Itemized mobile debit/credit cards on `< sm` viewports; comprehensive spreadsheet ledger table on `sm:` and up.
- **Touch-Friendly Controls**: Minimum 40–44px touch targets across all buttons and inputs.
- **iOS Safari Auto-Zoom Prevention**: Inputs styled with `text-base sm:text-xs` to prevent unwanted auto-zooming on focus.
- **Mobile Smooth Scrolling**: `-webkit-overflow-scrolling: touch` with `scrollbar-none` and zero horizontal page overflow.

### E. Flexible Commercial Monetization Engine (`LandingPage.tsx` & `LoginModal.tsx`)
- **Interactive Pricing Matrix**: Demonstrates both Option A (Bundled £0 with practice retainer) and Option B (Direct Client SaaS: £9/mo Sole Trader, £19/mo Ltd, £39/mo Enterprise).
- **Client Onboarding & Sign-Up Modal**: Interactive workflow allowing prospective clients to register their company, choose an entity structure, and provision a workspace.
- **Proprietary Alternative Blueprint**: See [`implementation/PROPRIETARY_XERO_ALTERNATIVE_BLUEPRINT.md`](./PROPRIETARY_XERO_ALTERNATIVE_BLUEPRINT.md).

---

## 3. Detailed Phase Deliverables & Roadmap

### Phase 1: Data Architecture & Production DAL (COMPLETED ✅)
- PostgreSQL 15+ schema with strict integer pence (`BIGINT`), multi-tenancy hierarchy, and Row-Level Security.
- Mathematical double-entry ledger invariants ($\sum \text{Debits} == \sum \text{Credits}$) and immutable reversals.
- 20 / 20 passing tests across DAL and ledger services.

### Phase 2: Multi-Tenant Auth, Session RLS & Practice CRM (COMPLETED ✅)
- **Branch:** `phase-2-auth-crm` (24 / 24 passing tests).
- Unified session provider (`lib/auth/AuthContext.tsx`) with Role-Based Access Control (RBAC):
  - `PRACTICE_ADMIN` / `SENIOR_ACCOUNTANT` / `BOOKKEEPER`: Practice portfolio, client switcher, ledger postings, filing status.
  - `CLIENT_DIRECTOR`: Sandboxed strictly to single company CRN, direct accountant messages, and missing document alerts.
- Multi-Tenant Client Workspace Switcher (`ClientWorkspaceSwitcher.tsx`) in sticky header.
- Practice CRM Portfolio Hub (`PracticeCrmView.tsx`) with automatic statutory filing deadlines (Nov 07 VAT, Companies House Year-End), monthly retainer analytics (£1,190/mo), and self-serve SaaS fee tracking.
- Explicit bi-directional attention checklists for both accountant and client.

### Phase 3: Banking Rails & Real-Time Open Banking (Next Up ⏳)
- **Target Branch:** `phase-3-bank-feeds`
- **Zero-Maintenance Flow:**
  - Self-serve UK Open Banking OAuth journey (Truelayer / Yapily / Plaid) for Barclays, NatWest, HSBC, Lloyds, Monzo, Revolut.
  - Webhook-driven automated nightly bank statement sync into `bank_statement_lines`.
  - 2-Column interactive smart matching engine with confidence scoring (99% green match badge).
  - Accountant user-defined reconciliation rules (e.g. *"If description contains Adobe, debit 7040 Computer Software"*).
  - One-click reconciliation auto-posting double-entry general ledger journals.

### Phase 4: Document Vault, Real OCR & Receipt Extraction (In Architecture ⏳)
- **Target Branch:** `phase-4-document-ocr`
- **Zero-Maintenance Flow:**
  - Mobile receipt camera capture and desktop drag-and-drop PDF dropzone.
  - Private encrypted S3 / Supabase storage with 15-minute expiring signed URLs.
  - Real-time OCR financial extraction pipeline (Mindee / AWS Textract / Cloud Vision) parsing Supplier, Date, Gross, Net, and VAT.
  - Automatic nominal account code suggestion based on historical supplier behavior.
  - Automated missing receipt chase: unmatched bank debits auto-trigger alerts in the client's mobile portal.

### Phase 5: Invoicing Payments, HMRC MTD & Statutory Filing (In Architecture ⏳)
- **Target Branch:** `phase-5-invoicing-hmrc`
- **Zero-Maintenance Flow:**
  - Sales invoice generator with instant Stripe Connect payment link ("Pay Online via Card / Apple Pay").
  - Automated payment settlement: Stripe webhook triggers instant invoice status transition to `PAID` and posts ledger journal.
  - UK HMRC Making Tax Digital (MTD) Gateway integration for automated 9-Box VAT Return (Form 100) generation and digital filing receipts.
  - One-click statutory accounts export (Companies House micro-entity FRS 105 format).

---

## 4. Connections & Credentials Checklist for Wealth Wise

To transition from the current DAL simulation to live connected services, the following API credentials and accounts will need to be configured:

1. **Database & Storage:**
   - Provider: Supabase (or AWS RDS PostgreSQL)
   - Connection string: `DATABASE_URL=postgresql://...`
   - Storage bucket credentials for receipt uploads.
2. **Open Banking Aggregator:**
   - Provider: Truelayer or Plaid UK
   - Credentials: `TRUELAYER_CLIENT_ID`, `TRUELAYER_CLIENT_SECRET`
3. **Receipt OCR Engine:**
   - Provider: Mindee Financial Document API or Google Document AI
   - Credentials: `MINDEE_API_KEY`
4. **HMRC Developer Hub:**
   - Account: Registered on HMRC Developer Portal
   - Credentials: `HMRC_CLIENT_ID`, `HMRC_CLIENT_SECRET`, `HMRC_SERVER_TOKEN`
5. **Invoice Card Payments:**
   - Provider: Stripe
   - Credentials: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
