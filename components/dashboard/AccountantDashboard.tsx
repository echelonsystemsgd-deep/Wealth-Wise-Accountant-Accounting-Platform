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
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#D1D5DB] scrollbar-none touch-pan-x -mx-1 px-1">
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
            className={`px-3 sm:px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[44px] flex items-center ${
              activeTab === tab.id
                ? "bg-[#000000] text-white shadow-xs"
                : "text-[#666666] hover:text-[#111111] hover:bg-white"
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
            <div className="bg-white rounded-xl border border-[#D1D5DB] p-5 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between text-[#666666]">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Active Client Portfolio
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#F0F5FA] border border-[#E2E8F0] flex items-center justify-center text-[#111111]">
                  <Users className="w-4 h-4 text-[#C0A262]" />
                </div>
              </div>
              <div className="my-2">
                <div className="font-serif-heading text-3xl font-bold tracking-tight text-[#111111]">
                  48 Accounts
                </div>
                <div className="text-xs font-medium text-[#046bd2] flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +4 onboarding this month (Sample)
                </div>
              </div>
              <div className="text-[11px] text-[#666666] border-t border-[#F0F5FA] pt-2">
                All UK entities in good compliance standing
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#D1D5DB] p-5 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between text-[#666666]">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Unreconciled Feed
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#F0F5FA] border border-[#E2E8F0] flex items-center justify-center text-[#111111]">
                  <Clock className="w-4 h-4 text-[#C0A262]" />
                </div>
              </div>
              <div className="my-2">
                <div className="font-serif-heading text-3xl font-bold tracking-tight text-[#111111]">
                  {unreconciledCount} Items
                </div>
                <div className="text-xs font-medium text-[#C0A262] flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Matches suggested from statement
                </div>
              </div>
              <div className="text-[11px] text-[#666666] border-t border-[#F0F5FA] pt-2">
                Barclays Business statement queue
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#D1D5DB] p-5 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between text-[#666666]">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Ledger Cash Position
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#F0F5FA] border border-[#E2E8F0] flex items-center justify-center text-[#111111]">
                  <DollarSign className="w-4 h-4 text-[#C0A262]" />
                </div>
              </div>
              <div className="my-2">
                <div className="font-serif-heading text-3xl font-bold tracking-tight text-[#111111]">
                  {formatGBP(financialSummary.cashBalancePence)}
                </div>
                <div className="text-xs font-medium text-[#111111] flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C0A262]" />
                  Operating accounts (Dr 1200)
                </div>
              </div>
              <div className="text-[11px] text-[#666666] border-t border-[#F0F5FA] pt-2">
                Sample clearing account balance
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#D1D5DB] p-5 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between text-[#666666]">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Upcoming Filing Deadlines
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#F0F5FA] border border-[#E2E8F0] flex items-center justify-center text-[#111111]">
                  <FileCheck2 className="w-4 h-4 text-[#C0A262]" />
                </div>
              </div>
              <div className="my-2">
                <div className="font-serif-heading text-3xl font-bold tracking-tight text-[#111111]">
                  6 Returns Due
                </div>
                <div className="text-xs font-medium text-[#666666] flex items-center gap-1 mt-1">
                  <span>VAT & Statutory accounts · 07 Nov</span>
                </div>
              </div>
              <div className="text-[11px] text-[#666666] border-t border-[#F0F5FA] pt-2">
                Quarterly submission tracking
              </div>
            </div>
          </div>

          {/* Interactive Chart Grids */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl border border-[#D1D5DB] p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-heading text-lg font-bold text-[#111111]">
                    Trailing 6-Month Practice Overview (Sample Data)
                  </h3>
                  <span className="text-xs font-semibold text-[#111111] bg-[#F0F5FA] px-2.5 py-1 rounded border border-[#E2E8F0]">
                    Pence Minor-Units
                  </span>
                </div>
                <p className="text-xs text-[#666666] mt-1">
                  Turnover vs direct costs calculated from sample client ledgers
                </p>
              </div>

              <div className="my-6">
                <HighPrecisionFinancialChart data={revenueChartData} />
              </div>

              <div className="flex items-center justify-between text-xs text-[#666666] border-t border-[#E2E8F0] pt-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-[#C0A262]" />
                    <span>Turnover (Nominal 4000)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-[#111111]" />
                    <span>Overheads & COGS</span>
                  </div>
                </div>
                <span className="font-semibold text-[#111111]">
                  Net Operating Margin: 44.8%
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#D1D5DB] p-6 flex flex-col justify-between shadow-xs">
              <div>
                <h3 className="font-serif-heading text-lg font-bold text-[#111111]">
                  Workflow & Review Pipeline
                </h3>
                <p className="text-xs text-[#666666] mt-1">
                  Practice accounting stages
                </p>
              </div>

              <div className="my-6">
                <IntakeFunnelChart steps={funnelSteps} />
              </div>

              <div className="text-[11px] text-[#666666] border-t border-[#E2E8F0] pt-3">
                Review protocol enforced prior to client submission
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-white rounded-xl border border-[#D1D5DB] p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif-heading text-base font-bold text-[#111111]">
                Accountant Workspaces
              </h3>
              <span className="text-xs text-[#666666]">
                Instant navigation
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => setActiveTab("LEDGER")}
                className="p-4 text-left bg-[#F0F5FA] hover:bg-white rounded-xl border border-[#E2E8F0] hover:border-[#C0A262] transition-colors min-h-[44px]"
              >
                <div className="text-xs font-bold text-[#111111]">General Ledger</div>
                <div className="text-[11px] text-[#666666] mt-0.5">Trial Balance & Journals</div>
              </button>
              <button
                onClick={() => setActiveTab("RECONCILIATION")}
                className="p-4 text-left bg-[#F0F5FA] hover:bg-white rounded-xl border border-[#E2E8F0] hover:border-[#C0A262] transition-colors min-h-[44px]"
              >
                <div className="text-xs font-bold text-[#111111]">Bank Feeds</div>
                <div className="text-[11px] text-[#666666] mt-0.5">Statement Matching</div>
              </button>
              <button
                onClick={() => setActiveTab("INVOICES")}
                className="p-4 text-left bg-[#F0F5FA] hover:bg-white rounded-xl border border-[#E2E8F0] hover:border-[#C0A262] transition-colors min-h-[44px]"
              >
                <div className="text-xs font-bold text-[#111111]">Invoicing & AR</div>
                <div className="text-[11px] text-[#666666] mt-0.5">Sales & Debtor Tracking</div>
              </button>
              <button
                onClick={() => setActiveTab("REPORTS")}
                className="p-4 text-left bg-[#F0F5FA] hover:bg-white rounded-xl border border-[#E2E8F0] hover:border-[#C0A262] transition-colors min-h-[44px]"
              >
                <div className="text-xs font-bold text-[#111111]">Financial Reports</div>
                <div className="text-[11px] text-[#666666] mt-0.5">P&L and Balance Sheet</div>
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
