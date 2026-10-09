"use client";

import React, { useState } from "react";
import { SYNTHETIC_INVOICES, Invoice } from "@/lib/synthetic-data";
import { formatGBP } from "@/lib/utils";
import { Plus, Check, Clock, AlertTriangle, Send, FileCheck } from "lucide-react";

export function InvoicesView() {
  const [invoices, setInvoices] = useState<Invoice[]>(SYNTHETIC_INVOICES);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");
  const [newItemAmount, setNewItemAmount] = useState(1500);

  const handleMarkPaid = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: "PAID" } : inv))
    );
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer || !newItemDesc) return;

    const subtotalPence = newItemAmount * 100;
    const vatPence = Math.round(subtotalPence * 0.2); // UK Standard 20%
    const totalPence = subtotalPence + vatPence;

    const created: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2026-09${invoices.length + 1}`,
      clientOrgId: "cl-1",
      customerName: newCustomer,
      customerEmail: "finance@customer.co.uk",
      issueDate: "09 Oct 2026",
      dueDate: "23 Oct 2026",
      status: "SENT",
      subtotalPence,
      vatPence,
      totalPence,
      items: [
        {
          description: newItemDesc,
          quantity: 1,
          unitPricePence: subtotalPence,
          vatRatePercent: 20,
        },
      ],
    };

    setInvoices([created, ...invoices]);
    setShowCreateModal(false);
    setNewCustomer("");
    setNewItemDesc("");
  };

  return (
    <div className="card-surface p-5 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Sales Invoicing & Accounts Receivable
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated tax calculations, payment tracking, and ledger synchronization.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          Create New Invoice
        </button>
      </div>

      {/* Invoice Cards / Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="pb-3 pl-2">Invoice #</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Dates</th>
              <th className="pb-3 text-right">Net</th>
              <th className="pb-3 text-right">VAT (20%)</th>
              <th className="pb-3 text-right">Total</th>
              <th className="pb-3 text-center">Status</th>
              <th className="pb-3 pr-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 pl-2 font-mono font-bold text-slate-900">
                  {inv.invoiceNumber}
                </td>
                <td className="py-3">
                  <div className="font-semibold text-slate-900">{inv.customerName}</div>
                  <div className="text-[11px] text-slate-400">{inv.customerEmail}</div>
                </td>
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
                  ) : inv.status === "SENT" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium text-blue-700 bg-blue-50 border border-blue-200">
                      <Send className="w-3 h-3" /> Sent
                    </span>
                  ) : inv.status === "OVERDUE" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200">
                      <AlertTriangle className="w-3 h-3" /> Overdue
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
                      onClick={() => handleMarkPaid(inv.id)}
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

      {/* Quick Modal for Invoice Creation */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-slate-700" />
                Issue New Sales Invoice
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
                  value={newCustomer}
                  onChange={(e) => setNewCustomer(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="text-slate-600 block mb-1 font-medium">Service / Line Item Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Monthly Retainer & Consulting"
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="text-slate-600 block mb-1 font-medium">Net Amount (£)</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={newItemAmount}
                  onChange={(e) => setNewItemAmount(Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200/80 text-[11px] space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span>Net Subtotal:</span>
                  <span className="font-mono font-medium">£{newItemAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>VAT (UK Standard 20%):</span>
                  <span className="font-mono font-medium">£{(newItemAmount * 0.2).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold pt-1 border-t border-slate-200">
                  <span>Total Due:</span>
                  <span className="font-mono">£{(newItemAmount * 1.2).toFixed(2)}</span>
                </div>
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
                  Create & Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
