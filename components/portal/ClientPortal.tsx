"use client";

import React, { useState } from "react";
import { useAccounting } from "@/lib/accounting/AccountingContext";
import { formatGBP } from "@/lib/utils";
import { DocumentVaultView } from "@/components/documents/DocumentVaultView";
import { InvoicesView } from "@/components/invoices/InvoicesView";
import { FinancialReportsView } from "@/components/reports/FinancialReportsView";
import { BRAND } from "@/lib/brand";
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Receipt,
  AlertCircle,
  Send,
} from "lucide-react";

export function ClientPortal() {
  const { invoices, financialSummary } = useAccounting();
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "INVOICES" | "DOCUMENTS" | "REPORTS" | "MESSAGES">("OVERVIEW");
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

  return (
    <div className="space-y-6">
      {/* Sub-nav tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#D1D5DB] scrollbar-none touch-pan-x -mx-1 px-1">
        {[
          { id: "OVERVIEW", label: "My Business Overview" },
          { id: "INVOICES", label: `Sales & Invoicing (${invoices.length})` },
          { id: "DOCUMENTS", label: "Upload Receipts & Bills" },
          { id: "REPORTS", label: "Financial Reports & P&L" },
          { id: "MESSAGES", label: "Accountant Direct Messages" },
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
          {/* Welcome Banner */}
          <div className="p-6 bg-white border border-[#D1D5DB] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div>
              <span className="text-xs text-[#C0A262] font-semibold uppercase tracking-wider">
                Sample Client Workspace
              </span>
              <h2 className="font-serif-heading text-2xl font-bold text-[#111111] mt-1">
                Apex Digital Solutions Ltd
              </h2>
              <p className="text-xs text-[#666666] mt-0.5">
                Financial records synchronised with {BRAND.practiceName} general ledger.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                onClick={() => setActiveTab("DOCUMENTS")}
                className="px-4 py-2 bg-[#000000] text-white text-xs font-semibold rounded-lg hover:bg-[#222222] transition-colors shadow-xs min-h-[44px]"
              >
                Upload Receipt
              </button>
              <button
                onClick={() => setActiveTab("INVOICES")}
                className="px-4 py-2 bg-[#F0F5FA] text-[#111111] border border-[#D1D5DB] text-xs font-semibold rounded-lg hover:bg-white transition-colors min-h-[44px]"
              >
                Create Invoice
              </button>
            </div>
          </div>

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
                    onClick={() => setActiveTab("INVOICES")}
                    className="p-4 text-left bg-[#F0F5FA] hover:bg-white rounded-xl border border-[#E2E8F0] hover:border-[#C0A262] transition-colors min-h-[44px]"
                  >
                    <div className="text-xs font-bold text-[#111111]">Create Sales Invoice</div>
                    <div className="text-[11px] text-[#666666] mt-0.5">Automatic VAT allocation</div>
                  </button>
                  <button
                    onClick={() => setActiveTab("DOCUMENTS")}
                    className="p-4 text-left bg-[#F0F5FA] hover:bg-white rounded-xl border border-[#E2E8F0] hover:border-[#C0A262] transition-colors min-h-[44px]"
                  >
                    <div className="text-xs font-bold text-[#111111]">Upload Receipt / Bill</div>
                    <div className="text-[11px] text-[#666666] mt-0.5">OCR parsing to review queue</div>
                  </button>
                  <button
                    onClick={() => setActiveTab("REPORTS")}
                    className="p-4 text-left bg-[#F0F5FA] hover:bg-white rounded-xl border border-[#E2E8F0] hover:border-[#C0A262] transition-colors min-h-[44px]"
                  >
                    <div className="text-xs font-bold text-[#111111]">Profit & Loss Statement</div>
                    <div className="text-[11px] text-[#666666] mt-0.5">Live calculation</div>
                  </button>
                  <button
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
  );
}
