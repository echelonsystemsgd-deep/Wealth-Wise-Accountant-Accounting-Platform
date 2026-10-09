# Wealth Wise Accountant — Implementation Plan

**Document Version:** 1.0.0  
**Status:** Discovery & Technical Architecture Baseline  
**Project:** Wealth Wise Accountant Operating System & Accounting Platform  
**Target Architecture:** Next.js (App Router), TypeScript, Tailwind CSS, PostgreSQL, Strict Ledger Boundaries  

---

## 1. Project Vision

Wealth Wise Accountant aims to build a modern, high-trust accounting ecosystem. While the long-term aspiration is a comprehensive platform comparable to established tools such as Xero, the strategic path forward is to start where the firm experiences the greatest operational friction:
1. **The Accountant Practice Hub:** A single-pane control centre across all client engagements, missing document queues, and regulatory filing deadlines.
2. **The Client Collaboration Workspace:** A modern, low-friction portal for business owners to upload receipts, clear action items, review draft invoices, and communicate securely without messy WhatsApp/email threads.
3. **The Core Financial & Bookkeeping Engine (Progressive):** A strict, double-entry general ledger operating on integer minor units (pence), automated bank reconciliation, and MTD-ready VAT tracking, designed with deterministic correctness rather than improvised logic.

---

## 2. Known Facts vs. Working Assumptions

### Confirmed Facts
* Wealth Wise Accountant is an operating accounting practice (UK-focused).
* Initial discovery originated from social outreach (TikTok/WhatsApp); conversations centered on lead capture, turnaround times, and reducing manual client administration.
* Wealth Wise launched a website where mobile usability was flagged and acknowledged by their technical team.
* The leadership expressed ambition for an accounting platform "like Xero".
* No existing production application or database exists in this workspace (greenfield repository with initial commit).

### Working Assumptions
* **Jurisdiction:** United Kingdom (HMRC compliance, UK VAT rules: Standard 20%, Reduced 5%, Zero 0%, Exempt).
* **Current Operational Stack:** Wealth Wise currently relies on a combination of third-party software (e.g., Xero, Dext/ReceiptBank, WhatsApp, email, spreadsheets) to service clients.
* **Primary Bottleneck:** Client document chasing, receipt categorisation delays, and lack of visibility into daily priorities across the client portfolio.
* **Target Users:** 
  * Practice Administrators / Senior Accountants
  * Bookkeepers / Junior Staff
  * Small Business Owner Clients (sole traders, micro-entities, Ltd directors)

---

## 3. Unanswered Discovery Questions

These questions must be answered by Wealth Wise leadership before advancing to production phases:
1. **Primary Immediate Goal:** Is this tool intended first to optimise internal practice efficiency (Client Portal + Practice CRM), or is replacing their actual general ledger (Xero/QuickBooks) an immediate day-one mandate?
2. **Current System of Record:** Which software currently holds their clients' authoritative general ledgers? Will the platform initially ingest/export to that system, or run in parallel?
3. **Client Demographics:** How many active clients does Wealth Wise support? What proportion are VAT-registered limited companies vs. sole traders?
4. **Licensing & Commercial Endgame:** Is the ultimate vision an exclusive proprietary competitive moat for Wealth Wise, or a white-label multi-tenant SaaS to be sold to peer accountancy firms?

---

## 4. Target Personas & Problem Register

| Persona | Daily Frustrations | Desired Outcome |
| :--- | :--- | :--- |
| **Practice Director (Senior Accountant)** | Fragmented client status, surprise filing deadlines, unbillable hours spent on administrative coordination. | Instant executive visibility: which returns are due, what revenue is unbilled, and where workflows are blocked. |
| **Operational Bookkeeper** | Crumpled receipts, missing VAT breakdowns, manual transcription from bank statements, repeated back-and-forth emails. | Automated OCR drafts, suggested nominal categorisation, 1-click client information requests, and matched reconciliation queues. |
| **SME Client / Director** | Intimidated by complex accounting software (Xero/QBO), forgets deadlines, sends receipts piecemeal via WhatsApp. | Streamlined, mobile-first workspace: 3 buttons ("Upload Receipt", "Approve Invoice", "Message Accountant") and crystal-clear cash visibility. |

---

## 5. Scope & Explicit Exclusions

### In-Scope (Phase 1 Prototype & Phase 2 Pilot)
* Role-based workspace switching (Accountant Command Centre vs. Client Portal).
* Practice Portfolio Dashboard with client health status, filing deadlines, and outstanding requests.
* Client Onboarding & Secure Document Vault.
* Invoice & Bill Lifecycle (Draft, Issued, Paid, Overdue) with synthetic financial integrity.
* Synthetic Bank Statement Reconciliation Queue with automated matching suggestions.
* AI Document Intake & OCR Draft Extraction Sandbox (simulated with full user-approval controls).
* Executive Financial Summary (P&L, Balance Sheet, Cash Flow) derived directly from underlying mock ledger transactions.

### Explicit Exclusions (Out of Scope for Initial Phases)
* Live HMRC Making Tax Digital (MTD) API submissions (requires HMRC developer credentials, production sandbox sign-off, and fraud prevention headers).
* Live Open Banking Feed connections (Plaid/Yapily/Truelayer production credentials and FCA agent registration).
* Full UK Payroll & Real-Time Information (RTI) filing engine.
* Multi-currency foreign exchange revaluation.
* Direct debit or automated payment gateway settlement (Stripe/GoCardless live charges).

---

## 6. Accounting-Domain Invariants (Non-Negotiable Engineering Rules)

To ensure financial correctness, the codebase must adhere to the following invariants:
1. **Monetary Representation:** Financial amounts must NEVER be stored or calculated as floating-point numbers (`0.1 + 0.2 !== 0.3`). All amounts must be represented in **Integer Minor Units (Pence)** (e.g. `£150.25` stored as `15025`) or PostgreSQL `NUMERIC(19, 4)` for multi-rate tax fractions.
2. **Double-Entry Balance Constraint:** Every journal entry must satisfy:
   $$\sum \text{Debits} - \sum \text{Credits} = 0$$
   Unbalanced postings are rejected at the database transaction boundary.
3. **Immutable Ledger & Audit Trail:** Posted general ledger records are never updated or deleted (`NO SILENT OVERWRITES`). Corrections require an explicit reversing journal entry linked to the original posting ID, author ID, and timestamp.
4. **Deterministic Derivation:** Financial dashboards and reports (Trial Balance, P&L, Balance Sheet) must be computed directly from posted general ledger line items, never from independent cache counters or AI hallucinations.
5. **Human-in-the-Loop AI Boundary:** AI/LLMs/OCR extractors are strictly confined to the `DraftIngestionQueue`. AI never writes directly to the General Ledger.

---

## 7. Phased Implementation Roadmap

```
Phase 0: Discovery, Architecture & Invariant Definition (Current)
   │
Phase 1: High-Fidelity Interactive Prototype (Synthetic Data & Believable Workflows)
   │
Phase 2: Secure Internal Pilot (Auth, Tenant Isolation, Client Document Vault & Requests)
   │
Phase 3: Core Bookkeeping & Double-Entry Ledger (Journals, Chart of Accounts, Bank CSVs)
   │
Phase 4: Integrations (Open Banking Rails, HMRC MTD VAT Drafts, OCR pipelines)
   │
Phase 5: Commercial SaaS & Practice White-Labelling (Multi-tenancy, Subscription Engine)
```

---

## 8. Definition of Done (Phase 1 Prototype)

1. Zero console errors, fully responsive across desktop and mobile viewports.
2. Seamless, instant role switching between Accountant Command Centre and Client Portal.
3. Working interactive workflows:
   * Document upload -> simulated OCR extraction -> draft transaction creation -> accountant approval.
   * Client invoice generation with automatic VAT (20%) calculation and state transitions (Draft -> Sent -> Paid).
   * Bank reconciliation interface demonstrating suggested matches and split transactions.
   * Financial statements (P&L, Balance Sheet) that remain mathematically consistent with ledger transactions.
4. Clear labelling: Synthetic demonstration data and mock indicators clearly noted.
