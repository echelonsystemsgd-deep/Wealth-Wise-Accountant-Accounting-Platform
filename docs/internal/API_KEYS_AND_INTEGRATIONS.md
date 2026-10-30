# Wealth Wise Accountant — API Keys, Cloud Integrations & MCP Connection Guide
## Comprehensive Setup Guide to Connect Real-Time Banking, Payments, Document OCR & HMRC

This guide details the exact API credentials, developer portals, environment variables, and MCP (Model Context Protocol) connections required to transition Wealth Wise from prototype mode to live production operations.

---

### 1. Master Production API Keys Matrix

| Domain | Recommended Provider | Registration & Keys URL | Required Environment Variables | Free Tier / Cost Structure |
| :--- | :--- | :--- | :--- | :--- |
| **Database & Auth** | Supabase (PostgreSQL 15+) | [supabase.com/dashboard](https://supabase.com/dashboard) | `NEXT_PUBLIC_SUPABASE_URL`<br>`NEXT_PUBLIC_SUPABASE_ANON_KEY`<br>`SUPABASE_SERVICE_ROLE_KEY`<br>`DATABASE_URL` | Free tier covers 500MB database, 50,000 monthly active users, RLS policies. |
| **UK Open Banking AISP** | Truelayer (or Plaid UK) | [console.truelayer.com](https://console.truelayer.com/) | `TRUELAYER_CLIENT_ID`<br>`TRUELAYER_CLIENT_SECRET`<br>`TRUELAYER_WEBHOOK_SECRET` | Free developer sandbox. Pay-per-active-bank-connection in production (~£0.20–£0.40/month/conn vs Xero £30/mo). |
| **Document OCR AI** | Mindee Financial API (or AWS Textract) | [platform.mindee.com](https://platform.mindee.com/) | `MINDEE_API_KEY` | 250 free pages per month. Fast extraction for UK receipts and invoices. |
| **Card & Apple Pay** | Stripe Connect | [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys) | `STRIPE_SECRET_KEY`<br>`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`<br>`STRIPE_WEBHOOK_SECRET` | 0 monthly subscription. Standard 1.5% + 20p transaction fee per card payment. |
| **Alternative Payments** | PayPal REST API | [developer.paypal.com](https://developer.paypal.com/) | `PAYPAL_CLIENT_ID`<br>`PAYPAL_CLIENT_SECRET` | 0 monthly subscription. Standard merchant processing fee. |
| **HMRC MTD Tax API** | HMRC Developer Hub | [developer.service.hmrc.gov.uk](https://developer.service.hmrc.gov.uk/) | `HMRC_CLIENT_ID`<br>`HMRC_CLIENT_SECRET`<br>`HMRC_SERVER_TOKEN` | Free official UK Government API for VAT (MTD Form 100) and Corporation Tax. |
| **Transactional Email** | Resend (or Postmark) | [resend.com/api-keys](https://resend.com/api-keys) | `RESEND_API_KEY` | 3,000 emails/month free. Used for invoice dispatch and weekly receipt chasers. |

---

### 2. Ready-to-Copy `.env.local` Configuration Template

Place these keys into your local `.env.local` or host dashboard (e.g. Vercel Project Settings > Environment Variables):

```bash
# -------------------------------------------------------------
# 1. DATABASE & MULTI-TENANT AUTH (SUPABASE)
# -------------------------------------------------------------
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.your-project.supabase.co:5432/postgres"

# -------------------------------------------------------------
# 2. UK OPEN BANKING AISP FEEDS (TRUELAYER)
# -------------------------------------------------------------
TRUELAYER_CLIENT_ID="wealthwise-accountants-live-xxxx"
TRUELAYER_CLIENT_SECRET="sec_live_xxxxxxxxxxxxxxxx"
TRUELAYER_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxxxxx"
TRUELAYER_ENVIRONMENT="sandbox" # Flip to "live" when FCA compliance approved

# -------------------------------------------------------------
# 3. AI DOCUMENT OCR (MINDEE)
# -------------------------------------------------------------
MINDEE_API_KEY="mindee_live_xxxxxxxxxxxxxxxx"

# -------------------------------------------------------------
# 4. CARD & APPLE PAY CHECKOUT (STRIPE)
# -------------------------------------------------------------
STRIPE_SECRET_KEY="sk_test_xxxxxxxxxxxxxxxx" # sk_live_ in production
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_xxxxxxxxxxxxxxxx"
STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxxxxx"

# -------------------------------------------------------------
# 5. PAYPAL REST PAYMENTS (OPTIONAL RAIL)
# -------------------------------------------------------------
PAYPAL_CLIENT_ID="your_paypal_client_id"
PAYPAL_CLIENT_SECRET="your_paypal_client_secret"

# -------------------------------------------------------------
# 6. HMRC MAKING TAX DIGITAL (MTD FORM 100)
# -------------------------------------------------------------
HMRC_CLIENT_ID="hmrc_client_id_xxxx"
HMRC_CLIENT_SECRET="hmrc_secret_xxxx"
HMRC_SERVER_TOKEN="hmrc_server_token_xxxx"
HMRC_ENVIRONMENT="sandbox" # Flip to "production" when agent credentials verified

# -------------------------------------------------------------
# 7. TRANSACTIONAL DISPATCH (RESEND)
# -------------------------------------------------------------
RESEND_API_KEY="re_xxxxxxxxxxxxxxxx"
FROM_EMAIL="support@wealthwiseaccountants.co.uk"
```

---

### 3. Model Context Protocol (MCP) Connections for Antigravity

To enable autonomous debugging, database migration checks, and HMRC sandbox inspection in Antigravity, the following MCP servers are recommended:

1. **`github-mcp-server` (Active):**
   - Powers branch management, multi-branch pull requests (`phase-2-auth-crm` -> `main`), releases, and issues.
2. **`postgres-mcp-server` (Recommended for Phase 3):**
   - Grants Antigravity direct visibility into the Supabase database schema to test Row-Level Security policies, inspect double-entry trial balance tables, and verify foreign key cascading.
   - Command:
     ```json
     {
       "mcpServers": {
         "postgres": {
           "command": "npx",
           "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://postgres:[PASSWORD]@db.your-project.supabase.co:5432/postgres"]
         }
       }
     }
     ```
3. **`fetch / browser MCP`:**
   - Enables live API call inspection to verify Truelayer bank webhooks and HMRC OAuth 2.0 PKCE redirection.

---

### 4. Step-by-Step Acquisition Guide for Non-Technical Users

If you are collecting keys on behalf of Wealth Wise Accountants:

1. **Supabase (5 mins):** Sign in at [supabase.com](https://supabase.com), create a new organization "Wealth Wise", click "Settings" > "API", and copy the **Project URL**, **anon key**, and **service_role key**.
2. **Stripe (5 mins):** Register at [stripe.com](https://stripe.com), go to "Developers" > "API Keys", and copy the **Secret key** (`sk_test_...`) and **Publishable key** (`pk_test_...`).
3. **TrueLayer (10 mins):** Register at [truelayer.com](https://truelayer.com), create an application named "Wealth Wise Accounting OS", select "Data API" (Account Information Services), and copy the **Client ID** and **Client Secret**.
4. **Mindee (3 mins):** Register at [mindee.com](https://mindee.com), enable the "Invoice & Receipt OCR" API, and copy your API Token.
5. **HMRC Developer Hub:** Register at [developer.service.hmrc.gov.uk](https://developer.service.hmrc.gov.uk), create an application for "Making Tax Digital for VAT", and request sandbox test credentials.
