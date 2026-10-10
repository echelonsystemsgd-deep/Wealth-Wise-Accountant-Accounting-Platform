/**
 * Wealth Wise Accountant — Memory DAL Implementation
 * Enterprise in-memory implementation enforcing multi-tenant isolation,
 * double-entry ledger invariants, and immutable audit logs.
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
  TrialBalanceRow,
} from "./types";
import {
  IDataAccessLayer,
  IOrganizationDal,
  ILedgerDal,
  IInvoiceDal,
  IBankDal,
  IAuditDal,
  PostJournalParams,
  CreateInvoiceParams,
} from "./interfaces";

export class DoubleEntryImbalanceError extends Error {
  constructor(debitPence: number, creditPence: number) {
    super(
      `Double-entry imbalance invariant violated: Total Debits (£${(debitPence / 100).toFixed(
        2
      )}) does not match Total Credits (£${(creditPence / 100).toFixed(2)}). Discrepancy: ${Math.abs(
        debitPence - creditPence
      )} pence.`
    );
    this.name = "DoubleEntryImbalanceError";
  }
}

export class TenantAccessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TenantAccessError";
  }
}

export class MemoryDataAccessLayer implements IDataAccessLayer {
  private practiceStore: Map<string, PracticeRecord> = new Map();
  private organisationStore: Map<string, ClientOrganisationRecord> = new Map();
  private userStore: Map<string, UserRecord> = new Map();
  private accountStore: Map<string, ChartOfAccountRecord> = new Map(); // key: `${orgId}:${code}`
  private journalStore: Map<string, JournalEntryRecord> = new Map();
  private invoiceStore: Map<string, SalesInvoiceRecord> = new Map();
  private bankAccountStore: Map<string, BankAccountRecord> = new Map();
  private bankLineStore: Map<string, BankStatementLineRecord> = new Map();
  private auditLogStore: AuditLogRecord[] = [];

  public orgs: IOrganizationDal;
  public ledger: ILedgerDal;
  public invoices: IInvoiceDal;
  public bank: IBankDal;
  public audit: IAuditDal;

  constructor() {
    this.seedDefaultData();

    // ------------------------------------------------------------------------
    // AUDIT TRAIL DAL
    // ------------------------------------------------------------------------
    this.audit = {
      recordAudit: async (ctx: RequestContext, action, entityTable, entityId, metadata) => {
        const record: AuditLogRecord = {
          id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          organisationId: ctx.organisationId,
          actorId: ctx.userId,
          action,
          entityTable,
          entityId,
          metadata,
          createdAt: new Date().toISOString(),
        };
        this.auditLogStore.unshift(record);
        return record;
      },

      listAudits: async (ctx: RequestContext, limit = 50) => {
        return this.auditLogStore
          .filter((a) => a.organisationId === ctx.organisationId)
          .slice(0, limit);
      },
    };

    // ------------------------------------------------------------------------
    // ORGANIZATION DAL
    // ------------------------------------------------------------------------
    this.orgs = {
      createPractice: async (data) => {
        const id = `prac-${Date.now()}`;
        const now = new Date().toISOString();
        const record: PracticeRecord = { id, ...data, createdAt: now, updatedAt: now };
        this.practiceStore.set(id, record);
        return record;
      },

      getPracticeById: async (practiceId) => {
        return this.practiceStore.get(practiceId) || null;
      },

      createOrganisation: async (ctx, data) => {
        const id = `org-${Date.now()}`;
        const now = new Date().toISOString();
        const record: ClientOrganisationRecord = {
          id,
          practiceId: ctx.practiceId || "prac-ww-1",
          ...data,
          createdAt: now,
          updatedAt: now,
        };
        this.organisationStore.set(id, record);

        // Seed chart of accounts for the new tenant
        const defaultAccounts = [
          { code: "1000", name: "Bank Current Account", classification: "ASSET" as const, normalBalance: "DEBIT" as const },
          { code: "1100", name: "Trade Debtors", classification: "ASSET" as const, normalBalance: "DEBIT" as const },
          { code: "2100", name: "Trade Creditors", classification: "LIABILITY" as const, normalBalance: "CREDIT" as const },
          { code: "2200", name: "VAT Control Account", classification: "LIABILITY" as const, normalBalance: "CREDIT" as const },
          { code: "3000", name: "Retained Earnings", classification: "EQUITY" as const, normalBalance: "CREDIT" as const },
          { code: "4000", name: "Turnover / Revenue", classification: "REVENUE" as const, normalBalance: "CREDIT" as const },
          { code: "7000", name: "Operating Expenses", classification: "EXPENSE" as const, normalBalance: "DEBIT" as const },
        ];

        for (const a of defaultAccounts) {
          this.accountStore.set(`${id}:${a.code}`, {
            id: `coa-${id}-${a.code}`,
            organisationId: id,
            ...a,
            isActive: true,
            createdAt: now,
          });
        }

        await this.audit.recordAudit(ctx, "ORG_CREATED", "client_organisations", id, { legalName: data.legalName });
        return record;
      },

      getOrganisationById: async (ctx, orgId) => {
        if (ctx.organisationId !== orgId && ctx.userRole !== "PRACTICE_ADMIN") {
          throw new TenantAccessError(`Access denied: Cannot access organisation ${orgId} from context ${ctx.organisationId}`);
        }
        return this.organisationStore.get(orgId) || null;
      },

      listOrganisationsByPractice: async (practiceId) => {
        return Array.from(this.organisationStore.values()).filter((o) => o.practiceId === practiceId);
      },

      createUser: async (data) => {
        const id = `usr-${Date.now()}`;
        const now = new Date().toISOString();
        const user: UserRecord = { id, ...data, createdAt: now };
        this.userStore.set(id, user);
        return user;
      },

      getUserByEmail: async (email) => {
        for (const user of this.userStore.values()) {
          if (user.email.toLowerCase() === email.toLowerCase()) return user;
        }
        return null;
      },
    };

    // ------------------------------------------------------------------------
    // GENERAL LEDGER DAL
    // ------------------------------------------------------------------------
    this.ledger = {
      listChartOfAccounts: async (ctx) => {
        return Array.from(this.accountStore.values()).filter((a) => a.organisationId === ctx.organisationId);
      },

      getAccountByCode: async (ctx, code) => {
        return this.accountStore.get(`${ctx.organisationId}:${code}`) || null;
      },

      createAccount: async (ctx, account) => {
        const key = `${ctx.organisationId}:${account.code}`;
        const now = new Date().toISOString();
        const record: ChartOfAccountRecord = {
          id: `coa-${ctx.organisationId}-${account.code}`,
          organisationId: ctx.organisationId,
          ...account,
          createdAt: now,
        };
        this.accountStore.set(key, record);
        await this.audit.recordAudit(ctx, "COA_ACCOUNT_CREATED", "chart_of_accounts", record.id, { code: account.code });
        return record;
      },

      listJournals: async (ctx) => {
        return Array.from(this.journalStore.values())
          .filter((j) => j.organisationId === ctx.organisationId)
          .sort((a, b) => new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime());
      },

      getJournalById: async (ctx, journalId) => {
        const journal = this.journalStore.get(journalId);
        if (!journal || journal.organisationId !== ctx.organisationId) return null;
        return journal;
      },

      postJournal: async (ctx, params: PostJournalParams) => {
        if (!params.lines || params.lines.length < 2) {
          throw new Error("Journal entry must contain at least 2 lines.");
        }

        let totalDebits = 0;
        let totalCredits = 0;

        for (const line of params.lines) {
          if (line.debitPence < 0 || line.creditPence < 0) {
            throw new Error("Journal lines cannot have negative debit or credit pence values.");
          }
          totalDebits += line.debitPence;
          totalCredits += line.creditPence;
        }

        if (totalDebits !== totalCredits) {
          throw new DoubleEntryImbalanceError(totalDebits, totalCredits);
        }

        const journalId = `jnl-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const now = new Date().toISOString();

        const lines: JournalLineRecord[] = params.lines.map((l, idx) => ({
          id: `line-${journalId}-${idx}`,
          journalEntryId: journalId,
          accountCode: l.accountCode,
          debitPence: l.debitPence,
          creditPence: l.creditPence,
          description: l.description,
          createdAt: now,
        }));

        const record: JournalEntryRecord = {
          id: journalId,
          organisationId: ctx.organisationId,
          entryDate: params.entryDate,
          reference: params.reference,
          sourceType: params.sourceType,
          sourceId: params.sourceId,
          status: "POSTED",
          totalPence: totalDebits,
          postedBy: ctx.userId,
          createdAt: now,
          lines,
        };

        this.journalStore.set(journalId, record);
        await this.audit.recordAudit(ctx, "JOURNAL_POSTED", "journal_entries", journalId, {
          reference: params.reference,
          totalPence: totalDebits,
        });

        return record;
      },

      reverseJournal: async (ctx, journalId, reason) => {
        const original = this.journalStore.get(journalId);
        if (!original || original.organisationId !== ctx.organisationId) {
          throw new Error(`Journal not found: ${journalId}`);
        }
        if (original.status === "REVERSED") {
          throw new Error(`Journal ${journalId} is already reversed.`);
        }

        const reversalJournalId = `jnl-rev-${Date.now()}`;
        const now = new Date().toISOString();

        const reversalLines: JournalLineRecord[] = original.lines.map((l, idx) => ({
          id: `line-${reversalJournalId}-${idx}`,
          journalEntryId: reversalJournalId,
          accountCode: l.accountCode,
          debitPence: l.creditPence,
          creditPence: l.debitPence,
          description: `Reversal of ${original.reference}: ${l.description}`,
          createdAt: now,
        }));

        const reversalEntry: JournalEntryRecord = {
          id: reversalJournalId,
          organisationId: ctx.organisationId,
          entryDate: new Date().toISOString().split("T")[0],
          reference: `REV-${original.reference}`,
          sourceType: "REVERSAL",
          sourceId: original.id,
          status: "POSTED",
          totalPence: original.totalPence,
          postedBy: ctx.userId,
          createdAt: now,
          lines: reversalLines,
        };

        original.status = "REVERSED";
        original.reversalEntryId = reversalJournalId;

        this.journalStore.set(reversalJournalId, reversalEntry);
        this.journalStore.set(original.id, original);

        await this.audit.recordAudit(ctx, "JOURNAL_REVERSED", "journal_entries", original.id, {
          reversalJournalId,
          reason,
        });

        return { original, reversal: reversalEntry };
      },

      computeTrialBalance: async (ctx, _asOfDate) => {
        const orgAccounts = Array.from(this.accountStore.values()).filter(
          (a) => a.organisationId === ctx.organisationId
        );

        const balanceMap = new Map<string, { debits: number; credits: number }>();
        for (const a of orgAccounts) {
          balanceMap.set(a.code, { debits: 0, credits: 0 });
        }

        const orgJournals = Array.from(this.journalStore.values()).filter(
          (j) => j.organisationId === ctx.organisationId
        );

        for (const journal of orgJournals) {
          if (journal.status === "POSTED" && journal.sourceType !== "REVERSAL") {
            for (const line of journal.lines) {
              const current = balanceMap.get(line.accountCode) || { debits: 0, credits: 0 };
              current.debits += line.debitPence;
              current.credits += line.creditPence;
              balanceMap.set(line.accountCode, current);
            }
          }
        }

        let grandTotalDebits = 0;
        let grandTotalCredits = 0;

        const rows: TrialBalanceRow[] = orgAccounts.map((account) => {
          const bal = balanceMap.get(account.code) || { debits: 0, credits: 0 };
          const netDifference = bal.debits - bal.credits;

          let rowDebit = 0;
          let rowCredit = 0;

          if (account.normalBalance === "DEBIT") {
            if (netDifference >= 0) {
              rowDebit = netDifference;
            } else {
              rowCredit = Math.abs(netDifference);
            }
          } else {
            const netCredit = bal.credits - bal.debits;
            if (netCredit >= 0) {
              rowCredit = netCredit;
            } else {
              rowDebit = Math.abs(netCredit);
            }
          }

          grandTotalDebits += rowDebit;
          grandTotalCredits += rowCredit;

          return {
            accountCode: account.code,
            accountName: account.name,
            classification: account.classification,
            normalBalance: account.normalBalance,
            debitPence: rowDebit,
            creditPence: rowCredit,
          };
        });

        const discrepancyPence = Math.abs(grandTotalDebits - grandTotalCredits);

        return {
          organisationId: ctx.organisationId,
          asOfDate: new Date().toISOString().split("T")[0],
          rows,
          totalDebitsPence: grandTotalDebits,
          totalCreditsPence: grandTotalCredits,
          isBalanced: discrepancyPence === 0,
          discrepancyPence,
        };
      },
    };

    // ------------------------------------------------------------------------
    // SALES INVOICE DAL
    // ------------------------------------------------------------------------
    this.invoices = {
      listInvoices: async (ctx) => {
        return Array.from(this.invoiceStore.values())
          .filter((inv) => inv.organisationId === ctx.organisationId)
          .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime());
      },

      getInvoiceById: async (ctx, invoiceId) => {
        const inv = this.invoiceStore.get(invoiceId);
        if (!inv || inv.organisationId !== ctx.organisationId) return null;
        return inv;
      },

      createInvoice: async (ctx, params: CreateInvoiceParams) => {
        for (const inv of this.invoiceStore.values()) {
          if (
            inv.organisationId === ctx.organisationId &&
            inv.invoiceNumber.toLowerCase() === params.invoiceNumber.toLowerCase()
          ) {
            throw new Error(`Invoice number "${params.invoiceNumber}" already exists for this organisation.`);
          }
        }

        const invoiceId = `inv-${Date.now()}`;
        const now = new Date().toISOString();

        const items: InvoiceItemRecord[] = params.items.map((item, idx) => ({
          id: `inv-item-${invoiceId}-${idx}`,
          invoiceId,
          ...item,
        }));

        const journalLines = [
          {
            accountCode: "1100",
            debitPence: params.totalPence,
            creditPence: 0,
            description: `Accounts Receivable: ${params.contactName} (${params.invoiceNumber})`,
          },
          {
            accountCode: "4000",
            debitPence: 0,
            creditPence: params.subtotalPence,
            description: `Sales Revenue (${params.invoiceNumber})`,
          },
        ];

        if (params.vatPence > 0) {
          journalLines.push({
            accountCode: "2200",
            debitPence: 0,
            creditPence: params.vatPence,
            description: `Output VAT on Invoice ${params.invoiceNumber}`,
          });
        }

        const journal = await this.ledger.postJournal(ctx, {
          entryDate: params.issueDate,
          reference: `INV-POST-${params.invoiceNumber}`,
          sourceType: "SALES_INVOICE",
          sourceId: invoiceId,
          lines: journalLines,
        });

        const invoiceRecord: SalesInvoiceRecord = {
          id: invoiceId,
          organisationId: ctx.organisationId,
          invoiceNumber: params.invoiceNumber,
          contactId: params.contactId,
          contactName: params.contactName,
          issueDate: params.issueDate,
          dueDate: params.dueDate,
          subtotalPence: params.subtotalPence,
          vatPence: params.vatPence,
          totalPence: params.totalPence,
          amountPaidPence: 0,
          amountDuePence: params.totalPence,
          status: "ISSUED",
          journalEntryId: journal.id,
          items,
          createdAt: now,
        };

        this.invoiceStore.set(invoiceId, invoiceRecord);
        await this.audit.recordAudit(ctx, "INVOICE_CREATED", "sales_invoices", invoiceId, {
          invoiceNumber: params.invoiceNumber,
          totalPence: params.totalPence,
        });

        return invoiceRecord;
      },

      recordPayment: async (ctx, invoiceId, amountPence, paymentDate) => {
        const inv = this.invoiceStore.get(invoiceId);
        if (!inv || inv.organisationId !== ctx.organisationId) {
          throw new Error(`Invoice not found: ${invoiceId}`);
        }
        if (inv.status === "PAID" || inv.status === "VOID") {
          throw new Error(`Cannot record payment on invoice with status ${inv.status}.`);
        }
        if (amountPence <= 0) {
          throw new Error("Payment amount must be greater than zero.");
        }
        if (amountPence > inv.amountDuePence) {
          throw new Error(`Payment amount (£${(amountPence / 100).toFixed(2)}) exceeds amount due (£${(inv.amountDuePence / 100).toFixed(2)}).`);
        }

        inv.amountPaidPence += amountPence;
        inv.amountDuePence = inv.totalPence - inv.amountPaidPence;
        inv.status = inv.amountDuePence === 0 ? "PAID" : "PARTIALLY_PAID";

        await this.ledger.postJournal(ctx, {
          entryDate: paymentDate,
          reference: `PMT-${inv.invoiceNumber}`,
          sourceType: "BANK_TRANSACTION",
          sourceId: inv.id,
          lines: [
            {
              accountCode: "1000",
              debitPence: amountPence,
              creditPence: 0,
              description: `Payment received for ${inv.invoiceNumber}`,
            },
            {
              accountCode: "1100",
              debitPence: 0,
              creditPence: amountPence,
              description: `Settlement of Debtor balance for ${inv.invoiceNumber}`,
            },
          ],
        });

        this.invoiceStore.set(inv.id, inv);
        await this.audit.recordAudit(ctx, "INVOICE_PAYMENT_RECORDED", "sales_invoices", inv.id, {
          amountPaidPence: amountPence,
          remainingDuePence: inv.amountDuePence,
          status: inv.status,
        });

        return inv;
      },

      voidInvoice: async (ctx, invoiceId, reason) => {
        const inv = this.invoiceStore.get(invoiceId);
        if (!inv || inv.organisationId !== ctx.organisationId) {
          throw new Error(`Invoice not found: ${invoiceId}`);
        }
        if (inv.status === "PAID" || inv.amountPaidPence > 0) {
          throw new Error("Cannot void an invoice with recorded payments. Reverse payments first.");
        }

        if (inv.journalEntryId) {
          await this.ledger.reverseJournal(ctx, inv.journalEntryId, `Voided Invoice: ${reason}`);
        }

        inv.status = "VOID";
        inv.amountDuePence = 0;
        this.invoiceStore.set(inv.id, inv);

        await this.audit.recordAudit(ctx, "INVOICE_VOIDED", "sales_invoices", inv.id, { reason });
        return inv;
      },
    };

    // ------------------------------------------------------------------------
    // BANK RECONCILIATION DAL
    // ------------------------------------------------------------------------
    this.bank = {
      listBankAccounts: async (ctx) => {
        return Array.from(this.bankAccountStore.values()).filter((b) => b.organisationId === ctx.organisationId);
      },

      listStatementLines: async (ctx, bankAccountId) => {
        return Array.from(this.bankLineStore.values()).filter(
          (l) => l.organisationId === ctx.organisationId && (!bankAccountId || l.bankAccountId === bankAccountId)
        );
      },

      importStatementLines: async (ctx, bankAccountId, lines) => {
        const now = new Date().toISOString();
        const imported: BankStatementLineRecord[] = [];

        for (const line of lines) {
          const id = `stmt-line-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
          const record: BankStatementLineRecord = {
            id,
            bankAccountId,
            organisationId: ctx.organisationId,
            ...line,
            isReconciled: false,
            createdAt: now,
          };
          this.bankLineStore.set(id, record);
          imported.push(record);
        }

        await this.audit.recordAudit(ctx, "BANK_LINE_IMPORTED", "bank_statement_lines", bankAccountId, {
          importedCount: lines.length,
        });

        return imported;
      },

      reconcileLine: async (ctx, lineId, matchedType, matchedId) => {
        const line = this.bankLineStore.get(lineId);
        if (!line || line.organisationId !== ctx.organisationId) {
          throw new Error(`Statement line not found: ${lineId}`);
        }

        line.isReconciled = true;
        line.matchedType = matchedType;
        line.matchedId = matchedId;
        this.bankLineStore.set(lineId, line);

        await this.audit.recordAudit(ctx, "BANK_LINE_RECONCILED", "bank_statement_lines", lineId, {
          matchedType,
          matchedId,
          amountPence: line.amountPence,
        });

        return line;
      },
    };
  }

  private seedDefaultData() {
    const practiceId = "prac-ww-1";
    const orgId = "org-apex-1";
    const now = new Date().toISOString();

    this.practiceStore.set(practiceId, {
      id: practiceId,
      name: "Wealth Wise Accountant Practice",
      companyNumber: "09876543",
      vatNumber: "GB 882 1092 11",
      createdAt: now,
      updatedAt: now,
    });

    this.organisationStore.set(orgId, {
      id: orgId,
      practiceId,
      legalName: "Apex Digital Solutions Ltd",
      tradingName: "Apex Tech",
      companyNumber: "12345678",
      vatNumber: "GB 987 6543 21",
      entityType: "LTD",
      financialYearEnd: "31 March",
      baseCurrency: "GBP",
      createdAt: now,
      updatedAt: now,
    });

    this.userStore.set("usr-sarah-1", {
      id: "usr-sarah-1",
      email: "sarah@wealthwiseaccountant.co.uk",
      fullName: "Sarah Jenkins, ACCA",
      role: "SENIOR_ACCOUNTANT",
      practiceId,
      defaultOrgId: orgId,
      createdAt: now,
    });

    this.userStore.set("usr-marcus-1", {
      id: "usr-marcus-1",
      email: "marcus@apexdigital.co.uk",
      fullName: "Marcus Sterling",
      role: "CLIENT_DIRECTOR",
      practiceId,
      defaultOrgId: orgId,
      createdAt: now,
    });

    const defaultCoa: Array<Omit<ChartOfAccountRecord, "id" | "organisationId" | "createdAt">> = [
      { code: "1000", name: "Barclays Current Account", classification: "ASSET", normalBalance: "DEBIT", isActive: true },
      { code: "1100", name: "Trade Debtors (Accounts Receivable)", classification: "ASSET", normalBalance: "DEBIT", isActive: true },
      { code: "2100", name: "Trade Creditors (Accounts Payable)", classification: "LIABILITY", normalBalance: "CREDIT", isActive: true },
      { code: "2200", name: "HMRC VAT Control Account", classification: "LIABILITY", normalBalance: "CREDIT", isActive: true },
      { code: "3000", name: "Retained Earnings", classification: "EQUITY", normalBalance: "CREDIT", isActive: true },
      { code: "4000", name: "Sales / Fee Income", classification: "REVENUE", normalBalance: "CREDIT", isActive: true },
      { code: "5000", name: "Direct Cost of Sales", classification: "EXPENSE", normalBalance: "DEBIT", isActive: true },
      { code: "7000", name: "Rent & Rates", classification: "EXPENSE", normalBalance: "DEBIT", isActive: true },
      { code: "7040", name: "Computer & Software Subscriptions", classification: "EXPENSE", normalBalance: "DEBIT", isActive: true },
    ];

    for (const acc of defaultCoa) {
      const id = `coa-${orgId}-${acc.code}`;
      this.accountStore.set(`${orgId}:${acc.code}`, {
        id,
        organisationId: orgId,
        ...acc,
        createdAt: now,
      });
    }

    this.bankAccountStore.set("bank-1", {
      id: "bank-1",
      organisationId: orgId,
      accountName: "Barclays Business Premium Current",
      sortCode: "20-45-78",
      accountNumber: "80921456",
      currency: "GBP",
      chartAccountCode: "1000",
      currentBalancePence: 2845000,
      createdAt: now,
    });
  }
}
