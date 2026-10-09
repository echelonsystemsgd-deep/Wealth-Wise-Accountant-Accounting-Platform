import { describe, it, expect } from "vitest";
import { formatGBP, calculateVatPence, verifyJournalBalance } from "./utils";

describe("Financial Utilities & Accounting Invariants", () => {
  it("formats GBP amounts correctly from integer pence", () => {
    expect(formatGBP(15025)).toBe("£150.25");
    expect(formatGBP(0)).toBe("£0.00");
    expect(formatGBP(-4500)).toBe("-£45.00");
  });

  it("calculates UK VAT precisely using minor units without float drift", () => {
    // 20% on £100.00 (10000 pence) -> 2000 pence
    expect(calculateVatPence(10000, "STANDARD_20")).toBe(2000);
    // 20% on £34.20 (3420 pence) -> 684 pence
    expect(calculateVatPence(3420, "STANDARD_20")).toBe(684);
    // 5% on £100.00 -> 500 pence
    expect(calculateVatPence(10000, "REDUCED_5")).toBe(500);
    // Zero rated and exempt
    expect(calculateVatPence(10000, "ZERO_0")).toBe(0);
    expect(calculateVatPence(10000, "EXEMPT")).toBe(0);
  });

  it("strictly validates the double-entry balance constraint (Debits = Credits)", () => {
    const balancedJournal = [
      { debitPence: 12000, creditPence: 0 }, // Bank account +£120.00
      { debitPence: 0, creditPence: 10000 }, // Sales revenue £100.00
      { debitPence: 0, creditPence: 2000 },  // VAT output £20.00
    ];
    const result = verifyJournalBalance(balancedJournal);
    expect(result.isBalanced).toBe(true);
    expect(result.totalDebits).toBe(12000);
    expect(result.totalCredits).toBe(12000);
    expect(result.discrepancyPence).toBe(0);

    const unbalancedJournal = [
      { debitPence: 12000, creditPence: 0 },
      { debitPence: 0, creditPence: 10000 },
    ];
    const failedResult = verifyJournalBalance(unbalancedJournal);
    expect(failedResult.isBalanced).toBe(false);
    expect(failedResult.discrepancyPence).toBe(2000);
  });
});
