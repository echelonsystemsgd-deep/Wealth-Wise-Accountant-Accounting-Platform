# Wealth Wise Accountant — End-to-End Autonomous Replacement Blueprint for Xero

**Document Target:** Complete, 100% Owned Financial Operating System replacing Xero, QuickBooks & Dext  
**Autonomous Operation Target:** Zero Developer Maintenance — Fully Operated by Wealth Wise Accountants & Client Directors  
**Version:** 3.0.0 (Phases 1 & 2 Complete; Comprehensive Architecture for Phases 3, 4 & 5)

---

## 1. The Autonomous "Zero Developer Intervention" Paradigm

To ensure Wealth Wise Accountant and their business clients can operate, analyze, reconcile, and file without needing ongoing developer assistance, the entire application is architected around self-healing, automated workflows:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        WEALTH WISE FINANCIAL OPERATING SYSTEM                          │
├────────────────────────────────┬───────────────────────────────────────────────────────┤
│    PRACTICE TEAM (Accountants) │ Multi-Client Portfolio, Tax Deadlines, Auto-Rules,     │
│                                │ MTD VAT Filing, Companies House Statutory Accounts    │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│    CLIENT DIRECTORS (SMEs)     │ Mobile Receipt Dropzone, Sales Invoicing, Card Links, │
│                                │ Live Bank Position, Direct Accountant Queries         │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│    AUTONOMOUS BACKGROUND RAILS │ • Open Banking Webhooks (Daily Bank Sync)              │
│                                │ • AI OCR Pipeline (Auto-Drafts Invoices & Bills)      │
│                                │ • Invariant Validation (No Corrupted Ledgers Possible) │
│                                │ • Stripe Payment Webhooks (Instant Ledger Settlement)  │
│                                │ • HMRC MTD Gateway (One-Click Digital Return Box 1-9) │
└────────────────────────────────┴───────────────────────────────────────────────────────┘
```

---

## 2. Detailed Breakdown: What Each Phase Delivers for 100% Independence

### Phase 1: Canonical Double-Entry General Ledger (COMPLETED ✅)
- **Status:** Fully functional in memory and PostgreSQL with 20/20 tests passing.
- **Why No Developer Intervention is Needed:**
  - $\sum \text{Debits} = \sum \text{Credits}$ is mathematically enforced by code. It is impossible for an accountant or client to create an out-of-balance transaction or corrupt the trial balance.
  - Transactions cannot be destructively deleted; corrections automatically generate double-entry reversing journals (`REVERSAL`), preserving an unbroken audit log required by UK ICAEW/ACCA standards.

### Phase 2: Multi-Tenant Auth, Session RLS & Practice CRM (COMPLETED ✅)
- **Status:** Implemented on `phase-2-auth-crm` with 24/24 tests passing.
- **Why No Developer Intervention is Needed:**
  - Dynamic Client Workspace Switcher allows accountants to switch between 10, 50, or 500 client companies in real time without developer database queries.
  - Role-Based Access Control (RBAC) automatically prevents client directors from accessing practice data or other clients' confidential books.
  - Practice CRM surfaces all statutory deadlines (VAT Return due dates, Companies House Year-End dates) automatically based on company incorporation profiles.

---

### Phase 3: Banking Rails, Open Banking & Automated Statement Reconciliation
*Direct Replacement for: **Xero Bank Feeds & Bank Reconciliation Engine***

#### How It Works Autonomously (Without Developer Help):
1. **Client Connects Their Bank (Self-Serve):**
   - Company Director clicks *"Connect Bank Feed"*, selects Barclays, NatWest, HSBC, Revolut, Monzo, or Lloyds via the Truelayer/Yapily Open Banking consent journey.
   - Bank feeds automatically renew every 90 days via standard UK Open Banking consent prompts.
2. **Automated Daily Feed Sync (Hands-Free):**
   - Webhooks ingest statement transactions nightly into `bank_statement_lines`.
   - No CSV exports or manual uploads required (though drag-and-drop CSV import is included as a fallback).
3. **Smart Matching Engine (2-Column Interactive Match):**
   - **Exact Match:** When statement line (£1,200 from Acme Corp) matches outstanding invoice #INV-1042 (£1,200), the system scores a **99% Confidence Green Badge**.
   - **One-Click "OK" Match:** The accountant clicks "OK" or enables "Auto-Match" for rules.
   - **Rule Creation:** Accountants can define persistent rules directly in the UI (e.g. *"If description contains Adobe, debit 7040 Computer Software with 20% VAT"*). Once saved, the engine applies this rule to all future transactions autonomously.
4. **General Ledger Settlement:**
   - Approving a reconciliation line automatically posts the double-entry journal (Dr 1000 Bank, Cr 1100 Debtors or Cr 4000 Sales) in real time.

---

### Phase 4: Document Vault, Receipt AI OCR & Missing Document Chase Engine
*Direct Replacement for: **Dext Prepare, AutoEntry, and Hubdoc***

#### How It Works Autonomously (Without Developer Help):
1. **Client Mobile Capture & Upload:**
   - Client Director snaps a photo of a fuel receipt or drops a PDF invoice into the app on their phone or desktop.
   - Files are stored encrypted in private object storage with temporary 15-minute signed URLs.
2. **AI Vision / OCR Ingestion Pipeline:**
   - Document runs through financial document extraction (Mindee / AWS Textract / Cloud Vision).
   - Extracted fields: **Supplier Name**, **Invoice Date**, **Invoice Number**, **Total Gross**, **Net Amount**, and **VAT Rate (Standard 20%, Reduced 5%, Zero 0%)**.
   - Automatic Account Suggestion: Matches the supplier to past history (e.g., "Shell" -> Nominal Code 7030 Motor Vehicle Expenses).
3. **Confidence Routing:**
   - Documents with **>95% confidence** are pre-populated into the Draft Bills Queue.
   - Documents with low clarity flag for a bookkeeper review with side-by-side image zoom.
4. **Autonomous Receipt Chase:**
   - When a bank line is imported with no matching receipt (e.g., £85.00 card payment at Apple Store), the system automatically flags this in the Client Portal under *"Action Required by Client"*, eliminating manual email or WhatsApp chasing by the accountant.

---

### Phase 5: Invoicing Card Payments, Stripe & UK HMRC MTD Statutory Filing
*Direct Replacement for: **Xero Invoicing + Stripe add-on + Xero Tax/VAT Filing***

#### How It Works Autonomously (Without Developer Help):
1. **Sales Invoicing & Online Payment Links:**
   - Client creates an invoice, selects customer, adds line items with automatic 20% VAT calculation.
   - System generates a professional PDF with embedded *"Pay by Card / Apple Pay"* link powered by Stripe Connect.
   - When the customer pays online, Stripe sends an instant webhook: the invoice status flips to `PAID`, and the payment journal posts to the General Ledger automatically.
2. **HMRC Making Tax Digital (MTD) VAT Filing (Form 100):**
   - Every sales invoice, expense bill, and bank transaction automatically feeds into the standard UK 9-Box VAT return:
     - Box 1: VAT due on sales
     - Box 4: VAT reclaimed on purchases
     - Box 5: Net VAT to be paid to HMRC or reclaimed
   - The accountant reviews the live Box 1–9 computation, clicks **"Submit VAT Return to HMRC"**, and the system transmits the digitally sealed payload to HMRC MTD Sandbox/Production API.
   - HMRC returns a digital receipt reference, automatically archived into the immutable audit log.
3. **Statutory Accounts Export (Companies House):**
   - Automatically generates the standard Balance Sheet and Notes formatted for UK Micro-Entity (FRS 105) and Small Company (FRS 102 Section 1A) filings.

---

## 3. Commercial Moat & Financial Advantage

| Feature | Xero UK + Add-Ons | Wealth Wise Proprietary OS |
| :--- | :--- | :--- |
| **Software Fee to Wealth Wise** | £30–£50 / month / client (lost revenue) | **£0 / month / client** (100% owned software asset) |
| **Annual Cost for 100 Clients** | **£36,000 – £60,000 / year paid to Xero** | **£0 paid to competitors** |
| **Direct SaaS Revenue Opportunity** | None (Xero collects the fees) | **£9–£19/mo** collected directly from self-serve clients |
| **Receipt Capture (Dext/Hubdoc)** | Requires extra subscription | **Built directly into the platform** |
| **Client Brand Perception** | Client logs into third-party Xero | Client logs into **Wealth Wise Accountant's own platform** |
| **Client Churn & Retention** | High (client can take their Xero elsewhere) | **Near zero** (clients love their bespoke free software) |
| **Maintenance Burden** | Reliant on vendor pricing hikes | Fully owned; no developer needed once rails are live |

---

## 4. Phase Verification Matrix

| Phase | Core Capability | Test Status | Developer Need After Launch |
| :--- | :--- | :--- | :--- |
| **Phase 1** | Schema, DAL & Double-Entry Ledger Invariants | 20 / 20 Tests Passing | **Zero** (Mathematical invariants prevent errors) |
| **Phase 2** | Multi-Tenant Auth, Session RLS & Practice CRM | 24 / 24 Tests Passing | **Zero** (Self-serve client switching & onboarding) |
| **Phase 3** | Bank Feeds & Automated Statement Sync | In Architecture | **Zero** (Self-serve Open Banking OAuth & rules) |
| **Phase 4** | Document Vault & AI OCR Receipt Extraction | In Architecture | **Zero** (Automated camera upload & AI extraction) |
| **Phase 5** | Stripe Payments & HMRC MTD VAT Submission | In Architecture | **Zero** (Client card checkout & one-click filing) |
