"use client";

import React, { useState } from "react";
import { AccountingProvider } from "@/lib/accounting/AccountingContext";
import { AccountantDashboard } from "@/components/dashboard/AccountantDashboard";
import { ClientPortal } from "@/components/portal/ClientPortal";
import {
  Shield,
  Briefcase,
  Building2,
  Bell,
  Sparkles,
  ArrowRightLeft,
  ChevronDown,
  Layers,
} from "lucide-react";

export default function Home() {
  const [activeRole, setActiveRole] = useState<"ACCOUNTANT" | "CLIENT">("ACCOUNTANT");

  return (
    <AccountingProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        {/* Top Navigation Header */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Brand Identity */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-sm">
                WW
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900 tracking-tight">
                    Wealth Wise Accountant
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono font-medium border border-slate-200">
                    PLATFORM OS
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Standalone Accounting Software Engine</p>
              </div>
            </div>

            {/* Role Switcher Pill */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
                <button
                  onClick={() => setActiveRole("ACCOUNTANT")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    activeRole === "ACCOUNTANT"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Accountant Hub</span>
                </button>
                <button
                  onClick={() => setActiveRole("CLIENT")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    activeRole === "CLIENT"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Business Workspace</span>
                </button>
              </div>

              {/* Profile badge */}
              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                  {activeRole === "ACCOUNTANT" ? "SJ" : "MS"}
                </div>
                <div className="text-left text-xs">
                  <div className="font-bold text-slate-900 leading-tight">
                    {activeRole === "ACCOUNTANT" ? "Sarah Jenkins" : "Marcus Sterling"}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {activeRole === "ACCOUNTANT" ? "ACCA Senior Partner" : "Director (Apex Ltd)"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Workspace Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Real-time Ledger Banner */}
          <div className="mb-6 p-3 bg-slate-100/90 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                <strong>Double-Entry Ledger Active:</strong> Invoices, Bank Reconciliation, and Reports are unified via live General Ledger state.
              </span>
            </div>
            <div className="text-slate-500 font-mono text-[11px] flex items-center gap-2">
              <span>Tenant: Apex Digital Solutions Ltd</span>
              <span>•</span>
              <span>Base Currency: GBP (£)</span>
            </div>
          </div>

          {activeRole === "ACCOUNTANT" ? <AccountantDashboard /> : <ClientPortal />}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white py-4 mt-12 text-center text-xs text-slate-400">
          <p>© 2026 Wealth Wise Accountant. Core double-entry general ledger architecture.</p>
        </footer>
      </div>
    </AccountingProvider>
  );
}
