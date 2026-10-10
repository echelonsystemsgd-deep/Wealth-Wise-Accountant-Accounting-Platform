import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Briefcase, Building2, ShieldAlert, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/brand";

export default function DemoHubPage() {
  return (
    <div className="min-h-screen bg-[#F0F5FA] text-[#111111] flex flex-col justify-between">
      {/* Prototype Review Banner */}
      <div className="bg-[#111111] text-[#C0A262] border-b border-[#222222] px-4 py-2.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#C0A262] shrink-0" />
            <span className="font-semibold text-white">
              Prototype for review. Sample data only.
            </span>
          </div>
          <Link
            href="/"
            className="text-[#C0A262] hover:text-[#CDBA7A] underline flex items-center gap-1 font-semibold min-h-[44px] sm:min-h-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to website</span>
          </Link>
        </div>
      </div>

      {/* Header with real full logo */}
      <header className="bg-[#000000] text-white py-4 px-4 sm:px-8 border-b border-[#222222]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src={BRAND.logos.fullLogo}
              alt={BRAND.practiceName}
              width={220}
              height={35}
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </Link>
          <Link
            href="/"
            className="text-xs text-[#D1D5DB] hover:text-[#C0A262] min-h-[44px] flex items-center"
          >
            ← Return to Website
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-8 my-auto">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C0A262] bg-white px-3 py-1 rounded-md border border-[#E2E8F0]">
            CLIENT REVIEW PREVIEW
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] mt-4">
            Select {BRAND.practiceName} Demo Workspace
          </h1>
          <p className="text-sm text-[#666666] mt-2 max-w-xl mx-auto leading-relaxed">
            Choose which interactive perspective you would like to explore. Both environments use static sample data for review purposes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
          {/* Accountant Hub Card */}
          <Link
            href="/demo/accountant"
            className="p-8 rounded-2xl bg-white border border-[#D1D5DB] hover:border-[#C0A262] transition-colors group flex flex-col justify-between space-y-4 shadow-sm"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F0F5FA] border border-[#E2E8F0] text-[#111111] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Briefcase className="w-6 h-6 text-[#C0A262]" />
              </div>
              <h2 className="font-serif-heading text-xl font-bold text-[#111111] mt-4">
                Accountant Hub
              </h2>
              <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                Explore the practice management view: multi-client overview, general ledger journals, bank matching preview, and statutory report generation.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#9A7A3A] group-hover:translate-x-1 transition-transform pt-2">
              <span>Enter Accountant Hub Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Client Portal Card */}
          <Link
            href="/demo/client"
            className="p-8 rounded-2xl bg-white border border-[#D1D5DB] hover:border-[#C0A262] transition-colors group flex flex-col justify-between space-y-4 shadow-sm"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F0F5FA] border border-[#E2E8F0] text-[#111111] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6 text-[#C0A262]" />
              </div>
              <h2 className="font-serif-heading text-xl font-bold text-[#111111] mt-4">
                Client Business Portal
              </h2>
              <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                Explore the client business view (sample SME: Apex Digital Solutions Ltd): bank position, sales invoicing, document dropzone, and in-app accountant chat.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#9A7A3A] group-hover:translate-x-1 transition-transform pt-2">
              <span>Enter Client Portal Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </div>

      <footer className="border-t border-[#D1D5DB] bg-white py-4 text-center text-xs text-[#666666]">
        <p>© 2026 {BRAND.legalName} · Prototype for review only.</p>
      </footer>
    </div>
  );
}
