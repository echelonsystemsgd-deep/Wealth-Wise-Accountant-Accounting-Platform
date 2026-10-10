"use client";

import React, { useState } from "react";
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
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("sarah@wealthwiseaccountant.co.uk");

  const handleEnterFromLanding = (role: "ACCOUNTANT" | "CLIENT") => {
    setActiveRole(role);
    setCurrentUserEmail(
      role === "ACCOUNTANT"
        ? "sarah@wealthwiseaccountant.co.uk"
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
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
          {/* Top Navigation Header */}
          <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
              {/* Brand Identity */}
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 shrink">
                <button
                  onClick={() => setViewMode("LANDING")}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs sm:text-sm tracking-tight shadow-sm shrink-0 hover:bg-slate-800 transition-colors"
                  title="View Public Landing Page"
                >
                  WW
                </button>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight truncate">
                      Wealth Wise Accountant
                    </span>
                    <span className="hidden xs:inline-block text-[9px] sm:text-[10px] bg-slate-100 text-slate-700 px-1 sm:px-1.5 py-0.5 rounded font-mono font-medium border border-slate-200 shrink-0">
                      PLATFORM OS
                    </span>
                  </div>
                  <p className="hidden sm:block text-[11px] text-slate-400 truncate">
                    Standalone Accounting Software Engine
                  </p>
                </div>
              </div>

              {/* Action Controls & Role Switcher */}
              <div className="flex items-center gap-2 shrink-0">
                {/* View Landing Page Toggle */}
                <button
                  onClick={() => setViewMode("LANDING")}
                  className="hidden md:flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200 min-h-[36px]"
                  title="Return to Public Landing Page"
                >
                  <HomeIcon className="w-3.5 h-3.5" />
                  <span>Landing Page</span>
                </button>

                {/* Role Switcher Pill */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
                  <button
                    onClick={() => {
                      setActiveRole("ACCOUNTANT");
                      setCurrentUserEmail("sarah@wealthwiseaccountant.co.uk");
                    }}
                    className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg transition-all min-h-[36px] ${
                      activeRole === "ACCOUNTANT"
                        ? "bg-white text-slate-900 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
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
                        ? "bg-white text-slate-900 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                    aria-label="Switch to Business Workspace"
                  >
                    <Building2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="hidden md:inline">Business Workspace</span>
                    <span className="inline md:hidden">Client</span>
                  </button>
                </div>

                {/* Profile Badge & Auth Actions */}
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="flex items-center gap-2 hover:bg-slate-100 p-1 rounded-lg transition-colors"
                    title="Switch user account or sign in"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {activeRole === "ACCOUNTANT" ? "SJ" : "MS"}
                    </div>
                    <div className="text-left text-xs hidden lg:block">
                      <div className="font-bold text-slate-900 leading-tight">
                        {activeRole === "ACCOUNTANT" ? "Sarah Jenkins" : "Marcus Sterling"}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {activeRole === "ACCOUNTANT" ? "ACCA Senior Partner" : "Director (Apex Ltd)"}
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
            <div className="mb-5 sm:mb-6 p-3 bg-slate-100/90 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="leading-tight">
                  <strong>Double-Entry Ledger Active:</strong> Invoices, Bank Reconciliation, and Reports unified with zero float drift.
                </span>
              </div>
              <div className="text-slate-500 font-mono text-[11px] flex flex-wrap items-center gap-2">
                <span>Tenant: Apex Digital Solutions Ltd</span>
                <span className="hidden sm:inline">•</span>
                <span>Base Currency: GBP (£)</span>
                <span className="hidden sm:inline">•</span>
                <span className="text-slate-700 font-semibold">{currentUserEmail}</span>
              </div>
            </div>

            {activeRole === "ACCOUNTANT" ? <AccountantDashboard /> : <ClientPortal />}
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-200 bg-white py-4 mt-8 sm:mt-12 text-center text-xs text-slate-400 px-4 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto w-full">
            <p>© 2026 Wealth Wise Accountant. Proprietary UK Double-Entry Engine.</p>
            <div className="flex items-center gap-4 text-[11px] text-slate-500">
              <button
                onClick={() => setViewMode("LANDING")}
                className="hover:text-slate-900 transition-colors"
              >
                Public Landing Page
              </button>
              <span>•</span>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="hover:text-slate-900 transition-colors"
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
