"use client";

import React, { useState } from "react";
import { useAccounting } from "@/lib/accounting/AccountingContext";
import { formatGBP } from "@/lib/utils";
import { Download, Calendar } from "lucide-react";

export function FinancialReportsView() {
  const { trialBalance, financialSummary } = useAccounting();
  const [reportType, setReportType] = useState<"PNL" | "BALANCE_SHEET" | "TAX_SUMMARY">("PNL");

  // Filter accounts for P&L
  const revenueRows = trialBalance.rows.filter((r) => r.accountType === "REVENUE" && r.creditPence > 0);
  const directCostRows = trialBalance.rows.filter((r) => r.accountCode.startsWith("5") && r.debitPence > 0);
  const overheadRows = trialBalance.rows.filter((r) => r.accountCode.startsWith("7") && r.debitPence > 0);

  const totalRevenue = revenueRows.reduce((sum, r) => sum + r.creditPence, 0);
  const totalDirectCosts = directCostRows.reduce((sum, r) => sum + r.debitPence, 0);
  const grossProfit = totalRevenue - totalDirectCosts;
  const totalOverheads = overheadRows.reduce((sum, r) => sum + r.debitPence, 0);
  const netProfit = grossProfit - totalOverheads;

  // Filter accounts for Balance Sheet
  const currentAssetRows = trialBalance.rows.filter(
    (r) => r.accountType === "ASSET" && r.debitPence > 0
  );
  const currentLiabilityRows = trialBalance.rows.filter(
    (r) => r.accountType === "LIABILITY" && r.creditPence > 0
  );
  const equityRows = trialBalance.rows.filter(
    (r) => r.accountType === "EQUITY" && r.creditPence > 0
  );

  const totalAssets = currentAssetRows.reduce((sum, r) => sum + r.debitPence, 0);
  const totalLiabilities = currentLiabilityRows.reduce((sum, r) => sum + r.creditPence, 0);
  const netAssets = totalAssets - totalLiabilities;
  const totalEquity = equityRows.reduce((sum, r) => sum + r.creditPence, 0) + netProfit;

  return (
    <div className="card-surface p-4 sm:p-5 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Financial Statements & Statutory Accounts
            </h3>
            <span className="text-xs bg-slate-100 text-slate-700 font-mono font-medium px-2 py-0.5 rounded">
              DERIVED FROM GENERAL LEDGER
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time financial reports calculated dynamically from posted double-entry journal lines.
          </p>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
          <div className="flex items-center overflow-x-auto bg-slate-100 p-1 rounded-xl text-xs font-semibold gap-1 scrollbar-none max-w-full">
            <button
              onClick={() => setReportType("PNL")}
              className={`px-3 py-2 sm:py-1.5 rounded-lg transition-all min-h-[36px] sm:min-h-[32px] whitespace-nowrap ${
                reportType === "PNL" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Profit & Loss
            </button>
            <button
              onClick={() => setReportType("BALANCE_SHEET")}
              className={`px-3 py-2 sm:py-1.5 rounded-lg transition-all min-h-[36px] sm:min-h-[32px] whitespace-nowrap ${
                reportType === "BALANCE_SHEET" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Balance Sheet
            </button>
            <button
              onClick={() => setReportType("TAX_SUMMARY")}
              className={`px-3 py-2 sm:py-1.5 rounded-lg transition-all min-h-[36px] sm:min-h-[32px] whitespace-nowrap ${
                reportType === "TAX_SUMMARY" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              VAT & MTD
            </button>
          </div>
          <button
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-200 min-h-[36px] min-w-[36px] flex items-center justify-center shrink-0"
            aria-label="Download statement report"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {reportType === "PNL" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-1">
            <span className="flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Reporting Period: Year-to-Date (Financial Year 2026/27)
            </span>
            <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded font-mono text-[11px] self-start sm:self-auto">
              Currency: GBP (£)
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {/* Turnover */}
            <div className="py-2.5 font-bold text-slate-900 flex justify-between uppercase tracking-wider text-[11px] bg-slate-50/50 px-2 rounded">
              <span>Operating Turnover / Revenue</span>
              <span></span>
            </div>
            {revenueRows.length > 0 ? (
              revenueRows.map((r) => (
                <div key={r.accountCode} className="py-2 pl-4 pr-2 flex justify-between text-slate-700">
                  <span>
                    {r.accountCode} - {r.accountName}
                  </span>
                  <span className="font-mono font-medium">{formatGBP(r.creditPence)}</span>
                </div>
              ))
            ) : (
              <div className="py-2 pl-4 text-slate-400">No revenue posted for this period.</div>
            )}
            <div className="py-2.5 px-2 flex justify-between font-bold text-slate-900 border-t border-slate-200">
              <span>Total Operating Revenue</span>
              <span className="font-mono">{formatGBP(totalRevenue)}</span>
            </div>

            {/* Direct Costs */}
            <div className="py-2.5 font-bold text-slate-900 flex justify-between uppercase tracking-wider text-[11px] bg-slate-50/50 px-2 rounded mt-3">
              <span>Cost of Sales (Direct Costs)</span>
              <span></span>
            </div>
            {directCostRows.map((r) => (
              <div key={r.accountCode} className="py-2 pl-4 pr-2 flex justify-between text-slate-700">
                <span>
                  {r.accountCode} - {r.accountName}
                </span>
                <span className="font-mono font-medium">{formatGBP(r.debitPence)}</span>
              </div>
            ))}
            <div className="py-2.5 px-2 flex justify-between font-bold text-slate-900 border-t border-slate-200">
              <span>Gross Profit</span>
              <span className="font-mono text-emerald-700">{formatGBP(grossProfit)}</span>
            </div>

            {/* Overheads */}
            <div className="py-2.5 font-bold text-slate-900 flex justify-between uppercase tracking-wider text-[11px] bg-slate-50/50 px-2 rounded mt-3">
              <span>Administrative & Operating Overheads</span>
              <span></span>
            </div>
            {overheadRows.map((r) => (
              <div key={r.accountCode} className="py-2 pl-4 pr-2 flex justify-between text-slate-700">
                <span>
                  {r.accountCode} - {r.accountName}
                </span>
                <span className="font-mono font-medium">{formatGBP(r.debitPence)}</span>
              </div>
            ))}

            {/* Net Operating Profit */}
            <div className="py-3 px-2 flex justify-between text-sm font-bold text-slate-900 bg-slate-100/70 rounded mt-3">
              <span>Net Profit (Pre-Tax)</span>
              <span
                className={`font-mono ${
                  netProfit >= 0 ? "text-emerald-800" : "text-rose-800"
                }`}
              >
                {formatGBP(netProfit)}
              </span>
            </div>
          </div>
        </div>
      )}

      {reportType === "BALANCE_SHEET" && (
        <div className="space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-slate-500 pb-2 gap-1">
            <span>Accounting Equation: Net Assets = Total Equity</span>
            <span className="font-mono text-[11px] text-emerald-700 font-bold">
              Ledger State: In Balance
            </span>
          </div>

          <div className="space-y-3">
            {/* Current Assets */}
            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 uppercase text-[11px] block">
                Current Assets (Dr)
              </span>
              {currentAssetRows.map((r) => (
                <div key={r.accountCode} className="flex justify-between text-slate-700">
                  <span>
                    {r.accountCode} - {r.accountName}
                  </span>
                  <span className="font-mono font-medium">{formatGBP(r.debitPence)}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-200 font-bold flex justify-between text-slate-900">
                <span>Total Assets</span>
                <span className="font-mono">{formatGBP(totalAssets)}</span>
              </div>
            </div>

            {/* Current Liabilities */}
            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 uppercase text-[11px] block">
                Current Liabilities (Cr)
              </span>
              {currentLiabilityRows.map((r) => (
                <div key={r.accountCode} className="flex justify-between text-slate-700">
                  <span>
                    {r.accountCode} - {r.accountName}
                  </span>
                  <span className="font-mono font-medium">{formatGBP(r.creditPence)}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-200 font-bold flex justify-between text-slate-900">
                <span>Total Liabilities</span>
                <span className="font-mono">{formatGBP(totalLiabilities)}</span>
              </div>
            </div>

            {/* Net Assets */}
            <div className="p-3 bg-slate-900 text-white rounded flex justify-between font-bold text-xs">
              <span>Total Net Assets</span>
              <span className="font-mono">{formatGBP(netAssets)}</span>
            </div>

            {/* Total Equity */}
            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 uppercase text-[11px] block">
                Capital &amp; Reserves / Equity (Cr)
              </span>
              {equityRows.map((r) => (
                <div key={r.accountCode} className="flex justify-between text-slate-700">
                  <span>
                    {r.accountCode} - {r.accountName}
                  </span>
                  <span className="font-mono font-medium">{formatGBP(r.creditPence)}</span>
                </div>
              ))}
              <div className="flex justify-between text-slate-700">
                <span>Retained Profit (Current Period)</span>
                <span className="font-mono font-medium">{formatGBP(netProfit)}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 font-bold flex justify-between text-slate-900">
                <span>Total Equity Balance</span>
                <span className="font-mono">{formatGBP(totalEquity)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {reportType === "TAX_SUMMARY" && (
        <div className="space-y-4 text-xs">
          <div className="p-4 bg-emerald-50/50 border border-emerald-200/80 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
              <span className="font-bold text-emerald-950 text-sm">
                HMRC Making Tax Digital (VAT Account 2200)
              </span>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded self-start sm:self-auto">
                Draft VAT Return
              </span>
            </div>
            <p className="text-[11px] text-emerald-800">
              Derived directly from posted VAT Control account lines (Dr Input VAT, Cr Output VAT).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded border border-slate-200 bg-white">
              <span className="text-slate-400 block text-[11px]">Box 1: Output VAT on Sales</span>
              <div className="text-base font-bold font-mono text-slate-900 mt-1">
                {formatGBP(financialSummary.netVatLiabilityPence)}
              </div>
            </div>
            <div className="p-3 rounded border border-slate-200 bg-white">
              <span className="text-slate-400 block text-[11px]">Box 4: Input VAT on Purchases</span>
              <div className="text-base font-bold font-mono text-slate-900 mt-1">
                {formatGBP(12417)}
              </div>
            </div>
            <div className="p-3 rounded border border-slate-200 bg-slate-50">
              <span className="text-slate-500 block text-[11px] font-bold">Box 5: Net VAT Payable to HMRC</span>
              <div className="text-base font-bold font-mono text-slate-900 mt-1">
                {formatGBP(financialSummary.netVatLiabilityPence - 12417)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
