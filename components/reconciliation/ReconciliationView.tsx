"use client";

import React, { useState } from "react";
import {
  SYNTHETIC_TRANSACTIONS,
  BankTransaction,
} from "@/lib/synthetic-data";
import { formatGBP } from "@/lib/utils";
import {
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Split,
  Search,
} from "lucide-react";

export function ReconciliationView() {
  const [transactions, setTransactions] = useState<BankTransaction[]>(
    SYNTHETIC_TRANSACTIONS
  );
  const [selectedTxId, setSelectedTxId] = useState<string>(transactions[0]?.id || "");
  const [searchQuery, setSearchQuery] = useState("");

  const handleReconcile = (id: string) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "RECONCILED" } : t))
    );
  };

  const selectedTx = transactions.find((t) => t.id === selectedTxId);

  const filteredTx = transactions.filter((t) =>
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="card-surface p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Bank Statement Reconciliation
            </h3>
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-medium">
              BARCLAYS CURRENT 9021
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare imported bank transactions against invoices, bills, and nominal ledger accounts.
          </p>
        </div>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white w-full sm:w-56"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4">
        {/* Left Column: Bank Statement Feed */}
        <div className="lg:col-span-5 space-y-2 max-h-[460px] overflow-y-auto pr-1">
          {filteredTx.map((tx) => {
            const isSelected = tx.id === selectedTxId;
            const isCredit = tx.amountPence > 0;
            return (
              <div
                key={tx.id}
                onClick={() => setSelectedTxId(tx.id)}
                className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all ${
                  isSelected
                    ? "border-slate-900 bg-slate-50/80 shadow-sm"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-500 font-mono">
                    {tx.date}
                  </span>
                  <span
                    className={`text-xs font-bold font-mono ${
                      isCredit ? "text-emerald-700" : "text-slate-900"
                    }`}
                  >
                    {isCredit ? "+" : ""}
                    {formatGBP(tx.amountPence)}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-900 mt-1 line-clamp-1">
                  {tx.description}
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                  <span className="text-[11px] text-slate-500">
                    {tx.category || "Uncategorised"}
                  </span>
                  {tx.status === "RECONCILED" ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                      <CheckCircle2 className="w-3 h-3" /> Reconciled
                    </span>
                  ) : tx.suggestedMatch ? (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                      <Sparkles className="w-2.5 h-2.5" /> Match {tx.suggestedMatch.confidence}%
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] text-slate-500">
                      <HelpCircle className="w-3 h-3" /> Unmatched
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Ledger Match & Rule Actions */}
        <div className="lg:col-span-7 bg-slate-50/50 rounded-lg border border-slate-200 p-4.5 flex flex-col justify-between">
          {selectedTx ? (
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Selected Transaction
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                    {selectedTx.description}
                  </h4>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold font-mono text-slate-900">
                    {formatGBP(selectedTx.amountPence)}
                  </div>
                  <span className="text-xs text-slate-500">{selectedTx.date}</span>
                </div>
              </div>

              {selectedTx.status === "RECONCILED" ? (
                <div className="p-8 text-center my-6">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h5 className="text-sm font-bold text-slate-900">
                    Transaction Fully Reconciled
                  </h5>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    This bank record has been paired to ledger reference and cleared from the unallocated queue.
                  </p>
                </div>
              ) : selectedTx.suggestedMatch ? (
                <div className="my-5 space-y-4">
                  <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        Suggested Ledger Match
                      </span>
                      <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
                        {selectedTx.suggestedMatch.confidence}% Confidence
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100">
                      <div>
                        <span className="text-slate-400">Target Entity:</span>
                        <p className="font-semibold text-slate-900">
                          {selectedTx.suggestedMatch.targetName}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-400">Reference:</span>
                        <p className="font-mono font-semibold text-slate-900">
                          {selectedTx.suggestedMatch.reference}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-end gap-2.5">
                      <button className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1">
                        <Split className="w-3 h-3" /> Split Line
                      </button>
                      <button
                        onClick={() => handleReconcile(selectedTx.id)}
                        className="px-4 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        Accept Match & Reconcile
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="my-5 p-5 bg-white rounded-lg border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-900">
                    Create Manual Ledger Posting
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-slate-500 block mb-1 font-medium">
                        Nominal Account
                      </label>
                      <select className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs">
                        <option>4000 - Sales Consulting</option>
                        <option>7000 - Rent & Rates</option>
                        <option>7040 - Computer & Software</option>
                        <option>2100 - Director Loan Account</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-slate-500 block mb-1 font-medium">
                        VAT Treatment
                      </label>
                      <select className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs">
                        <option>Standard 20% (Input VAT)</option>
                        <option>Zero Rated 0%</option>
                        <option>Exempt from VAT</option>
                      </select>
                    </div>
                  </div>
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handleReconcile(selectedTx.id)}
                      className="px-4 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors"
                    >
                      Post to Ledger & Match
                    </button>
                  </div>
                </div>
              )}

              <div className="text-[11px] text-slate-400 bg-slate-100/60 p-2.5 rounded border border-slate-200/50 mt-4">
                <strong>Accounting Rule:</strong> Bank reconciliations link verified cleared statement items directly to double-entry general ledger transactions. Reconciled balances update cash flow and trial balances instantly.
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400 text-xs">
              Select a transaction to inspect details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
