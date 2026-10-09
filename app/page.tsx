"use client";

import React, { useState } from "react";
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
} from "lucide-react";

export default function Home() {
  const [activeRole, setActiveRole] = useState<"ACCOUNTANT" | "CLIENT">("ACCOUNTANT");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Professional Navigation Header */}
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
              <p className="text-[11px] text-slate-400">Financial Operating System</p>
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
                <span>Client Portal</span>
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
                  {activeRole === "ACCOUNTANT" ? "Senior Partner" : "Director (Apex Ltd)"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Prototype context banner with clear labeling */}
        <div className="mb-6 p-3 bg-slate-100/80 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              <strong>Phase 1 High-Fidelity Prototype:</strong> Operating on synthetic UK client data with deterministic accounting rules.
            </span>
          </div>
          <div className="text-slate-400 font-mono text-[11px]">
            Mode: {activeRole === "ACCOUNTANT" ? "Practice Management" : "Client Workspace"}
          </div>
        </div>

        {activeRole === "ACCOUNTANT" ? <AccountantDashboard /> : <ClientPortal />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-12 text-center text-xs text-slate-400">
        <p>© 2026 Wealth Wise Accountant. Engineered for financial correctness, auditability, and practice efficiency.</p>
      </footer>
    </div>
  );
}
