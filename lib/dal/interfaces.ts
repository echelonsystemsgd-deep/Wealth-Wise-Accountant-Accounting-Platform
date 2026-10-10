/**
 * Wealth Wise Accountant — Production DAL Repository Interfaces
 * Enforces multi-tenant isolation, atomic ledger postings, and tamper-evident audit logs.
 */

import {
  RequestContext,
  PracticeRecord,
  ClientOrganisationRecord,
  UserRecord,
  ChartOfAccountRecord,
  JournalEntryRecord,
  JournalLineRecord,
  SalesInvoiceRecord,
  InvoiceItemRecord,
  BankAccountRecord,
  BankStatementLineRecord,
  AuditLogRecord,
  TrialBalanceReport,
} from "./types";

export interface IOrganizationDal {
  createPractice(data: Omit<PracticeRecord, "id" | "createdAt" | "updatedAt">): Promise<PracticeRecord>;
  getPracticeById(practiceId: string): Promise<PracticeRecord | null>;
  createOrganisation(ctx: RequestContext, data: Omit<ClientOrganisationRecord, "id" | "practiceId" | "createdAt" | "updatedAt">): Promise<ClientOrganisationRecord>;
  getOrganisationById(ctx: RequestContext, orgId: string): Promise<ClientOrganisationRecord | null>;
  listOrganisationsByPractice(practiceId: string): Promise<ClientOrganisationRecord[]>;
  createUser(data: Omit<UserRecord, "id" | "createdAt">): Promise<UserRecord>;
  getUserByEmail(email: string): Promise<UserRecord | null>;
}

export interface PostJournalParams {
  entryDate: string;
  reference: string;
  sourceType: JournalEntryRecord["sourceType"];
  sourceId?: string;
  lines: Array<{
    accountCode: string;
    debitPence: number;
    creditPence: number;
    description: string;
  }>;
}

export interface ILedgerDal {
  listChartOfAccounts(ctx: RequestContext): Promise<ChartOfAccountRecord[]>;
  getAccountByCode(ctx: RequestContext, code: string): Promise<ChartOfAccountRecord | null>;
  createAccount(ctx: RequestContext, account: Omit<ChartOfAccountRecord, "id" | "organisationId" | "createdAt">): Promise<ChartOfAccountRecord>;
  listJournals(ctx: RequestContext): Promise<JournalEntryRecord[]>;
  getJournalById(ctx: RequestContext, journalId: string): Promise<JournalEntryRecord | null>;
  postJournal(ctx: RequestContext, params: PostJournalParams): Promise<JournalEntryRecord>;
  reverseJournal(ctx: RequestContext, journalId: string, reason: string): Promise<{ original: JournalEntryRecord; reversal: JournalEntryRecord }>;
  computeTrialBalance(ctx: RequestContext, asOfDate?: string): Promise<TrialBalanceReport>;
}

export interface CreateInvoiceParams {
  invoiceNumber: string;
  contactId: string;
  contactName: string;
  issueDate: string;
  dueDate: string;
  items: Array<{
    description: string;
    accountCode: string;
    quantity: number;
    unitPricePence: number;
    vatRatePercent: 0 | 5 | 20;
    vatPence: number;
    lineTotalPence: number;
  }>;
  subtotalPence: number;
  vatPence: number;
  totalPence: number;
}

export interface IInvoiceDal {
  listInvoices(ctx: RequestContext): Promise<SalesInvoiceRecord[]>;
  getInvoiceById(ctx: RequestContext, invoiceId: string): Promise<SalesInvoiceRecord | null>;
  createInvoice(ctx: RequestContext, params: CreateInvoiceParams): Promise<SalesInvoiceRecord>;
  recordPayment(ctx: RequestContext, invoiceId: string, amountPence: number, paymentDate: string): Promise<SalesInvoiceRecord>;
  voidInvoice(ctx: RequestContext, invoiceId: string, reason: string): Promise<SalesInvoiceRecord>;
}

export interface IBankDal {
  listBankAccounts(ctx: RequestContext): Promise<BankAccountRecord[]>;
  listStatementLines(ctx: RequestContext, bankAccountId?: string): Promise<BankStatementLineRecord[]>;
  importStatementLines(ctx: RequestContext, bankAccountId: string, lines: Array<Omit<BankStatementLineRecord, "id" | "bankAccountId" | "organisationId" | "createdAt" | "isReconciled">>): Promise<BankStatementLineRecord[]>;
  reconcileLine(ctx: RequestContext, lineId: string, matchedType: BankStatementLineRecord["matchedType"], matchedId?: string): Promise<BankStatementLineRecord>;
}

export interface IAuditDal {
  recordAudit(ctx: RequestContext, action: AuditLogRecord["action"], entityTable: string, entityId: string, metadata?: Record<string, unknown>): Promise<AuditLogRecord>;
  listAudits(ctx: RequestContext, limit?: number): Promise<AuditLogRecord[]>;
}

export interface IDataAccessLayer {
  orgs: IOrganizationDal;
  ledger: ILedgerDal;
  invoices: IInvoiceDal;
  bank: IBankDal;
  audit: IAuditDal;
}
