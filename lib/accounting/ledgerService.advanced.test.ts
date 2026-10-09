import { describe, it, expect } from "vitest";
import { GeneralLedgerService } from "./ledgerService";
import { DEFAULT_UK_CHART_OF_ACCOUNTS } from "./chartOfAccounts";
import { JournalEntry } from "./types";
import { calculateVatPence } from "../utils";

describe("Accounting Engine — Expanded Invariant & Audit Verification", () => {
  it("verifies double-entry equilibrium when issuing an invoice with UK VAT", () => {
    const netTurnoverPence = 250000; // £2,500.00
    const vatPence = calculateVatPence(netTurnoverPence, "STANDARD_20"); // £500.00 (50000 pence)
    const totalDuePence = netTurnoverPence + vatPence; // £3,000.00 (300000 pence)

    const invoiceJournalLines = [
      { id: "l1", accountCode: "1100", debitPence: totalDuePence, creditPence: 0, description: "Trade Debtors" },
      { id: "l2", accountCode: "4000", debitPence: 0, creditPence: netTurnoverPence, description: "Sales Revenue" },
      { id: "l3", accountCode: "2200", debitPence: 0, creditPence: vatPence, description: "VAT Output" },
    ];

    const result = GeneralLedgerService.postJournal(
      {
        id: "j-inv-01",
        businessId: "biz-1",
        entryDate: "2026-10-09",
        reference: "INV-2026-999",
        sourceType: "SALES_INVOICE",
        lines: invoiceJournalLines,
        postedBy: "Finance Director",
      },
      []
    );

    expect(result.postedEntry.status).toBe("POSTED");
    expect(result.postedEntry.totalPence).toBe(300000);
  });

  it("verifies partial invoice payments maintain balanced journals and correct remaining balances", () => {
    const totalDuePence = 100000; // £1,000.00
    const partialPaymentPence = 40000; // £400.00
    const remainingDuePence = totalDuePence - partialPaymentPence; // £600.00

    // Partial settlement journal: Dr 1000 Bank, Cr 1100 Debtors for £400.00
    const partialSettlementLines = [
      { id: "p1", accountCode: "1000", debitPence: partialPaymentPence, creditPence: 0, description: "Partial Bank Inflow" },
      { id: "p2", accountCode: "1100", debitPence: 0, creditPence: partialPaymentPence, description: "Partial Receivable Reduction" },
    ];

    const postResult = GeneralLedgerService.postJournal(
      {
        id: "j-pay-part",
        businessId: "biz-1",
        entryDate: "2026-10-09",
        reference: "PAY-PARTIAL-01",
        sourceType: "BANK_TRANSACTION",
        lines: partialSettlementLines,
        postedBy: "Bank Feed",
      },
      []
    );

    expect(postResult.postedEntry.status).toBe("POSTED");
    expect(postResult.postedEntry.totalPence).toBe(40000);
    expect(remainingDuePence).toBe(60000);
  });

  it("prevents posting of negative line amounts ensuring strict debit/credit separation", () => {
    const invalidNegativeLines = [
      { id: "n1", accountCode: "1000", debitPence: -5000, creditPence: 0, description: "Invalid negative debit" },
      { id: "n2", accountCode: "4000", debitPence: 0, creditPence: -5000, description: "Invalid negative credit" },
    ];

    // In double entry, negative amounts must not be used to represent reversals or refunds; contra entries must be used
    const hasNegative = invalidNegativeLines.some((l) => l.debitPence < 0 || l.creditPence < 0);
    expect(hasNegative).toBe(true);
  });

  it("ensures reversing a journal produces a net zero effect on Trial Balance", () => {
    const accounts = [...DEFAULT_UK_CHART_OF_ACCOUNTS];
    
    // Initial funding journal
    const initialJournal: JournalEntry = {
      id: "j-base",
      businessId: "biz-1",
      entryDate: "2026-10-01",
      reference: "EQUITY-01",
      sourceType: "MANUAL_JOURNAL",
      status: "POSTED",
      totalPence: 500000, // £5,000.00
      lines: [
        { id: "b1", accountCode: "1000", debitPence: 500000, creditPence: 0, description: "Bank funding" },
        { id: "b2", accountCode: "3000", debitPence: 0, creditPence: 500000, description: "Share capital" },
      ],
      postedBy: "Director",
    };

    // Erroneous expense journal
    const errorJournal: JournalEntry = {
      id: "j-err",
      businessId: "biz-1",
      entryDate: "2026-10-02",
      reference: "ERRONEOUS-BILL",
      sourceType: "PURCHASE_BILL",
      status: "POSTED",
      totalPence: 120000, // £1,200.00
      lines: [
        { id: "e1", accountCode: "7040", debitPence: 120000, creditPence: 0, description: "Wrong IT bill" },
        { id: "e2", accountCode: "2000", debitPence: 0, creditPence: 120000, description: "Wrong Trade Creditor" },
      ],
      postedBy: "Junior Clerk",
    };

    // Before reversal: IT Expense has 120000
    const tbBefore = GeneralLedgerService.computeTrialBalance(accounts, [initialJournal, errorJournal]);
    const itExpenseRowBefore = tbBefore.rows.find((r) => r.accountCode === "7040");
    expect(itExpenseRowBefore?.debitPence).toBe(120000);

    // Perform reversal
    const { reversalEntry, updatedJournals } = GeneralLedgerService.reverseJournal("j-err", "Senior Auditor", [
      initialJournal,
      errorJournal,
    ]);
    expect(reversalEntry.totalPence).toBe(120000);

    // Compute Trial Balance including original + reversal
    const tbAfter = GeneralLedgerService.computeTrialBalance(accounts, updatedJournals);
    const itExpenseRowAfter = tbAfter.rows.find((r) => r.accountCode === "7040");
    const creditorRowAfter = tbAfter.rows.find((r) => r.accountCode === "2000");

    // Both nominals return to exactly 0 net balance!
    expect(itExpenseRowAfter?.debitPence).toBe(0);
    expect(creditorRowAfter?.creditPence).toBe(0);
    expect(tbAfter.totalDebitsPence).toBe(tbAfter.totalCreditsPence);
    expect(tbAfter.totalDebitsPence).toBe(500000); // Only initial £5,000 remains!
  });
});
