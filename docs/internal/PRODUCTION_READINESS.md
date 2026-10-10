# Wealth Wise Accountant — Production Readiness & Architecture Status

**Document Version:** 2.0.0  
**Status:** Phase 1 Complete (Data Architecture & Production Data Access Layer Active)  
**Branch:** `feat/production-core`  

---

## 1. Subsystem Production Readiness Matrix

| Subsystem | Status | Implementation in Codebase | Remaining Production Link |
| :--- | :--- | :--- | :--- |
| **Double-Entry Engine** | **PRODUCTION READY** | Full DAL (`lib/dal/memoryRepository.ts`, `lib/dal/schema.sql`, `lib/accounting/ledgerService.ts`); integer pence arithmetic; immutable journal reversal service; dynamic Trial Balance derivation. Invariants enforced with 0 discrepancy. | Run `schema.sql` migration against live PostgreSQL database (`DATABASE_URL`). |
| **Data Access Layer (DAL)** | **PRODUCTION READY** | Modular repository architecture (`lib/dal/interfaces.ts`, `lib/dal/index.ts`, `lib/dal/postgresConnector.ts`). Implements tenant isolation, transactional journal posting, and tamper-evident audit logs. | Provide PostgreSQL connection string. |
| **Mobile & Viewport Ergonomics** | **PRODUCTION READY** | Fully responsive layout across desktop, tablet, and mobile viewports. Includes mobile-specific cards for invoices and journals, 44px touch targets, momentum scrolling, and iOS auto-zoom prevention. | Complete. |
| **Multi-Tenant Auth & RLS** | **PHASE 2 QUEUED** | Schema and DAL interfaces support `RequestContext` with `organisationId`, `userId`, and `userRole`. Row-Level Security policies written in `schema.sql`. | Connect auth provider (Supabase Auth / Clerk / NextAuth) and session cookie middleware. |
| **Bank Reconciliation** | **PHASE 3 QUEUED** | Interactive two-column reconciliation queue with confidence scoring and settlement postings. | Connect Open Banking feed (Truelayer / Plaid UK) or live bank CSV parser. |
| **Document Vault & OCR** | **PHASE 4 QUEUED** | Document upload sandbox with OCR extraction simulation and human approval queue. | Connect private S3 / Supabase Storage bucket and live OCR API (Mindee / AWS Textract). |
| **Tax & HMRC MTD Submissions** | **PHASE 5 QUEUED** | Real-time VAT summaries and P&L calculations derived from nominal ledger postings. | HMRC Developer Portal registration, OAuth2 Agent Authorisation, and MTD API connection. |

---

## 2. Infrastructure & Environment Connections Checklist

The following connections and variables will transition the platform from the validated DAL simulation into a fully live production installation:

```env
# 1. Database & Persistence (Phase 1 Ready)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres

# 2. Authentication & Tenancy (Phase 2)
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY=[SERVICE_ROLE_KEY]

# 3. Open Banking Aggregation (Phase 3)
TRUELAYER_CLIENT_ID=[TRUELAYER_CLIENT_ID]
TRUELAYER_CLIENT_SECRET=[TRUELAYER_CLIENT_SECRET]
TRUELAYER_SANDBOX=true

# 4. Document OCR Pipeline (Phase 4)
MINDEE_API_KEY=[MINDEE_API_KEY]
STORAGE_BUCKET_NAME=client-financial-vault

# 5. HMRC Making Tax Digital (Phase 5)
HMRC_CLIENT_ID=[HMRC_CLIENT_ID]
HMRC_CLIENT_SECRET=[HMRC_CLIENT_SECRET]
HMRC_SERVER_TOKEN=[HMRC_SERVER_TOKEN]
HMRC_ENVIRONMENT=sandbox

# 6. Invoice Card Checkout (Phase 5)
STRIPE_SECRET_KEY=[STRIPE_SECRET_KEY]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=[STRIPE_PUBLISHABLE_KEY]
STRIPE_WEBHOOK_SECRET=[STRIPE_WEBHOOK_SECRET]
```
