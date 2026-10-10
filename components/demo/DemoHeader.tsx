"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { BRAND } from "@/lib/brand";

interface DemoHeaderProps {
  activeView: "ACCOUNTANT" | "CLIENT";
  title: string;
}

export function DemoHeader({ activeView, title }: DemoHeaderProps) {
  return (
    <div className="w-full">
      {/* Review Prototype Banner */}
      <div className="bg-[#111111] text-[#C0A262] border-b border-[#222222] px-4 py-2.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#C0A262] shrink-0" />
            <span className="font-semibold text-white">
              Prototype for review. Sample data only.
            </span>
            <span className="hidden md:inline text-[#D1D5DB]">
              — No live databases or client records are connected.
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-[#D1D5DB] hidden sm:inline">
              Mode: Static Seeded Data
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

      {/* Demo View Navigation Header: Black with Real Gold Framed Logo */}
      <header className="sticky top-0 z-40 bg-[#000000] text-white border-b border-[#222222] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center">
              <Image
                src={BRAND.logos.fullLogo}
                alt={BRAND.practiceName}
                width={200}
                height={32}
                priority
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </Link>
            <div className="h-4 w-px bg-[#333333] hidden sm:block" />
            <span className="text-xs sm:text-sm font-medium text-[#D1D5DB] hidden sm:inline">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#111111] p-1 rounded-md border border-[#333333] text-xs font-medium">
              <Link
                href="/demo/accountant"
                className={`px-3 py-1.5 rounded transition-colors min-h-[36px] flex items-center ${
                  activeView === "ACCOUNTANT"
                    ? "bg-[#C0A262] text-black font-semibold shadow-xs"
                    : "text-[#D1D5DB] hover:text-white"
                }`}
              >
                Accountant Hub
              </Link>
              <Link
                href="/demo/client"
                className={`px-3 py-1.5 rounded transition-colors min-h-[36px] flex items-center ${
                  activeView === "CLIENT"
                    ? "bg-[#C0A262] text-black font-semibold shadow-xs"
                    : "text-[#D1D5DB] hover:text-white"
                }`}
              >
                Client Portal
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
