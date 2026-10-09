import {
  Account,
  JournalEntry,
  JournalLine,
  TrialBalanceRow,
} from "./types";
import { verifyJournalBalance } from "../utils";

export class GeneralLedgerService {
  /**
   * Validates and posts a Journal Entry.
   * Throws an error if the transaction violates double-entry equality (Debits !== Credits)
   * or contains zero lines.
   */
  public static postJournal(
    entry: Omit<JournalEntry, "status" | "totalPence" | "postedAt">,
    existingJournals: JournalEntry[]
  ): { postedEntry: JournalEntry; updatedJournals: JournalEntry[] } {
    if (!entry.lines || entry.lines.length === 0) {
      throw new Error("Cannot post empty journal entry with no lines.");
    }

    // Verify balance invariant: SUM(debits) - SUM(credits) === 0
    const balanceCheck = verifyJournalBalance(
      entry.lines.map((l) => ({ debitPence: l.debitPence, creditPence: l.creditPence }))
    );

    if (!balanceCheck.isBalanced) {
      throw new Error(
        `Journal entry unbalanced: Debits (£${(balanceCheck.totalDebits / 100).toFixed(
          2
        )}) do not equal Credits (£${(balanceCheck.totalCredits / 100).toFixed(
          2
        )}). Discrepancy: ${balanceCheck.discrepancyPence} pence.`
      );
    }

    const postedEntry: JournalEntry = {
      ...entry,
      status: "POSTED",
      totalPence: balanceCheck.totalDebits,
      postedAt: new Date().toISOString(),
    };

    return {
      postedEntry,
      updatedJournals: [postedEntry, ...existingJournals],
    };
  }

  /**
   * Reverses a posted journal entry by generating an exact inverse entry.
   * Preserves immutable audit history without overwriting original records.
   */
  public static reverseJournal(
    targetEntryId: string,
    reversedBy: string,
    existingJournals: JournalEntry[]
  ): { reversalEntry: JournalEntry; updatedJournals: JournalEntry[] } {
    const original = existingJournals.find((j) => j.id === targetEntryId);
    if (!original) {
      throw new Error(`Original journal entry ${targetEntryId} not found.`);
    }

    if (original.status === "REVERSED") {
      throw new Error(`Journal entry ${targetEntryId} has already been reversed.`);
    }

    // Create opposite lines: swap Debits and Credits
    const invertedLines: JournalLine[] = original.lines.map((line, idx) => ({
      id: `rev-line-${Date.now()}-${idx}`,
      accountCode: line.accountCode,
      debitPence: line.creditPence, // Swap
      creditPence: line.debitPence, // Swap
      description: `Reversal of [${original.reference}]: ${line.description}`,
    }));

    const reversalEntryId = `rev-${Date.now()}`;

    const reversalEntry: JournalEntry = {
      id: reversalEntryId,
      businessId: original.businessId,
      entryDate: new Date().toISOString().split("T")[0],
      reference: `REVERSAL [${original.reference}]`,
      sourceType: "REVERSAL",
      sourceId: original.id,
      status: "POSTED",
      lines: invertedLines,
      totalPence: original.totalPence,
      postedAt: new Date().toISOString(),
      postedBy: reversedBy,
    };

    // Mark original as REVERSED with pointer
    const updatedJournals = existingJournals.map((j) =>
      j.id === original.id
        ? { ...j, status: "REVERSED" as const, reversalEntryId: reversalEntry.id }
        : j
    );

    return {
      reversalEntry,
      updatedJournals: [reversalEntry, ...updatedJournals],
    };
  }

  /**
   * Calculates real-time Trial Balance strictly from posted general ledger journal lines.
   */
  public static computeTrialBalance(
    accounts: Account[],
    journals: JournalEntry[]
  ): { rows: TrialBalanceRow[]; totalDebitsPence: number; totalCreditsPence: number } {
    const postedJournals = journals.filter((j) => j.status === "POSTED");

    // Aggregate line balances per account code
    const balances: Record<string, { debitPence: number; creditPence: number }> = {};
    for (const acc of accounts) {
      balances[acc.code] = { debitPence: 0, creditPence: 0 };
    }

    for (const journal of postedJournals) {
      for (const line of journal.lines) {
        if (!balances[line.accountCode]) {
          balances[line.accountCode] = { debitPence: 0, creditPence: 0 };
        }
        balances[line.accountCode].debitPence += line.debitPence || 0;
        balances[line.accountCode].creditPence += line.creditPence || 0;
      }
    }

    const rows: TrialBalanceRow[] = accounts.map((acc) => {
      const { debitPence, creditPence } = balances[acc.code] || {
        debitPence: 0,
        creditPence: 0,
      };

      // In a Trial Balance, an account shows net debit or net credit based on normal balance
      const net = debitPence - creditPence;
      let finalDebit = 0;
      let finalCredit = 0;

      if (acc.normalBalance === "DEBIT") {
        if (net >= 0) finalDebit = net;
        else finalCredit = Math.abs(net);
      } else {
        // CREDIT normal balance
        const netCredit = creditPence - debitPence;
        if (netCredit >= 0) finalCredit = netCredit;
        else finalDebit = Math.abs(netCredit);
      }

      return {
        accountCode: acc.code,
        accountName: acc.name,
        accountType: acc.type,
        debitPence: finalDebit,
        creditPence: finalCredit,
      };
    });

    const totalDebitsPence = rows.reduce((sum, r) => sum + r.debitPence, 0);
    const totalCreditsPence = rows.reduce((sum, r) => sum + r.creditPence, 0);

    return {
      rows,
      totalDebitsPence,
      totalCreditsPence,
    };
  }
}
