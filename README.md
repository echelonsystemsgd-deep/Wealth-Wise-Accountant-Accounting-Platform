# Wealth Wise Accountant — Proprietary Accounting Platform OS

**A Standalone, High-Trust Financial Operating System & Accounting Platform Engine**  
*Direct Competitor & Bespoke Alternative to Xero, QuickBooks, and Dext for UK Accountancy Practices*

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Prototype-000000?style=for-the-badge&logo=vercel)](https://wealth-wise-platform-sigma.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-Passed-green?style=for-the-badge&logo=vitest)](https://vitest.dev/)

---

## 🌐 Live Interactive Application

* **Production URL:** [https://wealth-wise-platform-sigma.vercel.app/](https://wealth-wise-platform-sigma.vercel.app/)
* **Role Switcher:** Toggle instantaneously in the header between:
  1. **Accountant Hub:** Practice command center, client portfolio triage, general ledger inspector, Trial Balance, and bank reconciliation.
  2. **Business Workspace:** Client business director portal, live cash position, urgent document request drawer, invoice issuance, and direct accountant messenger.

---

## ⚡ Core Engine Architecture & Implemented Capabilities

Unlike static UI templates or mockup prototypes, this system is built on a **canonical double-entry bookkeeping engine**:

1. **Strict Double-Entry Invariant Checking:**  
   Every transaction posted to the General Ledger strictly enforces $\sum \text{Debits} - \sum \text{Credits} = 0$. Unbalanced transactions are rejected.
2. **Immutable Audit History & Reversals:**  
   Posted financial transactions are never silently overwritten or deleted. Corrections generate an exact reversing journal entry with pointers to the original record and authorizing actor.
3. **Integer Minor Units (Pence):**  
   All monetary amounts are stored and calculated strictly in pence (`£150.25` = `15025`) to eliminate floating-point arithmetic errors.
4. **Dynamic Trial Balance & Real-Time Reports:**  
   The Trial Balance, Profit & Loss, and Balance Sheet are computed dynamically from posted General Ledger lines.
5. **Interactive Bank Statement Reconciliation:**  
   Two-column matching grid comparing imported bank statement feeds against general ledger rules, featuring confidence percentage scoring and automated settlement posting.
6. **AI Document Ingestion Sandbox:**  
   Simulated receipt upload and OCR draft extraction queue with human-in-the-loop approval before transactions hit the ledger.

---

## 📁 Technical Documentation (`/implementation`)

All specifications, architectural blueprints, and compliance checklists have been structured in the [`/implementation`](./implementation) directory:

* [`/implementation/IMPLEMENTATION_PLAN.md`](./implementation/IMPLEMENTATION_PLAN.md) — Master implementation plan, problem register, user personas, and phased roadmap.
* [`/implementation/ARCHITECTURE.md`](./implementation/ARCHITECTURE.md) — System architecture, relational PostgreSQL schema, entity diagrams, and tenancy isolation rules.
* [`/implementation/ACCOUNTING_RULES.md`](./implementation/ACCOUNTING_RULES.md) — Cardinal ledger invariants, UK nominal codes (1000–7999), and transaction posting lifecycles.
* [`/implementation/API_KEYS_AND_INTEGRATIONS.md`](./implementation/API_KEYS_AND_INTEGRATIONS.md) — Master checklist of required API credentials (Supabase, Truelayer, HMRC, Mindee, Stripe).
* [`/implementation/PRODUCTION_READINESS.md`](./implementation/PRODUCTION_READINESS.md) — Full gap analysis comparing current prototype capabilities against live production deployment requirements.

---

## 🛠️ Local Development & Automated Verification

### Prerequisites
* Node.js `v20+` (tested on Node `24.14.0`)
* pnpm `v11+`

### Installation & Run
```bash
# Clone the repository
git clone https://github.com/echelonsystemsgd-deep/Wealth-Wise-Accountant-Accounting-Platform.git
cd Wealth-Wise-Accountant-Accounting-Platform

# Install dependencies
pnpm install

# Run automated accounting tests
pnpm test

# Run Next.js production build
pnpm run build

# Start local development server
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Security & Boundary Disclaimer

This software engine has been engineered for prototype demonstration and architectural validation. Live bank synchronization and HMRC tax filing capabilities require the registration of verified UK commercial entities with the Financial Conduct Authority (FCA) and the HMRC Developer Hub as detailed in [`/implementation/API_KEYS_AND_INTEGRATIONS.md`](./implementation/API_KEYS_AND_INTEGRATIONS.md).
