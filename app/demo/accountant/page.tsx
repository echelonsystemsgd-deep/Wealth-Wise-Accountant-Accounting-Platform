"use client";

import React from "react";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { AccountingProvider } from "@/lib/accounting/AccountingContext";
import { AccountantDashboard } from "@/components/dashboard/AccountantDashboard";
import { ArrowUpRight } from "lucide-react";
import { DemoHeader } from "@/components/demo/DemoHeader";
import { BRAND } from "@/lib/brand";

export default function AccountantDemoPage() {
  return (
    <AuthProvider initialRole="SENIOR_ACCOUNTANT">
      <AccountingProvider>
      <div className="min-h-screen bg-[#F0F5FA] text-[#111111] flex flex-col font-sans">
        <DemoHeader
          activeView="ACCOUNTANT"
          title="Accountant Hub Demo"
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6">
          <AccountantDashboard />
        </main>

        <footer className="border-t border-[#D1D5DB] bg-[#FFFFFF] py-6 px-4 text-center text-xs text-[#666666]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© 2026 {BRAND.legalName} · Prototype for review only (Static Sample Data)</p>
            <a
              href="https://mercianwealth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#000000] hover:bg-[#111111] text-xs text-white border border-[#C0A262]/60 hover:border-[#C0A262] transition-all shadow-xs group min-h-[40px]"
              aria-label="Designed and built by Mercian Wealth"
            >
              <span className="text-[#D1D5DB]">Designed &amp; Built by</span>
              <span className="font-semibold text-[#C0A262]">Mercian Wealth</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C0A262] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </footer>
      </div>
    </AccountingProvider>
  </AuthProvider>
  );
}
