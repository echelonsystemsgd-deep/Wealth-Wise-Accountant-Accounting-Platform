"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Scale,
  Sparkles,
  Lock,
  Layers,
  FileText,
  Clock,
  CheckCircle2,
  Building2,
  Briefcase,
  ChevronRight,
  Calculator,
  Check,
  Zap,
} from "lucide-react";

interface LandingPageProps {
  onEnterApp: (role: "ACCOUNTANT" | "CLIENT") => void;
  onOpenLogin: () => void;
}

export function LandingPage({ onEnterApp, onOpenLogin }: LandingPageProps) {
  const [pricingMode, setPricingMode] = useState<"INCLUDED_RETAINER" | "STANDALONE_SAAS">("INCLUDED_RETAINER");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      {/* Top Marketing Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              WW
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-slate-900">
                  Wealth Wise Accountant
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono font-medium border border-slate-200">
                  PLATFORM OS
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-slate-400">
                UK Accounting Practice Software & Client Hub
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenLogin}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors min-h-[38px]"
            >
              Sign In
            </button>
            <button
              onClick={() => onEnterApp("ACCOUNTANT")}
              className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 min-h-[38px]"
            >
              <span>Launch Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden border-b border-slate-200 bg-linear-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700 mb-6 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Dedicated Alternative to Xero, QuickBooks & Dext</span>
            <span className="text-slate-400">|</span>
            <span className="font-mono text-[11px]">Phase 1 Active</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight sm:leading-none">
            The Bespoke Accounting Operating System for{" "}
            <span className="text-slate-900 underline decoration-slate-300 decoration-wavy underline-offset-8">
              Wealth Wise
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Stop paying thousands in monthly software licenses to third-party platforms.
            A unified double-entry general ledger, automated bank reconciliation, AI receipt vault,
            and real-time client portal—built directly for your practice.
          </p>

          {/* Action Callouts */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-md mx-auto">
            <button
              onClick={() => onEnterApp("ACCOUNTANT")}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 min-h-[46px]"
            >
              <Briefcase className="w-4 h-4 text-slate-300" />
              <span>Enter Accountant Hub</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onEnterApp("CLIENT")}
              className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm transition-all border border-slate-200 shadow-xs flex items-center justify-center gap-2 min-h-[46px]"
            >
              <Building2 className="w-4 h-4 text-slate-600" />
              <span>Enter Client Workspace</span>
            </button>
          </div>

          {/* Regulatory Highlights Banner */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto text-left">
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <Scale className="w-4 h-4 text-emerald-600 mb-1" />
              <div className="text-xs font-bold text-slate-900">Double-Entry Engine</div>
              <div className="text-[11px] text-slate-500">Σ Debits = Σ Credits enforced</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-blue-600 mb-1" />
              <div className="text-xs font-bold text-slate-900">UK Compliance</div>
              <div className="text-[11px] text-slate-500">MTD VAT & CoA 1000–7999</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <Lock className="w-4 h-4 text-purple-600 mb-1" />
              <div className="text-xs font-bold text-slate-900">Multi-Tenant DAL</div>
              <div className="text-[11px] text-slate-500">Row-Level Security partitioned</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <Calculator className="w-4 h-4 text-amber-600 mb-1" />
              <div className="text-xs font-bold text-slate-900">Pence Precision</div>
              <div className="text-[11px] text-slate-500">0 float drift, strict minor units</div>
            </div>
          </div>
        </div>
      </section>

      {/* Xero Competitor Comparison Grid */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Commercial Analysis
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Why Wealth Wise Shouldn&apos;t Just Be Another Xero Reseller
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Compare off-the-shelf SaaS software licensing against owning a bespoke proprietary accounting asset.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[620px] rounded-xl overflow-hidden border border-slate-200">
              <thead>
                <tr className="bg-slate-900 text-white font-semibold">
                  <th className="py-3.5 pl-4">Platform Dimension</th>
                  <th className="py-3.5 px-4 bg-slate-800">Xero + Dext Combo</th>
                  <th className="py-3.5 pr-4 text-emerald-400">Wealth Wise Accountant OS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="py-3 pl-4 font-semibold text-slate-900">Licensing Cost</td>
                  <td className="py-3 px-4 text-rose-700 font-medium">£30 – £50/month per client seat</td>
                  <td className="py-3 pr-4 text-emerald-700 font-bold">£0 per-seat fee (100% Owned IP)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 pl-4 font-semibold text-slate-900">Annual Bleed (100 Clients)</td>
                  <td className="py-3 px-4 text-rose-700 font-medium">£36,000 – £60,000 / year recurring</td>
                  <td className="py-3 pr-4 text-emerald-700 font-bold">Pure profit retained in practice</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 pl-4 font-semibold text-slate-900">Client Chasing & Receipt Intake</td>
                  <td className="py-3 px-4 text-slate-600">Disjointed emails, WhatsApp, separate Dext logins</td>
                  <td className="py-3 pr-4 text-slate-900 font-semibold">Native in-app messenger & 1-tap receipt vault</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 pl-4 font-semibold text-slate-900">Brand Identity</td>
                  <td className="py-3 px-4 text-slate-600">Clients see Xero branding everywhere</td>
                  <td className="py-3 pr-4 text-slate-900 font-semibold">Exclusive Wealth Wise Practice Branding</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 pl-4 font-semibold text-slate-900">General Ledger Integrity</td>
                  <td className="py-3 px-4 text-slate-600">Standard cloud ledger</td>
                  <td className="py-3 pr-4 text-emerald-700 font-bold">Mathematical invariant checking & immutable audit reversals</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Feature Deep-Dive Grid */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Engineered to Match Every Xero Capability
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every major module in Xero UK is represented in the Wealth Wise architecture baseline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">General Ledger Engine</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                UK Nominal codes (1000–7999), balance sheet classifications, dynamic Trial Balance, and non-destructive reversing journals.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Interactive Bank Reconciliation</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Two-column matching grid comparing imported Barclays statement feeds against invoices and nominal accounts with automated confidence scoring.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Sales Invoicing & AR</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Branded invoice generation with automated double-entry postings (Dr 1100 Debtors / Cr 4000 Sales / Cr 2200 VAT) and partial payment tracking.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">AI Document Intake Vault</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Receipt and invoice dropzone with simulated OCR extraction, vendor matching, and accountant approval queue before anything touches the books.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Real-Time Financial Reports</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Profit & Loss, Balance Sheet, and MTD VAT Form 100 summaries calculated dynamically from the ledger without stale counters.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Accountant Command Center</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Practice-wide client portfolio health monitoring, filing deadline trackers, and direct in-app messaging to eliminate messy communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Flexible Practice Monetization Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Flexible Monetization Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Charge Clients Directly Or Bundle for Free
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Wealth Wise has complete control: provide this software as an included perk to retain clients, or bill clients monthly to build a lucrative recurring revenue stream.
            </p>

            {/* Pricing Mode Toggle */}
            <div className="mt-6 inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setPricingMode("INCLUDED_RETAINER")}
                className={`px-4 py-2 rounded-lg transition-all min-h-[38px] ${
                  pricingMode === "INCLUDED_RETAINER"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Option A: Included in Accountancy Retainer (£0 extra)
              </button>
              <button
                onClick={() => setPricingMode("STANDALONE_SAAS")}
                className={`px-4 py-2 rounded-lg transition-all min-h-[38px] ${
                  pricingMode === "STANDALONE_SAAS"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Option B: Direct Client SaaS Tiers
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Starter Sole Trader */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Tier 1: Sole Trader
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Starter Business</h3>
                <p className="text-xs text-slate-500 mt-1">
                  For self-employed professionals, freelancers and simple sole trader books.
                </p>

                <div className="my-5">
                  <div className="text-3xl font-extrabold text-slate-900">
                    {pricingMode === "INCLUDED_RETAINER" ? "£0" : "£9"}
                    <span className="text-xs font-normal text-slate-500"> / month</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 font-medium mt-1">
                    {pricingMode === "INCLUDED_RETAINER"
                      ? "✓ Included in Wealth Wise accounting fees"
                      : "50% cheaper than Xero Early Plan"}
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Simple Cash P&L & Tax Estimation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Receipt Upload Vault (Up to 50/mo)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>1 Connected Business Bank Feed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Direct Accountant Messaging</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onEnterApp("CLIENT")}
                className="mt-6 w-full py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-lg border border-slate-200 shadow-2xs transition-colors min-h-[42px]"
              >
                Choose Starter
              </button>
            </div>

            {/* Growth Limited Company (Hero) */}
            <div className="p-6 rounded-2xl border-2 border-slate-900 bg-white shadow-md relative flex flex-col justify-between">
              <div className="absolute -top-3 right-6 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Tier 2: Limited Company
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Growth Ltd Workspace</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Complete operating system for active UK Ltd directors & businesses.
                </p>

                <div className="my-5">
                  <div className="text-3xl font-extrabold text-slate-900">
                    {pricingMode === "INCLUDED_RETAINER" ? "£0" : "£19"}
                    <span className="text-xs font-normal text-slate-500"> / month</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 font-medium mt-1">
                    {pricingMode === "INCLUDED_RETAINER"
                      ? "✓ Included for all Ltd retainer clients"
                      : "Saves £200+/year compared to Xero Growing"}
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Full Double-Entry General Ledger</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Interactive Bank Reconciliation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Unlimited Sales Invoices & Partial Payments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>MTD VAT Form 100 Return Preparation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Director Loan Account (2100) Ledger</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onEnterApp("CLIENT")}
                className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg shadow-sm transition-colors min-h-[42px]"
              >
                Launch Growth Ltd
              </button>
            </div>

            {/* Scale & CFO Practice */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Tier 3: Enterprise / CFO
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Scale & Advisory</h3>
                <p className="text-xs text-slate-500 mt-1">
                  For multi-director firms, group entities and fractional CFO clients.
                </p>

                <div className="my-5">
                  <div className="text-3xl font-extrabold text-slate-900">
                    {pricingMode === "INCLUDED_RETAINER" ? "£0" : "£39"}
                    <span className="text-xs font-normal text-slate-500"> / month</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 font-medium mt-1">
                    {pricingMode === "INCLUDED_RETAINER"
                      ? "✓ Included in Premium CFO engagements"
                      : "Multi-entity consolidation included"}
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Everything in Growth Ltd</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Monthly Statutory Management Accounts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Cash Velocity & Horizon Runway Charting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Priority ACCA Senior Partner Review</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onEnterApp("ACCOUNTANT")}
                className="mt-6 w-full py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-lg border border-slate-200 shadow-2xs transition-colors min-h-[42px]"
              >
                Explore Scale CFO
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold">
            Ready to test the Wealth Wise Accounting Operating System?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Test the live double-entry general ledger, bank reconciliation feed, and invoicing engine right now.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onEnterApp("ACCOUNTANT")}
              className="px-5 py-2.5 rounded-lg bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors shadow-sm min-h-[40px]"
            >
              Accountant Hub
            </button>
            <button
              onClick={() => onEnterApp("CLIENT")}
              className="px-5 py-2.5 rounded-lg bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition-colors border border-slate-700 min-h-[40px]"
            >
              Client Business Workspace
            </button>
          </div>
          <p className="text-[11px] text-slate-500 pt-6 border-t border-slate-800">
            © 2026 Wealth Wise Accountant. Proprietary UK Accounting Engine. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
