"use client";

import React, { useState } from "react";
import {
  SYNTHETIC_CLIENTS,
  ClientProfile,
} from "@/lib/synthetic-data";
import { formatGBP } from "@/lib/utils";
import { HighPrecisionFinancialChart } from "@/components/charts/HighPrecisionFinancialChart";
import { IntakeFunnelChart } from "@/components/charts/IntakeFunnelChart";
import { ReconciliationView } from "@/components/reconciliation/ReconciliationView";
import { DocumentVaultView } from "@/components/documents/DocumentVaultView";
import { InvoicesView } from "@/components/invoices/InvoicesView";
import { FinancialReportsView } from "@/components/reports/FinancialReportsView";
import {
  Users,
  AlertCircle,
  FileCheck2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Building2,
  DollarSign,
  Briefcase,
  ChevronRight,
  UserCheck,
} from "lucide-react";

export function AccountantDashboard() {
  const [activeTab, setActiveTab] = useState<
    "OVERVIEW" | "CLIENTS" | "RECONCILIATION" | "DOCUMENTS" | "INVOICES" | "REPORTS"
  >("OVERVIEW");
  const [selectedClient, setSelectedClient] = useState<ClientProfile>(SYNTHETIC_CLIENTS[0]);

  // Financial chart data
  const revenueChartData = [
    { month: "May", revenuePence: 2150000, costsPence: 1320000 },
    { month: "Jun", revenuePence: 2420000, costsPence: 1450000 },
    { month: "Jul", revenuePence: 2310000, costsPence: 1390000 },
    { month: "Aug", revenuePence: 2680000, costsPence: 1410000 },
    { month: "Sep", revenuePence: 2845000, costsPence: 1420000 },
    { month: "Oct", revenuePence: 3120000, costsPence: 1510000 },
  ];

  // Pipeline funnel steps
  const funnelSteps = [
    { label: "Active Clients", count: 48, sublabel: "Enrolled in Practice" },
    { label: "Statements Ingested", count: 42, sublabel: "Synced Bank Data" },
    { label: "Receipts Cleared", count: 35, sublabel: "OCR & Document Match" },
    { label: "Audit Review", count: 18, sublabel: "Accountant Sign-Off" },
    { label: "Filing Ready", count: 12, sublabel: "HMRC / CoHouse Stage" },
  ];

  return (
    <div className="space-y-6">
      {/* Sub-navigation tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
        {[
          { id: "OVERVIEW", label: "Executive Overview" },
          { id: "CLIENTS", label: "Client Portfolio (4)" },
          { id: "RECONCILIATION", label: "Bank Reconciliation" },
          { id: "DOCUMENTS", label: "Document Ingestion Vault" },
          { id: "INVOICES", label: "Sales & Invoicing" },
          { id: "REPORTS", label: "Financial Statements" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
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
          {/* Top 4 Metric Cards with icons and 8px/rem spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1 */}
            <div className="card-surface p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider">Active Client Portfolio</span>
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="my-2">
                <div className="text-2xl font-bold tracking-tight text-slate-900">48 Accounts</div>
                <div className="text-xs font-medium text-emerald-700 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +4 onboarding this month
                </div>
              </div>
              <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-2">
                All UK entities in good compliance standing
              </div>
            </div>

            {/* Metric 2 */}
            <div className="card-surface p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider">Unreconciled Feed</span>
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="my-2">
                <div className="text-2xl font-bold tracking-tight text-slate-900">23 Items</div>
                <div className="text-xs font-medium text-amber-700 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  8 high confidence matches ready
                </div>
              </div>
              <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-2">
                Across Barclays & NatWest client feeds
              </div>
            </div>

            {/* Metric 3 */}
            <div className="card-surface p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider">Total Managed Turnover</span>
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="my-2">
                <div className="text-2xl font-bold tracking-tight text-slate-900">£15.31M</div>
                <div className="text-xs font-medium text-emerald-700 flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  +8.4% practice-wide YoY
                </div>
              </div>
              <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-2">
                Aggregated annualised client revenue
              </div>
            </div>

            {/* Metric 4 */}
            <div className="card-surface p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider">Pending Tax Filings</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
                  <FileCheck2 className="w-4 h-4" />
                </div>
              </div>
              <div className="my-2">
                <div className="text-2xl font-bold tracking-tight text-slate-900">7 Deadlines</div>
                <div className="text-xs font-medium text-slate-600 flex items-center gap-1 mt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Next: VAT Q3 due 28 Oct
                </div>
              </div>
              <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-2">
                HMRC MTD calendar synchronized
              </div>
            </div>
          </div>

          {/* High precision graphic inspired by bklit area chart */}
          <div className="card-surface p-5">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Practice-Wide Revenue & Cost Velocity
              </h3>
              <p className="text-xs text-slate-500">
                Combined financial trajectories and overhead efficiency across managed entities.
              </p>
            </div>
            <HighPrecisionFinancialChart data={revenueChartData} />
          </div>

          {/* Intake funnel graphic inspired by bklit funnel chart */}
          <div className="card-surface p-5">
            <IntakeFunnelChart steps={funnelSteps} />
          </div>

          {/* Priority Client Work Queue */}
          <div className="card-surface p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  Priority Client Action Queue
                </h3>
                <p className="text-xs text-slate-500">
                  Accounts requiring immediate document collection, review, or statutory preparation.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("CLIENTS")}
                className="text-xs font-semibold text-slate-900 hover:underline flex items-center gap-1"
              >
                View all clients <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {SYNTHETIC_CLIENTS.map((client) => (
                <div
                  key={client.id}
                  className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 p-2 rounded transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
                      {client.tradingName.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        {client.companyName}
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono">
                          {client.companyNumber}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>Director: {client.directorName}</span>
                        <span>•</span>
                        <span>Next: {client.nextDeadline}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    {client.status === "MISSING_DOCS" && (
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                        {client.missingReceiptsCount} Missing Receipts
                      </span>
                    )}
                    {client.status === "FILING_DUE" && (
                      <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                        Filing Due Soon
                      </span>
                    )}
                    {client.status === "GOOD_STANDING" && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                        Up to Date
                      </span>
                    )}
                    {client.status === "ACTION_REQUIRED" && (
                      <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                        Action Required
                      </span>
                    )}

                    <button
                      onClick={() => {
                        setSelectedClient(client);
                        setActiveTab("CLIENTS");
                      }}
                      className="px-3 py-1 text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 rounded-md text-slate-700 shadow-xs"
                    >
                      Open Account
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "CLIENTS" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Managed Companies
            </h4>
            {SYNTHETIC_CLIENTS.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedClient(c)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedClient.id === c.id
                    ? "border-slate-900 bg-white shadow-sm"
                    : "border-slate-200 bg-slate-50/50 hover:bg-white"
                }`}
              >
                <div className="text-xs font-bold text-slate-900">{c.companyName}</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Type: {c.entityType} | Director: {c.directorName}
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Monthly Rev:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {formatGBP(c.monthlyRevenuePence)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-8 card-surface p-5 space-y-4">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase">
                  Companies House #{selectedClient.companyNumber}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedClient.companyName}
                </h3>
                <p className="text-xs text-slate-500">
                  Director: {selectedClient.directorName} ({selectedClient.contactEmail})
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-800">
                {selectedClient.entityType}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded border border-slate-200/80">
                <span className="text-slate-400 block text-[11px]">VAT Reg Number</span>
                <span className="font-mono font-bold text-slate-900 mt-0.5 block">
                  {selectedClient.vatNumber || "Not VAT Registered"}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200/80">
                <span className="text-slate-400 block text-[11px]">Financial Year End</span>
                <span className="font-bold text-slate-900 mt-0.5 block">
                  {selectedClient.yearEnd}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200/80">
                <span className="text-slate-400 block text-[11px]">Next Statutory Deadline</span>
                <span className="font-bold text-slate-900 mt-0.5 block">
                  {selectedClient.nextDeadline}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab("RECONCILIATION")}
                className="px-3.5 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800"
              >
                Reconcile Bank Accounts
              </button>
              <button
                onClick={() => setActiveTab("DOCUMENTS")}
                className="px-3.5 py-1.5 text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                View Document Vault
              </button>
              <button
                onClick={() => setActiveTab("REPORTS")}
                className="px-3.5 py-1.5 text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                Generate P&L Report
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "RECONCILIATION" && <ReconciliationView />}
      {activeTab === "DOCUMENTS" && <DocumentVaultView />}
      {activeTab === "INVOICES" && <InvoicesView />}
      {activeTab === "REPORTS" && <FinancialReportsView />}
    </div>
  );
}
