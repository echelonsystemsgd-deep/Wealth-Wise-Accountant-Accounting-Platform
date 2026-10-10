import { describe, it, expect, beforeEach } from "vitest";
import { MemoryDataAccessLayer, DoubleEntryImbalanceError, TenantAccessError } from "./memoryRepository";
import { RequestContext } from "./types";

describe("Production Data Access Layer (DAL)", () => {
  let dal: MemoryDataAccessLayer;

  const orgAContext: RequestContext = {
    practiceId: "prac-ww-1",
    organisationId: "org-apex-1",
    userId: "usr-sarah-1",
    userRole: "SENIOR_ACCOUNTANT",
  };

  const orgBContext: RequestContext = {
    practiceId: "prac-ww-1",
    organisationId: "org-client-2",
    userId: "usr-client-2",
    userRole: "CLIENT_DIRECTOR",
  };

  beforeEach(() => {
    dal = new MemoryDataAccessLayer();
  });

  describe("1. Multi-Tenant Isolation & Security Rails", () => {
    it("should prevent cross-tenant organisation access for standard users", async () => {
      // Create a second organisation
      await dal.orgs.createOrganisation(orgBContext, {
        legalName: "Boutique Retailers Ltd",
        companyNumber: "88877766",
        entityType: "LTD",
        financialYearEnd: "31 December",
        baseCurrency: "GBP",
      });

      // User from orgA attempting to read orgB directly without PRACTICE_ADMIN role
      await expect(dal.orgs.getOrganisationById(orgAContext, "org-client-2")).rejects.toThrow(
        TenantAccessError
      );
    });

    it("should support practice monetization tiers and client billing models", async () => {
      const orgSoleTrader = await dal.orgs.createOrganisation(orgBContext, {
        legalName: "Miller Design Studio",
        companyNumber: "ST-88912",
        entityType: "SOLE_TRADER",
        financialYearEnd: "05 April",
        baseCurrency: "GBP",
        subscriptionTier: "STARTER_SOLE_TRADER",
        billingModel: "DIRECT_CLIENT_BILLED",
        monthlyPricePence: 900, // £9.00 / month
      });

      expect(orgSoleTrader.subscriptionTier).toBe("STARTER_SOLE_TRADER");
      expect(orgSoleTrader.billingModel).toBe("DIRECT_CLIENT_BILLED");
      expect(orgSoleTrader.monthlyPricePence).toBe(900);
      expect(orgSoleTrader.subscriptionStatus).toBe("ACTIVE");
    });

    it("should strictly partition Chart of Accounts and Journals between organisations", async () => {
      // Create Org B
      const orgB = await dal.orgs.createOrganisation(orgBContext, {
        legalName: "Second Org Ltd",
        companyNumber: "99988877",
        entityType: "LTD",
        financialYearEnd: "30 April",
        baseCurrency: "GBP",
      });

      const orgBCtx: RequestContext = {
        ...orgBContext,
        organisationId: orgB.id,
      };

      // Post journal to Org A
      await dal.ledger.postJournal(orgAContext, {
        entryDate: "2026-10-10",
        reference: "JNL-ORG-A",
        sourceType: "MANUAL_JOURNAL",
        lines: [
          { accountCode: "1000", debitPence: 100000, creditPence: 0, description: "Capital injection" },
          { accountCode: "3000", debitPence: 0, creditPence: 100000, description: "Equity" },
        ],
      });

      // Post journal to Org B
      await dal.ledger.postJournal(orgBCtx, {
        entryDate: "2026-10-10",
        reference: "JNL-ORG-B",
        sourceType: "MANUAL_JOURNAL",
        lines: [
          { accountCode: "1000", debitPence: 50000, creditPence: 0, description: "Deposit Org B" },
          { accountCode: "3000", debitPence: 0, creditPence: 50000, description: "Equity Org B" },
        ],
      });

      const journalsA = await dal.ledger.listJournals(orgAContext);
      const journalsB = await dal.ledger.listJournals(orgBCtx);

      expect(journalsA.some((j) => j.reference === "JNL-ORG-A")).toBe(true);
      expect(journalsA.some((j) => j.reference === "JNL-ORG-B")).toBe(false);

      expect(journalsB.some((j) => j.reference === "JNL-ORG-B")).toBe(true);
      expect(journalsB.some((j) => j.reference === "JNL-ORG-A")).toBe(false);
    });
  });

  describe("2. General Ledger Invariants & Double-Entry Math", () => {
    it("should successfully post a balanced journal entry", async () => {
      const journal = await dal.ledger.postJournal(orgAContext, {
        entryDate: "2026-10-10",
        reference: "TEST-BALANCED",
        sourceType: "MANUAL_JOURNAL",
        lines: [
          { accountCode: "7000", debitPence: 120000, creditPence: 0, description: "Office Rent" },
          { accountCode: "1000", debitPence: 0, creditPence: 120000, description: "Bank Transfer" },
        ],
      });

      expect(journal.status).toBe("POSTED");
      expect(journal.totalPence).toBe(120000);
      expect(journal.lines).toHaveLength(2);
    });

    it("should throw DoubleEntryImbalanceError if debits do not match credits", async () => {
      await expect(
        dal.ledger.postJournal(orgAContext, {
          entryDate: "2026-10-10",
          reference: "TEST-UNBALANCED",
          sourceType: "MANUAL_JOURNAL",
          lines: [
            { accountCode: "7000", debitPence: 150000, creditPence: 0, description: "Rent" },
            { accountCode: "1000", debitPence: 0, creditPence: 120000, description: "Bank Transfer" },
          ],
        })
      ).rejects.toThrow(DoubleEntryImbalanceError);
    });

    it("should perform immutable reversals and maintain trial balance neutrality", async () => {
      // 1. Post original entry
      const original = await dal.ledger.postJournal(orgAContext, {
        entryDate: "2026-10-10",
        reference: "ORIGINAL-ERRONEOUS",
        sourceType: "MANUAL_JOURNAL",
        lines: [
          { accountCode: "7040", debitPence: 45000, creditPence: 0, description: "Software subscription" },
          { accountCode: "1000", debitPence: 0, creditPence: 45000, description: "Bank credit card" },
        ],
      });

      // 2. Perform reversal
      const { original: reversedOriginal, reversal } = await dal.ledger.reverseJournal(
        orgAContext,
        original.id,
        "Duplicate entry posted by accident"
      );

      expect(reversedOriginal.status).toBe("REVERSED");
      expect(reversedOriginal.reversalEntryId).toBe(reversal.id);
      expect(reversal.sourceType).toBe("REVERSAL");
      expect(reversal.reference).toBe("REV-ORIGINAL-ERRONEOUS");

      // Debits and credits must be inverted in reversal
      const reversedSoftwareLine = reversal.lines.find((l) => l.accountCode === "7040");
      const reversedBankLine = reversal.lines.find((l) => l.accountCode === "1000");

      expect(reversedSoftwareLine?.creditPence).toBe(45000);
      expect(reversedSoftwareLine?.debitPence).toBe(0);
      expect(reversedBankLine?.debitPence).toBe(45000);
      expect(reversedBankLine?.creditPence).toBe(0);

      // 3. Compute Trial Balance - must be 100% mathematically balanced
      const tb = await dal.ledger.computeTrialBalance(orgAContext);
      expect(tb.isBalanced).toBe(true);
      expect(tb.discrepancyPence).toBe(0);
    });
  });

  describe("3. Sales Invoices & Automated Ledger Integration", () => {
    it("should create invoice, post balanced GL journal, and track payment transitions", async () => {
      const invoice = await dal.invoices.createInvoice(orgAContext, {
        invoiceNumber: "INV-2026-TEST-01",
        contactId: "cnt-1",
        contactName: "Innovate AI Ltd",
        issueDate: "2026-10-10",
        dueDate: "2026-10-31",
        items: [
          {
            description: "Financial Modeling Consulting",
            accountCode: "4000",
            quantity: 1,
            unitPricePence: 500000, // £5,000.00
            vatRatePercent: 20,
            vatPence: 100000, // £1,000.00
            lineTotalPence: 600000, // £6,000.00
          },
        ],
        subtotalPence: 500000,
        vatPence: 100000,
        totalPence: 600000,
      });

      expect(invoice.status).toBe("ISSUED");
      expect(invoice.amountDuePence).toBe(600000);
      expect(invoice.journalEntryId).toBeDefined();

      // Check GL journal was posted
      const journal = await dal.ledger.getJournalById(orgAContext, invoice.journalEntryId!);
      expect(journal).not.toBeNull();
      expect(journal?.totalPence).toBe(600000);

      // Verify lines: Dr 1100 (600,000), Cr 4000 (500,000), Cr 2200 (100,000)
      const drDebtors = journal?.lines.find((l) => l.accountCode === "1100");
      const crSales = journal?.lines.find((l) => l.accountCode === "4000");
      const crVat = journal?.lines.find((l) => l.accountCode === "2200");

      expect(drDebtors?.debitPence).toBe(600000);
      expect(crSales?.creditPence).toBe(500000);
      expect(crVat?.creditPence).toBe(100000);

      // Test Partial Payment: £2,000.00 paid
      const partiallyPaid = await dal.invoices.recordPayment(
        orgAContext,
        invoice.id,
        200000,
        "2026-10-15"
      );
      expect(partiallyPaid.status).toBe("PARTIALLY_PAID");
      expect(partiallyPaid.amountPaidPence).toBe(200000);
      expect(partiallyPaid.amountDuePence).toBe(400000);

      // Test Full Settlement: Remaining £4,000.00 paid
      const fullyPaid = await dal.invoices.recordPayment(
        orgAContext,
        invoice.id,
        400000,
        "2026-10-20"
      );
      expect(fullyPaid.status).toBe("PAID");
      expect(fullyPaid.amountPaidPence).toBe(600000);
      expect(fullyPaid.amountDuePence).toBe(0);
    });

    it("should prevent duplicate invoice numbers in the same organisation", async () => {
      await dal.invoices.createInvoice(orgAContext, {
        invoiceNumber: "INV-UNIQUE-99",
        contactId: "cnt-1",
        contactName: "Client Alpha",
        issueDate: "2026-10-10",
        dueDate: "2026-10-31",
        items: [],
        subtotalPence: 10000,
        vatPence: 0,
        totalPence: 10000,
      });

      await expect(
        dal.invoices.createInvoice(orgAContext, {
          invoiceNumber: "INV-UNIQUE-99",
          contactId: "cnt-2",
          contactName: "Client Beta",
          issueDate: "2026-10-10",
          dueDate: "2026-10-31",
          items: [],
          subtotalPence: 10000,
          vatPence: 0,
          totalPence: 10000,
        })
      ).rejects.toThrow("already exists");
    });
  });

  describe("4. Bank Statement Lines & Audit Trail", () => {
    it("should import bank lines, perform reconciliation, and record immutable audit logs", async () => {
      const imported = await dal.bank.importStatementLines(orgAContext, "bank-1", [
        {
          transactionDate: "2026-10-10",
          description: "Stripe Payout Ref 9102",
          amountPence: 450000,
        },
      ]);

      expect(imported).toHaveLength(1);
      const line = imported[0];
      expect(line.isReconciled).toBe(false);

      const reconciled = await dal.bank.reconcileLine(orgAContext, line.id, "INVOICE", "inv-123");
      expect(reconciled.isReconciled).toBe(true);
      expect(reconciled.matchedType).toBe("INVOICE");

      // Verify audit trail contains the action
      const audits = await dal.audit.listAudits(orgAContext);
      const reconAudit = audits.find((a) => a.action === "BANK_LINE_RECONCILED");

      expect(reconAudit).toBeDefined();
      expect(reconAudit?.entityTable).toBe("bank_statement_lines");
      expect(reconAudit?.entityId).toBe(line.id);
    });
  });
});
