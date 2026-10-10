# Wealth Wise Accountant — Proprietary "Personalised Xero" Architecture Blueprint

**Document Version:** 1.0.0  
**Target:** A 100% Owned, Dedicated UK Cloud Accounting Platform for Wealth Wise Accountant  
**Core Technologies:** Next.js (App Router), TypeScript, Tailwind CSS, Supabase (PostgreSQL 15+, Auth, Storage, RLS), Stripe Billing  

---

## 1. Executive Vision & Strategic Purpose

Wealth Wise Accountant does not want to remain a perpetual reseller or dependent licensee of third-party software vendors like Xero, QuickBooks, and Dext. 

### The Strategic Shift
```
OLD MODEL (Third-Party SaaS Reseller):
Client ──► Pays Wealth Wise (Accountancy Fee)
             │
             └──► Wealth Wise bleeds £30–£50/mo per client to Xero & Dext
                  (For 100 clients: £36,000 – £60,000/year lost in software fees)

NEW MODEL (Wealth Wise Proprietary OS):
Client ──► Interacts with Wealth Wise's own branded web & mobile platform
             │
             ├──► 100% of software margin retained by Wealth Wise
             ├──► Built-in direct messenger & receipt vault (no WhatsApp chasing)
             └──► Optional recurring SaaS income from self-serve clients
```

---

## 2. Supabase Cloud Architecture

Supabase is the ideal backend backbone for this platform, providing enterprise-grade infrastructure without requiring multi-engineer DevOps overhead:

### A. Supabase Database & Multi-Tenancy (PostgreSQL 15+)
* **Row-Level Security (RLS):** Every query is filtered by the user's active tenant session (`app.current_org_id = ...`). Client A cannot view or tamper with Client B's records under any circumstance.
* **ACID Transactions:** Posting general ledger entries runs inside an atomic transaction where $\sum \text{Debits} = \sum \text{Credits}$ is enforced before committing.
* **Integer Minor Units:** All monetary columns (`total_pence`, `debit_pence`, `credit_pence`) are `BIGINT` in minor units (pence) to eliminate float drift.

### B. Supabase Auth & Access Control
* **Authentication Options:** Magic links, Email/Password, and Google Workspace OAuth.
* **JWT Custom Claims:** Upon login, the user's JWT includes:
  ```json
  {
    "user_id": "usr-sarah-1",
    "practice_id": "prac-ww-1",
    "organisation_id": "org-apex-1",
    "role": "SENIOR_ACCOUNTANT"
  }
  ```
* **Role Hierarchy:**
  1. `PRACTICE_ADMIN`: Senior leadership at Wealth Wise; can access all practice clients and practice metrics.
  2. `SENIOR_ACCOUNTANT`: Qualified accountant managing client portfolios and signing off filings.
  3. `BOOKKEEPER`: Reconciles bank lines, approves OCR drafts, chases missing receipts.
  4. `CLIENT_DIRECTOR`: Company director viewing their own business cash, invoices, and reports.
  5. `READ_ONLY`: Auditor or investor access.

### C. Supabase Storage (Client Receipt Vault)
* **Bucket: `client-vault` (Private):** Stores uploaded invoices, expense receipts, and bank PDFs.
* **Signed URLs:** Files are served via time-limited 15-minute signed URLs, preventing public exposure of sensitive business receipts.

---

## 3. Commercial Monetization Engine

Wealth Wise can operate this platform under three distinct commercial models:

### Model 1: Free Bundled Perk (The Ultimate Client Retention Moat)
* **Pricing to Client:** **£0 / month extra**
* **Value Pitch:** *"When you work with Wealth Wise Accountant, you receive our proprietary financial operating system for free. No £45/mo Xero bill, no separate Dext subscription."*
* **Commercial Impact:** Drastically increases client retention (churn drops near 0%) and saves Wealth Wise £36k–£60k/year in third-party software subscriptions.

### Model 2: Standalone SaaS Tiers (Direct Software Monetization)
Wealth Wise bills clients directly for software access (via Stripe Billing):

| Plan | Target Audience | Wealth Wise Price | Xero Direct Price | Wealth Wise Advantage |
| :--- | :--- | :--- | :--- | :--- |
| **Starter Sole Trader** | Freelancers, contractors, sole traders | **£9 / month** | £16 – £33 / month | 50% cheaper, zero clutter |
| **Growth Limited Company** | Active UK Ltd companies | **£19 / month** | £33 – £45 / month | Full GL, bank matching, unlimited invoices |
| **Scale & CFO Advisory** | High-growth firms, multi-directors | **£39 / month** | £55+ / month | Management accounts, cash flow forecasting |

*With 100 clients on Growth Ltd, Wealth Wise generates **£22,800/year in pure recurring SaaS profit**.*

### Model 3: Hybrid Practice Model (Recommended)
* Included for all accounting retainer clients paying £150+/month.
* Charged at £9–£19/month for self-serve clients who only need bookkeeping software until they upgrade to full annual accounts and tax filing.

---

## 4. Feature Matrix: Wealth Wise OS vs. Xero UK

| Feature | Xero UK | Wealth Wise Accountant OS |
| :--- | :--- | :--- |
| **Double-Entry General Ledger** | Standard cloud ledger | Strict mathematical invariant check ($\sum \text{Debits} = \sum \text{Credits}$) with immutable reversals |
| **Bank Reconciliation** | 2-column rule matching | 2-column interactive matching with confidence scoring |
| **Receipt Capture** | Requires Hubdoc / Dext add-on | Native in-app upload sandbox with OCR extraction |
| **Client Communication** | Email / Xero Ask | Built-in direct messenger between accountant & director |
| **Invoicing & Payments** | Invoicing + Stripe add-on | Invoicing with partial payment allocation & GL linking |
| **MTD VAT Compliance** | Form 100 digital submission | Real-time Box 1-9 summaries calculated from ledger |
| **Brand Identity** | Xero branding | 100% Wealth Wise proprietary branding |
| **Software Fee to Wealth Wise** | £30–£50/month per client | **£0 per client** (100% owned asset) |
