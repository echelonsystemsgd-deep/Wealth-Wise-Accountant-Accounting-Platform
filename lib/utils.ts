import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats an integer amount stored in minor units (pence) to GBP formatted string.
 * Negative numbers are properly parenthesized or signed.
 */
export function formatGBP(amountInPence: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amountInPence / 100);
}

/**
 * Valid UK VAT rates supported by the platform.
 */
export type VatTreatment = "STANDARD_20" | "REDUCED_5" | "ZERO_0" | "EXEMPT";

/**
 * Calculates VAT amount strictly using integer arithmetic (minor units: pence).
 * Prevents floating-point rounding divergence.
 */
export function calculateVatPence(netAmountPence: number, treatment: VatTreatment): number {
  if (treatment === "STANDARD_20") {
    // 20% VAT = round(net * 20 / 100)
    return Math.round((netAmountPence * 20) / 100);
  }
  if (treatment === "REDUCED_5") {
    // 5% VAT = round(net * 5 / 100)
    return Math.round((netAmountPence * 5) / 100);
  }
  return 0; // ZERO_0 and EXEMPT
}

/**
 * Verifies the cardinal double-entry bookkeeping invariant:
 * Sum of Debits MUST equal Sum of Credits.
 */
export function verifyJournalBalance(lines: { debitPence: number; creditPence: number }[]): {
  isBalanced: boolean;
  totalDebits: number;
  totalCredits: number;
  discrepancyPence: number;
} {
  const totalDebits = lines.reduce((acc, l) => acc + (l.debitPence || 0), 0);
  const totalCredits = lines.reduce((acc, l) => acc + (l.creditPence || 0), 0);
  const discrepancyPence = Math.abs(totalDebits - totalCredits);
  return {
    isBalanced: discrepancyPence === 0,
    totalDebits,
    totalCredits,
    discrepancyPence,
  };
}
