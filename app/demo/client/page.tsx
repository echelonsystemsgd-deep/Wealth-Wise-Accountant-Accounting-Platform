"use client";

import React from "react";
import { AccountingProvider } from "@/lib/accounting/AccountingContext";
import { ClientPortal } from "@/components/portal/ClientPortal";
import { DemoHeader } from "@/components/demo/DemoHeader";
import { BRAND } from "@/lib/brand";

export default function ClientDemoPage() {
  return (
    <AccountingProvider>
      <div className="min-h-screen bg-[#F0F5FA] text-[#111111] flex flex-col font-sans">
        <DemoHeader
          activeView="CLIENT"
          title="Client Business Portal Demo"
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6">
          <ClientPortal />
        </main>

        <footer className="border-t border-[#D1D5DB] bg-[#FFFFFF] py-4 text-center text-xs text-[#666666]">
          <p>© 2026 {BRAND.legalName} · Prototype for review only (Static Sample Data)</p>
        </footer>
      </div>
    </AccountingProvider>
  );
}
