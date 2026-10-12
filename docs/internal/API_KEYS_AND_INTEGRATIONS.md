# Wealth Wise Accountant — Technical Architecture & Integration Master Guide
## Full End-to-End Implementation Blueprint for Open Banking, Automated VAT, Document Vault & Ledger Rails

---

### 1. Executive Overview: Mapping Client Discovery to Architecture

During the discovery call on 12 October 2026, Wealth Wise Accounting confirmed the exact workflows required to replace their dependency on third-party software (Xero and Hostinger):

1. **Client Portal & Weekly Upload Cadence:** SME clients access their portal weekly to upload expense receipts, purchase invoices, and check their business health.
2. **Automated VAT Calculation:** System must automatically compute quarterly VAT liabilities ("tell them this VAT is due in this quarter") directly from ledger postings.
3. **Sales Invoicing & Ledger Linking:** Issue sales invoices, record customer payments, and automatically post double-entry journals to nominal codes.
4. **Automated Bank Feeds:** Direct connection to UK business bank accounts to stream transactions into the 2-column reconciliation matcher without manual CSV entry.
5. **Brand Website Transformation:** Upgrade the current Hostinger website into a high-converting, luxury-branded client portal and marketing hub.

---

### 2. Deep-Dive: Phase-by-Phase Technical Blueprint

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                               WEALTH WISE STANDALONE PLATFORM ARCHITECTURE                      │
├──────────────────────────┬──────────────────────────────────────┬───────────────────────────────┤
│ PHASE 1 & 2 (COMPLETED)  │ PHASE 3 (BANKING RAILS)              │ PHASE 4 & 5 (OCR, VAT & MTD)  │
├──────────────────────────┼──────────────────────────────────────┼───────────────────────────────┤
│ • Next.js App Router     │ • Truelayer / Yapily Open Banking    │ • Supabase S3 Encrypted Vault │
│ • PostgreSQL 15+ Schema  │ • Automated Webhook Statement Sync   │ • Mindee AI Document Parser   │
│ • Double-Entry Invariants│ • 2-Column Rule-Based Reconciliation │ • 9-Box VAT Form 100 Engine   │
│ • Practice CRM & RBAC    │ • Confidence Scoring (99% Match)     │ • Stripe Connect Invoicing    │
│ • Multi-Tenant Switcher  │ • Invariant General Ledger Posting   │ • HMRC Developer Portal Rails │
└──────────────────────────┴──────────────────────────────────────┴───────────────────────────────┘
```

---

### 3. Banking Rails & Open Banking Deep Dive (Phase 3)

#### A. Regulatory Context (UK Open Banking)
To pull live banking data from Barclays, NatWest, HSBC, Lloyds, Monzo, and Revolut in the UK:
- The software connects via an FCA-regulated **Account Information Services Provider (AISP)** aggregator:
  - **Option 1 (Recommended): Truelayer Data API.** Truelayer acts as the regulated technical service provider, handling bank OAuth redirection, 90-day consent renewals, and SCA (Strong Customer Authentication).
  - **Option 2: Yapily.** Pure developer API for enterprise Open Banking with no end-user branding.
  - **Option 3: Plaid UK.** Turnkey drop-in Link component for instant sandbox-to-production deployment.

#### B. Architectural Flow
1. **Consent Redirection:** The client clicks "Connect Bank" -> Redirects to their banking app (e.g. Barclays mobile app) via OAuth 2.0 PKCE.
2. **Nightly Automated Webhook Ingestion:**
   ```
   Bank API ──► Truelayer Webhook (`/api/webhooks/banking`) ──► Decrypt Payload ──► INSERT `bank_statement_lines`
   ```
3. **Smart Rule Engine:**
   - Evaluates incoming description against regex and historical supplier maps.
   - If description matches existing rule (e.g. `/AWS|Amazon Web Services/i`), assigns Nominal Code `7040` (Computer Software) and VAT Rate `20% STANDARD`.
4. **Two-Column Interactive Reconciler:**
   - Left Column: Bank Statement Line (Amount, Date, Payee).
   - Right Column: Matched Sales Invoice, Purchase Bill, or Rule.
   - One-click confirmation posts:
     $$\text{Debit } 1000 \text{ (Bank Current Account)} \quad \text{Credit } 1100 \text{ (Trade Debtors)}$$

---

### 4. Automated VAT Calculation & Quarterly Tracking Engine (Phase 5)

#### A. The UK 9-Box VAT Architecture
Every transaction posted to the General Ledger tags its VAT control element:
- **Box 1:** $\sum \text{VAT on Sales}$ from Nominal `4000`/`4100` invoices.
- **Box 4:** $\sum \text{VAT on Purchases}$ from Nominal `5000`–`7999` qualifying expenses.
- **Box 5:** $\text{Net VAT Payable / Reclaimable} = \text{Box 1} - \text{Box 4}$.
- **Box 6:** $\sum \text{Total Value of Sales Excl. VAT}$.
- **Box 7:** $\sum \text{Total Value of Purchases Excl. VAT}$.

#### B. Quarterly Deadline Tracker (Practice CRM)
- Calculates client VAT quarter periods automatically (e.g. Stagger 1: Mar/Jun/Sep/Dec; Stagger 2: Apr/Jul/Oct/Jan; Stagger 3: May/Aug/Nov/Feb).
- Displays remaining days until filing deadline (1 month and 7 days after period end).
- Direct digital submission to **HMRC Making Tax Digital (MTD) API** using Fraud Prevention Headers.

---

### 5. Document Ingestion Vault & AI OCR Pipeline (Phase 4)

#### A. Architecture
- **Private Encrypted Storage:** Files stored in Supabase Storage (`client-vault`) or AWS S3.
- **Signed URLs:** Time-limited 15-minute access URLs prevent public URL indexing.
- **OCR Engine:** Mindee Financial Document API parses the uploaded PDF/image:
  - Supplier / Merchant Name
  - Invoice Date
  - Total Gross Amount (in pence)
  - Total VAT Amount (in pence)
  - Extracted Line Items
- **Automated Missing Document Chaser:** When a bank payment has no receipt, the system prompts the client director directly in their weekly portal update view.

---

### 6. Master API & MCP Connections Matrix

| Integration Domain | Recommended Provider | Environment Variables Required | What It Powers |
| :--- | :--- | :--- | :--- |
| **Database & Auth** | Supabase | `NEXT_PUBLIC_SUPABASE_URL`<br>`NEXT_PUBLIC_SUPABASE_ANON_KEY`<br>`SUPABASE_SERVICE_ROLE_KEY`<br>`DATABASE_URL` | Multi-tenancy, Row-Level Security, user sessions, audit trail. *(Already in `.env`)* |
| **Open Banking** | Truelayer or Plaid UK | `TRUELAYER_CLIENT_ID`<br>`TRUELAYER_CLIENT_SECRET`<br>`TRUELAYER_WEBHOOK_SECRET` | Automated bank feeds for Barclays, NatWest, HSBC, Monzo, Revolut. |
| **AI Document OCR** | Mindee Financial API | `MINDEE_API_KEY` | Instant receipt/invoice data extraction into draft ledger bills. |
| **Card Payments** | Stripe Connect | `STRIPE_SECRET_KEY`<br>`STRIPE_PUBLISHABLE_KEY`<br>`STRIPE_WEBHOOK_SECRET` | "Pay Online" links on client invoices with instant ledger reconciliation. |
| **HMRC Tax Gateway** | HMRC Developer Hub | `HMRC_CLIENT_ID`<br>`HMRC_CLIENT_SECRET`<br>`HMRC_SERVER_TOKEN` | Digital 9-Box VAT Return submission (MTD Form 100). |
| **Email Delivery** | Resend | `RESEND_API_KEY` | Branded invoice delivery and weekly document reminder emails. |

#### MCP Servers to Use in Antigravity:
1. **`github-mcp-server`**: For branch management, releases, and CI/CD pipelines.
2. **`postgres-mcp-server`**: For database migration inspection, running test queries, and RLS validation.
3. **`fetch / browser MCP`**: For live test verification against HMRC sandbox and Open Banking mock environments.
