/**
 * Wealth Wise Accountant — Production Data Access Layer (DAL) Domain Types
 * Corresponds to PostgreSQL 15+ Schema with Multi-Tenancy & Row-Level Security (RLS)
 */

export type UserRole =
  | "PRACTICE_ADMIN"
  | "SENIOR_ACCOUNTANT"
  | "BOOKKEEPER"
  | "CLIENT_DIRECTOR"
  | "READ_ONLY";

export type EntityType = "LTD" | "SOLE_TRADER" | "PARTNERSHIP" | "LLP";

export type AccountClassification = "ASSET" | "LIABILITY" | "EQUITY" | "REVENUE" | "EXPENSE";
export type NormalBalance = "DEBIT" | "CREDIT";

export type JournalSourceType =
  | "SALES_INVOICE"
  | "PURCHASE_BILL"
  | "BANK_TRANSACTION"
  | "MANUAL_JOURNAL"
  | "REVERSAL";

export type JournalStatus = "DRAFT" | "POSTED" | "REVERSED";

export type ContactType = "CUSTOMER" | "SUPPLIER" | "BOTH";

export type InvoiceStatus = "DRAFT" | "ISSUED" | "PARTIALLY_PAID" | "PAID" | "VOID";

export type BankLineMatchedType = "INVOICE" | "BILL" | "RULE" | "MANUAL";

export type AuditAction =
  | "PRACTICE_CREATED"
  | "ORG_CREATED"
  | "USER_AUTHENTICATED"
  | "COA_ACCOUNT_CREATED"
  | "JOURNAL_POSTED"
  | "JOURNAL_REVERSED"
  | "INVOICE_CREATED"
  | "INVOICE_PAYMENT_RECORDED"
  | "INVOICE_VOIDED"
  | "BANK_LINE_IMPORTED"
  | "BANK_LINE_RECONCILED"
  | "DOCUMENT_INGESTED"
  | "DOCUMENT_APPROVED";

/**
 * Request execution context passed into all DAL operations to guarantee tenant isolation.
 */
export interface RequestContext {
  practiceId?: string;
  organisationId: string;
  userId: string;
  userRole: UserRole;
  userEmail?: string;
}

export interface PracticeRecord {
  id: string;
  name: string;
  companyNumber?: string;
  vatNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientOrganisationRecord {
  id: string;
  practiceId: string;
  legalName: string;
  tradingName?: string;
  companyNumber: string;
  vatNumber?: string;
  entityType: EntityType;
  financialYearEnd: string;
  baseCurrency: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserRecord {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  practiceId?: string;
  defaultOrgId?: string;
  createdAt: string;
}

export interface ChartOfAccountRecord {
  id: string;
  organisationId: string;
  code: string;
  name: string;
  classification: AccountClassification;
  normalBalance: NormalBalance;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

export interface JournalLineRecord {
  id: string;
  journalEntryId: string;
  accountCode: string;
  debitPence: number;
  creditPence: number;
  description: string;
  createdAt: string;
}

export interface JournalEntryRecord {
  id: string;
  organisationId: string;
  entryDate: string;
  reference: string;
  sourceType: JournalSourceType;
  sourceId?: string;
  status: JournalStatus;
  totalPence: number;
  postedBy?: string;
  reversalEntryId?: string;
  createdAt: string;
  lines: JournalLineRecord[];
}

export interface ContactRecord {
  id: string;
  organisationId: string;
  type: ContactType;
  name: string;
  companyNumber?: string;
  vatNumber?: string;
  email?: string;
  phone?: string;
  paymentTermsDays: number;
  createdAt: string;
}

export interface InvoiceItemRecord {
  id: string;
  invoiceId: string;
  description: string;
  accountCode: string;
  quantity: number;
  unitPricePence: number;
  vatRatePercent: 0 | 5 | 20;
  vatPence: number;
  lineTotalPence: number;
}

export interface SalesInvoiceRecord {
  id: string;
  organisationId: string;
  invoiceNumber: string;
  contactId: string;
  contactName: string;
  issueDate: string;
  dueDate: string;
  subtotalPence: number;
  vatPence: number;
  totalPence: number;
  amountPaidPence: number;
  amountDuePence: number;
  status: InvoiceStatus;
  journalEntryId?: string;
  items: InvoiceItemRecord[];
  createdAt: string;
}

export interface BankAccountRecord {
  id: string;
  organisationId: string;
  accountName: string;
  sortCode: string;
  accountNumber: string;
  currency: string;
  chartAccountCode: string;
  currentBalancePence: number;
  createdAt: string;
}

export interface BankStatementLineRecord {
  id: string;
  bankAccountId: string;
  organisationId: string;
  transactionDate: string;
  description: string;
  amountPence: number;
  isReconciled: boolean;
  matchedType?: BankLineMatchedType;
  matchedId?: string;
  suggestedMatch?: {
    entityName: string;
    confidencePercent: number;
    targetReference: string;
    matchedAmountPence: number;
  };
  createdAt: string;
}

export interface AuditLogRecord {
  id: string;
  organisationId: string;
  actorId?: string;
  action: AuditAction;
  entityTable: string;
  entityId: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  createdAt: string;
}

export interface TrialBalanceRow {
  accountCode: string;
  accountName: string;
  classification: AccountClassification;
  normalBalance: NormalBalance;
  debitPence: number;
  creditPence: number;
}

export interface TrialBalanceReport {
  organisationId: string;
  asOfDate: string;
  rows: TrialBalanceRow[];
  totalDebitsPence: number;
  totalCreditsPence: number;
  isBalanced: boolean;
  discrepancyPence: number;
}
