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
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none touch-pan-x -mx-1 px-1">
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
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
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
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Active Client Portfolio
                </span>
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="my-2">
                <div className="text-2xl font-bold tracking-tight text-slate-900">
                  48 Accounts
                </div>
                <div className="text-xs font-medium text-emerald-700 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +4 onboarding this month
                </div>
              </div>
              <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-2">
                All UK entities in good compliance standing
              </div>
            </div>

            <div className="card-surface p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Unreconciled Feed
                </span>
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="my-2">
                <div className="text-2xl font-bold tracking-tight text-slate-900">
                  {unreconciledCount} Items
                </div>
                <div className="text-xs font-medium text-amber-700 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  High confidence matches available
                </div>
              </div>
              <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-2">
                Barclays Business statement queue
              </div>
            </div>

            <div className="card-surface p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Ledger Cash Position
                </span>
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="my-2">
                <div className="text-2xl font-bold tracking-tight text-slate-900">
                  {formatGBP(financialSummary.cashBalancePence)}
                </div>
                <div className="text-xs font-medium text-emerald-700 flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  Verified double-entry cash balance
                </div>
              </div>
              <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-2">
                Nominal account 1000 Barclays
              </div>
            </div>

            <div className="card-surface p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Net Tax Liability
                </span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
                  <FileCheck2 className="w-4 h-4" />
                </div>
              </div>
              <div className="my-2">
                <div className="text-2xl font-bold tracking-tight text-slate-900">
                  {formatGBP(financialSummary.netVatLiabilityPence)}
                </div>
                <div className="text-xs font-medium text-slate-600 flex items-center gap-1 mt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  HMRC VAT Control Acc 2200
                </div>
              </div>
              <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-2">
                Q2 return filing due 07 Nov
              </div>
            </div>
          </div>

          {/* Area Chart */}
          <div className="card-surface p-5">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Practice-Wide Revenue & Cost Velocity
              </h3>
              <p className="text-xs text-slate-500">
                Financial trajectory derived directly from general ledger revenue and overhead postings.
              </p>
            </div>
            <HighPrecisionFinancialChart data={revenueChartData} />
          </div>

          {/* Funnel Chart */}
          <div className="card-surface p-5">
            <IntakeFunnelChart steps={funnelSteps} />
          </div>
        </div>
      )}

      {activeTab === "LEDGER" && <GeneralLedgerView />}
      {activeTab === "RECONCILIATION" && <ReconciliationView />}
      {activeTab === "DOCUMENTS" && <DocumentVaultView />}
      {activeTab === "INVOICES" && <InvoicesView />}
      {activeTab === "REPORTS" && <FinancialReportsView />}
    </div>
  );
}
