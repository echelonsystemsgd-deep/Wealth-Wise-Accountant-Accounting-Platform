"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AccountingProvider } from "@/lib/accounting/AccountingContext";
import { AccountantDashboard } from "@/components/dashboard/AccountantDashboard";
import { ClientPortal } from "@/components/portal/ClientPortal";
import { LandingPage } from "@/components/marketing/LandingPage";
import { LoginModal } from "@/components/auth/LoginModal";
import { Briefcase, Building2, Home as HomeIcon, LogIn, LogOut } from "lucide-react";

export default function Home() {
  const [viewMode, setViewMode] = useState<"WORKSPACE" | "LANDING">("WORKSPACE");
  const [activeRole, setActiveRole] = useState<"ACCOUNTANT" | "CLIENT">("ACCOUNTANT");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("sarah@wealthwiseaccountants.co.uk");

  const handleEnterFromLanding = (role: "ACCOUNTANT" | "CLIENT") => {
    setActiveRole(role);
    setCurrentUserEmail(
      role === "ACCOUNTANT"
        ? "sarah@wealthwiseaccountants.co.uk"
        : "marcus@apexdigital.co.uk"
    );
    setViewMode("WORKSPACE");
  };

  const handleLogin = (role: "ACCOUNTANT" | "CLIENT", email?: string) => {
    setActiveRole(role);
    if (email) setCurrentUserEmail(email);
    setViewMode("WORKSPACE");
  };

  return (
    <AccountingProvider>
      {viewMode === "LANDING" ? (
        <>
          <LandingPage
            onEnterApp={handleEnterFromLanding}
            onOpenLogin={() => setIsLoginModalOpen(true)}
          />
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            onLogin={handleLogin}
          />
        </>
      ) : (
        <div className="min-h-screen bg-[#0d0e11] text-[#f2ede4] flex flex-col font-sans selection:bg-[#c9a84c] selection:text-black">
          {/* Top Navigation Header */}
          <header className="sticky top-0 z-40 bg-[#121317]/95 backdrop-blur-md border-b border-[#26241e]">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
              {/* Brand Identity */}
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 shrink">
                <button
                  onClick={() => setViewMode("LANDING")}
                  className="bg-white px-2 py-0.5 rounded-md border border-[#c9a84c]/50 hover:border-[#c9a84c] transition-all shrink-0 shadow-xs"
                  title="View Public Landing Page"
                >
                  <Image
                    src="/images/wealthwise-gold-logo.png"
                    alt="Wealth Wise"
                    width={90}
                    height={18}
                    className="h-4.5 w-auto object-contain"
                  />
                </button>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
                      Wealthwise Accountants
                    </span>
                    <span className="hidden xs:inline-block text-[9px] sm:text-[10px] bg-[#1d1b15] text-[#c9a84c] px-1 sm:px-1.5 py-0.5 rounded font-mono font-medium border border-[#3b3424] shrink-0">
                      PLATFORM OS
                    </span>
                  </div>
                  <p className="hidden sm:block text-[11px] text-[#8c8272] truncate">
                    Proprietary Accounting & Practice Management
                  </p>
                </div>
              </div>

              {/* Action Controls & Role Switcher */}
              <div className="flex items-center gap-2 shrink-0">
                {/* View Landing Page Toggle */}
                <button
                  onClick={() => setViewMode("LANDING")}
                  className="hidden md:flex items-center gap-1 px-2.5 py-1.5 text-xs text-[#b3a793] hover:text-white hover:bg-[#1a1b22] rounded-lg transition-colors border border-transparent hover:border-[#2e2a21] min-h-[36px]"
                  title="Return to Public Landing Page"
                >
                  <HomeIcon className="w-3.5 h-3.5 text-[#c9a84c]" />
                  <span>Landing Page</span>
                </button>

                {/* Role Switcher Pill */}
                <div className="flex items-center bg-[#17181f] p-1 rounded-xl border border-[#26241e] text-xs font-semibold">
                  <button
                    onClick={() => {
                      setActiveRole("ACCOUNTANT");
                      setCurrentUserEmail("sarah@wealthwiseaccountants.co.uk");
                    }}
                    className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg transition-all min-h-[36px] ${
                      activeRole === "ACCOUNTANT"
                        ? "bg-[#25241f] text-[#c9a84c] border border-[#4a4029] shadow-xs"
                        : "text-[#8c8272] hover:text-white"
                    }`}
                    aria-label="Switch to Accountant Hub"
                  >
                    <Briefcase className="w-3.5 h-3.5 shrink-0" />
                    <span className="hidden md:inline">Accountant Hub</span>
                    <span className="inline md:hidden">Accountant</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveRole("CLIENT");
                      setCurrentUserEmail("marcus@apexdigital.co.uk");
                    }}
                    className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg transition-all min-h-[36px] ${
                      activeRole === "CLIENT"
                        ? "bg-[#25241f] text-[#c9a84c] border border-[#4a4029] shadow-xs"
                        : "text-[#8c8272] hover:text-white"
                    }`}
                    aria-label="Switch to Business Workspace"
                  >
                    <Building2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="hidden md:inline">Business Workspace</span>
                    <span className="inline md:hidden">Client</span>
                  </button>
                </div>

                {/* Profile Badge & Auth Actions */}
                <div className="flex items-center gap-2 pl-2 border-l border-[#26241e]">
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="flex items-center gap-2 hover:bg-[#1a1b22] p-1 rounded-lg transition-colors"
                    title="Switch user account or sign in"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#201e18] border border-[#4a4029] text-[#c9a84c] flex items-center justify-center text-xs font-bold shrink-0">
                      {activeRole === "ACCOUNTANT" ? "SJ" : "MS"}
                    </div>
                    <div className="text-left text-xs hidden lg:block">
                      <div className="font-bold text-white leading-tight">
                        {activeRole === "ACCOUNTANT" ? "Sarah Jenkins" : "Marcus Sterling"}
                      </div>
                      <div className="text-[10px] text-[#8c8272]">
                        {activeRole === "ACCOUNTANT" ? "Senior Partner" : "Director (Apex Ltd)"}
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Workspace Container */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
            {/* Real-time Ledger Status Banner */}
            <div className="mb-5 sm:mb-6 p-3 bg-[#141519] rounded-xl border border-[#26241e] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#a39783]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse shrink-0" />
                <span className="leading-tight">
                  <strong className="text-white">Double-Entry Ledger Active:</strong> Invoices, Bank Reconciliation, and Reports unified with zero float drift.
                </span>
              </div>
              <div className="text-[#8c8272] font-mono text-[11px] flex flex-wrap items-center gap-2">
                <span>Tenant: Apex Digital Solutions Ltd</span>
                <span className="hidden sm:inline">•</span>
                <span>Base Currency: GBP (£)</span>
                <span className="hidden sm:inline">•</span>
                <span className="text-[#c9a84c] font-semibold">{currentUserEmail}</span>
              </div>
            </div>

            {activeRole === "ACCOUNTANT" ? <AccountantDashboard /> : <ClientPortal />}
          </main>

          {/* Footer */}
          <footer className="border-t border-[#1f1e1a] bg-[#090a0c] py-4 mt-8 sm:mt-12 text-center text-xs text-[#706859] px-4 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto w-full">
            <p>© 2026 Wealthwise Accountants Limited · Company No. 16819892. All rights reserved.</p>
            <div className="flex items-center gap-4 text-[11px] text-[#8c8272]">
              <button
                onClick={() => setViewMode("LANDING")}
                className="hover:text-[#c9a84c] transition-colors"
              >
                Public Landing Page
              </button>
              <span>•</span>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="hover:text-[#c9a84c] transition-colors"
              >
                Switch Account
              </button>
            </div>
          </footer>

          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            onLogin={handleLogin}
          />
        </div>
      )}
    </AccountingProvider>
  );
}
