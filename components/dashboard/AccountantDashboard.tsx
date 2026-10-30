"use client";

import React, { useState, useEffect } from "react";
import { useAccounting } from "@/lib/accounting/AccountingContext";
import { formatGBP } from "@/lib/utils";
import { HighPrecisionFinancialChart } from "@/components/charts/HighPrecisionFinancialChart";
import { IntakeFunnelChart } from "@/components/charts/IntakeFunnelChart";
import { ReconciliationView } from "@/components/reconciliation/ReconciliationView";
import { DocumentVaultView } from "@/components/documents/DocumentVaultView";
import { InvoicesView } from "@/components/invoices/InvoicesView";
import { FinancialReportsView } from "@/components/reports/FinancialReportsView";
import { GeneralLedgerView } from "@/components/ledger/GeneralLedgerView";
import { PracticeCrmView } from "@/components/crm/PracticeCrmView";
import { useAuth } from "@/lib/auth/AuthContext";
import { BRAND } from "@/lib/brand";
import {
  Users,
  AlertCircle,
  FileCheck2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  Building2,
  ShieldAlert,
  ArrowRight,
  LayoutDashboard,
  BookOpen,
  Scale,
  Receipt,
  FileText,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Phone,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

type TabId = "OVERVIEW" | "CLIENTS" | "LEDGER" | "RECONCILIATION" | "DOCUMENTS" | "INVOICES" | "REPORTS";

export function AccountantDashboard() {
  const { isAccountant, role, user, switchRole } = useAuth();
  const { journals, bankStatements, invoices, financialSummary } = useAccounting();
  const [activeTab, setActiveTab] = useState<TabId>("CLIENTS");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Dynamic unreconciled count
  const unreconciledCount = bankStatements.filter((b) => !b.isReconciled).length;

  // Lock body scroll and listen for Escape key when mobile drawer is open
  useEffect(() => {
    if (!isMobileDrawerOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileDrawerOpen]);

  const navGroups = [
    {
      group: "Practice Management",
      items: [
        {
          id: "CLIENTS" as TabId,
          label: "Clients Portfolio",
          shortLabel: "Clients",
          icon: Users,
          badge: "48",
          badgeColor: "bg-[#111111] text-[#C0A262]",
        },
        {
          id: "OVERVIEW" as TabId,
          label: "Executive KPIs",
          shortLabel: "Overview",
          icon: LayoutDashboard,
          badge: undefined,
          badgeColor: "",
        },
      ],
    },
    {
      group: "Ledger & Compliance",
      items: [
        {
          id: "LEDGER" as TabId,
          label: "General Ledger",
          shortLabel: "Ledger",
          icon: BookOpen,
          badge: `${journals.length}`,
          badgeColor: "bg-stone-100 text-stone-800",
        },
        {
          id: "RECONCILIATION" as TabId,
          label: "Bank Reconciliation",
          shortLabel: "Bank Rec",
          icon: Scale,
          badge: unreconciledCount > 0 ? `${unreconciledCount} Due` : "Matched",
          badgeColor: unreconciledCount > 0 ? "bg-amber-100 text-amber-900 border border-amber-300 font-bold" : "bg-emerald-50 text-emerald-800",
        },
        {
          id: "REPORTS" as TabId,
          label: "Financial Statements",
          shortLabel: "Reports",
          icon: BarChart3,
          badge: "MTD",
          badgeColor: "bg-blue-50 text-blue-800",
        },
      ],
    },
    {
      group: "Operations & Billing",
      items: [
        {
          id: "INVOICES" as TabId,
          label: "Sales & Invoicing",
          shortLabel: "Invoices",
          icon: Receipt,
          badge: `${invoices.length}`,
          badgeColor: "bg-stone-100 text-stone-800",
        },
        {
          id: "DOCUMENTS" as TabId,
          label: "Document Vault",
          shortLabel: "Vault",
          icon: FileText,
          badge: "OCR Ingest",
          badgeColor: "bg-purple-50 text-purple-800",
        },
      ],
    },
  ];

  const currentTabItem = navGroups.flatMap((g) => g.items).find((i) => i.id === activeTab);

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

  // Role-Based UI Guard: If user switched to CLIENT_DIRECTOR, shield Practice CRM
  if (!isAccountant) {
    return (
      <div className="bg-white rounded-2xl border border-amber-300 p-8 text-center max-w-xl mx-auto my-12 shadow-sm space-y-4">
        <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-serif-heading text-xl font-bold text-[#111111]">
            Practice Management Access Restricted
          </h3>
          <p className="text-xs text-[#666666] mt-1.5 leading-relaxed">
            You are currently viewing as <strong className="text-[#111111]">{user?.fullName} ({role})</strong>.
            Under Phase 2 Row-Level Security &amp; RBAC, Client Directors cannot access multi-client portfolio data or practice ledgers.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
          <Link
            href="/demo/client"
            className="w-full sm:w-auto px-4 py-2.5 bg-[#111111] text-[#C0A262] rounded-xl text-xs font-semibold hover:bg-[#222222] transition-colors min-h-[44px] flex items-center justify-center gap-1.5"
          >
            <span>Go to My Client Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => switchRole("SENIOR_ACCOUNTANT")}
            className="w-full sm:w-auto px-4 py-2.5 bg-[#F0F5FA] text-[#111111] border border-[#D1D5DB] rounded-xl text-xs font-semibold hover:bg-white transition-colors min-h-[44px]"
          >
            Switch to Senior Accountant
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mobile Control Header (<lg screens) */}
      <div className="lg:hidden bg-white border border-[#D1D5DB] rounded-xl p-3 shadow-xs space-y-2">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(true)}
            className="flex items-center gap-2 px-3 py-2 bg-[#000000] text-white rounded-lg text-xs font-semibold min-h-[44px] hover:bg-[#1f1f1f] transition-colors"
            aria-label="Open navigation sidebar menu"
          >
            <Menu className="w-4 h-4 text-[#C0A262]" />
            <span>Practice Menu: {currentTabItem?.label || "Navigation"}</span>
          </button>

          <span className="text-[11px] font-medium text-[#666666] px-2 py-1 bg-[#F0F5FA] rounded-md border border-[#E2E8F0]">
            Senior Partner OS
          </span>
        </div>

        {/* Quick mobile horizontal pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none touch-pan-x text-xs">
          {navGroups.flatMap((g) => g.items).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-xs font-semibold transition-colors min-h-[40px] flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? "bg-[#000000] text-[#C0A262] shadow-xs"
                  : "bg-[#F0F5FA] text-[#444444] hover:bg-white hover:text-[#111111]"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.shortLabel}</span>
              {tab.badge && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${tab.badgeColor || "bg-stone-200 text-stone-800"}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Off-Canvas Drawer Modal */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="relative w-80 max-w-[85vw] bg-white h-full p-5 shadow-2xl flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-left duration-200">
            <div className="space-y-6">
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#000000] text-[#C0A262] flex items-center justify-center font-bold">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#111111]">{BRAND.practiceName}</div>
                    <div className="text-[10px] text-[#666666]">Accountant Practice OS</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="w-9 h-9 rounded-lg hover:bg-[#F0F5FA] text-[#666666] hover:text-[#111111] flex items-center justify-center min-h-[44px] min-w-[44px]"
                  aria-label="Close navigation sidebar drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Groups in Drawer */}
              <nav className="space-y-4">
                {navGroups.map((group) => (
                  <div key={group.group} className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#999999] px-2 mb-1.5">
                      {group.group}
                    </div>
                    {group.items.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => {
                            setActiveTab(tab.id);
                            setIsMobileDrawerOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors min-h-[44px] ${
                            isActive
                              ? "bg-[#000000] text-white shadow-xs"
                              : "text-[#444444] hover:bg-[#F0F5FA] hover:text-[#111111]"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className={`w-4 h-4 ${isActive ? "text-[#C0A262]" : "text-[#666666]"}`} />
                            <span>{tab.label}</span>
                          </div>
                          {tab.badge && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${tab.badgeColor || "bg-stone-100 text-stone-800"}`}>
                              {tab.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </nav>
            </div>

            {/* Drawer Footer Status */}
            <div className="border-t border-[#E2E8F0] pt-4 mt-6 space-y-3">
              <div className="p-3 bg-[#F0F5FA] rounded-xl border border-[#E2E8F0] text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-[#111111]">ACCA Practice Mode</span>
                </div>
                <div className="text-[11px] text-[#666666] mt-1">
                  Logged in as {user?.fullName || "Sarah Jenkins"}
                </div>
              </div>

              <a
                href="https://wa.me/447737014274?text=Hi%20Wealthwise%2C%20following%20up%20on%20the%20accounting%20platform%20practice%20management%20review"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-[#25D366] text-black font-bold text-xs rounded-xl hover:bg-[#20ba59] transition-colors min-h-[44px]"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp Practice Team</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace Layout (Sidebar + Content) */}
      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* Desktop Sidebar (lg:flex) */}
        <aside
          className={`hidden lg:flex flex-col justify-between shrink-0 bg-white border border-[#D1D5DB] rounded-2xl shadow-xs p-4 sticky top-24 transition-all duration-300 ${
            isCollapsed ? "w-20" : "w-64"
          }`}
          style={{ minHeight: "calc(100vh - 140px)" }}
        >
          <div className="space-y-6">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              {!isCollapsed && (
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-[#000000] text-[#C0A262] flex items-center justify-center font-bold shrink-0">
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#111111] truncate">{BRAND.practiceName}</div>
                    <div className="text-[10px] text-[#C0A262] font-semibold tracking-wider uppercase">Practice OS</div>
                  </div>
                </div>
              )}

              {isCollapsed && (
                <div className="mx-auto w-8 h-8 rounded-lg bg-[#000000] text-[#C0A262] flex items-center justify-center font-bold">
                  <Building2 className="w-4 h-4" />
                </div>
              )}

              <button
                type="button"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1.5 rounded-lg hover:bg-[#F0F5FA] text-[#666666] hover:text-[#111111] transition-colors"
                title={isCollapsed ? "Expand Sidebar (Widescreen)" : "Collapse Sidebar (Compact)"}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            </div>

            {/* Sidebar Navigation */}
            <nav className="space-y-5">
              {navGroups.map((group) => (
                <div key={group.group} className="space-y-1">
                  {!isCollapsed && (
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#999999] px-2 mb-1.5">
                      {group.group}
                    </div>
                  )}
                  {group.items.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center ${
                          isCollapsed ? "justify-center px-2 py-2.5" : "justify-between px-3 py-2.5"
                        } rounded-xl text-xs font-semibold transition-all min-h-[44px] ${
                          isActive
                            ? "bg-[#000000] text-white shadow-xs border-l-4 border-[#C0A262]"
                            : "text-[#555555] hover:bg-[#F0F5FA] hover:text-[#111111]"
                        }`}
                        title={isCollapsed ? tab.label : undefined}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#C0A262]" : "text-[#666666]"}`} />
                          {!isCollapsed && <span className="truncate">{tab.label}</span>}
                        </div>
                        {!isCollapsed && tab.badge && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${tab.badgeColor || "bg-stone-100 text-stone-800"}`}>
                            {tab.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </nav>
          </div>

          {/* Sidebar Footer Card */}
          <div className="border-t border-[#E2E8F0] pt-4 mt-6 space-y-3">
            {!isCollapsed ? (
              <>
                <div className="p-3 bg-[#F0F5FA] rounded-xl border border-[#E2E8F0] text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#111111]">{user?.fullName || "Sarah Jenkins"}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      MTD Live
                    </span>
                  </div>
                  <div className="text-[11px] text-[#666666] mt-0.5">{role.replace(/_/g, " ")} · ACCA</div>
                </div>

                <a
                  href="https://wa.me/447737014274?text=Hi%20Wealthwise%2C%20following%20up%20on%20the%20accounting%20platform%20practice%20management%20review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#111111] text-[#C0A262] font-semibold text-xs rounded-xl hover:bg-[#222222] transition-colors min-h-[40px]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp Support</span>
                </a>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#F0F5FA] border border-[#E2E8F0] flex items-center justify-center text-[#111111]" title="Senior Accountant (ACCA)">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Tab Content Display */}
        <div className="flex-1 w-full min-w-0">
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
                      <span>VAT &amp; Statutory accounts · 07 Nov</span>
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
                        <span>Overheads &amp; COGS</span>
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
                      Workflow &amp; Review Pipeline
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
                    type="button"
                    onClick={() => setActiveTab("LEDGER")}
                    className="p-4 text-left bg-[#F0F5FA] hover:bg-white rounded-xl border border-[#E2E8F0] hover:border-[#C0A262] transition-colors min-h-[44px]"
                  >
                    <div className="text-xs font-bold text-[#111111]">General Ledger</div>
                    <div className="text-[11px] text-[#666666] mt-0.5">Trial Balance &amp; Journals</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("RECONCILIATION")}
                    className="p-4 text-left bg-[#F0F5FA] hover:bg-white rounded-xl border border-[#E2E8F0] hover:border-[#C0A262] transition-colors min-h-[44px]"
                  >
                    <div className="text-xs font-bold text-[#111111]">Bank Feeds</div>
                    <div className="text-[11px] text-[#666666] mt-0.5">Statement Matching</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("INVOICES")}
                    className="p-4 text-left bg-[#F0F5FA] hover:bg-white rounded-xl border border-[#E2E8F0] hover:border-[#C0A262] transition-colors min-h-[44px]"
                  >
                    <div className="text-xs font-bold text-[#111111]">Invoicing &amp; AR</div>
                    <div className="text-[11px] text-[#666666] mt-0.5">Sales &amp; Debtor Tracking</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("REPORTS")}
                    className="p-4 text-left bg-[#F0F5FA] hover:bg-white rounded-xl border border-[#E2E8F0] hover:border-[#C0A262] transition-colors min-h-[44px]"
                  >
                    <div className="text-xs font-bold text-[#111111]">Financial Reports</div>
                    <div className="text-[11px] text-[#666666] mt-0.5">P&amp;L and Balance Sheet</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "CLIENTS" && <PracticeCrmView />}
          {activeTab === "LEDGER" && <GeneralLedgerView />}
          {activeTab === "RECONCILIATION" && <ReconciliationView />}
          {activeTab === "INVOICES" && <InvoicesView />}
          {activeTab === "DOCUMENTS" && <DocumentVaultView />}
          {activeTab === "REPORTS" && <FinancialReportsView />}
        </div>
      </div>
    </div>
  );
}