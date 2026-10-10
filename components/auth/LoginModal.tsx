"use client";

import React, { useState } from "react";
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
        email || (selectedRole === "ACCOUNTANT" ? "sarah@wealthwiseaccountant.co.uk" : "marcus@apexdigital.co.uk")
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
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-5 sm:p-6 space-y-4 my-auto max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              WW
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {authMode === "LOGIN" ? "Sign in to Platform OS" : "Register Client Organisation"}
              </h3>
              <p className="text-[11px] text-slate-400">Wealthwise Accountants Practice & Client Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg text-sm"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher: Sign In vs Register */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setAuthMode("LOGIN")}
            className={`py-1.5 rounded-lg transition-all ${
              authMode === "LOGIN" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Sign In to Account
          </button>
          <button
            type="button"
            onClick={() => setAuthMode("REGISTER")}
            className={`py-1.5 rounded-lg transition-all ${
              authMode === "REGISTER" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Onboard New Client
          </button>
        </div>

        {authMode === "LOGIN" ? (
          <>
            {/* Instant Persona Demo Picker */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Instant Demo Sign-In
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin("ACCOUNTANT")}
                  className="p-3 rounded-xl border border-slate-200 hover:border-slate-900 hover:bg-slate-50/80 text-left transition-all group flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <Briefcase className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-900">Sarah Jenkins</span>
                  </div>
                  <p className="text-[10px] text-slate-500">ACCA Senior Partner (Accountant Hub)</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin("CLIENT")}
                  className="p-3 rounded-xl border border-slate-200 hover:border-slate-900 hover:bg-slate-50/80 text-left transition-all group flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-900">Marcus Sterling</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Director, Apex Ltd (Client Portal)</p>
                </button>
              </div>
            </div>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-semibold text-slate-400">
                <span className="bg-white px-2">Or enter credentials</span>
              </div>
            </div>

            {/* Credentials Form */}
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 block mb-1 font-semibold">Account Role</label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("ACCOUNTANT")}
                    className={`py-1.5 text-xs font-bold rounded-md transition-all ${
                      selectedRole === "ACCOUNTANT"
                        ? "bg-white text-slate-900 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Accountant Staff
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole("CLIENT")}
                    className={`py-1.5 text-xs font-bold rounded-md transition-all ${
                      selectedRole === "CLIENT"
                        ? "bg-white text-slate-900 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Business Client
                  </button>
                </div>
              </div>

              <div>
                <label className="text-slate-700 block mb-1 font-semibold">Work Email</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder={
                      selectedRole === "ACCOUNTANT"
                        ? "sarah@wealthwiseaccountant.co.uk"
                        : "marcus@apexdigital.co.uk"
                    }
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-base sm:text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 min-h-[42px] sm:min-h-[38px]"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 block mb-1 font-semibold">Password</label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-base sm:text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 min-h-[42px] sm:min-h-[38px]"
                  />
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-[10px] text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Encrypted with TLS 1.3 & Row-Level Security tenant isolation.</span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm min-h-[42px]"
                >
                  <span>Authenticate & Enter Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Client Registration Form */
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="text-slate-700 block mb-1 font-semibold">Client Legal Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Camden Coffee Roasters Ltd"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full p-2.5 text-base sm:text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 min-h-[42px] sm:min-h-[38px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-700 block mb-1 font-semibold">UK Entity Structure</label>
                <select
                  value={entityType}
                  onChange={(e) => setEntityType(e.target.value as typeof entityType)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs min-h-[42px] sm:min-h-[38px]"
                >
                  <option value="LTD">Limited Company (LTD)</option>
                  <option value="SOLE_TRADER">Sole Trader</option>
                </select>
              </div>
              <div>
                <label className="text-slate-700 block mb-1 font-semibold">Pricing Plan</label>
                <select
                  value={pricingPlan}
                  onChange={(e) => setPricingPlan(e.target.value as typeof pricingPlan)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs min-h-[42px] sm:min-h-[38px]"
                >
                  <option value="INCLUDED_RETAINER">Included in Retainer (£0)</option>
                  <option value="STARTER">Sole Trader (£9/mo)</option>
                  <option value="PRO">Growth Ltd (£19/mo)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-slate-700 block mb-1 font-semibold">Director / Primary Contact Email</label>
              <input
                type="email"
                required
                placeholder="director@camdencoffee.co.uk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 text-base sm:text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 min-h-[42px] sm:min-h-[38px]"
              />
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Instant Tenant Provisioning</span>
              </div>
              <p className="text-[10px] text-emerald-800 leading-relaxed">
                Registers new tenant with dedicated UK Chart of Accounts (1000–7999), double-entry general ledger, and Row-Level Security partition.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm min-h-[42px]"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Provision Tenant & Enter Workspace</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
