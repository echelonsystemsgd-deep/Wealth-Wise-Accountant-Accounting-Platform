"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { formatGBP } from "@/lib/utils";
import {
  Users,
  Building2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  ShieldAlert,
  Search,
  Filter,
  CreditCard,
  FileText,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export function PracticeCrmView() {
  const { allClients, activeClient, switchClient } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "ACTION_REQUIRED" | "LTD" | "SOLE_TRADER">("ALL");

  const filteredClients = allClients.filter((client) => {
    const matchesSearch =
      client.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.primaryDirector.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.companyNumber.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterType === "ACTION_REQUIRED") return client.complianceStatus === "ACTION_REQUIRED";
    if (filterType === "LTD") return client.entityType === "LTD";
    if (filterType === "SOLE_TRADER") return client.entityType === "SOLE_TRADER";
    return true;
  });

  const totalMonthlyRetainersPence = allClients.reduce(
    (sum, c) => sum + (c.billingModel === "INCLUDED_IN_RETAINER" ? c.monthlyFeePence : 0),
    0
  );

  const totalSaasRevenuePence = allClients.reduce(
    (sum, c) => sum + (c.billingModel !== "INCLUDED_IN_RETAINER" ? c.monthlyFeePence : 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Practice Header & KPI Strip */}
      <div className="bg-[#111216] border border-[#2e2a21] rounded-2xl p-4 sm:p-6 text-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#26241e]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C0A262] bg-[#25241f] px-2.5 py-0.5 rounded border border-[#4a4029]">
                PHASE 2 PRACTICE CRM
              </span>
              <span className="text-xs text-[#8c8272]">Multi-Tenant Portfolio Intelligence</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif-heading mt-1 text-white">
              Client Portfolio & Statutory Filing Hub
            </h2>
            <p className="text-xs text-[#a09a8f] mt-0.5">
              Comprehensive overview of client filings, fee models, and missing document bottlenecks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-[#1a1b22] px-3 py-2 rounded-xl border border-[#2e2a21] text-right">
              <div className="text-[10px] text-[#8c8272] uppercase font-semibold">Active Client Base</div>
              <div className="text-lg font-bold text-white">{allClients.length} Organizations</div>
            </div>
          </div>
        </div>

        {/* Practice Monetization & Workload Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-[#181920] p-3.5 rounded-xl border border-[#26241e]">
            <div className="text-[11px] text-[#8c8272] font-semibold uppercase">Total Monthly Fees</div>
            <div className="text-xl font-bold text-[#C0A262] mt-0.5">
              {formatGBP(totalMonthlyRetainersPence + totalSaasRevenuePence)}
              <span className="text-xs font-normal text-[#8c8272]"> /mo</span>
            </div>
            <div className="text-[10px] text-[#046bd2] mt-1">
              Retainers: {formatGBP(totalMonthlyRetainersPence)} · Standalone SaaS: {formatGBP(totalSaasRevenuePence)}
            </div>
          </div>

          <div className="bg-[#181920] p-3.5 rounded-xl border border-[#26241e]">
            <div className="text-[11px] text-[#8c8272] font-semibold uppercase">VAT Filings Pending (Nov 07)</div>
            <div className="text-xl font-bold text-white mt-0.5">
              {allClients.filter((c) => c.deadlines.nextVatReturnDate.includes("07 Nov")).length} Clients
            </div>
            <div className="text-[10px] text-amber-400 mt-1">HMRC MTD Digital submissions due</div>
          </div>

          <div className="bg-[#181920] p-3.5 rounded-xl border border-[#26241e]">
            <div className="text-[11px] text-[#8c8272] font-semibold uppercase">Unreconciled Bank Lines</div>
            <div className="text-xl font-bold text-white mt-0.5">
              {allClients.reduce((sum, c) => sum + c.healthMetrics.unreconciledBankLinesCount, 0)} Items
            </div>
            <div className="text-[10px] text-[#8c8272] mt-1">Across connected Open Banking feeds</div>
          </div>

          <div className="bg-[#181920] p-3.5 rounded-xl border border-[#26241e]">
            <div className="text-[11px] text-[#8c8272] font-semibold uppercase">Missing Receipts Chased</div>
            <div className="text-xl font-bold text-white mt-0.5">
              {allClients.reduce((sum, c) => sum + c.healthMetrics.pendingReceiptsCount, 0)} Uploads Needed
            </div>
            <div className="text-[10px] text-emerald-400 mt-1">Auto-prompted in Client Portal</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#8c8272] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by company name, director, or CRN..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#111111] focus:outline-none focus:border-[#C0A262] min-h-[44px]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "ALL", label: "All Clients" },
            { id: "ACTION_REQUIRED", label: "Action Required" },
            { id: "LTD", label: "Limited Companies" },
            { id: "SOLE_TRADER", label: "Sole Traders" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as typeof filterType)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap min-h-[38px] transition-colors ${
                filterType === tab.id
                  ? "bg-[#111111] text-[#C0A262]"
                  : "bg-white text-[#666666] border border-[#D1D5DB] hover:text-[#111111]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Client Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredClients.map((client) => {
          const isActive = client.id === activeClient.id;
          return (
            <div
              key={client.id}
              className={`bg-white rounded-2xl border p-5 transition-all shadow-xs space-y-4 ${
                isActive
                  ? "border-[#C0A262] ring-2 ring-[#C0A262]/20"
                  : "border-[#D1D5DB] hover:border-[#9A7A3A]"
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-serif-heading font-bold text-base text-[#111111]">
                      {client.companyName}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#F0F5FA] text-[#475569] border border-[#E2E8F0]">
                      {client.entityType}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        client.complianceStatus === "GOOD_STANDING"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {client.complianceStatus === "GOOD_STANDING" ? "Compliant" : "Attention Required"}
                    </span>
                  </div>
                  <div className="text-xs text-[#666666]">
                    CRN: <span className="font-mono text-[#111111]">{client.companyNumber}</span> · VAT:{" "}
                    <span className="font-mono text-[#111111]">{client.vatNumber || "N/A"}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => switchClient(client.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors min-h-[38px] flex items-center gap-1 shrink-0 ${
                    isActive
                      ? "bg-[#111111] text-[#C0A262]"
                      : "bg-[#F0F5FA] text-[#111111] hover:bg-[#E2E8F0] border border-[#D1D5DB]"
                  }`}
                >
                  {isActive ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C0A262]" />
                      <span>Active Workspace</span>
                    </>
                  ) : (
                    <>
                      <span>Open Workspace</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {/* Statutory Timelines Strip */}
              <div className="bg-[#F8FAFC] rounded-xl p-3 border border-[#E2E8F0] grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="text-[10px] text-[#666666] font-semibold uppercase">Next VAT Return</div>
                  <div className="font-semibold text-[#111111] mt-0.5">{client.deadlines.nextVatReturnDate}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#666666] font-semibold uppercase">Accounts Due</div>
                  <div className="font-semibold text-[#111111] mt-0.5">{client.deadlines.nextAccountsDueDate}</div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <div className="text-[10px] text-[#666666] font-semibold uppercase">Pricing Model</div>
                  <div className="font-semibold text-[#046bd2] mt-0.5">
                    {client.billingModel === "INCLUDED_IN_RETAINER"
                      ? `Retainer (${formatGBP(client.monthlyFeePence)}/mo)`
                      : `SaaS Tier (${formatGBP(client.monthlyFeePence)}/mo)`}
                  </div>
                </div>
              </div>

              {/* Workload Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white border border-[#E2E8F0] p-2 rounded-lg">
                  <div className="text-[10px] text-[#666666]">Unmatched Bank</div>
                  <div className="font-bold text-[#111111] text-sm mt-0.5">
                    {client.healthMetrics.unreconciledBankLinesCount} lines
                  </div>
                </div>
                <div className="bg-white border border-[#E2E8F0] p-2 rounded-lg">
                  <div className="text-[10px] text-[#666666]">Pending Receipts</div>
                  <div className="font-bold text-[#111111] text-sm mt-0.5">
                    {client.healthMetrics.pendingReceiptsCount} items
                  </div>
                </div>
                <div className="bg-white border border-[#E2E8F0] p-2 rounded-lg">
                  <div className="text-[10px] text-[#666666]">Bank Cash</div>
                  <div className="font-bold text-[#111111] text-sm mt-0.5">
                    {formatGBP(client.healthMetrics.cashBalancePence)}
                  </div>
                </div>
              </div>

              {/* Explicit Attention Placeholders for Accountant & Client */}
              <div className="space-y-2 border-t border-[#E2E8F0] pt-3 text-xs">
                {/* Accountant Attention Section */}
                {client.integrationAttentionRequired?.needsAccountantAction && (
                  <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-2.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-blue-900 font-bold text-[11px]">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Accountant Review Required:</span>
                    </div>
                    <ul className="list-disc list-inside text-blue-800 text-[11px] space-y-0.5">
                      {client.integrationAttentionRequired.needsAccountantAction.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Client Attention Section */}
                {client.integrationAttentionRequired?.needsClientAction && (
                  <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-2.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-900 font-bold text-[11px]">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Pending Client Director Action:</span>
                    </div>
                    <ul className="list-disc list-inside text-amber-800 text-[11px] space-y-0.5">
                      {client.integrationAttentionRequired.needsClientAction.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Director & Contact Footer */}
              <div className="flex items-center justify-between text-[11px] text-[#666666] pt-1">
                <span>
                  Director: <strong className="text-[#111111]">{client.primaryDirector.name}</strong> (
                  {client.primaryDirector.email})
                </span>
                <span className="text-[10px] bg-[#F0F5FA] px-2 py-0.5 rounded text-[#475569]">
                  Assigned: {client.assignedAccountant.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
