/**
 * Core Accounting Data Types & Ledger Invariants
 * Wealth Wise Standalone Accounting Platform Engine
 */

export type AccountType =
  | "ASSET"
  | "LIABILITY"
  | "EQUITY"
  | "REVENUE"
  | "EXPENSE";

export type NormalBalance = "DEBIT" | "CREDIT";

export interface Account {
  code: string; // e.g. "1000", "1100", "2000", "4000", "7000"
  name: string;
  type: AccountType;
  normalBalance: NormalBalance;
  description: string;
  currentBalancePence: number; // calculated directly from posted journal lines
}

export type JournalStatus = "DRAFT" | "POSTED" | "REVERSED";

export interface JournalLine {
  id: string;
  accountCode: string;
  debitPence: number; // Always >= 0, integer minor units
  creditPence: number; // Always >= 0, integer minor units
  description: string;
}

export interface JournalEntry {
  id: string;
  businessId: string;
  entryDate: string; // YYYY-MM-DD
  reference: string; // e.g. "INV-2026-001", "BILL-009", "BANK-REC-94"
  sourceType: "SALES_INVOICE" | "PURCHASE_BILL" | "BANK_TRANSACTION" | "MANUAL_JOURNAL" | "REVERSAL";
  sourceId?: string;
  status: JournalStatus;
  lines: JournalLine[];
  totalPence: number; // sum of debits == sum of credits
  postedAt?: string;
  postedBy: string;
  reversalEntryId?: string; // pointer if this entry was reversed
}

export interface Contact {
  id: string;
  businessId: string;
  type: "CUSTOMER" | "SUPPLIER" | "BOTH";
  name: string;
  companyNumber?: string;
  vatNumber?: string;
  email: string;
  phone?: string;
  paymentTermsDays: number;
}

export interface InvoiceItem {
  id: string;
  description: string;
  accountCode: string; // Nominal code to credit (e.g. "4000")
  quantity: number;
  unitPricePence: number;
  vatRatePercent: 0 | 5 | 20;
  vatPence: number;
  lineTotalPence: number;
}

export type InvoiceStatus = "DRAFT" | "ISSUED" | "PARTIALLY_PAID" | "PAID" | "VOID";

export interface SalesInvoice {
  id: string;
  businessId: string;
  invoiceNumber: string;
  contactId: string;
  contactName: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotalPence: number;
  vatPence: number;
  totalPence: number;
  amountPaidPence: number;
  amountDuePence: number;
  status: InvoiceStatus;
  journalEntryId?: string; // General ledger link
}

export type BillStatus = "DRAFT" | "AWAITING_APPROVAL" | "APPROVED" | "PAID" | "REJECTED";

export interface SupplierBill {
  id: string;
  businessId: string;
  billNumber: string;
  supplierId: string;
  supplierName: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotalPence: number;
  vatPence: number;
  totalPence: number;
  amountPaidPence: number;
  amountDuePence: number;
  status: BillStatus;
  supportingDocId?: string;
  journalEntryId?: string;
}

export interface BankStatementLine {
  id: string;
  bankAccountId: string;
  transactionDate: string;
  description: string;
  amountPence: number; // positive = inflow, negative = outflow
  isReconciled: boolean;
  matchedType?: "INVOICE" | "BILL" | "RULE" | "MANUAL";
  matchedId?: string;
  suggestedMatch?: {
    entityName: string;
    targetReference: string;
    confidencePercent: number;
  };
}

export interface TrialBalanceRow {
  accountCode: string;
  accountName: string;
  accountType: AccountType;
  debitPence: number;
  creditPence: number;
}
