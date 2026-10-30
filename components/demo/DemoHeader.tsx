"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldAlert, User, LogOut, Check } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { useAuth } from "@/lib/auth/AuthContext";
import { ClientWorkspaceSwitcher } from "@/components/auth/ClientWorkspaceSwitcher";
import { UserRole } from "@/lib/dal/types";

interface DemoHeaderProps {
  activeView: "ACCOUNTANT" | "CLIENT";
  title: string;
}

export function DemoHeader({ activeView, title }: DemoHeaderProps) {
  const { user, role, switchRole, logout, isAccountant } = useAuth();
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  // Close dropdown on Escape key
  useEffect(() => {
    if (!isRoleDropdownOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsRoleDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRoleDropdownOpen]);

  const rolesList: { role: UserRole; label: string; desc: string }[] = [
    { role: "PRACTICE_ADMIN", label: "Practice Admin", desc: "Senior Partner, full portfolio & billing" },
    { role: "SENIOR_ACCOUNTANT", label: "Senior Accountant", desc: "Sarah Jenkins, ACCA — Sign off filings" },
    { role: "BOOKKEEPER", label: "Bookkeeper", desc: "Reconciliation & document extraction queue" },
    { role: "CLIENT_DIRECTOR", label: "Client Director", desc: "Marcus Sterling — Sandboxed company view" },
  ];

  return (
    <div className="w-full">
      {/* Review Prototype Banner */}
      <div className="bg-[#111111] text-[#C0A262] border-b border-[#222222] px-3 sm:px-4 py-2.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#C0A262] shrink-0" />
            <span className="font-semibold text-white">
              Phase 2 Preview: Multi-Tenant Auth &amp; Practice CRM
            </span>
            <span className="hidden md:inline text-[#D1D5DB]">
              — Row-Level Security (RLS) active for {user?.activeOrganisationName || "Apex Digital"}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-[#D1D5DB] hidden sm:inline">
              Role: <strong className="text-white">{role.replace(/_/g, " ")}</strong>
            </span>
            <Link
              href="/"
              className="text-[#C0A262] hover:text-[#CDBA7A] underline flex items-center gap-1 min-h-[44px] sm:min-h-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to website</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Demo View Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#000000] text-white border-b border-[#222222] shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link
              href="/"
              onClick={(e) => {
                if (typeof window !== "undefined" && window.location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center shrink-0 cursor-pointer"
              aria-label="Wealthwise Accountants Homepage"
            >
              <Image
                src={BRAND.logos.fullLogo}
                alt={BRAND.practiceName}
                width={190}
                height={30}
                priority
                className="h-7 sm:h-9 w-auto object-contain"
              />
            </Link>
            <div className="h-4 w-px bg-[#333333] hidden lg:block" />
            <span className="text-xs sm:text-sm font-medium text-[#D1D5DB] hidden lg:inline truncate">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Multi-Tenant Client Workspace Switcher */}
            <ClientWorkspaceSwitcher />

            {/* Persona & Perspective Switcher */}
            <div className="flex items-center bg-[#111111] p-1 rounded-lg border border-[#333333] text-xs font-medium">
              <Link
                href="/demo/accountant"
                className={`px-2.5 sm:px-3 py-1.5 rounded transition-colors min-h-[36px] flex items-center ${
                  activeView === "ACCOUNTANT"
                    ? "bg-[#C0A262] text-black font-semibold shadow-xs"
                    : "text-[#D1D5DB] hover:text-white"
                }`}
              >
                Accountant Hub
              </Link>
              <Link
                href="/demo/client"
                className={`px-2.5 sm:px-3 py-1.5 rounded transition-colors min-h-[36px] flex items-center ${
                  activeView === "CLIENT"
                    ? "bg-[#C0A262] text-black font-semibold shadow-xs"
                    : "text-[#D1D5DB] hover:text-white"
                }`}
              >
                Client Portal
              </Link>
            </div>

            {/* Role Switcher Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="w-9 h-9 rounded-full bg-[#181920] border border-[#3e3422] flex items-center justify-center text-[#C0A262] hover:bg-[#25241f] transition-colors"
                title="Active User Profile &amp; Role Guard"
                aria-label="User profile and role menu"
              >
                <User className="w-4 h-4" />
              </button>

              {isRoleDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsRoleDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-72 bg-[#141519] border border-[#3e3422] rounded-xl shadow-2xl z-50 p-3 space-y-2 text-xs">
                    <div className="border-b border-[#26241e] pb-2">
                      <div className="font-bold text-white">{user?.fullName}</div>
                      <div className="text-[11px] text-[#8c8272]">{user?.email}</div>
                      <div className="text-[10px] text-[#c9a84c] mt-0.5 font-medium">{user?.practiceName}</div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-[#8c8272] uppercase font-bold tracking-wider">
                        Switch Role Guard (Phase 2 RBAC)
                      </span>
                      {rolesList.map((r) => {
                        const isCurrent = role === r.role;
                        return (
                          <button
                            key={r.role}
                            type="button"
                            onClick={() => {
                              switchRole(r.role);
                              setIsRoleDropdownOpen(false);
                            }}
                            className={`w-full text-left p-2 rounded-lg transition-colors flex items-start justify-between ${
                              isCurrent
                                ? "bg-[#25241f] text-white border border-[#c9a84c]/40"
                                : "text-[#d1d5db] hover:bg-[#1a1b22] hover:text-white"
                            }`}
                          >
                            <div>
                              <div className="font-semibold text-xs flex items-center gap-1.5">
                                <span>{r.label}</span>
                                {isCurrent && <Check className="w-3.5 h-3.5 text-[#c9a84c]" />}
                              </div>
                              <div className="text-[10px] text-[#8c8272]">{r.desc}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-[#26241e]">
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setIsRoleDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 p-2 rounded-lg text-rose-400 hover:bg-rose-950/30 text-xs transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Reset Session to Default</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
