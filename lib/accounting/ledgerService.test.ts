import { describe, it, expect } from "vitest";
import { GeneralLedgerService } from "./ledgerService";
import { DEFAULT_UK_CHART_OF_ACCOUNTS } from "./chartOfAccounts";
import { JournalEntry } from "./types";

describe("GeneralLedgerService — Accounting Engine Validation", () => {
  it("successfully posts a balanced double-entry journal", () => {
    const rawEntry = {
      id: "j-101",
      businessId: "biz-1",
      entryDate: "2026-10-09",
      reference: "INV-2026-001",
      sourceType: "SALES_INVOICE" as const,
      lines: [
        {
          id: "l1",
          accountCode: "1100", // Trade Debtors (Debit)
          debitPence: 12000,
          creditPence: 0,
          description: "Receivable from Acme Corp",
        },
        {
          id: "l2",
          accountCode: "4000", // Sales Turnover (Credit)
          debitPence: 0,
          creditPence: 10000,
          description: "Consulting Service",
        },
        {
          id: "l3",
          accountCode: "2200", // HMRC VAT Output (Credit)
          debitPence: 0,
          creditPence: 2000,
          description: "20% Output VAT",
        },
      ],
      postedBy: "Sarah Jenkins, ACCA",
    };

    const result = GeneralLedgerService.postJournal(rawEntry, []);
    expect(result.postedEntry.status).toBe("POSTED");
    expect(result.postedEntry.totalPence).toBe(12000);
    expect(result.updatedJournals.length).toBe(1);
  });

  it("throws error and rejects unbalanced journal entries", () => {
    const unbalancedEntry = {
      id: "j-102",
      businessId: "biz-1",
      entryDate: "2026-10-09",
      reference: "BAD-ENTRY",
      sourceType: "MANUAL_JOURNAL" as const,
      lines: [
        {
          id: "l1",
          accountCode: "1000",
          debitPence: 5000,
          creditPence: 0,
          description: "Bank Deposit",
        },
        {
          id: "l2",
          accountCode: "4000",
          debitPence: 0,
          creditPence: 4000, // 1000 discrepancy!
          description: "Revenue",
        },
      ],
      postedBy: "System",
    };

    expect(() => GeneralLedgerService.postJournal(unbalancedEntry, [])).toThrow(
      /Journal entry unbalanced/
    );
  });

  it("executes immutable reversals without modifying or deleting historical journals", () => {
    const originalEntry: JournalEntry = {
      id: "j-orig",
      businessId: "biz-1",
      entryDate: "2026-10-01",
      reference: "BILL-OCT-01",
      sourceType: "PURCHASE_BILL",
      status: "POSTED",
      totalPence: 6000,
      lines: [
        {
          id: "l1",
          accountCode: "7040", // IT Expense (Debit)
          debitPence: 5000,
          creditPence: 0,
          description: "Software license",
        },
        {
          id: "l2",
          accountCode: "2200", // Input VAT (Debit)
          debitPence: 1000,
          creditPence: 0,
          description: "Input VAT",
        },
        {
          id: "l3",
          accountCode: "2000", // Trade Creditors (Credit)
          debitPence: 0,
          creditPence: 6000,
          description: "Supplier payable",
        },
      ],
      postedBy: "Accountant",
    };

    const { reversalEntry, updatedJournals } = GeneralLedgerService.reverseJournal(
      "j-orig",
      "Auditor",
      [originalEntry]
    );

    // Original entry marked as REVERSED
    const updatedOrig = updatedJournals.find((j) => j.id === "j-orig");
    expect(updatedOrig?.status).toBe("REVERSED");
    expect(updatedOrig?.reversalEntryId).toBe(reversalEntry.id);

    // Reversal entry posted with swapped lines
    expect(reversalEntry.status).toBe("POSTED");
    expect(reversalEntry.lines[0].creditPence).toBe(5000);
    expect(reversalEntry.lines[2].debitPence).toBe(6000);
    expect(updatedJournals.length).toBe(2);
  });

  it("computes balanced Trial Balance across multiple posted transactions", () => {
    const accounts = [...DEFAULT_UK_CHART_OF_ACCOUNTS];
    const j1: JournalEntry = {
      id: "j1",
      businessId: "biz-1",
      entryDate: "2026-10-01",
      reference: "SHARE-CAPITAL",
      sourceType: "MANUAL_JOURNAL",
      status: "POSTED",
      totalPence: 100000,
      lines: [
        { id: "1", accountCode: "1000", debitPence: 100000, creditPence: 0, description: "Bank funding" },
        { id: "2", accountCode: "3000", debitPence: 0, creditPence: 100000, description: "Share capital" },
      ],
      postedBy: "Director",
    };

    const j2: JournalEntry = {
      id: "j2",
      businessId: "biz-1",
      entryDate: "2026-10-02",
      reference: "CONSULTING-FEE",
      sourceType: "SALES_INVOICE",
      status: "POSTED",
      totalPence: 24000,
      lines: [
        { id: "3", accountCode: "1100", debitPence: 24000, creditPence: 0, description: "Customer invoice" },
        { id: "4", accountCode: "4000", debitPence: 0, creditPence: 20000, description: "Sales" },
        { id: "5", accountCode: "2200", debitPence: 0, creditPence: 4000, description: "VAT Output" },
      ],
      postedBy: "Accountant",
    };

    const tb = GeneralLedgerService.computeTrialBalance(accounts, [j1, j2]);
    expect(tb.totalDebitsPence).toBe(tb.totalCreditsPence);
    expect(tb.totalDebitsPence).toBe(124000); // 100000 (Bank) + 24000 (Debtors) = 1240.00
  });
});
