"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Building2, 
  Briefcase, 
  Smartphone, 
  MessageCircle, 
  ChevronUp, 
  ChevronDown, 
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { BRAND } from "@/lib/brand";

export function PrototypeReviewBar() {
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(false);

  const isPublicSite = pathname === "/" || pathname === "/test-404";
  const isAccountantOS = pathname === "/demo/accountant" || (pathname === "/demo" && !pathname.includes("client"));
  const isClientPortal = pathname === "/demo/client";

  if (isMinimized) {
    return (
      <div className="fixed top-2 right-2 z-50 animate-in fade-in">
        <button
          onClick={() => setIsMinimized(false)}
          className="px-3 py-1.5 bg-[#141519] border border-[#C0A262] text-[#C0A262] hover:text-white rounded-full text-[11px] font-bold shadow-xl flex items-center gap-1.5 backdrop-blur-md"
        >
          <Sparkles className="w-3 h-3 text-[#C0A262]" />
          <span>Review Switcher</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <aside aria-label="Prototype environment switcher" className="w-full bg-[#0D0E12] text-white border-b border-[#262835] py-2 px-3 sm:px-4 z-50 text-xs shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        {/* Practice Label & Status */}
        <div className="flex items-center gap-2 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-white tracking-tight uppercase">
            {BRAND.practiceName} · Practice OS Review Mode
          </span>
          <span className="hidden lg:inline text-[#8C90A0]">
            (ICAEW / HMRC MTD Architecture)
          </span>
        </div>

        {/* 3 Integrated Operating Environments */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap min-h-[32px] ${
              isPublicSite
                ? "bg-[#C0A262] text-black shadow-xs font-bold"
                : "bg-[#181922] text-[#D1D5DB] hover:text-white border border-[#2B2D3A]"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>1. Public Practice Portal</span>
          </Link>

          <Link
            href="/demo/accountant"
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap min-h-[32px] ${
              isAccountantOS
                ? "bg-[#C0A262] text-black shadow-xs font-bold"
                : "bg-[#181922] text-[#D1D5DB] hover:text-white border border-[#2B2D3A]"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>2. Partner Practice OS</span>
            <span className="text-[10px] bg-rose-500 text-white font-mono px-1.5 py-0.2 rounded-full font-bold">
              6
            </span>
          </Link>

          <Link
            href="/demo/client"
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap min-h-[32px] ${
              isClientPortal
                ? "bg-[#C0A262] text-black shadow-xs font-bold"
                : "bg-[#181922] text-[#D1D5DB] hover:text-white border border-[#2B2D3A]"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>3. Client Dropzone &amp; Vault</span>
          </Link>
        </div>

        {/* Quick WhatsApp & Minimize */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://wa.me/447737014274?text=Hello%20Wealthwise%20Accountants,%20I%20would%20like%20to%20enquire%20about%20accounting%20and%20tax%20services"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-[11px] font-semibold transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp Connect</span>
          </a>

          <button
            onClick={() => setIsMinimized(true)}
            className="text-[#71717A] hover:text-white p-1 rounded transition-colors"
            title="Minimize review bar"
            aria-label="Minimize review bar"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
