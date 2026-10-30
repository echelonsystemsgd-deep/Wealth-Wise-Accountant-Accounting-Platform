"use client";

import React, { useState, useEffect } from "react";
import { useAccounting } from "@/lib/accounting/AccountingContext";
import { formatGBP } from "@/lib/utils";
import { DocumentVaultView } from "@/components/documents/DocumentVaultView";
import { InvoicesView } from "@/components/invoices/InvoicesView";
import { FinancialReportsView } from "@/components/reports/FinancialReportsView";
import { BRAND } from "@/lib/brand";
import { useAuth } from "@/lib/auth/AuthContext";
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Receipt,
  AlertCircle,
  Send,
  AlertTriangle,
  Sparkles,
  LayoutDashboard,
  FileText,
  BarChart3,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Phone,
  ShieldCheck,
  Building2,
  UploadCloud,
  CheckCircle2,
} from "lucide-react";

type TabId = "OVERVIEW" | "INVOICES" | "DOCUMENTS" | "REPORTS" | "MESSAGES";

export function ClientPortal() {
  const { invoices, financialSummary } = useAccounting();
  const { activeClient } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>("OVERVIEW");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: `${BRAND.practiceName} (Sarah Jenkins)`,
      time: "Yesterday, 16:30",
      content: "Hi Marcus, please upload the receipt for the £2,499 Apple Store payment from 07 Oct so we can reclaim the VAT.",
      isAccountant: true,
    },
    {
      sender: "You (Marcus Sterling)",
      time: "Today, 09:15",
      content: "Just uploaded the PDF via the vault tab now. Thanks Sarah!",
      isAccountant: false,
    },
  ]);

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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setMessages([
      ...messages,
      {
        sender: "You (Marcus Sterling)",
        time: "Just now",
        content: messageText,
        isAccountant: false,
      },
    ]);
    setMessageText("");
  };

  // Outstanding unpaid invoices
  const unpaidInvoices = invoices.filter((i) => i.status !== "PAID");
  const unpaidInvoicesTotalPence = unpaidInvoices.reduce((sum, i) => sum + i.amountDuePence, 0);

  const navGroups = [
    {
      group: "Business Intelligence",
      items: [
        {
          id: "OVERVIEW" as TabId,
          label: "Business Overview",
          shortLabel: "Overview",
          icon: LayoutDashboard,
          badge: "Live Feed",
          badgeColor: "bg-emerald-50 text-emerald-800",
        },
      ],
    },
    {
      group: "Invoicing & Receipts",
      items: [
        {
          id: "DOCUMENTS" as TabId,
          label: "Receipt & Bill Vault",
          shortLabel: "Receipts",
          icon: FileText,
          badge: "OCR Dropzone",
          badgeColor: "bg-[#111111] text-[#C0A262]",
        },
        {
          id: "INVOICES" as TabId,
          label: "Sales & Invoicing",
          shortLabel: "Invoices",
          icon: Receipt,
          badge: `${invoices.length}`,
          badgeColor: "bg-stone-100 text-stone-800",
        },
      ],
    },
    {
      group: "Compliance & Advisory",
      items: [
        {
          id: "REPORTS" as TabId,
          label: "Financial Statements & P&L",
          shortLabel: "P&L Reports",
          icon: BarChart3,
          badge: undefined,
          badgeColor: "",
        },
        {
          id: "MESSAGES" as TabId,
          label: "Accountant Thread",
          shortLabel: "Messages",
          icon: MessageSquare,
          badge: "1 Unread",
          badgeColor: "bg-amber-100 text-amber-900 border border-amber-300 font-bold",
        },
      ],
    },
  ];

  const currentTabItem = navGroups.flatMap((g) => g.items).find((i) => i.id === activeTab);

  return (
    <div className="space-y-4">
      {/* Mobile Control Header (<lg screens) */}
      <div className="lg:hidden bg-white border border-[#D1D5DB] rounded-xl p-3 shadow-xs space-y-2">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(true)}
            className="flex items-center gap-2 px-3 py-2 bg-[#000000] text-white rounded-lg text-xs font-semibold min-h-[44px] hover:bg-[#1f1f1f] transition-colors"
            aria-label="Open portal navigation sidebar menu"
          >
            <Menu className="w-4 h-4 text-[#C0A262]" />
            <span>Portal Menu: {currentTabItem?.label || "Navigation"}</span>
          </button>

          <span className="text-[11px] font-medium text-[#666666] px-2 py-1 bg-[#F0F5FA] rounded-md border border-[#E2E8F0]">
            {activeClient.companyNumber}
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
                    <div className="text-xs font-bold text-[#111111]">{activeClient.companyName}</div>
                    <div className="text-[10px] text-[#666666]">CRN: {activeClient.companyNumber}</div>
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
                  <span className="font-semibold text-[#111111]">Assigned Accountant</span>
                </div>
                <div className="text-[11px] text-[#666666] mt-1">
                  {activeClient.assignedAccountant.name} · {BRAND.practiceName}
                </div>
              </div>

              <a
                href="https://wa.me/447737014274?text=Hi%20Wealthwise%2C%20following%20up%20on%20my%20business%20client%20vault%20and%20receipts"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-[#25D366] text-black font-bold text-xs rounded-xl hover:bg-[#20ba59] transition-colors min-h-[44px]"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp Accountant</span>
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
                    <div className="text-xs font-bold text-[#111111] truncate">{activeClient.companyName}</div>
                    <div className="text-[10px] text-[#C0A262] font-semibold tracking-wider uppercase">Client Dropzone</div>
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

            {/* Quick Upload CTA in Sidebar */}
            {!isCollapsed && (
              <button
                type="button"
                onClick={() => setActiveTab("DOCUMENTS")}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-[#000000] text-white hover:bg-[#1a1a1a] rounded-xl text-xs font-semibold shadow-xs transition-colors min-h-[44px]"
              >
                <UploadCloud className="w-4 h-4 text-[#C0A262]" />
                <span>Upload New Receipt</span>
              </button>
            )}

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
                    <span className="font-bold text-[#111111]">{activeClient.assignedAccountant.name}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      ACCA Assigned
                    </span>
                  </div>
                  <div className="text-[11px] text-[#666666] mt-0.5">{BRAND.practiceName}</div>
                </div>

                <a
                  href="https://wa.me/447737014274?text=Hi%20Wealthwise%2C%20following%20up%20on%20my%20business%20client%20vault%20and%20receipts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#111111] text-[#C0A262] font-semibold text-xs rounded-xl hover:bg-[#222222] transition-colors min-h-[40px]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp Accountant</span>
                </a>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#F0F5FA] border border-[#E2E8F0] flex items-center justify-center text-[#111111]" title="Sarah Jenkins (ACCA)">
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
              {/* Welcome Banner */}
              <div className="p-6 bg-white border border-[#D1D5DB] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#C0A262] font-semibold uppercase tracking-wider">
                      Client Workspace
                    </span>
                    <span className="text-[10px] bg-[#F0F5FA] text-[#475569] px-2 py-0.5 rounded border border-[#E2E8F0] font-mono">
                      {activeClient.companyNumber}
                    </span>
                  </div>
                  <h2 className="font-serif-heading text-2xl font-bold text-[#111111] mt-1">
                    {activeClient.companyName}
                  </h2>
                  <p className="text-xs text-[#666666] mt-0.5">
                    Financial records synchronised with {BRAND.practiceName} general ledger · Assigned Accountant: <strong className="text-[#111111]">{activeClient.assignedAccountant.name}</strong>
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <button
                    type="button"
                    onClick={() => setActiveTab("DOCUMENTS")}
                    className="px-4 py-2 bg-[#000000] text-white text-xs font-semibold rounded-lg hover:bg-[#222222] transition-colors shadow-xs min-h-[44px]"
                  >
                    Upload Receipt
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("INVOICES")}
                    className="px-4 py-2 bg-[#F0F5FA] text-[#111111] border border-[#D1D5DB] text-xs font-semibold rounded-lg hover:bg-white transition-colors min-h-[44px]"
                  >
                    Create Invoice
                  </button>
                </div>
              </div>

              {/* Attention Required Banner: Client Tasks from Accountant */}
              {activeClient.integrationAttentionRequired?.needsClientAction && (
                <div className="bg-amber-50/90 border border-amber-300 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>ACTION REQUIRED BY CLIENT DIRECTOR:</span>
                    </div>
                    <span className="text-[10px] bg-amber-200/80 text-amber-900 font-bold px-2 py-0.5 rounded">
                      {activeClient.integrationAttentionRequired.needsClientAction.length} Items Pending
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-amber-800 space-y-1">
                    {activeClient.integrationAttentionRequired.needsClientAction.map((task, idx) => (
                      <li key={idx}>{task}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Business KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-[#D1D5DB] p-5 flex flex-col justify-between shadow-xs">
                  <div className="flex items-center justify-between text-[#666666]">
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Available Bank Cash
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#F0F5FA] border border-[#E2E8F0] flex items-center justify-center text-[#111111]">
                      <Wallet className="w-4 h-4 text-[#C0A262]" />
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="font-serif-heading text-3xl font-bold tracking-tight text-[#111111]">
                      {formatGBP(financialSummary.cashBalancePence)}
                    </div>
                    <div className="text-xs font-medium text-[#111111] flex items-center gap-1 mt-1">
                      <span>Synced from Barclays feed (Sample)</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#666666] border-t border-[#F0F5FA] pt-2">
                    Operating cash position (Dr 1200)
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#D1D5DB] p-5 flex flex-col justify-between shadow-xs">
                  <div className="flex items-center justify-between text-[#666666]">
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Unpaid Invoices (Owed)
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#F0F5FA] border border-[#E2E8F0] flex items-center justify-center text-[#111111]">
                      <ArrowDownLeft className="w-4 h-4 text-[#C0A262]" />
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="font-serif-heading text-3xl font-bold tracking-tight text-[#111111]">
                      {formatGBP(unpaidInvoicesTotalPence)}
                    </div>
                    <div className="text-xs font-medium text-[#C0A262] flex items-center gap-1 mt-1">
                      <span>{unpaidInvoices.length} invoices awaiting payment</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#666666] border-t border-[#F0F5FA] pt-2">
                    Debtors control account (Dr 1100)
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#D1D5DB] p-5 flex flex-col justify-between shadow-xs">
                  <div className="flex items-center justify-between text-[#666666]">
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      YTD Invoiced Turnover
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#F0F5FA] border border-[#E2E8F0] flex items-center justify-center text-[#111111]">
                      <ArrowUpRight className="w-4 h-4 text-[#C0A262]" />
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="font-serif-heading text-3xl font-bold tracking-tight text-[#111111]">
                      {formatGBP(financialSummary.totalTurnoverPence)}
                    </div>
                    <div className="text-xs font-medium text-[#111111] flex items-center gap-1 mt-1">
                      <span>Sales Revenue (Cr 4000)</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#666666] border-t border-[#F0F5FA] pt-2">
                    Recognised revenue
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#D1D5DB] p-5 flex flex-col justify-between shadow-xs">
                  <div className="flex items-center justify-between text-[#666666]">
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Corp Tax Accrual (Sample)
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#F0F5FA] border border-[#E2E8F0] flex items-center justify-center text-[#111111]">
                      <Receipt className="w-4 h-4 text-[#C0A262]" />
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="font-serif-heading text-3xl font-bold tracking-tight text-[#111111]">
                      {formatGBP(Math.round(financialSummary.netProfitPence * 0.19))}
                    </div>
                    <div className="text-xs font-medium text-[#666666] flex items-center gap-1 mt-1">
                      <span>Estimated small profits rate</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#666666] border-t border-[#F0F5FA] pt-2">
                    Tax provision estimate
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Communication */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-[#D1D5DB] p-6 flex flex-col justify-between shadow-xs">
                  <div>
                    <h3 className="font-serif-heading text-lg font-bold text-[#111111]">Quick Business Actions</h3>
                    <p className="text-xs text-[#666666] mt-0.5">
                      Send invoices, upload receipts, or inspect real-time reports
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      <button
                        type="button"
                        onClick={() => setActiveTab("INVOICES")}
                        className="p-4 text-left bg-[#F0F5FA] hover:bg-white rounded-xl border border-[#E2E8F0] hover:border-[#C0A262] transition-colors min-h-[44px]"
                      >
                        <div className="text-xs font-bold text-[#111111]">Create Sales Invoice</div>
                        <div className="text-[11px] text-[#666666] mt-0.5">Automatic VAT allocation</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("DOCUMENTS")}
                        className="p-4 text-left bg-[#F0F5FA] hover:bg-white rounded-xl border border-[#E2E8F0] hover:border-[#C0A262] transition-colors min-h-[44px]"
                      >
                        <div className="text-xs font-bold text-[#111111]">Upload Receipt / Bill</div>
                        <div className="text-[11px] text-[#666666] mt-0.5">OCR parsing to review queue</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("REPORTS")}
                        className="p-4 text-left bg-[#F0F5FA] hover:bg-white rounded-xl border border-[#E2E8F0] hover:border-[#C0A262] transition-colors min-h-[44px]"
                      >
                        <div className="text-xs font-bold text-[#111111]">Profit &amp; Loss Statement</div>
                        <div className="text-[11px] text-[#666666] mt-0.5">Live calculation</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("MESSAGES")}
                        className="p-4 text-left bg-[#F0F5FA] hover:bg-white rounded-xl border border-[#E2E8F0] hover:border-[#C0A262] transition-colors min-h-[44px]"
                      >
                        <div className="text-xs font-bold text-[#111111]">Ask My Accountant</div>
                        <div className="text-[11px] text-[#666666] mt-0.5">Direct chat with Sarah</div>
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 p-3.5 bg-[#F0F5FA] rounded-lg border border-[#E2E8F0] text-xs text-[#666666] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#C0A262] shrink-0" />
                    <span>Next VAT period ends 31 October. 4 receipts pending upload.</span>
                  </div>
                </div>

                {/* Direct Accountant Communication Widget */}
                <div className="bg-white rounded-xl border border-[#D1D5DB] p-6 flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                      <div>
                        <h3 className="font-serif-heading text-lg font-bold text-[#111111]">Accountant Direct Messenger</h3>
                        <p className="text-[11px] text-[#666666]">Direct thread with Sarah Jenkins</p>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#046bd2]" title="Active" />
                    </div>

                    <div className="my-3 space-y-2.5 max-h-48 overflow-y-auto pr-1">
                      {messages.map((m, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg text-xs ${
                            m.isAccountant
                              ? "bg-[#F0F5FA] border border-[#E2E8F0] text-[#111111]"
                              : "bg-[#000000] text-white ml-4"
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] text-[#666666] mb-1">
                            <span className={`font-semibold ${m.isAccountant ? "text-[#111111]" : "text-[#C0A262]"}`}>
                              {m.sender}
                            </span>
                            <span className={m.isAccountant ? "text-[#666666]" : "text-[#D1D5DB]"}>{m.time}</span>
                          </div>
                          <p className="text-xs leading-relaxed">{m.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-[#E2E8F0]">
                    <input
                      type="text"
                      placeholder="Ask a question or reply to Sarah..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-white border border-[#D1D5DB] rounded-lg text-[#111111] placeholder-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#C0A262] min-h-[44px]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#C0A262] hover:bg-[#CDBA7A] text-black rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 min-h-[44px]"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {activeTab === "INVOICES" && <InvoicesView />}
          {activeTab === "DOCUMENTS" && <DocumentVaultView />}
          {activeTab === "REPORTS" && <FinancialReportsView />}
          {activeTab === "MESSAGES" && (
            <div className="bg-white rounded-xl border border-[#D1D5DB] p-6 space-y-4 max-w-2xl mx-auto shadow-xs">
              <h3 className="font-serif-heading text-lg font-bold text-[#111111]">Full Accountant Communication Thread</h3>
              <p className="text-xs text-[#666666]">
                Archived client correspondence and tax reviews.
              </p>
              <div className="space-y-3 pt-2">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border text-xs ${
                      m.isAccountant
                        ? "bg-[#F0F5FA] border-[#E2E8F0] text-[#111111]"
                        : "bg-[#000000] text-white ml-6"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1 font-medium">
                      <span className={`font-bold ${m.isAccountant ? "text-[#111111]" : "text-[#C0A262]"}`}>
                        {m.sender}
                      </span>
                      <span className={m.isAccountant ? "text-[#666666]" : "text-[#D1D5DB]"}>{m.time}</span>
                    </div>
                    <p className="leading-relaxed">{m.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}