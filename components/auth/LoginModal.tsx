"use client";

import React, { useState } from "react";
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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#141519] text-[#f2ede4] rounded-2xl border border-[#2e2a21] shadow-2xl max-w-md w-full p-5 sm:p-6 space-y-4 my-auto max-h-[95vh] overflow-y-auto">
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
              <h3 className="text-sm font-bold text-white">
                {authMode === "LOGIN" ? "Sign in to Platform OS" : "Register Client Organisation"}
              </h3>
              <p className="text-[11px] text-[#8c8272]">Wealthwise Accountants Practice & Client Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#8c8272] hover:text-white p-1.5 rounded-lg text-sm"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher: Sign In vs Register */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-[#1a1b22] rounded-xl text-xs font-semibold border border-[#26241e]">
          <button
            type="button"
            onClick={() => setAuthMode("LOGIN")}
            className={`py-1.5 rounded-lg transition-all ${
              authMode === "LOGIN" ? "bg-[#25241f] text-[#c9a84c] border border-[#4a4029] shadow-2xs" : "text-[#8c8272] hover:text-white"
            }`}
          >
            Sign In to Account
          </button>
          <button
            type="button"
            onClick={() => setAuthMode("REGISTER")}
            className={`py-1.5 rounded-lg transition-all ${
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
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8c8272] block">
                Instant Demo Sign-In
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin("ACCOUNTANT")}
                  className="p-3 rounded-xl border border-[#282620] hover:border-[#4a4029] hover:bg-[#1a1b22] text-left transition-all group flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded bg-[#201e18] border border-[#3b3424] text-[#c9a84c] flex items-center justify-center group-hover:border-[#c9a84c] transition-colors">
                      <Briefcase className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-white">Sarah Jenkins</span>
                  </div>
                  <p className="text-[10px] text-[#8c8272]">Senior Partner (Accountant Hub)</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin("CLIENT")}
                  className="p-3 rounded-xl border border-[#282620] hover:border-[#4a4029] hover:bg-[#1a1b22] text-left transition-all group flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded bg-[#201e18] border border-[#3b3424] text-[#c9a84c] flex items-center justify-center group-hover:border-[#c9a84c] transition-colors">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-white">Marcus Sterling</span>
                  </div>
                  <p className="text-[10px] text-[#8c8272]">Director, Apex Ltd (Client Portal)</p>
                </button>
              </div>
            </div>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#26241e]" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-semibold text-[#706859]">
                <span className="bg-[#141519] px-2">Or enter credentials</span>
              </div>
            </div>

            {/* Credentials Form */}
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-[#a39783] block mb-1 font-semibold">Account Role</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("ACCOUNTANT")}
                    className={`py-2 px-3 rounded-lg border text-xs font-medium transition-colors ${
                      selectedRole === "ACCOUNTANT"
                        ? "border-[#4a4029] bg-[#25241f] text-[#c9a84c]"
                        : "border-[#26241e] text-[#8c8272] hover:bg-[#1b1c22]"
                    }`}
                  >
                    Wealthwise Accountant
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole("CLIENT")}
                    className={`py-2 px-3 rounded-lg border text-xs font-medium transition-colors ${
                      selectedRole === "CLIENT"
                        ? "border-[#4a4029] bg-[#25241f] text-[#c9a84c]"
                        : "border-[#26241e] text-[#8c8272] hover:bg-[#1b1c22]"
                    }`}
                  >
                    Client Business Director
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
                    placeholder={
                      selectedRole === "ACCOUNTANT"
                        ? "sarah@wealthwiseaccountants.co.uk"
                        : "marcus@apexdigital.co.uk"
                    }
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

              <div className="flex items-center justify-between text-[11px] text-[#8c8272] pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-[#2e2a21] text-[#c9a84c]" />
                  <span>Remember session</span>
                </label>
                <a href="#forgot" className="text-[#c9a84c] hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#25241f] hover:bg-[#302a1e] border border-[#4a4029] text-[#c9a84c] font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 mt-2 min-h-[40px]"
              >
                <span>Enter Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </>
        ) : (
          /* New Client Onboarding Registration Form */
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="text-[#a39783] block mb-1 font-semibold">Business / Company Name</label>
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
              <span>Create Client Business & Enter</span>
            </button>
          </form>
        )}

        <div className="pt-2 border-t border-[#26241e] flex items-center justify-between text-[11px] text-[#706859]">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c9a84c]" />
            <span>Multi-Tenant RLS Partitioned</span>
          </div>
          <span>Wealthwise OS v1.0</span>
        </div>
      </div>
    </div>
  );
}
