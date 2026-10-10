import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { BRAND } from "@/lib/brand";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#f4efe6] flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md w-full space-y-4 p-8 bg-[#141519] rounded-2xl border border-[#26241e]">
        <span className="text-4xl font-black text-[#c9a84c]">404</span>
        <h1 className="text-xl font-bold text-white">Page Not Found</h1>
        <p className="text-xs text-[#b8a88a] leading-relaxed">
          The requested page could not be located in this {BRAND.practiceName} prototype preview.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            href="/"
            className="px-4 py-2.5 rounded-xl bg-[#c9a84c] text-black font-bold text-xs hover:bg-[#d8b85c] transition-colors flex items-center justify-center gap-2 min-h-[44px]"
          >
            <Home className="w-4 h-4" />
            <span>Return to Website</span>
          </Link>
          <Link
            href="/demo"
            className="px-4 py-2.5 rounded-xl bg-[#1b1c22] text-[#f4efe6] font-semibold text-xs border border-[#2e2a21] hover:bg-[#252630] transition-colors flex items-center justify-center gap-2 min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Platform Demo</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
