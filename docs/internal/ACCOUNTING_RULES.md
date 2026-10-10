# Wealth Wise Accountant — Accounting Domain & Engine Rules

**Document Version:** 1.0.0  
**Status:** Canonical Accounting Specification  
**Jurisdiction:** United Kingdom (GBP, Companies Act 2006, HMRC VAT Guidelines)  

---

## 1. Cardinal Mathematical & Accounting Invariants

1. **Integer Minor Units (Pence):**
   * All monetary amounts are stored as integers representing pence (e.g., `£150.25` is stored strictly as `15025`).
   * Ordinary binary floating-point calculations (`0.1 + 0.2`) are strictly prohibited in financial logic.
2. **Double-Entry Equilibrium Rule:**
   * Every posted journal entry must satisfy:
     $$\sum \text{Debits} - \sum \text{Credits} = 0$$
   * Unbalanced postings are rejected by `GeneralLedgerService.postJournal` prior to ledger persistence.
3. **Immutable History & Traceable Adjustments:**
   * Posted journal entries are NEVER silently edited or deleted.
   * Corrections must be executed via `GeneralLedgerService.reverseJournal`, which generates an exact inverse entry (swapping debits and credits) and links back to the original entry ID and authorizing user.

---

## 2. Standard UK Nominal Codes (Chart of Accounts)

| Code Range | Classification | Normal Balance | Key Example Accounts |
| :--- | :--- | :--- | :--- |
| **1000 - 1999** | Assets | **DEBIT** | `1000` Barclays Current Account, `1100` Trade Debtors (Accounts Receivable) |
| **2000 - 2999** | Liabilities | **CREDIT** | `2000` Trade Creditors (Accounts Payable), `2200` HMRC VAT Control Account, `2300` Director Loan Account |
| **3000 - 3999** | Equity | **CREDIT** | `3000` Ordinary Share Capital, `3200` Retained Earnings |
| **4000 - 4999** | Revenue / Turnover | **CREDIT** | `4000` Sales & Consulting Turnover, `4100` Retainer & Subscription Fees |
| **5000 - 5999** | Cost of Sales | **DEBIT** | `5000` Subcontractors & Direct Engineering |
| **7000 - 7999** | Overheads & Expenses | **DEBIT** | `7000` Rent, `7020` Heat & Light, `7040` IT Subscriptions, `7050` Travel & Subsistence |

---

## 3. Transaction Posting Lifecycles

### A. Sales Invoice Issuance
When a sales invoice is issued:
* **DEBIT:** `1100` Trade Debtors (Total Amount Due)
* **CREDIT:** `4000` Sales Turnover (Net Amount)
* **CREDIT:** `2200` HMRC VAT Control Account (Output VAT)

### B. Invoice Settlement (Payment Received)
When a customer invoice is marked as paid or reconciled via bank statement:
* **DEBIT:** `1000` Bank Current Account (Net Inflow)
* **CREDIT:** `1100` Trade Debtors (Clear Receivable Balance)

### C. Supplier Bill Approval
When a supplier bill is approved:
* **DEBIT:** Relevant Expense Nominal (e.g. `7040` IT Software) (Net Amount)
* **DEBIT:** `2200` HMRC VAT Control Account (Input VAT Reclaimable)
* **CREDIT:** `2000` Trade Creditors (Total Payable)

---

## 4. Reporting Derivations

* **Trial Balance:** Computed dynamically by aggregating all debits and credits across posted general ledger lines. Must exhibit zero discrepancy.
* **Profit & Loss:** Operating Revenue (`4000`, `4100`) minus Direct Costs (`5000`) minus Overheads (`7000-7050`).
* **Balance Sheet:** Net Assets (Total Assets minus Total Liabilities) equal to Total Equity (Share Capital + Retained Earnings + Net Profit).
