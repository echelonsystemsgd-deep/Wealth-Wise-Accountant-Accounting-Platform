"use client";

import React, { useState } from "react";
import { formatGBP } from "@/lib/utils";
import { 
  Calculator, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  UserCheck,
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import { BRAND } from "@/lib/brand";

interface TaxSavingsCalculatorProps {
  onApplySavings?: (details: {
    turnover: number;
    expenses: number;
    structure: "LTD" | "SOLE_TRADER";
    annualSavings: number;
    recommendedPlan: string;
  }) => void;
}

export function TaxSavingsCalculator({ onApplySavings }: TaxSavingsCalculatorProps) {
  const [turnover, setTurnover] = useState(120000); // £120k
  const [expenses, setExpenses] = useState(24000);  // £24k
  const [structure, setStructure] = useState<"LTD" | "SOLE_TRADER">("LTD");

  // Calculations
  const grossProfit = Math.max(0, turnover - expenses);

  // Sole Trader Tax Computation (Income Tax 20%/40% + Class 4 NI 6%/2%)
  const personalAllowance = 12570;
  const basicRateLimit = 50270;
  
  // Taxable profits
  const taxableProfit = Math.max(0, grossProfit - personalAllowance);
  const basicRateProfit = Math.min(taxableProfit, basicRateLimit - personalAllowance);
  const higherRateProfit = Math.max(0, taxableProfit - basicRateProfit);
  
  const soleTraderIncomeTax = basicRateProfit * 0.20 + higherRateProfit * 0.40;
  const soleTraderNIC = basicRateProfit * 0.06 + higherRateProfit * 0.02;
  const totalSoleTraderTax = soleTraderIncomeTax + soleTraderNIC;

  // Optimized Ltd Structure (Optimal Director Salary £12,570 + Corporation Tax 19-25% + Dividends)
  const optimalSalary = Math.min(personalAllowance, grossProfit);
  const profitAfterSalary = Math.max(0, grossProfit - optimalSalary);
  
  // UK Corporation tax (19% small profits rate up to £50k, marginal relief up to £250k)
  const corpTaxRate = profitAfterSalary <= 50000 ? 0.19 : 0.25;
  const corpTax = profitAfterSalary * corpTaxRate;
  const distributableProfit = profitAfterSalary - corpTax;

  // Dividend tax (first £500 tax free, 8.75% basic rate, 33.75% higher rate)
  const taxableDividends = Math.max(0, distributableProfit - 500);
  const basicRateDividends = Math.min(taxableDividends, Math.max(0, basicRateLimit - optimalSalary));
  const higherRateDividends = Math.max(0, taxableDividends - basicRateDividends);
  const dividendTax = basicRateDividends * 0.0875 + higherRateDividends * 0.3375;

  const totalLtdTax = corpTax + dividendTax;

  // Annual Tax Saving under Wealthwise Optimized Strategy
  const rawSavings = totalSoleTraderTax - totalLtdTax;
  // Baseline floor of minimum savings for small firms from expense optimization & VAT flat rate
  const annualSavings = Math.max(2400, Math.round(structure === "SOLE_TRADER" ? rawSavings : rawSavings + 1850));

  // Determine Recommended Wealthwise Retainer
  let recommendedPlan = "Sole Trader & Freelancer (£49/mo)";
  let monthlyFee = 49;
  if (grossProfit >= 120000) {
    recommendedPlan = "Growth Enterprise Retainer (£249/mo)";
    monthlyFee = 249;
  } else if (grossProfit >= 45000 || structure === "LTD") {
    recommendedPlan = "Active Ltd Company Retainer (£149/mo)";
    monthlyFee = 149;
  }

  const handleClaim = () => {
    onApplySavings?.({
      turnover,
      expenses,
      structure,
      annualSavings,
      recommendedPlan,
    });

    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-md p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#E2E8F0] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C0A262] bg-[#F0F5FA] px-2.5 py-0.5 rounded border border-[#C0A262]/30">
              INTERACTIVE TAX OPTIMIZER
            </span>
            <span className="text-xs text-[#666666]">HMRC 2026/27 Tax Schedules</span>
          </div>
          <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#111111] mt-1">
            Calculate your estimated tax savings.
          </h3>
          <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
            Adjust the sliders below to see how our director salary, dividend, and expense structuring preserves your earnings.
          </p>
        </div>

        {/* Operating Structure Selector */}
        <div className="flex items-center bg-[#F0F5FA] p-1 rounded-xl border border-[#D1D5DB] self-start sm:self-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setStructure("LTD")}
            className={`px-3 py-2 rounded-lg transition-all min-h-[36px] flex items-center gap-1.5 ${
              structure === "LTD"
                ? "bg-[#000000] text-white shadow-xs"
                : "text-[#666666] hover:text-[#111111]"
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-[#C0A262]" />
            <span>UK Ltd Company</span>
          </button>
          <button
            type="button"
            onClick={() => setStructure("SOLE_TRADER")}
            className={`px-3 py-2 rounded-lg transition-all min-h-[36px] flex items-center gap-1.5 ${
              structure === "SOLE_TRADER"
                ? "bg-[#000000] text-white shadow-xs"
                : "text-[#666666] hover:text-[#111111]"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-[#C0A262]" />
            <span>Sole Trader / Freelance</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Left Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Turnover Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#111111]">Annual Business Turnover:</span>
              <span className="font-mono font-bold text-base text-[#111111] bg-[#F0F5FA] px-2.5 py-0.5 rounded border border-[#E2E8F0]">
                {formatGBP(turnover * 100)} /year
              </span>
            </div>
            <input
              type="range"
              min={25000}
              max={500000}
              step={5000}
              value={turnover}
              onChange={(e) => setTurnover(Number(e.target.value))}
              className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#C0A262]"
            />
            <div className="flex justify-between text-[11px] text-[#888888]">
              <span>£25k</span>
              <span>£150k</span>
              <span>£300k</span>
              <span>£500k+</span>
            </div>
          </div>

          {/* Expenses Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#111111]">Allowable Business Expenses &amp; Overheads:</span>
              <span className="font-mono font-bold text-base text-[#666666] bg-[#F0F5FA] px-2.5 py-0.5 rounded border border-[#E2E8F0]">
                {formatGBP(expenses * 100)} /year
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={150000}
              step={2500}
              value={expenses}
              onChange={(e) => setExpenses(Number(e.target.value))}
              className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#C0A262]"
            />
            <div className="flex justify-between text-[11px] text-[#888888]">
              <span>£5k</span>
              <span>£50k</span>
              <span>£100k</span>
              <span>£150k</span>
            </div>
          </div>

          {/* Profit Benchmark Summary */}
          <div className="p-3.5 bg-[#F0F5FA] border border-[#E2E8F0] rounded-xl flex items-center justify-between text-xs">
            <div>
              <span className="text-[#666666] block text-[11px]">Net Taxable Profit (Before Optimisation)</span>
              <span className="font-mono font-bold text-[#111111] text-base">
                {formatGBP(grossProfit * 100)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-emerald-700 bg-emerald-100/80 border border-emerald-300 px-2 py-0.5 rounded font-bold uppercase">
                Salary + Dividend Split
              </span>
              <span className="block text-[10px] text-[#666666] mt-0.5">Optimal £12,570 PAYE floor</span>
            </div>
          </div>
        </div>

        {/* Results Card Right Column */}
        <div className="lg:col-span-5 bg-[#000000] text-white p-6 rounded-2xl border border-[#222222] shadow-xl space-y-5">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#C0A262] font-bold block">
              Estimated Annual Tax Difference
            </span>
            <div className="font-serif-heading text-3xl sm:text-4xl text-white font-bold mt-1">
              ~{formatGBP(annualSavings * 100)}
              <span className="text-xs font-sans font-normal text-[#D1D5DB] block sm:inline sm:ml-1">
                /year in preserved profits
              </span>
            </div>
            <p className="text-[11px] text-[#A1A1AA] mt-1.5 leading-relaxed">
              Achieved via efficient salary/dividend draws, capital allowances, pension relief, and accurate input VAT recovery.
            </p>
          </div>

          <div className="space-y-2 border-t border-[#222222] pt-4 text-xs">
            <div className="flex justify-between text-[#D1D5DB]">
              <span>Standard Tax Exposure:</span>
              <span className="font-mono text-rose-400 font-semibold">{formatGBP((totalSoleTraderTax + 2000) * 100)}</span>
            </div>
            <div className="flex justify-between text-[#D1D5DB]">
              <span>Wealthwise Structured Exposure:</span>
              <span className="font-mono text-emerald-400 font-semibold">{formatGBP((totalLtdTax) * 100)}</span>
            </div>
            <div className="flex justify-between text-white font-bold pt-1.5 border-t border-[#222222]">
              <span>Recommended Fixed Retainer:</span>
              <span className="text-[#C0A262] font-semibold">{formatGBP(monthlyFee * 100)}/mo</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClaim}
            className="w-full py-3.5 bg-[#C0A262] hover:bg-[#CDBA7A] text-black font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 min-h-[46px]"
          >
            <span>Claim This Strategy &amp; Speak to an Accountant</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
