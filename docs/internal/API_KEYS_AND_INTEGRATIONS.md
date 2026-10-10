# API Keys, Regulated Rails & MCP Integrations Checklist
## Wealth Wise Standalone Accounting Platform (Direct Xero Competitor)

To transform this standalone engine into a production competitor to Xero with live banking, automated tax filing, AI OCR, and multi-tenant persistence, obtain the following credentials and provider integrations:

---

### 1. Database & Multi-Tenant Infrastructure (Immediate)

* **Provider:** **Supabase** (or Neon Database + AWS S3)
* **What We Need:**
  * `NEXT_PUBLIC_SUPABASE_URL` (Project API URL)
  * `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Public client key)
  * `SUPABASE_SERVICE_ROLE_KEY` (Server-side key for database migrations and bypass of RLS during administrative tasks)
  * `DATABASE_URL` (Direct PostgreSQL connection string for Prisma/Drizzle ORM)
* **What it Powers:**
  * Multi-tenant data persistence across all client businesses.
  * PostgreSQL Row-Level Security (`organisation_id`).
  * Private object storage buckets for encrypted invoice PDFs and receipts with 15-minute time-to-live (TTL) signed URLs.

---

### 2. Live Bank Feeds & Account Reconciliation (The "Xero Bank Feeds" Equivalent)

* **Provider Option A (Recommended UK/EU):** **Truelayer** or **Yapily**
* **Provider Option B:** **Plaid UK**
* **What We Need:**
  * `BANKING_CLIENT_ID`
  * `BANKING_CLIENT_SECRET`
  * `BANKING_ENVIRONMENT` (`sandbox` / `production`)
  * `BANKING_WEBHOOK_SECRET`
* **Regulatory Requirement:**
  * To access Open Banking data directly in the UK, Wealth Wise must either register as an **Account Information Services Provider (AISP)** with the FCA, or operate under Truelayer/Yapily's regulated **Agent / Technical Service Provider (TSP)** program.
* **What it Powers:**
  * Real-time sync of bank transactions from Barclays, NatWest, HSBC, Revolut Business, Monzo, and Lloyd's directly into the reconciliation engine without manual CSV uploads.

---

### 3. UK HMRC Making Tax Digital (MTD) Gateway

* **Provider:** **HMRC Developer Hub** (`https://developer.service.hmrc.gov.uk/`)
* **What We Need:**
  * `HMRC_CLIENT_ID`
  * `HMRC_CLIENT_SECRET`
  * `HMRC_SERVER_TOKEN`
  * `HMRC_ENVIRONMENT` (`test` / `production`)
* **Required HMRC APIs:**
  1. **VAT (MTD) API:** Submit 9-box VAT returns, retrieve obligations, view historical liabilities and payment statuses.
  2. **Agent Authorisation API:** Allows Wealth Wise accountants to access client VAT and tax records on behalf of their clients without asking for client login credentials.
  3. **Making Tax Digital for Income Tax (ITSA) API:** Preparation for upcoming Sole Trader / Landlord MTD filings.
* **Compliance Requirement:**
  * HMRC requires all production accounting software to submit **Fraud Prevention Headers** (device IP, browser fingerprint, client timestamp) with every API call, and pass HMRC's automated test scenarios in their sandbox before unlocking production credentials.

---

### 4. AI Document Extraction & OCR Pipeline (The "Dext / Hubdoc" Equivalent)

* **Provider Option A (Turnkey High Accuracy):** **Mindee Financial API** or **Veryfi** (specialized in receipts and invoices)
* **Provider Option B (Cloud Enterprise):** **AWS Textract (AnalyzeExpense)** or **Google Cloud Document AI**
* **Provider Option C (Generative AI Vision):** **Anthropic Claude 3.5 Sonnet / OpenAI GPT-4o Vision API**
* **What We Need:**
  * `OCR_API_KEY` (e.g., `MINDEE_API_KEY` or `OPENAI_API_KEY`)
* **What it Powers:**
  * Instant auto-extraction of Supplier, Invoice Number, Gross Amount, VAT, and suggested Chart of Accounts code directly into the draft review queue.

---

### 5. Email Delivery & Invoicing Engine

* **Provider:** **Resend** or **SendGrid**
* **What We Need:**
  * `RESEND_API_KEY`
  * Verified Custom Sending Domain (e.g. `invoices@wealthwiseaccountant.co.uk`)
* **What it Powers:**
  * Automatic delivery of professional PDF invoices with "Pay Now" links, overdue payment reminders, and accountant query notifications.

---

### 6. Payments & Online Invoice Settlement (The "Stripe / GoCardless" Equivalent)

* **Provider:** **Stripe Connect** & **GoCardless** (UK Direct Debit)
* **What We Need:**
  * `STRIPE_SECRET_KEY`
  * `STRIPE_PUBLISHABLE_KEY`
  * `STRIPE_WEBHOOK_SECRET`
* **What it Powers:**
  * Clients' customers can click "Pay Online" via Card, Apple Pay, or BACS Direct Debit directly on their Wealth Wise invoices. Payment success events automatically trigger general ledger settlement journals.

---

### 7. MCP (Model Context Protocol) Connections to Activate in Antigravity

To allow autonomous agent engineering and external tool execution during this build:
* **`github-mcp-server`** *(Already configured)*: For repository branches, releases, and CI/CD.
* **`postgres-mcp-server`** (or Supabase MCP): To execute database migrations, verify SQL triggers, and run test queries directly against the PostgreSQL container.
* **`fetch / browser MCP`**: To run live sandbox API verification against HMRC test servers and Open Banking sandbox environments.
