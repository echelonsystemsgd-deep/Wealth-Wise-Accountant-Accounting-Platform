# Wealth Wise Accountant — Master Autonomous Implementation & Engineering Plan
## Complete Phased Blueprint: Autonomous Architecture to Replace Xero, QuickBooks & Dext

**Document Version:** 4.0.0  
**Status:** Phase 1 & Phase 2 Complete (24/24 Passing Tests, 0 Build Errors)  
**Active Working Branch:** `phase-2-auth-crm`  
**Target Delivery Date for Platform Foundations:** November 2026  
**Core Frameworks:** Next.js (App Router, Turbopack), TypeScript 5.9, Tailwind CSS v4, Supabase (PostgreSQL 15+, Auth, RLS, Storage), Truelayer Open Banking, Mindee OCR, Stripe Connect, HMRC MTD API

---

## 1. Complete Architecture Brainstorm & Problem Analysis

Following the client discovery call on 12 October 2026, the software is engineered around 5 core operational pillars that transform Wealth Wise into an independent software owner:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                          WEALTH WISE AUTONOMOUS CLOUD PLATFORM ARCHITECTURE                     │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                     TIER 1: USER INTERFACES                                     │
│  ┌──────────────────────────────────────────────┐     ┌──────────────────────────────────────┐  │
│  │     ACCOUNTANT HUB & PRACTICE CRM            │     │       CLIENT BUSINESS PORTAL         │  │
│  │  • Portfolio Overview (All UK Entities)      │     │  • Sandboxed Single-Company View     │  │
│  │  • Workspace Switcher (Apex, Kensington, etc)│     │  • Live Operating Cash Position      │  │
│  │  • Statutory Deadline Monitor (VAT/CoHouse)  │     │  • Weekly Document & Receipt Dropzone│  │
│  │  • 2-Column Bank Rule Matcher                │     │  • Sales Invoicing & Card Checkout   │  │
│  │  • General Ledger & Trial Balance Inspector  │     │  • Direct Accountant Chat & Queries  │  │
│  └──────────────────────────────────────────────┘     └──────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                  TIER 2: ENGINE & ACCESS CONTROL                                │
│  ┌───────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │  • Row-Level Security (RLS) Guard: Session context enforces `app.current_org_id`          │  │
│  │  • Role-Based Access Control (RBAC): PRACTICE_ADMIN vs SENIOR_ACCOUNTANT vs CLIENT_DIRECTOR│  │
│  │  • Double-Entry Ledger Invariant Guard: Strict validation: Σ Debits - Σ Credits = 0       │  │
│  │  • Integer Minor Units: 100% monetary storage in pence (BIGINT) with zero float drift     │  │
│  │  • Immutable Reversals: Zero silent record deletion; exact compensating journals posted  │  │
│  └───────────────────────────────────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                              TIER 3: AUTONOMOUS EXTERNAL RAILS                                  │
│  ┌───────────────────────┐  ┌──────────────────────┐  ┌────────────────┐  ┌──────────────────┐  │
│  │  OPEN BANKING RAILS   │  │    AI OCR PIPELINE   │  │ STRIPE PAYMENT │  │ HMRC MTD GATEWAY │  │
│  │  • Truelayer Data API │  │  • Mindee Document AI│  │  • Card Links  │  │ • 9-Box Form 100│  │
│  │  • Nightly Webhook Pull│  │  • >95% Auto-Drafts  │  │  • Apple Pay   │  │ • Fraud Headers │  │
│  │  • 90-Day Consent SCA │  │  • Missing Doc Chase │  │  • Instant GL  │  │ • Digital Filing │  │
│  └───────────────────────┘  └──────────────────────┘  └────────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Granular Implementation Roadmap: Phases 1 Through 5

### Phase 1: Data Architecture & Production DAL (COMPLETED ✅)
- **Status:** Verified with 20 / 20 tests passing.
- **Deliverables:**
  - Complete PostgreSQL 15+ relational schema (`lib/dal/schema.sql`).
  - Strict Data Access Layer (`lib/dal/`) with repository interfaces for Organizations, Ledger, Invoices, Bank, and Audit Trail.
  - Strict double-entry invariant verification: rejects any unbalanced transaction with `DoubleEntryImbalanceError`.
  - Immutable reversal math preserving unbroken audit trails required by UK ACCA/ICAEW standards.
  - Responsive mobile dual-views for Invoices and General Ledger (stacked cards on `< sm`, dense tables on `sm:`).

### Phase 2: Multi-Tenant Auth, Session RLS & Practice CRM (COMPLETED ✅)
- **Branch:** `phase-2-auth-crm` (24 / 24 tests passing).
- **Deliverables:**
  - Unified Session Provider (`lib/auth/AuthContext.tsx`) with Role-Based Access Control (RBAC):
    - `PRACTICE_ADMIN`: Senior Partner with full practice-wide metrics and billing authority.
    - `SENIOR_ACCOUNTANT`: Qualified accountant managing client portfolios and signing off filings.
    - `BOOKKEEPER`: Reconciles bank lines and manages receipt extraction queues.
    - `CLIENT_DIRECTOR`: Sandboxed strictly to single company CRN, direct accountant messages, and missing document alerts.
  - Multi-Tenant Client Workspace Switcher (`components/auth/ClientWorkspaceSwitcher.tsx`) in the sticky navigation header.
  - Practice CRM Portfolio Hub (`components/crm/PracticeCrmView.tsx`) with statutory deadlines (Nov 07 VAT, Year-End accounts), fee analytics (£1,190/mo retainers vs £9–£19/mo SaaS), and client workload health.
  - Bi-directional action checklists with explicit placeholders for accountant sign-offs and client director uploads.

---

### Phase 3: Banking Rails & Real-Time Open Banking (Next Up ⏳)
- **Target Branch:** `phase-3-bank-feeds`
- **Objective:** Eliminate manual bank statement CSV imports by connecting directly to UK banks.
- **Detailed Engineering Steps:**
  1. **Open Banking Consent Flow (Self-Service):**
     - Integrate Truelayer Data API client.
     - Implement OAuth 2.0 PKCE redirection allowing SME directors to authenticate directly with Barclays, NatWest, HSBC, Lloyds, Monzo, or Revolut.
     - Implement 90-day consent renewal tracking with automated client reminders.
  2. **Automated Statement Ingestion Pipeline:**
     - Webhook endpoint (`/api/webhooks/banking`) receives daily transaction batches.
     - Idempotency guard: Transactions are deduplicated using bank transaction reference IDs before writing to `bank_statement_lines`.
  3. **Interactive 2-Column Matching Engine:**
     - Left column: Unreconciled bank statement lines.
     - Right column: Suggested matching sales invoices, supplier bills, or user rules.
     - Automated Confidence Scoring (99% green match badge when payee and exact amount match).
  4. **Accountant Persistent Rules Engine:**
     - UI interface allowing accountants to save persistent rules (e.g. *"If description matches Adobe, debit 7040 Computer Software with 20% VAT"*).
     - One-click rule execution: Automatically generates and posts balancing general ledger journals upon confirmation.

---

### Phase 4: Document Vault, AI OCR & Weekly Client Ingestion (In Architecture ⏳)
- **Target Branch:** `phase-4-document-ocr`
- **Objective:** Replace Dext and AutoEntry by turning client receipt uploads into verified accounting bills.
- **Detailed Engineering Steps:**
  1. **Secure Document Dropzone:**
     - Mobile camera capture & desktop drag-and-drop dropzone in the Client Portal (`/demo/client`).
     - Files uploaded to private Supabase Storage bucket (`client-vault`) with AES-256 encryption.
     - Documents accessed exclusively via temporary 15-minute signed URLs.
  2. **Real-Time OCR Extraction Pipeline:**
     - Connect Mindee Financial Document API / AWS Textract upon upload.
     - Extract structured metadata: Supplier Name, Invoice Number, Invoice Date, Total Gross Pence, Net Pence, and VAT Pence.
     - Supplier nominal code auto-suggestion based on historical accounting assignments.
  3. **Confidence Routing & Review Queue:**
     - Extractions with **>95% confidence** auto-populate draft bills in the accountant review drawer.
     - Extractions below 95% highlight unclear fields with interactive side-by-side document zoom.
  4. **Autonomous Receipt Chase Engine:**
     - System correlates bank debits against uploaded receipts. Unmatched debit lines trigger automated "Receipt Required" alert banners in the client's portal.

---

### Phase 5: Invoicing Payments, Stripe & UK HMRC MTD Filing (In Architecture ⏳)
- **Target Branch:** `phase-5-invoicing-hmrc`
- **Objective:** Enable instant client invoice payments and digital 9-Box VAT return submissions directly to HMRC.
- **Detailed Engineering Steps:**
  1. **Sales Invoicing & Online Payment Links:**
     - Invoice generator with automatic 20% standard, 5% reduced, and 0% zero-rate VAT line-item calculation.
     - Professional PDF invoice export with embedded Stripe Connect "Pay Online by Card / Apple Pay" button.
     - Stripe webhook listener (`/api/webhooks/stripe`): Automatically flips invoice status to `PAID` and writes balancing general ledger settlement entries.
  2. **Automated 9-Box VAT Engine (Form 100):**
     - Dynamic query aggregating all posted ledger lines across the active VAT quarter:
       - **Box 1:** VAT due on sales
       - **Box 4:** VAT reclaimed on purchases
       - **Box 5:** Net VAT payable or reclaimable ($\text{Box 1} - \text{Box 4}$)
       - **Box 6:** Total sales value excluding VAT
       - **Box 7:** Total purchase value excluding VAT
  3. **HMRC Making Tax Digital (MTD) Gateway:**
     - HMRC Developer Hub OAuth 2.0 integration with Agent Authorization API.
     - Automated generation of required **Fraud Prevention Headers** (device IP, client timestamp, browser fingerprint).
     - One-click "Submit VAT Return to HMRC" with digital receipt reference archived into the immutable audit trail.
  4. **Companies House Statutory Accounts Export:**
     - Generates standard UK Micro-Entity (FRS 105) and Small Company (FRS 102 1A) Balance Sheet and Notes reports.

---

## 3. Commercial Moat & Financial Advantage

| Dimension | Legacy Model (Xero + Dext Reseller) | Wealth Wise Proprietary Platform |
| :--- | :--- | :--- |
| **Direct Software Cost** | £30–£50/month per client paid to third parties | **£0/month** (100% owned practice software asset) |
| **Annual Drain (100 Clients)** | **£36,000 – £60,000 / year lost** | **£0 paid to software competitors** |
| **New SaaS Revenue** | None (Xero retains 100% of software margins) | **£9–£19/mo** per self-serve client (£10k–£22k/yr profit) |
| **Client Retention & Moat** | Low (Clients can take their Xero file anywhere) | **Near-zero churn** (Clients love their bespoke free portal) |
| **Ongoing Maintenance** | Vulnerable to Xero price hikes | **Zero developer maintenance** once cloud rails are live |

---

## 4. Master Verification & Quality Assurance Summary

- **Automated Test Suite:** **24 passed out of 24 tests** across 5 test files (`vitest run`).
- **Production Compilation:** `next build` passes with **0 TypeScript and 0 Turbopack errors**.
- **Mobile Usability:** 100% verified with min 40–44px touch targets, horizontal touch scrolling, and zero viewport overflow.
- **Git Repository Branch:** `phase-2-auth-crm` is cleanly committed and ready for client demonstration.
