# Wealth Wise Accountant — Production Readiness & Roadmap

**Document Version:** 1.0.0  
**Status:** Gap Analysis & Migration Specification  

---

## 1. Current State vs. Production Requirements

| Subsystem | Implemented in Platform Today | Required for Production Deployment |
| :--- | :--- | :--- |
| **Double-Entry Engine** | Fully implemented in TypeScript; integer pence arithmetic; immutable journal reversal service; live Trial Balance derivation. | Persisted in PostgreSQL database with ACID transaction boundaries and SQL constraints enforcing $\sum \text{Debits} = \sum \text{Credits}$. |
| **State Management** | Central `AccountingProvider` React state machine; unified invoices, journals, and bank feeds. | PostgreSQL Row-Level Security (RLS) ensuring strict tenant isolation per `business_id`. |
| **Sales Invoicing** | Dynamic invoice generation, UK VAT calculations, automated GL journal posting, status tracking. | Server-side PDF rendering (e.g. `@react-pdf/renderer`), email SMTP/Resend delivery, unique sequence generation. |
| **Bank Reconciliation** | Statement line matching, match confidence calculation, automated settlement posting. | Open Banking aggregation (Plaid / Yapily / Truelayer) or production bank CSV parser (Barclays, NatWest, HSBC). |
| **Document Vault** | Interactive upload sandbox, simulated OCR extraction, Human-in-the-Loop review queue. | Private S3/Supabase Storage bucket with 15-minute signed URLs; AWS Textract or bespoke vision extraction pipeline. |
| **Tax & HMRC** | Draft Box 1, 4, 5 MTD VAT computation derived from VAT Control Account (2200). | HMRC Developer Portal enrollment; OAuth2 Agent Authorisation; MTD for VAT API sandbox testing; fraud prevention headers. |

---

## 2. Infrastructure & Environment Checklist for Production Launch

1. **Database:**
   * PostgreSQL instance (Supabase or Neon) provisioned with migrations from [`docs/ARCHITECTURE.md`](file:///c:/Users/Deepg/OneDrive/Desktop/The%20Real%20World/Campuses/AI%20Automation/New%20Lessons/CODING/Wealth-Wise-Accountant-Accounting-Platform/docs/ARCHITECTURE.md).
   * Row-Level Security policies active on `organisations`, `journal_entries`, `journal_lines`, and `invoices`.
2. **Authentication:**
   * Supabase Auth or NextAuth with Multi-Factor Authentication (MFA/TOTP) enabled for all accounting staff.
   * Role-based access control (RBAC) enforced on Server Actions.
3. **Data Protection:**
   * GDPR Data Processing Agreements (DPA) established for client financial documents and OCR processing.
   * Daily automated PostgreSQL backups with point-in-time recovery (PITR).
