# Wealth Wise Accountant — Proprietary Accounting Platform OS

**A Standalone, High-Trust Financial Operating System & Accounting Platform Engine**  
*Direct Competitor & Bespoke Alternative to Xero, QuickBooks, and Dext for UK Accountancy Practices*

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Prototype-000000?style=for-the-badge&logo=vercel)](https://wealth-wise-platform-sigma.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-24%20Passed-green?style=for-the-badge&logo=vitest)](https://vitest.dev/)
[![Active Branch](https://img.shields.io/badge/Branch-phase--2--auth--crm-gold?style=for-the-badge)](https://github.com/echelonsystemsgd-deep/Wealth-Wise-Accountant-Accounting-Platform)

---

## 🌐 Branch Structure & Development Progression

The project is structured into clear isolated branches for client preview and phased milestone delivery:

* **`main`**: Verified live production landing page and interactive dual-perspective demonstrator.
* **`phase-2-auth-crm`** *(Current Active Build)*: Multi-tenant authentication, Row-Level Security (RLS) context, role-based UI guards (RBAC), multi-client workspace switching, and Practice CRM client portfolio manager.
* **`phase-3-bank-feeds`**: Automated Open Banking statement ingestion, 2-column live bank matching, and reconciliation rules.
* **`phase-4-document-ocr`**: S3-compatible document vault, AI OCR receipt data extraction, and missing document chase queue.
* **`phase-5-invoicing-hmrc`**: Client checkout links via Stripe, UK HMRC Making Tax Digital (MTD) VAT returns, and statutory filing exports.

---

## ⚡ Phase 2 Deliverables: Multi-Tenant Auth, RBAC & Practice CRM

Phase 2 connects the canonical accounting engine built in Phase 1 into a true multi-tenant practice operating system:

1. **Practice CRM & Portfolio Management Hub (`components/crm/PracticeCrmView.tsx`):**
   - Central command dashboard for the accountancy practice.
   - Real-time client health metrics: Unreconciled bank transactions, missing client receipts, draft sales invoices, and bank cash balances.
   - Practice fee analytics: Tracks monthly practice retainers (£1,190/mo) alongside direct self-serve SaaS revenue (£9–£19/mo).
   - Statutory compliance tracking: Automatic deadline reminders for upcoming VAT Returns (Form 100), Year-End Accounts (Companies House), and Confirmation Statements.

2. **Client Workspace Switcher (`components/auth/ClientWorkspaceSwitcher.tsx`):**
   - Instant switcher allowing accountants to cycle between client businesses (Apex Digital Solutions Ltd, Kensington Bistro Ltd, Vanguard Real Estate LLP, Clara Bennett Studio) without logging out.
   - Automatically sets tenant context (`app.current_org_id`) ensuring strict Row-Level Security.

3. **Role-Based Access Control (RBAC) & UI Guards:**
   - **`PRACTICE_ADMIN` / `SENIOR_ACCOUNTANT` / `BOOKKEEPER`**: Full practice CRM access, multi-client switching, general ledger journal posting, trial balance generation, and approval drawers.
   - **`CLIENT_DIRECTOR`**: Strictly sandboxed to their single company workspace. Attempting to access practice-level management views displays an authorized security shield directing them back to their business portal.

4. **Bi-Directional Action Placeholders:**
   - **Accountant Review Required**: Clear action items requiring accountant sign-off (e.g. VAT Box 1/4 adjustments, POS card batch splits, Sole Trader draft computations).
   - **Pending Client Director Action**: Clear tasks highlighted directly in the Client Portal (e.g. upload missing Barclaycard receipts, connect Open Banking feeds, approve management report packs).

---

## 📱 Mobile-First Ergonomics

- Touch targets calibrated to a minimum 40–44px for high-dexterity mobile use.
- Responsive horizontal scrolling (`touch-pan-x` and `scrollbar-none`) for navigation strips and filter bars.
- Dedicated dual-views: clean itemized cards on `< sm` mobile screens; high-density tabular spreadsheets on desktop.
- Zero horizontal screen overflow on iOS Safari and mobile Chrome.

---

## 🛠️ Automated Verification & Tests

Run all 24 passing automated tests:

```bash
pnpm test
```

```
✓ lib/crm/crm.test.ts (4 tests)
✓ lib/dal/dal.test.ts (9 tests)
✓ lib/utils.test.ts (3 tests)
✓ lib/accounting/ledgerService.advanced.test.ts (4 tests)
✓ lib/accounting/ledgerService.test.ts (4 tests)

Test Files  5 passed (5)
Tests       24 passed (24)
```

Compile the Next.js production build:

```bash
pnpm run build
```

---

## 🔒 Configuration & API Checklist for Client & Developer

When ready to connect production cloud providers, see detailed setup instructions in:
- [`/docs/internal/API_KEYS_AND_INTEGRATIONS.md`](./docs/internal/API_KEYS_AND_INTEGRATIONS.md)
- [`/docs/internal/IMPLEMENTATION_PLAN.md`](./docs/internal/IMPLEMENTATION_PLAN.md)
- [`/docs/internal/PROPRIETARY_XERO_ALTERNATIVE_BLUEPRINT.md`](./docs/internal/PROPRIETARY_XERO_ALTERNATIVE_BLUEPRINT.md)
