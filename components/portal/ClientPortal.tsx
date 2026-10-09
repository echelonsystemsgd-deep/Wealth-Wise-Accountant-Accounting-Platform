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
  FileText,
  AlertCircle,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Send,
  Building2,
} from "lucide-react";

export function ClientPortal() {
  const { invoices, bills, financialSummary, bankStatements } = useAccounting();
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "INVOICES" | "DOCUMENTS" | "REPORTS" | "MESSAGES">("OVERVIEW");
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "Wealth Wise Accountant (Sarah Jenkins, ACCA)",
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
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
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
          {/* Welcome Banner */}
          <div className="p-4 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
            <div>
              <span className="text-xs text-slate-400 font-medium">Client Business Portal</span>
              <h2 className="text-lg font-bold">Apex Digital Solutions Ltd</h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Financial records synchronised with Wealth Wise Accountant general ledger.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("DOCUMENTS")}
                className="px-3 py-1.5 bg-white text-slate-900 text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors shadow-xs"
              >
                Upload Receipt
              </button>
              <button
                onClick={() => setActiveTab("INVOICES")}
                className="px-3 py-1.5 bg-slate-800 text-white text-xs font-semibold rounded-lg hover:bg-slate-700 transition-colors border border-slate-700"
              >
                + New Invoice
              </button>
            </div>
          </div>

          {/* Core financial metrics connected to AccountingContext */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card-surface p-4">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Live Cash Balance</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Wallet className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold font-mono text-slate-900">
                {formatGBP(financialSummary.cashBalancePence)}
              </div>
              <div className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
                Barclays Current (General Ledger Acc 1000)
              </div>
            </div>

            <div className="card-surface p-4">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Awaiting Payment</span>
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <ArrowDownLeft className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold font-mono text-slate-900">
                {formatGBP(unpaidInvoicesTotalPence)}
              </div>
              <div className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
                {unpaidInvoices.length} unpaid customer invoices
              </div>
            </div>

            <div className="card-surface p-4">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Bills to Pay</span>
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold font-mono text-slate-900">
                {formatGBP(financialSummary.accountsPayablePence || 74500)}
              </div>
              <div className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
                Accounts Payable (Acc 2000)
              </div>
            </div>

            <div className="card-surface p-4">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Est. VAT Liability</span>
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Receipt className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold font-mono text-slate-900">
                {formatGBP(financialSummary.netVatLiabilityPence)}
              </div>
              <div className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
                Q2 MTD VAT return due 07 Nov 2026
              </div>
            </div>
          </div>

          {/* Action items required from client */}
          <div className="card-surface p-5 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Urgent Actions Requested by Your Accountant
              </h3>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                2 Pending Items
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 bg-amber-50/50 border border-amber-200/80 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-amber-950">
                    Upload receipt for British Gas Commercial (£382.40)
                  </div>
                  <div className="text-amber-800 text-[11px] mt-0.5">
                    Needed to reclaim £18.20 VAT before Q2 submission.
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab("DOCUMENTS")}
                  className="px-3 py-1 font-bold text-white bg-slate-900 rounded hover:bg-slate-800 self-start sm:self-center"
                >
                  Upload File
                </button>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-slate-900">
                    Confirm payee description for £1,200 BACS transfer on 04 Oct
                  </div>
                  <div className="text-slate-500 text-[11px] mt-0.5">
                    Unallocated credit needs explanation from director.
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab("MESSAGES")}
                  className="px-3 py-1 font-semibold text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-50 self-start sm:self-center"
                >
                  Reply to Sarah
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "INVOICES" && <InvoicesView />}
      {activeTab === "DOCUMENTS" && <DocumentVaultView />}
      {activeTab === "REPORTS" && <FinancialReportsView />}

      {activeTab === "MESSAGES" && (
        <div className="card-surface p-5 space-y-4">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Direct Accountant Secure Messenger</h3>
              <p className="text-xs text-slate-500">
                Direct client-to-accountant correspondence linked to business books.
              </p>
            </div>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded font-medium border border-emerald-200">
              Assigned: Sarah Jenkins, ACCA
            </span>
          </div>

          <div className="space-y-3 max-h-[360px] overflow-y-auto p-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-lg max-w-lg text-xs ${
                  m.isAccountant
                    ? "bg-slate-100 text-slate-900 border border-slate-200 mr-auto"
                    : "bg-slate-900 text-white ml-auto"
                }`}
              >
                <div className="flex items-center justify-between mb-1 opacity-70 text-[11px]">
                  <span>{m.sender}</span>
                  <span>{m.time}</span>
                </div>
                <p className="leading-relaxed">{m.content}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-slate-100">
            <input
              type="text"
              placeholder="Type your message to your accountant..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" /> Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
