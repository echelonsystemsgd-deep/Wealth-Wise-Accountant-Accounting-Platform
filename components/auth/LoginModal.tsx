"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Briefcase, Building2, Lock, Mail, ArrowRight, ShieldCheck, X, UserPlus, CheckCircle2 } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (role: "ACCOUNTANT" | "CLIENT", email?: string) => void;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [authMode, setAuthMode] = useState<"LOGIN" | "REGISTER">("LOGIN");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"ACCOUNTANT" | "CLIENT">("ACCOUNTANT");

  // Registration state
  const [businessName, setBusinessName] = useState("");
  const [entityType, setEntityType] = useState<"LTD" | "SOLE_TRADER">("LTD");
  const [pricingPlan, setPricingPlan] = useState<"INCLUDED_RETAINER" | "STARTER" | "PRO">("INCLUDED_RETAINER");

  // Lock body scroll and handle Escape key while modal is active
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === "LOGIN") {
      onLogin(
        selectedRole,
        email || (selectedRole === "ACCOUNTANT" ? "sarah@wealthwiseaccountants.co.uk" : "marcus@apexdigital.co.uk")
      );
    } else {
      // Register client business
      onLogin("CLIENT", email || "director@" + (businessName ? businessName.toLowerCase().replace(/\s+/g, "") + ".co.uk" : "mybusiness.co.uk"));
    }
    onClose();
  };

  const handleQuickDemoLogin = (role: "ACCOUNTANT" | "CLIENT") => {
    onLogin(role);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div 
        className="bg-[#141519] text-[#f2ede4] rounded-2xl border border-[#2e2a21] shadow-2xl max-w-md w-full p-5 sm:p-6 space-y-4 my-auto max-h-[95vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#26241e]">
          <div className="flex items-center gap-2.5">
            <div className="bg-white px-2 py-0.5 rounded border border-[#c9a84c]/50">
              <Image
                src="/images/wealthwise-gold-logo.png"
                alt="Wealth Wise Logo"
                width={80}
                height={16}
                className="h-4 w-auto object-contain"
              />
            </div>
            <div>
              <h3 id="login-modal-title" className="text-sm font-bold text-white">
                {authMode === "LOGIN" ? "Sign in to Workspace Prototype" : "Register Client Organisation"}
              </h3>
              <p className="text-[11px] text-[#8c8272]">Wealthwise Accountants Practice &amp; Client Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#8c8272] hover:text-white p-2 rounded-lg text-sm min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher: Sign In vs Register */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-[#1a1b22] rounded-xl text-xs font-semibold border border-[#26241e]">
          <button
            type="button"
            onClick={() => setAuthMode("LOGIN")}
            className={`py-1.5 rounded-lg transition-all min-h-[36px] ${
              authMode === "LOGIN" ? "bg-[#25241f] text-[#c9a84c] border border-[#4a4029] shadow-2xs" : "text-[#8c8272] hover:text-white"
            }`}
          >
            Sign In to Account
          </button>
          <button
            type="button"
            onClick={() => setAuthMode("REGISTER")}
            className={`py-1.5 rounded-lg transition-all min-h-[36px] ${
              authMode === "REGISTER" ? "bg-[#25241f] text-[#c9a84c] border border-[#4a4029] shadow-2xs" : "text-[#8c8272] hover:text-white"
            }`}
          >
            Onboard New Client
          </button>
        </div>

        {authMode === "LOGIN" ? (
          <>
            {/* Instant Persona Demo Picker */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#a39783] uppercase tracking-wider block">
                Instant Demo Persona Login:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin("ACCOUNTANT")}
                  className="p-3 bg-[#1e2029] hover:bg-[#252835] border border-[#3e3422] rounded-xl text-left transition-all group"
                >
                  <div className="flex items-center gap-1.5 text-[#c9a84c] font-bold mb-0.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Accountant Hub</span>
                  </div>
                  <span className="text-[10px] text-[#8c8272] block">Sarah Jenkins, ACCA</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin("CLIENT")}
                  className="p-3 bg-[#1e2029] hover:bg-[#252835] border border-[#3e3422] rounded-xl text-left transition-all group"
                >
                  <div className="flex items-center gap-1.5 text-[#c9a84c] font-bold mb-0.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Client Director</span>
                  </div>
                  <span className="text-[10px] text-[#8c8272] block">Marcus Sterling</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 my-2 text-[11px] text-[#5c5548]">
              <div className="h-px bg-[#26241e] flex-1" />
              <span>or enter custom credentials</span>
              <div className="h-px bg-[#26241e] flex-1" />
            </div>

            {/* Custom Login Form */}
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-[#a39783] block mb-1 font-semibold">User Role Guard</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("ACCOUNTANT")}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                      selectedRole === "ACCOUNTANT"
                        ? "bg-[#25241f] border-[#c9a84c] text-white"
                        : "bg-[#0d0e11] border-[#2e2a21] text-[#706859] hover:text-white"
                    }`}
                  >
                    <Briefcase className="w-3 h-3" />
                    Accountant Staff
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole("CLIENT")}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                      selectedRole === "CLIENT"
                        ? "bg-[#25241f] border-[#c9a84c] text-white"
                        : "bg-[#0d0e11] border-[#2e2a21] text-[#706859] hover:text-white"
                    }`}
                  >
                    <Building2 className="w-3 h-3" />
                    Client Business
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[#a39783] block mb-1 font-semibold">Email Address</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-[#706859] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={selectedRole === "ACCOUNTANT" ? "sarah@wealthwiseaccountants.co.uk" : "marcus@apexdigital.co.uk"}
                    className="w-full pl-9 pr-3 py-2 bg-[#0d0e11] border border-[#2e2a21] rounded-lg text-white placeholder-[#706859] focus:outline-hidden focus:ring-1 focus:ring-[#c9a84c] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#a39783] block mb-1 font-semibold">Password</label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-[#706859] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2 bg-[#0d0e11] border border-[#2e2a21] rounded-lg text-white placeholder-[#706859] focus:outline-hidden focus:ring-1 focus:ring-[#c9a84c] text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#c9a84c] hover:bg-[#d6b558] text-black font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 min-h-[40px]"
              >
                <span>Authenticate &amp; Launch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </>
        ) : (
          /* Client Registration Form */
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="text-[#a39783] block mb-1 font-semibold">Client Company / Business Name</label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Sterling Design Ltd"
                className="w-full px-3 py-2 bg-[#0d0e11] border border-[#2e2a21] rounded-lg text-white placeholder-[#706859] focus:outline-hidden focus:ring-1 focus:ring-[#c9a84c] text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[#a39783] block mb-1 font-semibold">Entity Structure</label>
                <select
                  value={entityType}
                  onChange={(e) => setEntityType(e.target.value as "LTD" | "SOLE_TRADER")}
                  className="w-full px-2.5 py-2 bg-[#0d0e11] border border-[#2e2a21] rounded-lg text-white text-xs"
                >
                  <option value="LTD">UK Ltd Company</option>
                  <option value="SOLE_TRADER">Sole Trader / Self-Employed</option>
                </select>
              </div>

              <div>
                <label className="text-[#a39783] block mb-1 font-semibold">Selected Tier</label>
                <select
                  value={pricingPlan}
                  onChange={(e) => setPricingPlan(e.target.value as typeof pricingPlan)}
                  className="w-full px-2.5 py-2 bg-[#0d0e11] border border-[#2e2a21] rounded-lg text-white text-xs"
                >
                  <option value="INCLUDED_RETAINER">Retainer Client (£0)</option>
                  <option value="STARTER">Starter (£9/mo)</option>
                  <option value="PRO">Pro Ltd (£19/mo)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[#a39783] block mb-1 font-semibold">Director Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="director@sterlingdesign.co.uk"
                className="w-full px-3 py-2 bg-[#0d0e11] border border-[#2e2a21] rounded-lg text-white placeholder-[#706859] focus:outline-hidden focus:ring-1 focus:ring-[#c9a84c] text-xs"
              />
            </div>

            <div className="p-3 bg-[#17181f] rounded-lg border border-[#26241e] text-[11px] text-[#8c8272] space-y-1">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span>Instant Partitioned Workspace Creation</span>
              </div>
              <p>
                Automatic Chart of Accounts setup (UK 1000–7999), Barclays feed connector sandbox, and direct Wealthwise Accountant linkage.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#25241f] hover:bg-[#302a1e] border border-[#4a4029] text-[#c9a84c] font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 min-h-[40px]"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Client Business &amp; Enter</span>
            </button>
          </form>
        )}

        <div className="pt-2 border-t border-[#26241e] flex items-center justify-between text-[11px] text-[#706859]">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c9a84c]" />
            <span>Multi-Tenant RLS Partitioned</span>
          </div>
          <span>Wealthwise Prototype v1.0</span>
        </div>
      </div>
    </div>
  );
}
