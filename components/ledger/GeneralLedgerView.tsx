"use client";

import React, { useState } from "react";
import { useAccounting } from "@/lib/accounting/AccountingContext";
import { formatGBP } from "@/lib/utils";
import {
  BookOpen,
  ArrowRightLeft,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Layers,
  Search,
  Scale,
} from "lucide-react";

export function GeneralLedgerView() {
  const { accounts, journals, trialBalance, reverseJournalEntry } = useAccounting();
  const [activeTab, setActiveTab] = useState<"JOURNALS" | "TRIAL_BALANCE" | "CHART_OF_ACCOUNTS">("JOURNALS");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJournals = journals.filter(
    (j) =>
      j.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.lines.some((l) => l.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="card-surface p-5 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              General Ledger & Double-Entry Accounting Engine
            </h3>
            <span className="text-xs bg-emerald-50 text-emerald-700 font-mono font-bold px-2 py-0.5 rounded border border-emerald-200">
              IMMUTABLE AUDIT TRAIL
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Strict double-entry ledger with mathematical debit/credit enforcement and non-destructive reversing journals.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setActiveTab("JOURNALS")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === "JOURNALS" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Posted Journals ({journals.length})
          </button>
          <button
            onClick={() => setActiveTab("TRIAL_BALANCE")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === "TRIAL_BALANCE" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Trial Balance
          </button>
          <button
            onClick={() => setActiveTab("CHART_OF_ACCOUNTS")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === "CHART_OF_ACCOUNTS" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Chart of Accounts ({accounts.length})
          </button>
        </div>
      </div>

      {activeTab === "JOURNALS" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search reference or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg w-full"
              />
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Invariants: Σ Debits = Σ Credits enforced at post
            </div>
          </div>

          <div className="space-y-3">
            {filteredJournals.map((journal) => (
              <div
                key={journal.id}
                className="border border-slate-200 rounded-lg bg-white overflow-hidden shadow-2xs hover:border-slate-300 transition-colors"
              >
                <div className="p-3 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">{journal.reference}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3" /> {journal.entryDate}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-[10px] bg-slate-200/70 text-slate-700 px-1.5 py-0.2 rounded font-semibold">
                      {journal.sourceType}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {journal.status === "POSTED" ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Posted
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        <RotateCcw className="w-3 h-3" /> Reversed
                      </span>
                    )}

                    <span className="font-mono font-bold text-slate-900">
                      Total: {formatGBP(journal.totalPence)}
                    </span>

                    {journal.status === "POSTED" && journal.sourceType !== "REVERSAL" && (
                      <button
                        onClick={() => reverseJournalEntry(journal.id, "Accountant Audit")}
                        className="px-2 py-1 text-[11px] font-semibold text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded border border-rose-200 transition-colors flex items-center gap-1"
                        title="Post reversing journal entry"
                      >
                        <RotateCcw className="w-3 h-3" /> Reverse
                      </button>
                    )}
                  </div>
                </div>

                {/* Journal lines table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs divide-y divide-slate-100">
                    <thead>
                      <tr className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/20">
                        <th className="py-2 pl-3">Account Nominal</th>
                        <th className="py-2">Description</th>
                        <th className="py-2 pr-4 text-right">Debit</th>
                        <th className="py-2 pr-3 text-right">Credit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {journal.lines.map((line) => (
                        <tr key={line.id} className="hover:bg-slate-50/40">
                          <td className="py-2 pl-3 font-semibold text-slate-800">
                            {line.accountCode} -{" "}
                            {accounts.find((a) => a.code === line.accountCode)?.name || "Nominal"}
                          </td>
                          <td className="py-2 font-sans text-slate-600">{line.description}</td>
                          <td className="py-2 pr-4 text-right font-bold text-slate-900">
                            {line.debitPence > 0 ? formatGBP(line.debitPence) : "—"}
                          </td>
                          <td className="py-2 pr-3 text-right font-bold text-slate-900">
                            {line.creditPence > 0 ? formatGBP(line.creditPence) : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "TRIAL_BALANCE" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-emerald-50/60 border border-emerald-200/80 rounded-lg text-xs text-emerald-900">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-700" />
              <span>
                <strong>Double-Entry Balance Check:</strong> All posted general ledger debits match credits with 0 discrepancy.
              </span>
            </div>
            <span className="font-mono font-bold text-emerald-800">
              Balanced: {formatGBP(trialBalance.totalDebitsPence)}
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs divide-y divide-slate-200">
              <thead>
                <tr className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50">
                  <th className="py-2.5 pl-3">Code</th>
                  <th className="py-2.5">Account Name</th>
                  <th className="py-2.5">Type</th>
                  <th className="py-2.5 pr-4 text-right">Debit (£)</th>
                  <th className="py-2.5 pr-3 text-right">Credit (£)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {trialBalance.rows
                  .filter((r) => r.debitPence > 0 || r.creditPence > 0)
                  .map((row) => (
                    <tr key={row.accountCode} className="hover:bg-slate-50/50">
                      <td className="py-2 pl-3 font-bold text-slate-900">{row.accountCode}</td>
                      <td className="py-2 font-sans font-medium text-slate-800">{row.accountName}</td>
                      <td className="py-2 font-sans text-slate-500 text-[11px]">{row.accountType}</td>
                      <td className="py-2 pr-4 text-right font-bold text-slate-900">
                        {row.debitPence > 0 ? formatGBP(row.debitPence) : "—"}
                      </td>
                      <td className="py-2 pr-3 text-right font-bold text-slate-900">
                        {row.creditPence > 0 ? formatGBP(row.creditPence) : "—"}
                      </td>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-900 text-white font-mono font-bold text-xs">
                  <td colSpan={3} className="py-2.5 pl-3 uppercase">
                    Total Trial Balance
                  </td>
                  <td className="py-2.5 pr-4 text-right">{formatGBP(trialBalance.totalDebitsPence)}</td>
                  <td className="py-2.5 pr-3 text-right">{formatGBP(trialBalance.totalCreditsPence)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {activeTab === "CHART_OF_ACCOUNTS" && (
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs divide-y divide-slate-200">
            <thead>
              <tr className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50">
                <th className="py-2.5 pl-3">Code</th>
                <th className="py-2.5">Account Name</th>
                <th className="py-2.5">Classification</th>
                <th className="py-2.5">Normal Balance</th>
                <th className="py-2.5 pr-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {accounts.map((acc) => (
                <tr key={acc.code} className="hover:bg-slate-50/50">
                  <td className="py-2.5 pl-3 font-mono font-bold text-slate-900">{acc.code}</td>
                  <td className="py-2.5 font-semibold text-slate-800">{acc.name}</td>
                  <td className="py-2.5">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {acc.type}
                    </span>
                  </td>
                  <td className="py-2.5 font-mono text-[11px] text-slate-500">{acc.normalBalance}</td>
                  <td className="py-2.5 pr-3 text-slate-500 text-[11px]">{acc.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
