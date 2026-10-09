"use client";

import React, { useState } from "react";
import { useAccounting } from "@/lib/accounting/AccountingContext";
import { formatGBP, calculateVatPence } from "@/lib/utils";
import { Plus, Check, Clock, Send, FileCheck, Search, Scale } from "lucide-react";

export function InvoicesView() {
  const { invoices, createInvoice, payInvoice } = useAccounting();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [netAmountPounds, setNetAmountPounds] = useState(1500);
  const [vatTreatment, setVatTreatment] = useState<"STANDARD_20" | "REDUCED_5" | "ZERO_0">("STANDARD_20");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !itemDesc.trim()) return;

    const subtotalPence = netAmountPounds * 100;
    const vatPence = calculateVatPence(subtotalPence, vatTreatment);
    const totalPence = subtotalPence + vatPence;

    const vatPercent = vatTreatment === "STANDARD_20" ? 20 : vatTreatment === "REDUCED_5" ? 5 : 0;

    createInvoice({
      businessId: "biz-1",
      invoiceNumber: `INV-2026-09${invoices.length + 1}`,
      contactId: `cnt-${Date.now()}`,
      contactName: customerName,
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: "2026-10-31",
      items: [
        {
          id: `item-${Date.now()}`,
          description: itemDesc,
          accountCode: "4000",
          quantity: 1,
          unitPricePence: subtotalPence,
          vatRatePercent: vatPercent,
          vatPence,
          lineTotalPence: totalPence,
        },
      ],
      subtotalPence,
      vatPence,
      totalPence,
    });

    setShowCreateModal(false);
    setCustomerName("");
    setItemDesc("");
  };

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.contactName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="card-surface p-5 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Sales Invoicing & Accounts Receivable (Dr 1100 / Cr 4000)
            </h3>
            <span className="text-xs bg-slate-100 text-slate-700 font-mono font-medium px-2 py-0.5 rounded">
              GENERAL LEDGER LINKED
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Every issued invoice automatically posts a balanced double-entry journal entry to the general ledger.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg w-full sm:w-48"
            />
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            Create & Post Invoice
          </button>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="pb-3 pl-2">Invoice #</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Dates</th>
              <th className="pb-3 text-right">Net Subtotal</th>
              <th className="pb-3 text-right">VAT</th>
              <th className="pb-3 text-right">Total Due</th>
              <th className="pb-3 text-center">Status</th>
              <th className="pb-3 pr-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredInvoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 pl-2 font-mono font-bold text-slate-900">
                  {inv.invoiceNumber}
                  {inv.journalEntryId && (
                    <span className="block text-[10px] text-slate-400 font-normal">
                      GL: {inv.journalEntryId}
                    </span>
                  )}
                </td>
                <td className="py-3 font-semibold text-slate-900">{inv.contactName}</td>
                <td className="py-3 text-[11px] text-slate-500">
                  <div>Issued: {inv.issueDate}</div>
                  <div className="text-slate-400">Due: {inv.dueDate}</div>
                </td>
                <td className="py-3 text-right font-mono text-slate-600">
                  {formatGBP(inv.subtotalPence)}
                </td>
                <td className="py-3 text-right font-mono text-slate-500">
                  {formatGBP(inv.vatPence)}
                </td>
                <td className="py-3 text-right font-mono font-bold text-slate-900">
                  {formatGBP(inv.totalPence)}
                </td>
                <td className="py-3 text-center">
                  {inv.status === "PAID" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                      <Check className="w-3 h-3" /> Paid
                    </span>
                  ) : inv.status === "ISSUED" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium text-blue-700 bg-blue-50 border border-blue-200">
                      <Send className="w-3 h-3" /> Issued
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium text-slate-600 bg-slate-100">
                      <Clock className="w-3 h-3" /> Draft
                    </span>
                  )}
                </td>
                <td className="py-3 pr-2 text-right">
                  {inv.status !== "PAID" && (
                    <button
                      onClick={() => payInvoice(inv.id)}
                      className="px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                    >
                      Record Payment
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Invoice Creation */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-slate-700" />
                Create Sales Invoice & Post to Ledger
              </h4>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-600 block mb-1 font-medium">Customer Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Tech Solutions Ltd"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="text-slate-600 block mb-1 font-medium">Service / Line Item Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Monthly Retainer & Consulting"
                  value={itemDesc}
                  onChange={(e) => setItemDesc(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 block mb-1 font-medium">Net Amount (£)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={netAmountPounds}
                    onChange={(e) => setNetAmountPounds(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1 font-medium">VAT Treatment</label>
                  <select
                    value={vatTreatment}
                    onChange={(e) => setVatTreatment(e.target.value as typeof vatTreatment)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs"
                  >
                    <option value="STANDARD_20">UK Standard (20%)</option>
                    <option value="REDUCED_5">UK Reduced (5%)</option>
                    <option value="ZERO_0">UK Zero Rated (0%)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200/80 text-[11px] space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span>Net Turnover:</span>
                  <span className="font-mono font-medium">
                    {formatGBP(netAmountPounds * 100)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>VAT Component:</span>
                  <span className="font-mono font-medium">
                    {formatGBP(calculateVatPence(netAmountPounds * 100, vatTreatment))}
                  </span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold pt-1 border-t border-slate-200">
                  <span>Total Payable:</span>
                  <span className="font-mono">
                    {formatGBP(
                      netAmountPounds * 100 +
                        calculateVatPence(netAmountPounds * 100, vatTreatment)
                    )}
                  </span>
                </div>
              </div>

              <div className="p-2.5 bg-emerald-50 rounded border border-emerald-200 text-[10px] text-emerald-800 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>
                  Posting creates journal: <strong>Dr 1100 Trade Debtors</strong>, <strong>Cr 4000 Sales Turnover</strong>, <strong>Cr 2200 VAT Output</strong>.
                </span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm"
                >
                  Post to Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
