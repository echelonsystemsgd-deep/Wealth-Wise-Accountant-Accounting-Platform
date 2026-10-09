"use client";

import React, { createContext, useContext, useState } from "react";
import {
  Account,
  JournalEntry,
  SalesInvoice,
  SupplierBill,
  BankStatementLine,
  Contact,
  TrialBalanceRow,
} from "./types";
import { DEFAULT_UK_CHART_OF_ACCOUNTS } from "./chartOfAccounts";
import {
  INITIAL_CONTACTS,
  INITIAL_JOURNAL_ENTRIES,
  INITIAL_INVOICES,
  INITIAL_BILLS,
  INITIAL_BANK_STATEMENT_LINES,
} from "./initialData";
import { GeneralLedgerService } from "./ledgerService";

interface AccountingContextType {
  // Master Entities
  accounts: Account[];
  contacts: Contact[];
  journals: JournalEntry[];
  invoices: SalesInvoice[];
  bills: SupplierBill[];
  bankStatements: BankStatementLine[];

  // Derived Financial Reports
  trialBalance: { rows: TrialBalanceRow[]; totalDebitsPence: number; totalCreditsPence: number };
  financialSummary: {
    cashBalancePence: number;
    accountsReceivablePence: number;
    accountsPayablePence: number;
    netVatLiabilityPence: number;
    totalTurnoverPence: number;
    operatingExpensesPence: number;
    netProfitPence: number;
  };

  // Actions
  createInvoice: (inv: Omit<SalesInvoice, "id" | "status" | "amountPaidPence" | "amountDuePence">) => SalesInvoice;
  payInvoice: (invoiceId: string, paymentAmountPence?: number, paidDate?: string) => void;
  reconcileBankLine: (lineId: string, matchedType?: "INVOICE" | "BILL" | "RULE" | "MANUAL") => void;
  postJournalEntry: (entry: Omit<JournalEntry, "id" | "status" | "totalPence" | "postedAt">) => JournalEntry;
  reverseJournalEntry: (targetId: string, reversedBy: string) => JournalEntry;
}

const AccountingContext = createContext<AccountingContextType | undefined>(undefined);

export function AccountingProvider({ children }: { children: React.ReactNode }) {
  const [accounts] = useState<Account[]>(DEFAULT_UK_CHART_OF_ACCOUNTS);
  const [contacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [journals, setJournals] = useState<JournalEntry[]>(INITIAL_JOURNAL_ENTRIES);
  const [invoices, setInvoices] = useState<SalesInvoice[]>(INITIAL_INVOICES);
  const [bills] = useState<SupplierBill[]>(INITIAL_BILLS);
  const [bankStatements, setBankStatements] = useState<BankStatementLine[]>(INITIAL_BANK_STATEMENT_LINES);

  // Compute live Trial Balance
  const trialBalance = GeneralLedgerService.computeTrialBalance(accounts, journals);

  // Derive real-time financial metrics strictly from posted General Ledger lines
  const getAccountNet = (code: string) => {
    const row = trialBalance.rows.find((r) => r.accountCode === code);
    if (!row) return 0;
    return row.debitPence > 0 ? row.debitPence : -row.creditPence;
  };

  const cashBalancePence = Math.max(0, getAccountNet("1000")); // Bank Current
  const accountsReceivablePence = Math.max(0, getAccountNet("1100")); // Trade Debtors
  const accountsPayablePence = Math.abs(getAccountNet("2000")); // Trade Creditors
  const netVatLiabilityPence = Math.abs(getAccountNet("2200")); // VAT Control

  // Turnover (4000 + 4100)
  const turnoverRow1 = trialBalance.rows.find((r) => r.accountCode === "4000")?.creditPence || 0;
  const turnoverRow2 = trialBalance.rows.find((r) => r.accountCode === "4100")?.creditPence || 0;
  const totalTurnoverPence = turnoverRow1 + turnoverRow2;

  // Expenses (7000, 7020, 7040, 7050, 5000)
  const expenseCodes = ["5000", "7000", "7020", "7040", "7050"];
  const operatingExpensesPence = trialBalance.rows
    .filter((r) => expenseCodes.includes(r.accountCode))
    .reduce((sum, r) => sum + r.debitPence, 0);

  const netProfitPence = totalTurnoverPence - operatingExpensesPence;

  // Post Journal
  const postJournalEntry = (
    rawEntry: Omit<JournalEntry, "id" | "status" | "totalPence" | "postedAt">
  ): JournalEntry => {
    const newId = `j-${Date.now()}`;
    const result = GeneralLedgerService.postJournal({ ...rawEntry, id: newId }, journals);
    setJournals(result.updatedJournals);
    return result.postedEntry;
  };

  // Reverse Journal
  const reverseJournalEntry = (targetId: string, reversedBy: string): JournalEntry => {
    const result = GeneralLedgerService.reverseJournal(targetId, reversedBy, journals);
    setJournals(result.updatedJournals);
    return result.reversalEntry;
  };

  // Create Invoice and simultaneously post to General Ledger
  const createInvoice = (
    invData: Omit<SalesInvoice, "id" | "status" | "amountPaidPence" | "amountDuePence">
  ): SalesInvoice => {
    // Prevent duplicate invoice numbers
    if (invoices.some((i) => i.invoiceNumber.toLowerCase() === invData.invoiceNumber.toLowerCase())) {
      throw new Error(`Invoice with number ${invData.invoiceNumber} already exists.`);
    }

    const invId = `inv-${Date.now()}`;
    const newInvoice: SalesInvoice = {
      ...invData,
      id: invId,
      status: "ISSUED",
      amountPaidPence: 0,
      amountDuePence: invData.totalPence,
    };

    // Construct balanced General Ledger journal entry
    // DEBIT: 1100 Trade Debtors (Total Amount)
    // CREDIT: 4000 Sales Turnover (Subtotal)
    // CREDIT: 2200 HMRC VAT Output (VAT)
    const journalLines = [
      {
        id: `jl-${Date.now()}-1`,
        accountCode: "1100",
        debitPence: newInvoice.totalPence,
        creditPence: 0,
        description: `Sales Invoice ${newInvoice.invoiceNumber} to ${newInvoice.contactName}`,
      },
      {
        id: `jl-${Date.now()}-2`,
        accountCode: "4000",
        debitPence: 0,
        creditPence: newInvoice.subtotalPence,
        description: `Revenue: ${newInvoice.items.map((i) => i.description).join(", ")}`,
      },
    ];

    if (newInvoice.vatPence > 0) {
      journalLines.push({
        id: `jl-${Date.now()}-3`,
        accountCode: "2200",
        debitPence: 0,
        creditPence: newInvoice.vatPence,
        description: `VAT Output for ${newInvoice.invoiceNumber}`,
      });
    }

    const journal = postJournalEntry({
      businessId: newInvoice.businessId,
      entryDate: newInvoice.issueDate,
      reference: newInvoice.invoiceNumber,
      sourceType: "SALES_INVOICE",
      sourceId: newInvoice.id,
      lines: journalLines,
      postedBy: "Finance Director",
    });

    newInvoice.journalEntryId = journal.id;
    setInvoices((prev) => [newInvoice, ...prev]);
    return newInvoice;
  };

  // Pay Invoice and post settlement journal (supports partial payments)
  const payInvoice = (invoiceId: string, paymentAmountPence?: number, paidDate?: string) => {
    const target = invoices.find((i) => i.id === invoiceId);
    if (!target || target.status === "PAID") return;

    const paymentPence = paymentAmountPence !== undefined 
      ? Math.min(paymentAmountPence, target.amountDuePence)
      : target.amountDuePence;

    if (paymentPence <= 0) return;

    // DEBIT: 1000 Bank Current Account (Money In)
    // CREDIT: 1100 Trade Debtors (Clear Receivable)
    const journalLines = [
      {
        id: `jl-${Date.now()}-1`,
        accountCode: "1000",
        debitPence: paymentPence,
        creditPence: 0,
        description: `Payment received for ${target.invoiceNumber}`,
      },
      {
        id: `jl-${Date.now()}-2`,
        accountCode: "1100",
        debitPence: 0,
        creditPence: paymentPence,
        description: `Settlement of ${target.invoiceNumber}`,
      },
    ];

    postJournalEntry({
      businessId: target.businessId,
      entryDate: paidDate || new Date().toISOString().split("T")[0],
      reference: `PAY-${target.invoiceNumber}`,
      sourceType: "BANK_TRANSACTION",
      sourceId: target.id,
      lines: journalLines,
      postedBy: "System Bank Feed",
    });

    const newAmountPaid = target.amountPaidPence + paymentPence;
    const newAmountDue = target.totalPence - newAmountPaid;
    const newStatus = newAmountDue === 0 ? "PAID" as const : "PARTIALLY_PAID" as const;

    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId
          ? {
              ...inv,
              status: newStatus,
              amountPaidPence: newAmountPaid,
              amountDuePence: newAmountDue,
            }
          : inv
      )
    );
  };

  // Reconcile bank statement line
  const reconcileBankLine = (lineId: string, matchedType: "INVOICE" | "BILL" | "RULE" | "MANUAL" = "INVOICE") => {
    const line = bankStatements.find((b) => b.id === lineId);
    if (!line || line.isReconciled) return;

    // If matching an invoice, auto-settle the invoice
    if (matchedType === "INVOICE" && line.suggestedMatch?.targetReference) {
      const inv = invoices.find((i) => i.invoiceNumber === line.suggestedMatch?.targetReference);
      if (inv && inv.status !== "PAID") {
        payInvoice(inv.id, undefined, line.transactionDate);
      }
    }

    setBankStatements((prev) =>
      prev.map((b) => (b.id === lineId ? { ...b, isReconciled: true, matchedType } : b))
    );
  };

  return (
    <AccountingContext.Provider
      value={{
        accounts,
        contacts,
        journals,
        invoices,
        bills,
        bankStatements,
        trialBalance,
        financialSummary: {
          cashBalancePence,
          accountsReceivablePence,
          accountsPayablePence,
          netVatLiabilityPence,
          totalTurnoverPence,
          operatingExpensesPence,
          netProfitPence,
        },
        createInvoice,
        payInvoice,
        reconcileBankLine,
        postJournalEntry,
        reverseJournalEntry,
      }}
    >
      {children}
    </AccountingContext.Provider>
  );
}

export function useAccounting() {
  const context = useContext(AccountingContext);
  if (!context) {
    throw new Error("useAccounting must be used within an AccountingProvider");
  }
  return context;
}
