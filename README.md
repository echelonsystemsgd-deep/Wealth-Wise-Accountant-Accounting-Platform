# Wealth Wise Accountant — Proprietary Accounting Platform OS

**A Standalone, High-Trust Financial Operating System & Accounting Platform Engine**  
*Direct Competitor & Bespoke Alternative to Xero, QuickBooks, and Dext for UK Accountancy Practices*

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Prototype-000000?style=for-the-badge&logo=vercel)](https://wealth-wise-platform-sigma.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-19%20Passed-green?style=for-the-badge&logo=vitest)](https://vitest.dev/)
[![Branch](https://img.shields.io/badge/Branch-feat%2Fproduction--core-blueviolet?style=for-the-badge)](https://github.com/echelonsystemsgd-deep/Wealth-Wise-Accountant-Accounting-Platform)

---

## 🌐 Live Interactive Application & Branches

* **Live Prototype (Vercel):** [https://wealth-wise-platform-sigma.vercel.app/](https://wealth-wise-platform-sigma.vercel.app/) (hosted from `main` branch).
* **Production Core Branch:** `feat/production-core` — Dedicated phased production build containing the full Data Access Layer (DAL), PostgreSQL multi-tenant schema with Row-Level Security, and mobile UX optimizations.
* **Instant Role Switcher:** Toggle seamlessly in the header between:
  1. **Accountant Hub:** Practice command center, client portfolio triage, general ledger inspector, Trial Balance, and bank reconciliation.
  2. **Business Workspace:** Client business director portal, live cash position, urgent document request drawer, invoice issuance, and direct accountant messenger.

---

## ⚡ Architecture & Phase 1 Highlights (`feat/production-core`)

Unlike static UI templates or mockup prototypes, this system is engineered on a **canonical double-entry bookkeeping engine** and a modular **Production Data Access Layer (DAL)**:

1. **Production PostgreSQL Schema (`lib/dal/schema.sql`):**  
   PostgreSQL 15+ compatible with Row-Level Security (RLS) policies, practices, client organisations, users, chart of accounts, journal entries, journal lines, invoices, bank accounts, and tamper-evident audit logs.
2. **Production TypeScript DAL (`lib/dal/`):**  
   Strict repository abstractions (`IOrganizationDal`, `ILedgerDal`, `IInvoiceDal`, `IBankDal`, `IAuditDal`) with memory and PostgreSQL connectors.
3. **Strict Double-Entry Invariant Checking:**  
   Every transaction posted to the General Ledger strictly enforces $\sum \text{Debits} - \sum \text{Credits} = 0$. Unbalanced transactions trigger a `DoubleEntryImbalanceError`.
4. **Immutable Audit History & Reversals:**  
   Posted transactions are never silently overwritten or deleted. Corrections generate an exact reversing journal entry with pointers to the original record and authorizing actor.
5. **Integer Minor Units (Pence):**  
   All monetary amounts are stored and calculated strictly in pence (`£150.25` = `15025`) to eliminate floating-point arithmetic errors.
6. **Mobile Ergonomics & Responsive Dual-Views:**  
   - Dedicated mobile card views on small viewports (`< sm`) for invoices and general ledger entries.
   - 40–44px minimum touch targets across all interactive buttons and inputs.
   - Anti-zoom `text-base sm:text-xs` styling for mobile Safari/Chrome.
   - Smooth touch momentum scrolling (`-webkit-overflow-scrolling: touch`) with `scrollbar-none`.

---

## 📁 Technical Documentation (`/implementation`)

Detailed blueprints, audit logs, and compliance checklists:

* [`/implementation/IMPLEMENTATION_PLAN.md`](./implementation/IMPLEMENTATION_PLAN.md) — Master implementation plan, problem register, phased roadmap, and Phase 1 completion report.
* [`/implementation/ARCHITECTURE.md`](./implementation/ARCHITECTURE.md) — System architecture, relational PostgreSQL schema, entity diagrams, and tenancy isolation rules.
* [`/implementation/ACCOUNTING_RULES.md`](./implementation/ACCOUNTING_RULES.md) — Cardinal ledger invariants, UK nominal codes (1000–7999), and transaction posting lifecycles.
* [`/implementation/API_KEYS_AND_INTEGRATIONS.md`](./implementation/API_KEYS_AND_INTEGRATIONS.md) — Master checklist of required API credentials (Supabase, Truelayer, HMRC, Mindee, Stripe).
* [`/implementation/PRODUCTION_READINESS.md`](./implementation/PRODUCTION_READINESS.md) — Subsystem readiness matrix and environmental configuration guide.

---

## 🛠️ Automated Verification & Test Coverage

All 19 automated tests run and pass cleanly in `vitest`:

```bash
pnpm test
```

```
✓ lib/dal/dal.test.ts (8 tests)
✓ lib/accounting/ledgerService.test.ts (4 tests)
✓ lib/accounting/ledgerService.advanced.test.ts (4 tests)
✓ lib/utils.test.ts (3 tests)

Test Files  4 passed (4)
Tests       19 passed (19)
```

To run the Next.js production build:
```bash
pnpm run build
```

---

## 🔒 Security & Phased Delivery Notice

The software engine is designed to operate seamlessly both in simulation mode (zero external dependency costs) and connected mode (plug-and-play API keys). Live bank synchronization and HMRC tax filing capabilities require the registration of verified UK commercial entities with the Financial Conduct Authority (FCA) and the HMRC Developer Hub as detailed in [`/implementation/API_KEYS_AND_INTEGRATIONS.md`](./implementation/API_KEYS_AND_INTEGRATIONS.md).
