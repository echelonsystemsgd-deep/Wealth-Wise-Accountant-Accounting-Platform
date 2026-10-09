import { Account } from "./types";

export const DEFAULT_UK_CHART_OF_ACCOUNTS: Account[] = [
  // ASSETS (1000 - 1999)
  {
    code: "1000",
    name: "Barclays Business Current Account",
    type: "ASSET",
    normalBalance: "DEBIT",
    description: "Primary operational bank account",
    currentBalancePence: 0,
  },
  {
    code: "1100",
    name: "Trade Debtors (Accounts Receivable)",
    type: "ASSET",
    normalBalance: "DEBIT",
    description: "Unpaid sales invoices issued to customers",
    currentBalancePence: 0,
  },
  {
    code: "1200",
    name: "Prepayments & Accrued Income",
    type: "ASSET",
    normalBalance: "DEBIT",
    description: "Short term prepaid operational expenses",
    currentBalancePence: 0,
  },

  // LIABILITIES (2000 - 2999)
  {
    code: "2000",
    name: "Trade Creditors (Accounts Payable)",
    type: "LIABILITY",
    normalBalance: "CREDIT",
    description: "Unpaid supplier bills and contractor fees",
    currentBalancePence: 0,
  },
  {
    code: "2200",
    name: "HMRC VAT Control Account (Net Output/Input)",
    type: "LIABILITY",
    normalBalance: "CREDIT",
    description: "Cumulative VAT liability owed to HMRC",
    currentBalancePence: 0,
  },
  {
    code: "2300",
    name: "Director's Loan Account (DLA)",
    type: "LIABILITY",
    normalBalance: "CREDIT",
    description: "Funds introduced or owed to business directors",
    currentBalancePence: 0,
  },

  // EQUITY (3000 - 3999)
  {
    code: "3000",
    name: "Ordinary Share Capital",
    type: "EQUITY",
    normalBalance: "CREDIT",
    description: "Issued ordinary equity shares",
    currentBalancePence: 0,
  },
  {
    code: "3200",
    name: "Retained Earnings",
    type: "EQUITY",
    normalBalance: "CREDIT",
    description: "Accumulated profits retained from prior years",
    currentBalancePence: 0,
  },

  // REVENUE (4000 - 4999)
  {
    code: "4000",
    name: "Sales & Consulting Turnover",
    type: "REVENUE",
    normalBalance: "CREDIT",
    description: "Core fee income and consulting billings",
    currentBalancePence: 0,
  },
  {
    code: "4100",
    name: "Subscription & Retainer Revenue",
    type: "REVENUE",
    normalBalance: "CREDIT",
    description: "Recurring client retained fees",
    currentBalancePence: 0,
  },

  // DIRECT COSTS / COST OF SALES (5000 - 5999)
  {
    code: "5000",
    name: "Subcontractor & Direct Engineering",
    type: "EXPENSE",
    normalBalance: "DEBIT",
    description: "Direct engineering contractors",
    currentBalancePence: 0,
  },

  // OVERHEADS & OPERATING EXPENSES (7000 - 7999)
  {
    code: "7000",
    name: "Rent & Office Premises",
    type: "EXPENSE",
    normalBalance: "DEBIT",
    description: "Commercial office rent and service charges",
    currentBalancePence: 0,
  },
  {
    code: "7020",
    name: "Light, Heat & Power",
    type: "EXPENSE",
    normalBalance: "DEBIT",
    description: "Commercial utilities",
    currentBalancePence: 0,
  },
  {
    code: "7040",
    name: "Computer Software & IT Services",
    type: "EXPENSE",
    normalBalance: "DEBIT",
    description: "SaaS subscriptions and hardware maintenance",
    currentBalancePence: 0,
  },
  {
    code: "7050",
    name: "Travel & Subsistence",
    type: "EXPENSE",
    normalBalance: "DEBIT",
    description: "Business travel, rail, flights and meals",
    currentBalancePence: 0,
  },
];
