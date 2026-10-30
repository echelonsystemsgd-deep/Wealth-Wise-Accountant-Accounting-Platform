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

* **`main`**: Verified live production landing page, interactive dual-perspective demonstrator, and prototype review bar.
* **`phase-2-auth-crm`** *(Current Active Build)*: Multi-tenant authentication, Row-Level Security (RLS) context, role-based UI guards (RBAC), multi-client workspace switching, responsive dashboard sidebars, interactive UK tax calculator, and Practice CRM client portfolio manager.
* **`phase-3-bank-feeds`**: Automated Open Banking statement ingestion, 2-column live bank matching, and reconciliation rules.
* **`phase-4-document-ocr`**: S3-compatible document vault, AI OCR receipt data extraction, and missing document chase queue.
* **`phase-5-invoicing-hmrc`**: Client checkout links via Stripe, UK HMRC Making Tax Digital (MTD) VAT returns, and statutory filing exports.

---

## ⚡ Core Upgrades & Feature Highlights

### 1. Responsive Dashboard Sidebar Navigation (`components/dashboard/`, `components/portal/`)
- **Partner Practice OS (`/demo/accountant`)**:
  - High-contrast workstation desktop sidebar collapsible between 260px (full labels) and 80px (icon-only widescreen mode for wide ledger spreadsheets).
  - Categorized nav groups: **Practice CRM** (Clients, Executive KPIs), **Ledger & Compliance** (General Ledger, Bank Rec, Reports), and **Operations & Billing** (Invoices, Document Vault).
  - Dynamic status counters: `48 Active` clients, `2 Due` unmatched bank feeds, `OCR Ingest` queue.
  - Mobile off-canvas drawer with full body scroll locking (`overflow: hidden`), Escape key listener, and touch-calibrated targets.
- **Client Dropzone & Vault (`/demo/client`)**:
  - Dedicated client sidebar with active Company CRN badge and assigned Senior Accountant indicator (Sarah Jenkins, ACCA).
  - Quick "+ Upload Receipt" dropzone action, sales invoicing link, and 1-tap WhatsApp consultation.

### 2. Interactive UK Small Business & Ltd Tax Calculator (`components/marketing/TaxSavingsCalculator.tsx`)
- Dynamic turnover (£25k–£500k+) and allowable expense sliders calibrated for UK tax rules.
- Live comparison of Sole Trader (Income Tax + NI Class 2/4) vs. UK Limited Company structure (Optimal £12,570 Director Salary, 19/25% Corporation Tax, Dividend Allowances).
- Computes estimated annual tax savings (£2,400 to £14,000+/year) and recommends an optimal Wealthwise monthly retainer (£120–£450/month).
- "Claim This Strategy" action pre-fills the consultation form with calculated figures.

### 3. Persistent 3-Environment Prototype Review Bar (`components/demo/PrototypeReviewBar.tsx`)
- Collapsible review bar anchored across all pages allowing 1-tap switching between:
  1. 🌐 **Public Marketing Portal** (`/`)
  2. 💼 **Partner Practice OS** (`/demo/accountant`)
  3. 📱 **Client Dropzone & Vault** (`/demo/client`)
- Direct 1-tap WhatsApp advisory link connecting directly with the firm.

### 4. Enterprise Row-Level Security (RLS) & Multi-Tenant Switcher
- Instant client switching (Apex Digital Solutions Ltd, Kensington Bistro Ltd, Vanguard Real Estate LLP, Clara Bennett Studio) without logging out.
- Automatic session tenant context (`app.current_org_id`) guaranteeing complete client isolation.
- Strict UI guards shielding practice-level accounting data from unauthorized client directors.

---

## 📱 Mobile-First Ergonomics & Modal Isolation

- Touch targets calibrated to a minimum 40–44px for high-dexterity mobile use.
- Responsive horizontal scrolling (`touch-pan-x` and `scrollbar-none`) for navigation strips and filter bars.
- Dedicated dual-views: clean itemized cards on `< sm` mobile screens; high-density tabular spreadsheets on desktop.
- Modal dialogs (Payment Modal, Open Banking Modal, HMRC MTD Filing, Mobile Drawer) enforce body scroll locks, backdrop click dismissal, and `Escape` key listeners.
- Zero horizontal screen overflow on iOS Safari and mobile Chrome.

---

## 🛠️ Automated Verification & Tests

Run all 24 passing automated tests:

```bash
pnpm test
```

```
✓ lib/dal/dal.test.ts (9 tests)
✓ lib/utils.test.ts (3 tests)
✓ lib/crm/crm.test.ts (4 tests)
✓ lib/accounting/ledgerService.advanced.test.ts (4 tests)
✓ lib/accounting/ledgerService.test.ts (4 tests)

Test Files  5 passed (5)
Tests       24 passed (24)
```

Compile the Next.js production build (17/17 routes prerendered):

```bash
pnpm run build
```

---

## 🔒 Configuration & API Checklist for Client & Developer

When ready to connect live UK banking, Stripe checkout, or HMRC MTD credentials, see detailed step-by-step guides in:
- [`/docs/internal/API_KEYS_AND_INTEGRATIONS.md`](./docs/internal/API_KEYS_AND_INTEGRATIONS.md)
- [`/docs/internal/IMPLEMENTATION_PLAN.md`](./docs/internal/IMPLEMENTATION_PLAN.md)
- [`/docs/internal/PROPRIETARY_XERO_ALTERNATIVE_BLUEPRINT.md`](./docs/internal/PROPRIETARY_XERO_ALTERNATIVE_BLUEPRINT.md)
