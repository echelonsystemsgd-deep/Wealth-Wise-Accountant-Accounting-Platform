"use client";

import React, { useState } from "react";
import { useAccounting } from "@/lib/accounting/AccountingContext";
import { formatGBP } from "@/lib/utils";
import { DocumentVaultView } from "@/components/documents/DocumentVaultView";
import { InvoicesView } from "@/components/invoices/InvoicesView";
import { FinancialReportsView } from "@/components/reports/FinancialReportsView";
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
      sender: "Wealthwise Accountant (Sarah Jenkins, ACCA)",
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
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#26241e] scrollbar-none touch-pan-x -mx-1 px-1">
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
          {/* Welcome Banner */}
          <div className="p-4 sm:p-5 bg-[#141519] border border-[#26241e] text-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div>
              <span className="text-xs text-[#c9a84c] font-medium">Client Business Portal</span>
              <h2 className="text-lg font-bold">Apex Digital Solutions Ltd</h2>
              <p className="text-xs text-[#8c8272] mt-0.5">
                Financial records synchronised directly with Wealthwise Accountants general ledger.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                onClick={() => setActiveTab("DOCUMENTS")}
                className="px-3.5 py-2 bg-[#25241f] text-[#c9a84c] border border-[#4a4029] text-xs font-bold rounded-lg hover:bg-[#302a1e] transition-colors shadow-xs min-h-[36px]"
              >
                Upload Receipt
              </button>
              <button
                onClick={() => setActiveTab("INVOICES")}
                className="px-3.5 py-2 bg-[#1b1c22] text-[#f2ede4] border border-[#2e2a21] text-xs font-semibold rounded-lg hover:bg-[#252630] transition-colors min-h-[36px]"
              >
                Create Invoice
              </button>
            </div>
          </div>

          {/* Business KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card-surface p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#8c8272]">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Available Bank Cash
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#1a1b22] border border-[#2e2b22] flex items-center justify-center text-[#c9a84c]">
                  <Wallet className="w-4 h-4" />
                </div>
              </div>
              <div className="my-2">
                <div className="text-2xl font-bold tracking-tight text-white">
                  {formatGBP(financialSummary.cashBalancePence)}
                </div>
                <div className="text-xs font-medium text-[#c9a84c] flex items-center gap-1 mt-1">
                  <span>Synced from Barclays feed</span>
                </div>
              </div>
              <div className="text-[11px] text-[#706859] border-t border-[#26241e] pt-2">
                Real-time cash in bank (Dr 1200)
              </div>
            </div>

            <div className="card-surface p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#8c8272]">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Unpaid Invoices (Owed To You)
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#1a1b22] border border-[#2e2b22] flex items-center justify-center text-[#c9a84c]">
                  <ArrowDownLeft className="w-4 h-4" />
                </div>
              </div>
              <div className="my-2">
                <div className="text-2xl font-bold tracking-tight text-white">
                  {formatGBP(unpaidInvoicesTotalPence)}
                </div>
                <div className="text-xs font-medium text-[#e5c158] flex items-center gap-1 mt-1">
                  <span>{unpaidInvoices.length} invoices awaiting payment</span>
                </div>
              </div>
              <div className="text-[11px] text-[#706859] border-t border-[#26241e] pt-2">
                Debtors control account (Dr 1100)
              </div>
            </div>

            <div className="card-surface p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#8c8272]">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  YTD Invoiced Turnover
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#1a1b22] border border-[#2e2b22] flex items-center justify-center text-[#c9a84c]">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div className="my-2">
                <div className="text-2xl font-bold tracking-tight text-white">
                  {formatGBP(financialSummary.totalTurnoverPence)}
                </div>
                <div className="text-xs font-medium text-[#c9a84c] flex items-center gap-1 mt-1">
                  <span>Sales Revenue (Cr 4000)</span>
                </div>
              </div>
              <div className="text-[11px] text-[#706859] border-t border-[#26241e] pt-2">
                Accrual accounting revenue recognised
              </div>
            </div>

            <div className="card-surface p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#8c8272]">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Estimated Corp Tax Accrual
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#1a1b22] border border-[#2e2b22] flex items-center justify-center text-[#c9a84c]">
                  <Receipt className="w-4 h-4" />
                </div>
              </div>
              <div className="my-2">
                <div className="text-2xl font-bold tracking-tight text-white">
                  {formatGBP(Math.round(financialSummary.netProfitPence * 0.19))}
                </div>
                <div className="text-xs font-medium text-[#8c8272] flex items-center gap-1 mt-1">
                  <span>Provisioned at 19% small profits</span>
                </div>
              </div>
              <div className="text-[11px] text-[#706859] border-t border-[#26241e] pt-2">
                Tracked continuously for CT600
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent Communication */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-surface p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Quick Business Actions</h3>
                <p className="text-xs text-[#8c8272] mt-0.5">
                  Send invoices, log receipts, or inspect your real-time Profit & Loss
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <button
                    onClick={() => setActiveTab("INVOICES")}
                    className="p-3 text-left bg-[#16171d] hover:bg-[#1e1f28] rounded-xl border border-[#282620] hover:border-[#4a4029] transition-all"
                  >
                    <div className="text-xs font-bold text-white">Create Sales Invoice</div>
                    <div className="text-[11px] text-[#8c8272] mt-0.5">Send PDF with auto VAT calc</div>
                  </button>
                  <button
                    onClick={() => setActiveTab("DOCUMENTS")}
                    className="p-3 text-left bg-[#16171d] hover:bg-[#1e1f28] rounded-xl border border-[#282620] hover:border-[#4a4029] transition-all"
                  >
                    <div className="text-xs font-bold text-white">Upload Receipt / Bill</div>
                    <div className="text-[11px] text-[#8c8272] mt-0.5">Instant OCR & accountant review</div>
                  </button>
                  <button
                    onClick={() => setActiveTab("REPORTS")}
                    className="p-3 text-left bg-[#16171d] hover:bg-[#1e1f28] rounded-xl border border-[#282620] hover:border-[#4a4029] transition-all"
                  >
                    <div className="text-xs font-bold text-white">Profit & Loss Report</div>
                    <div className="text-[11px] text-[#8c8272] mt-0.5">Live view without stale spreadsheets</div>
                  </button>
                  <button
                    onClick={() => setActiveTab("MESSAGES")}
                    className="p-3 text-left bg-[#16171d] hover:bg-[#1e1f28] rounded-xl border border-[#282620] hover:border-[#4a4029] transition-all"
                  >
                    <div className="text-xs font-bold text-white">Ask My Accountant</div>
                    <div className="text-[11px] text-[#8c8272] mt-0.5">Direct chat with Sarah Jenkins</div>
                  </button>
                </div>
              </div>
              <div className="mt-4 p-3 bg-[#17181f] rounded-lg border border-[#26241e] text-xs text-[#8c8272] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#c9a84c] shrink-0" />
                <span>Next VAT period ends 31 October. 4 receipts pending upload.</span>
              </div>
            </div>

            {/* Direct Accountant Communication Widget */}
            <div className="card-surface p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#26241e]">
                  <div>
                    <h3 className="text-sm font-bold text-white">Accountant In-App Messenger</h3>
                    <p className="text-[11px] text-[#8c8272]">Direct thread with Sarah Jenkins (ACCA Senior Partner)</p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#c9a84c]" title="Online" />
                </div>

                <div className="my-3 space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-lg text-xs ${
                        m.isAccountant
                          ? "bg-[#181920] border border-[#2a2821] text-[#f2ede4]"
                          : "bg-[#25241f] border border-[#4a4029] text-[#f2ede4] ml-4"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-[#8c8272] mb-1">
                        <span className="font-semibold text-white">{m.sender}</span>
                        <span>{m.time}</span>
                      </div>
                      <p className="text-xs leading-relaxed">{m.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-[#26241e]">
                <input
                  type="text"
                  placeholder="Ask a question or reply to Sarah..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-[#0d0e11] border border-[#2e2a21] rounded-lg text-white placeholder-[#706859] focus:outline-hidden focus:ring-1 focus:ring-[#c9a84c]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#25241f] hover:bg-[#302a1e] border border-[#4a4029] text-[#c9a84c] rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
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
        <div className="card-surface p-5 space-y-4 max-w-2xl mx-auto">
          <h3 className="text-sm font-bold text-white">Full Accountant Communication Thread</h3>
          <p className="text-xs text-[#8c8272]">
            Every conversation, receipt question, and tax planning review is archived directly with your business records.
          </p>
          <div className="space-y-3 pt-2">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-xs ${
                  m.isAccountant
                    ? "bg-[#181920] border-[#2a2821] text-white"
                    : "bg-[#25241f] border-[#4a4029] text-white ml-6"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-[#8c8272] mb-1 font-medium">
                  <span className="font-bold text-white">{m.sender}</span>
                  <span>{m.time}</span>
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
