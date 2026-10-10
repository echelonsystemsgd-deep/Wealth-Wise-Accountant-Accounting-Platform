"use client";

import React, { useState } from "react";
import { useAccounting } from "@/lib/accounting/AccountingContext";
import { formatGBP } from "@/lib/utils";
import { HighPrecisionFinancialChart } from "@/components/charts/HighPrecisionFinancialChart";
import { IntakeFunnelChart } from "@/components/charts/IntakeFunnelChart";
import { ReconciliationView } from "@/components/reconciliation/ReconciliationView";
import { DocumentVaultView } from "@/components/documents/DocumentVaultView";
import { InvoicesView } from "@/components/invoices/InvoicesView";
import { FinancialReportsView } from "@/components/reports/FinancialReportsView";
import { GeneralLedgerView } from "@/components/ledger/GeneralLedgerView";
import {
  Users,
  AlertCircle,
  FileCheck2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  DollarSign,
} from "lucide-react";

export function AccountantDashboard() {
  const { journals, bankStatements, financialSummary } = useAccounting();
  const [activeTab, setActiveTab] = useState<
    "OVERVIEW" | "CLIENTS" | "LEDGER" | "RECONCILIATION" | "DOCUMENTS" | "INVOICES" | "REPORTS"
  >("OVERVIEW");

  // Dynamic unreconciled count
  const unreconciledCount = bankStatements.filter((b) => !b.isReconciled).length;

  const revenueChartData = [
    { month: "May", revenuePence: 2150000, costsPence: 1320000 },
    { month: "Jun", revenuePence: 2420000, costsPence: 1450000 },
    { month: "Jul", revenuePence: 2310000, costsPence: 1390000 },
    { month: "Aug", revenuePence: 2680000, costsPence: 1410000 },
    { month: "Sep", revenuePence: 2845000, costsPence: 1420000 },
    { month: "Oct", revenuePence: financialSummary.totalTurnoverPence, costsPence: financialSummary.operatingExpensesPence },
  ];

  const funnelSteps = [
    { label: "Active Clients", count: 48, sublabel: "Enrolled in Practice" },
    { label: "Statements Ingested", count: 42, sublabel: "Synced Bank Data" },
    { label: "Receipts Cleared", count: 35, sublabel: "OCR & Document Match" },
    { label: "Audit Review", count: 18, sublabel: "Accountant Sign-Off" },
    { label: "Filing Ready", count: 12, sublabel: "HMRC / CoHouse Stage" },
  ];

  return (
    <div className="space-y-6">
      {/* Navigation tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#26241e] scrollbar-none touch-pan-x -mx-1 px-1">
        {[
          { id: "OVERVIEW", label: "Executive Overview" },
          { id: "LEDGER", label: `General Ledger (${journals.length} Journals)` },
          { id: "RECONCILIATION", label: `Bank Reconciliation (${unreconciledCount} Unmatched)` },
          { id: "INVOICES", label: "Sales & Invoicing" },
          { id: "DOCUMENTS", label: "Document Ingestion Vault" },
          { id: "REPORTS", label: "Financial Statements" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-3 sm:px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[38px] ${
              activeTab === tab.id
                ? "bg-[#25241f] text-[#c9a84c] border border-[#4a4029] shadow-xs"
                : "text-[#8c8272] hover:text-white hover:bg-[#181920]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "OVERVIEW" && (
        <div className="space-y-6">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card-surface p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#8c8272]">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Active Client Portfolio
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#1a1b22] border border-[#2e2b22] flex items-center justify-center text-[#c9a84c]">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="my-2">
                <div className="text-2xl font-bold tracking-tight text-white">
                  48 Accounts
                </div>
                <div className="text-xs font-medium text-[#c9a84c] flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +4 onboarding this month
                </div>
              </div>
              <div className="text-[11px] text-[#706859] border-t border-[#26241e] pt-2">
                All UK entities in good compliance standing
              </div>
            </div>

            <div className="card-surface p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#8c8272]">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Unreconciled Feed
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#1a1b22] border border-[#2e2b22] flex items-center justify-center text-[#e5c158]">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="my-2">
                <div className="text-2xl font-bold tracking-tight text-white">
                  {unreconciledCount} Items
                </div>
                <div className="text-xs font-medium text-[#e5c158] flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  High confidence matches available
                </div>
              </div>
              <div className="text-[11px] text-[#706859] border-t border-[#26241e] pt-2">
                Barclays Business statement queue
              </div>
            </div>

            <div className="card-surface p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#8c8272]">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Ledger Cash Position
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#1a1b22] border border-[#2e2b22] flex items-center justify-center text-[#c9a84c]">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="my-2">
                <div className="text-2xl font-bold tracking-tight text-white">
                  {formatGBP(financialSummary.cashBalancePence)}
                </div>
                <div className="text-xs font-medium text-[#c9a84c] flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  Liquid operating reserves (Dr 1200)
                </div>
              </div>
              <div className="text-[11px] text-[#706859] border-t border-[#26241e] pt-2">
                Across business clearing accounts
              </div>
            </div>

            <div className="card-surface p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#8c8272]">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Upcoming Filing Deadlines
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#1a1b22] border border-[#2e2b22] flex items-center justify-center text-[#c9a84c]">
                  <FileCheck2 className="w-4 h-4" />
                </div>
              </div>
              <div className="my-2">
                <div className="text-2xl font-bold tracking-tight text-white">
                  6 Returns Due
                </div>
                <div className="text-xs font-medium text-[#8c8272] flex items-center gap-1 mt-1">
                  <span>HMRC MTD VAT · 07 Nov</span>
                </div>
              </div>
              <div className="text-[11px] text-[#706859] border-t border-[#26241e] pt-2">
                Quarterly digital submissions ready
              </div>
            </div>
          </div>

          {/* Interactive Chart Grids */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card-surface p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">
                    Trailing 6-Month Practice Performance & Margins
                  </h3>
                  <span className="text-xs font-semibold text-[#c9a84c] bg-[#1d1b15] px-2 py-0.5 rounded border border-[#3b3424]">
                    GBP Minor-Unit Precision
                  </span>
                </div>
                <p className="text-xs text-[#8c8272] mt-0.5">
                  Accrual basis turnover vs direct costs from client ledgers
                </p>
              </div>

              <div className="my-4">
                <HighPrecisionFinancialChart data={revenueChartData} />
              </div>

              <div className="flex items-center justify-between text-xs text-[#8c8272] border-t border-[#26241e] pt-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-[#c9a84c]" />
                    <span>Turnover (Nominal 4000)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-[#2e2b22]" />
                    <span>Overheads & COGS</span>
                  </div>
                </div>
                <span className="font-semibold text-[#f2ede4]">
                  Net Operating Margin: 44.8%
                </span>
              </div>
            </div>

            <div className="card-surface p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Monthly Workflow & Audit Pipeline
                </h3>
                <p className="text-xs text-[#8c8272] mt-0.5">
                  End-to-end client bookkeeping workflow
                </p>
              </div>

              <div className="my-4">
                <IntakeFunnelChart steps={funnelSteps} />
              </div>

              <div className="text-[11px] text-[#706859] border-t border-[#26241e] pt-3">
                Strict four-eye review protocol enforced prior to filing
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="card-surface p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white">
                Accountant Core Workspaces
              </h3>
              <span className="text-xs text-[#8c8272]">
                Instant context navigation
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => setActiveTab("LEDGER")}
                className="p-3 text-left bg-[#16171d] hover:bg-[#1e1f28] rounded-xl border border-[#282620] hover:border-[#4a4029] transition-all"
              >
                <div className="text-xs font-bold text-white">General Ledger</div>
                <div className="text-[11px] text-[#8c8272] mt-0.5">Trial Balance & Journals</div>
              </button>
              <button
                onClick={() => setActiveTab("RECONCILIATION")}
                className="p-3 text-left bg-[#16171d] hover:bg-[#1e1f28] rounded-xl border border-[#282620] hover:border-[#4a4029] transition-all"
              >
                <div className="text-xs font-bold text-white">Bank Feeds</div>
                <div className="text-[11px] text-[#8c8272] mt-0.5">Interactive Matching</div>
              </button>
              <button
                onClick={() => setActiveTab("INVOICES")}
                className="p-3 text-left bg-[#16171d] hover:bg-[#1e1f28] rounded-xl border border-[#282620] hover:border-[#4a4029] transition-all"
              >
                <div className="text-xs font-bold text-white">Invoicing & AR</div>
                <div className="text-[11px] text-[#8c8272] mt-0.5">Sales & Debtor Tracking</div>
              </button>
              <button
                onClick={() => setActiveTab("REPORTS")}
                className="p-3 text-left bg-[#16171d] hover:bg-[#1e1f28] rounded-xl border border-[#282620] hover:border-[#4a4029] transition-all"
              >
                <div className="text-xs font-bold text-white">Statutory Reports</div>
                <div className="text-[11px] text-[#8c8272] mt-0.5">P&L, Balance Sheet & VAT</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "LEDGER" && <GeneralLedgerView />}
      {activeTab === "RECONCILIATION" && <ReconciliationView />}
      {activeTab === "INVOICES" && <InvoicesView />}
      {activeTab === "DOCUMENTS" && <DocumentVaultView />}
      {activeTab === "REPORTS" && <FinancialReportsView />}
    </div>
  );
}
