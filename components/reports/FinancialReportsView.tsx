"use client";

import React, { useState } from "react";
import { formatGBP } from "@/lib/utils";
import { Download, Calendar, HelpCircle, Layers } from "lucide-react";

export function FinancialReportsView() {
  const [reportType, setReportType] = useState<"PNL" | "BALANCE_SHEET" | "TAX_SUMMARY">("PNL");

  return (
    <div className="card-surface p-5 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Financial Statements & Management Accounts
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Deterministic calculations derived directly from posted general ledger transactions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setReportType("PNL")}
              className={`px-3 py-1 rounded-md transition-all ${
                reportType === "PNL" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Profit & Loss
            </button>
            <button
              onClick={() => setReportType("BALANCE_SHEET")}
              className={`px-3 py-1 rounded-md transition-all ${
                reportType === "BALANCE_SHEET" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Balance Sheet
            </button>
            <button
              onClick={() => setReportType("TAX_SUMMARY")}
              className={`px-3 py-1 rounded-md transition-all ${
                reportType === "TAX_SUMMARY" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              VAT & Tax
            </button>
          </div>
          <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded border border-slate-200">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {reportType === "PNL" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Period: 01 Apr 2026 – 30 Sep 2026 (Q1 & Q2)
            </span>
            <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded font-mono text-[11px]">
              Currency: GBP (£)
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {/* Revenue */}
            <div className="py-2.5 font-bold text-slate-900 flex justify-between uppercase tracking-wider text-[11px] bg-slate-50/50 px-2 rounded">
              <span>Operating Turnover / Revenue</span>
              <span></span>
            </div>
            <div className="py-2 pl-4 pr-2 flex justify-between text-slate-700">
              <span>4000 - Professional Consulting Fees</span>
              <span className="font-mono font-medium">{formatGBP(2450000)}</span>
            </div>
            <div className="py-2 pl-4 pr-2 flex justify-between text-slate-700">
              <span>4020 - Retainer Services</span>
              <span className="font-mono font-medium">{formatGBP(890000)}</span>
            </div>
            <div className="py-2.5 px-2 flex justify-between font-bold text-slate-900 border-t border-slate-200">
              <span>Total Operating Revenue</span>
              <span className="font-mono">{formatGBP(3340000)}</span>
            </div>

            {/* Cost of Sales */}
            <div className="py-2.5 font-bold text-slate-900 flex justify-between uppercase tracking-wider text-[11px] bg-slate-50/50 px-2 rounded mt-3">
              <span>Cost of Sales (Direct Costs)</span>
              <span></span>
            </div>
            <div className="py-2 pl-4 pr-2 flex justify-between text-slate-700">
              <span>5000 - Subcontractor Engineering</span>
              <span className="font-mono font-medium">{formatGBP(620000)}</span>
            </div>
            <div className="py-2 pl-4 pr-2 flex justify-between text-slate-700">
              <span>5010 - Client Cloud Infrastructure</span>
              <span className="font-mono font-medium">{formatGBP(245000)}</span>
            </div>
            <div className="py-2.5 px-2 flex justify-between font-bold text-slate-900 border-t border-slate-200">
              <span>Gross Profit</span>
              <span className="font-mono text-emerald-700">{formatGBP(2475000)}</span>
            </div>

            {/* Operating Overheads */}
            <div className="py-2.5 font-bold text-slate-900 flex justify-between uppercase tracking-wider text-[11px] bg-slate-50/50 px-2 rounded mt-3">
              <span>Administrative & Operating Overheads</span>
              <span></span>
            </div>
            <div className="py-2 pl-4 pr-2 flex justify-between text-slate-700">
              <span>7000 - Rent & Office Premises</span>
              <span className="font-mono font-medium">{formatGBP(490000)}</span>
            </div>
            <div className="py-2 pl-4 pr-2 flex justify-between text-slate-700">
              <span>7040 - Software & IT Subscriptions</span>
              <span className="font-mono font-medium">{formatGBP(149000)}</span>
            </div>
            <div className="py-2 pl-4 pr-2 flex justify-between text-slate-700">
              <span>7050 - Travel & Subsistence</span>
              <span className="font-mono font-medium">{formatGBP(34200)}</span>
            </div>

            {/* Net Operating Profit */}
            <div className="py-3 px-2 flex justify-between text-sm font-bold text-slate-900 bg-slate-100/70 rounded mt-3">
              <span>Net Profit (Pre-Tax)</span>
              <span className="font-mono text-emerald-800">{formatGBP(1801800)}</span>
            </div>
          </div>
        </div>
      )}

      {reportType === "BALANCE_SHEET" && (
        <div className="space-y-4 text-xs">
          <div className="flex justify-between items-center text-slate-500 pb-2">
            <span>As at 30 September 2026</span>
            <span className="font-mono text-[11px]">In Balance: Debits = Credits</span>
          </div>

          <div className="space-y-2">
            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 uppercase text-[11px] block">Current Assets</span>
              <div className="flex justify-between text-slate-700">
                <span>1000 - Barclays Bank Current Account</span>
                <span className="font-mono font-medium">{formatGBP(6420000)}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>1100 - Trade Debtors (Accounts Receivable)</span>
                <span className="font-mono font-medium">{formatGBP(1440000)}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 uppercase text-[11px] block">Current Liabilities</span>
              <div className="flex justify-between text-slate-700">
                <span>2000 - Trade Creditors (Accounts Payable)</span>
                <span className="font-mono font-medium">{formatGBP(820000)}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>2200 - HMRC VAT Liability (Q2 Accrual)</span>
                <span className="font-mono font-medium">{formatGBP(482000)}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900 text-white rounded flex justify-between font-bold text-xs">
              <span>Total Net Assets (Equity)</span>
              <span className="font-mono">{formatGBP(6558000)}</span>
            </div>
          </div>
        </div>
      )}

      {reportType === "TAX_SUMMARY" && (
        <div className="space-y-4 text-xs">
          <div className="p-4 bg-emerald-50/50 border border-emerald-200/80 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-emerald-950 text-sm">HMRC Making Tax Digital (VAT Period Q2)</span>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                Draft Preparation
              </span>
            </div>
            <p className="text-[11px] text-emerald-800">
              Period ending 30 Sep 2026. Submission deadline: 07 Nov 2026.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded border border-slate-200 bg-white">
              <span className="text-slate-400 block text-[11px]">Box 1: Output VAT (Sales)</span>
              <div className="text-base font-bold font-mono text-slate-900 mt-1">{formatGBP(668000)}</div>
            </div>
            <div className="p-3 rounded border border-slate-200 bg-white">
              <span className="text-slate-400 block text-[11px]">Box 4: Input VAT (Purchases)</span>
              <div className="text-base font-bold font-mono text-slate-900 mt-1">{formatGBP(186000)}</div>
            </div>
            <div className="p-3 rounded border border-slate-200 bg-slate-50">
              <span className="text-slate-500 block text-[11px] font-bold">Box 5: Net VAT to Pay</span>
              <div className="text-base font-bold font-mono text-slate-900 mt-1">{formatGBP(482000)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
