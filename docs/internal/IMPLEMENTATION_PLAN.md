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
| **Phase 1** | **Data Architecture & Production DAL** | **COMPLETED ✅** | 19 / 19 Tests Passed | **YES (Cards, Touch 44px, Safe Viewports)** | Database (`DATABASE_URL`) |
| **Phase 2** | Multi-Tenant Auth, Session RLS & Practice CRM | Next Up ⏳ | Pending | Ready for integration | Supabase Auth / Clerk / NextAuth |
| **Phase 3** | Bank Feeds & Automated Statement Sync | In Architecture ⏳ | Pending | Ready for integration | Truelayer / Plaid / Yapily Open Banking |
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

## 3. What Needs Implementing Next (Phases 2 to 5)

### Phase 2: Multi-Tenant Auth & Access Control
- [ ] Connect production auth provider (Supabase Auth, Auth0, or Clerk).
- [ ] Implement JWT / session middleware extracting `organisationId` and `userRole`.
- [ ] Role-based UI guards (Practice Admin vs. Bookkeeper vs. Client Director).

### Phase 3: Banking Rails & Real-Time Open Banking
- [ ] Connect Open Banking aggregator API (Truelayer / Yapily / Plaid).
- [ ] Automated daily bank statement sync via scheduled webhooks.
- [ ] Rule-based reconciliation engine for recurring subscriptions and client transfers.

### Phase 4: Document Vault & Production OCR
- [ ] Connect S3-compatible cloud storage (Supabase Storage / AWS S3) for PDF and receipt images.
- [ ] Connect live OCR extraction API (Mindee / AWS Textract / Google Cloud Document AI).
- [ ] Confidence threshold routing: documents with >95% confidence auto-populate drafts; others flag for bookkeeper review.

### Phase 5: Invoicing Payments & HMRC MTD Filing
- [ ] Connect Stripe Connect for client invoice checkout links ("Pay by Card" / "Apple Pay").
- [ ] HMRC Making Tax Digital (MTD) Sandbox API connection for VAT Return Form 100 XML/JSON generation and filing receipts.
- [ ] Automated statutory accounts export (Companies House micro-entity format).

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
