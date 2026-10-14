"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  ShieldAlert,
  Send,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  FileText,
  Lock,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Eye,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { BRAND } from "@/lib/brand";

interface ProjectScopeQuestionnaireProps {
  onUnlockPreview?: () => void;
}

export function ProjectScopeQuestionnaire({ onUnlockPreview }: ProjectScopeQuestionnaireProps) {
  // 60-day countdown timer (2 months)
  // Target expiration: 60 days from now
  const [timeLeft, setTimeLeft] = useState({
    days: 59,
    hours: 23,
    minutes: 54,
    seconds: 32,
  });

  const [activeTab, setActiveTab] = useState<"PROPOSAL" | "QUESTIONS" | "SUBMIT">("QUESTIONS");
  const [submitted, setSubmitted] = useState(false);

  // Form state holding the 13 questions
  const [answers, setAnswers] = useState({
    q1_domain: "",
    q2_current_developer: "",
    q3_assets_ready: "",
    q4_launch_must_haves: "",
    q5_day_one_users: "",
    q6_vat_schemes: "",
    q7_bank_feeds: "",
    q8_migration_xero: "",
    q9_client_support: "",
    q10_real_data: "",
    q11_budget: "",
    q12_code_ownership: "",
    q13_decision_makers: "",
    additional_notes: "",
  });

  useEffect(() => {
    // Dynamic countdown ticker
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (field: keyof typeof answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      // 1. Post to Supabase database via our API route
      await fetch("/api/scope-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
    } catch (err) {
      console.warn("Database sync error (proceeding to WhatsApp):", err);
    }

    // 2. Prepare prefilled WhatsApp message with summary
    const summaryText = encodeURIComponent(
      `Hi Dev, I have completed the Project Scope Questionnaire for Wealth Wise Accountant.\n\n` +
      `Launch Timeline: Early November\n` +
      `Domain & Hosting: ${answers.q1_domain || "See portal"}\n` +
      `Software Scope: ${answers.q4_launch_must_haves || "See portal"}\n` +
      `Bank Feeds: ${answers.q7_bank_feeds || "See portal"}\n` +
      `Budget / Route: ${answers.q11_budget || "See portal"}\n\n` +
      `Please review our submission so we can lock in the build schedule.`
    );

    // 3. Open WhatsApp directly with my number
    window.open(`https://wa.me/447851055929?text=${summaryText}`, "_blank");
  };

  const generateWhatsAppDirectLink = () => {
    const text = encodeURIComponent(
      "Hi Dev, reaching out regarding Wealth Wise Accountant platform scope and November launch schedule."
    );
    return `https://wa.me/447851055929?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-[#F3F4F6] font-sans antialiased selection:bg-[#C0A262] selection:text-black">
      {/* Top Advisory Bar */}
      <div className="bg-[#14151B] border-b border-[#2A2B35] px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#C0A262]">
            <Clock className="w-4 h-4 shrink-0 text-[#C0A262]" />
            <span className="font-semibold text-white">Project Staging System Status:</span>
            <span className="text-[#A1A1AA]">
              Reserved in Cloud Registry for 60 Days before automatic archiving.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://mercianwealth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#1F2028] hover:bg-[#2A2B35] text-[#C0A262] border border-[#C0A262]/30 transition-colors flex items-center gap-1.5 font-medium"
            >
              <span>Visit Mercian Wealth</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={generateWhatsAppDirectLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 transition-colors flex items-center gap-1.5 font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: 07851055929</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header with Logo */}
      <header className="bg-[#0D0E12] border-b border-[#1F2028] py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={BRAND.logos.fullLogo}
              alt={BRAND.practiceName}
              width={220}
              height={36}
              priority
              className="h-8 sm:h-9 w-auto object-contain"
            />
            <span className="text-[10px] font-bold bg-[#C0A262]/20 text-[#C0A262] border border-[#C0A262]/40 px-2 py-0.5 rounded">
              STAGING RESERVATION
            </span>
          </div>

          {onUnlockPreview && (
            <button
              onClick={onUnlockPreview}
              className="text-xs text-[#9CA3AF] hover:text-[#C0A262] flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect Prototype Preview</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Staging & Scope Container */}
      <main className="max-w-5xl mx-auto px-4 py-10 sm:py-14 space-y-10">
        {/* Reservation & Expiration Countdown Hero */}
        <div className="bg-[#12131A] border border-[#2B2D3A] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C0A262]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#21232E] pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Project Staging Lock Active</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif-heading text-white">
                Wealth Wise Accountant — Deployment Readiness & Scope Portal
              </h1>
              <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-2xl leading-relaxed">
                This dedicated build architecture and interactive prototype are reserved in our staging environment for <strong>2 months</strong>. In order to proceed with engineering and lock in the <strong>early November launch date</strong>, we require the final business scope sign-off below.
              </p>
            </div>

            {/* 60-Day Countdown Box */}
            <div className="bg-[#0A0B0E] border border-[#2B2D3A] rounded-xl p-4 text-center shrink-0 min-w-[240px]">
              <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider block mb-2">
                Staging Reservation Countdown
              </span>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-[#151720] rounded-lg p-2 border border-[#232530]">
                  <div className="text-xl font-mono font-bold text-[#C0A262]">{timeLeft.days}</div>
                  <div className="text-[9px] text-[#71717A] uppercase">Days</div>
                </div>
                <div className="bg-[#151720] rounded-lg p-2 border border-[#232530]">
                  <div className="text-xl font-mono font-bold text-[#C0A262]">{timeLeft.hours}</div>
                  <div className="text-[9px] text-[#71717A] uppercase">Hours</div>
                </div>
                <div className="bg-[#151720] rounded-lg p-2 border border-[#232530]">
                  <div className="text-xl font-mono font-bold text-[#C0A262]">{timeLeft.minutes}</div>
                  <div className="text-[9px] text-[#71717A] uppercase">Mins</div>
                </div>
                <div className="bg-[#151720] rounded-lg p-2 border border-[#232530]">
                  <div className="text-xl font-mono font-bold text-[#C0A262]">{timeLeft.seconds}</div>
                  <div className="text-[9px] text-[#71717A] uppercase">Secs</div>
                </div>
              </div>
              <p className="text-[10px] text-[#71717A] mt-2">Target launch window: 1st – 2nd week November</p>
            </div>
          </div>

          {/* Quick Action Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-[#21232E] pb-3 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab("QUESTIONS")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all min-h-[40px] flex items-center gap-2 ${
                activeTab === "QUESTIONS"
                  ? "bg-[#C0A262] text-black font-bold shadow-md"
                  : "bg-[#181A22] text-[#9CA3AF] hover:text-white"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Project Scope Questionnaire (13 Questions)</span>
            </button>

            <button
              onClick={() => setActiveTab("PROPOSAL")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all min-h-[40px] flex items-center gap-2 ${
                activeTab === "PROPOSAL"
                  ? "bg-[#C0A262] text-black font-bold shadow-md"
                  : "bg-[#181A22] text-[#9CA3AF] hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Proposal & Pricing Framework</span>
            </button>
          </div>

          {/* TAB 1: QUESTIONNAIRE FORM */}
          {activeTab === "QUESTIONS" && (
            <div className="space-y-8">
              <div className="bg-[#0A0B0E] p-4 rounded-xl border border-[#21232E] text-xs text-[#9CA3AF] leading-relaxed">
                <p className="font-semibold text-white mb-1">How this works:</p>
                To ensure a fixed-price delivery with zero scope discrepancies, please provide short answers to the sections below. Once submitted, your requirements are logged directly into our engineering pipeline and sent to WhatsApp for instant confirmation.
              </div>

              {submitted ? (
                <div className="bg-emerald-950/40 border border-emerald-500/50 rounded-2xl p-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-serif-heading">
                    Scope Submission Received
                  </h3>
                  <p className="text-xs text-[#A1A1AA] max-w-md mx-auto">
                    Your answers have been forwarded to our technical director. WhatsApp has opened with your summary for instant confirmation.
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-3">
                    <a
                      href={generateWhatsAppDirectLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-[#25D366] text-black font-bold rounded-xl text-xs hover:bg-[#20ba5a] transition-colors flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Message on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-8">
                  {/* Section A: Launch & Website */}
                  <div className="space-y-4">
                    <div className="border-b border-[#21232E] pb-2 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#C0A262] uppercase tracking-wider flex items-center gap-2">
                        <span>Part 1: Launch & Website (Priority for November Launch)</span>
                      </h3>
                      <span className="text-[10px] text-[#71717A]">3 Questions</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 text-xs">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-white block">
                          1. Who controls your domain, hosting and email today, and can I get access?
                        </label>
                        <input
                          type="text"
                          required
                          value={answers.q1_domain}
                          onChange={(e) => handleInputChange("q1_domain", e.target.value)}
                          placeholder="e.g. Domain registered with GoDaddy / Hostinger; login can be provided"
                          className="w-full px-3.5 py-2.5 bg-[#0D0E14] border border-[#2A2B38] rounded-xl text-white placeholder-[#52525B] focus:outline-none focus:border-[#C0A262] min-h-[44px]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-semibold text-white block">
                          2. Who is currently working on your website, and will they hand it over?
                        </label>
                        <input
                          type="text"
                          required
                          value={answers.q2_current_developer}
                          onChange={(e) => handleInputChange("q2_current_developer", e.target.value)}
                          placeholder="e.g. Previous Hostinger freelancer; ready to transfer DNS immediately"
                          className="w-full px-3.5 py-2.5 bg-[#0D0E14] border border-[#2A2B38] rounded-xl text-white placeholder-[#52525B] focus:outline-none focus:border-[#C0A262] min-h-[44px]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-semibold text-white block">
                          3. Do you have your logo, photos, wording and company details ready?
                        </label>
                        <input
                          type="text"
                          required
                          value={answers.q3_assets_ready}
                          onChange={(e) => handleInputChange("q3_assets_ready", e.target.value)}
                          placeholder="e.g. Yes, high-res Wealth Wise logos and team photos are ready to use"
                          className="w-full px-3.5 py-2.5 bg-[#0D0E14] border border-[#2A2B38] rounded-xl text-white placeholder-[#52525B] focus:outline-none focus:border-[#C0A262] min-h-[44px]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section B: The Software Platform */}
                  <div className="space-y-4">
                    <div className="border-b border-[#21232E] pb-2 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#C0A262] uppercase tracking-wider flex items-center gap-2">
                        <span>Part 2: The Software Platform (Functional Scope)</span>
                      </h3>
                      <span className="text-[10px] text-[#71717A]">7 Questions</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 text-xs">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-white block">
                          4. What must be working at launch, and what can come later?
                        </label>
                        <textarea
                          rows={2}
                          required
                          value={answers.q4_launch_must_haves}
                          onChange={(e) => handleInputChange("q4_launch_must_haves", e.target.value)}
                          placeholder="e.g. Website and client document upload dropzone must work first; live bank feeds can roll out in Phase 2"
                          className="w-full px-3.5 py-2.5 bg-[#0D0E14] border border-[#2A2B38] rounded-xl text-white placeholder-[#52525B] focus:outline-none focus:border-[#C0A262]"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-white block">
                            5. Who will use it on day one: team only or clients too? How many clients?
                          </label>
                          <input
                            type="text"
                            required
                            value={answers.q5_day_one_users}
                            onChange={(e) => handleInputChange("q5_day_one_users", e.target.value)}
                            placeholder="e.g. Practice team of 2 partners + initial 15-20 clients"
                            className="w-full px-3.5 py-2.5 bg-[#0D0E14] border border-[#2A2B38] rounded-xl text-white placeholder-[#52525B] focus:outline-none focus:border-[#C0A262] min-h-[44px]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-semibold text-white block">
                            6. Which VAT schemes do you work with, and who will check the accounting logic?
                          </label>
                          <input
                            type="text"
                            required
                            value={answers.q6_vat_schemes}
                            onChange={(e) => handleInputChange("q6_vat_schemes", e.target.value)}
                            placeholder="e.g. Standard 20% & Flat Rate; senior partner reviews computations"
                            className="w-full px-3.5 py-2.5 bg-[#0D0E14] border border-[#2A2B38] rounded-xl text-white placeholder-[#52525B] focus:outline-none focus:border-[#C0A262] min-h-[44px]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-white block">
                            7. For bank feeds: which banks, and will clients connect their own accounts?
                          </label>
                          <input
                            type="text"
                            required
                            value={answers.q7_bank_feeds}
                            onChange={(e) => handleInputChange("q7_bank_feeds", e.target.value)}
                            placeholder="e.g. Barclays, NatWest, Lloyds; clients connect via Open Banking"
                            className="w-full px-3.5 py-2.5 bg-[#0D0E14] border border-[#2A2B38] rounded-xl text-white placeholder-[#52525B] focus:outline-none focus:border-[#C0A262] min-h-[44px]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-semibold text-white block">
                            8. Do you want Xero and Dext data moved across, or run both for a while?
                          </label>
                          <input
                            type="text"
                            required
                            value={answers.q8_migration_xero}
                            onChange={(e) => handleInputChange("q8_migration_xero", e.target.value)}
                            placeholder="e.g. Run parallel for 1-2 quarters during client transition"
                            className="w-full px-3.5 py-2.5 bg-[#0D0E14] border border-[#2A2B38] rounded-xl text-white placeholder-[#52525B] focus:outline-none focus:border-[#C0A262] min-h-[44px]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-white block">
                            9. You mentioned charging clients £10/mo. Who will support them if needed?
                          </label>
                          <input
                            type="text"
                            required
                            value={answers.q9_client_support}
                            onChange={(e) => handleInputChange("q9_client_support", e.target.value)}
                            placeholder="e.g. Wealth Wise provides first-line practice customer support"
                            className="w-full px-3.5 py-2.5 bg-[#0D0E14] border border-[#2A2B38] rounded-xl text-white placeholder-[#52525B] focus:outline-none focus:border-[#C0A262] min-h-[44px]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-semibold text-white block">
                            10. Will real client data be used at launch?
                          </label>
                          <input
                            type="text"
                            required
                            value={answers.q10_real_data}
                            onChange={(e) => handleInputChange("q10_real_data", e.target.value)}
                            placeholder="e.g. Yes, starting with a cohort of pilot SME client accounts"
                            className="w-full px-3.5 py-2.5 bg-[#0D0E14] border border-[#2A2B38] rounded-xl text-white placeholder-[#52525B] focus:outline-none focus:border-[#C0A262] min-h-[44px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section C: Commercials & Ownership */}
                  <div className="space-y-4">
                    <div className="border-b border-[#21232E] pb-2 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#C0A262] uppercase tracking-wider flex items-center gap-2">
                        <span>Part 3: Commercials, Ownership & Delivery Route</span>
                      </h3>
                      <span className="text-[10px] text-[#71717A]">3 Questions</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 text-xs">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-white block">
                          11. What budget have you set aside, and for which parts?
                        </label>
                        <select
                          value={answers.q11_budget}
                          onChange={(e) => handleInputChange("q11_budget", e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#0D0E14] border border-[#2A2B38] rounded-xl text-white focus:outline-none focus:border-[#C0A262] min-h-[44px]"
                        >
                          <option value="">Select primary preferred option...</option>
                          <option value="Option A: £7,000 Flat All-In (50% upfront £3,500, Website Included Free)">
                            Option A: £7,000 Flat All-In (50% upfront £3,500, Website Included Free)
                          </option>
                          <option value="Option B: £495 Website Now (Credit £495 toward £6,505 platform later)">
                            Option B: £495 Website Now (Credit £495 toward £6,505 platform later)
                          </option>
                          <option value="Option C: Lease-to-own £1,000 deposit + £500/month">
                            Option C: Lease-to-own £1,000 deposit + £500/month
                          </option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-white block">
                            12. When you say full code ownership, what do you need to be able to do with it?
                          </label>
                          <input
                            type="text"
                            required
                            value={answers.q12_code_ownership}
                            onChange={(e) => handleInputChange("q12_code_ownership", e.target.value)}
                            placeholder="e.g. 100% self-hosted on our own Supabase/Vercel instance"
                            className="w-full px-3.5 py-2.5 bg-[#0D0E14] border border-[#2A2B38] rounded-xl text-white placeholder-[#52525B] focus:outline-none focus:border-[#C0A262] min-h-[44px]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-semibold text-white block">
                            13. Who else is involved in the decision, and what happens if the date has to move?
                          </label>
                          <input
                            type="text"
                            required
                            value={answers.q13_decision_makers}
                            onChange={(e) => handleInputChange("q13_decision_makers", e.target.value)}
                            placeholder="e.g. Both business partners agree; November launch is strict target"
                            className="w-full px-3.5 py-2.5 bg-[#0D0E14] border border-[#2A2B38] rounded-xl text-white placeholder-[#52525B] focus:outline-none focus:border-[#C0A262] min-h-[44px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-[#21232E] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-[#71717A]">
                      🔒 Submitting locks your answers into our engineering schedule.
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#C0A262] hover:bg-[#D4B876] text-black font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 min-h-[46px]"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Scope & Lock November Schedule</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: PROPOSAL OVERVIEW */}
          {activeTab === "PROPOSAL" && (
            <div className="space-y-6 text-xs text-[#D1D5DB] leading-relaxed">
              <div className="bg-[#0A0B0E] p-6 rounded-xl border border-[#21232E] space-y-4">
                <h3 className="text-base font-bold text-white font-serif-heading">
                  Commercial Options Submitted for Review
                </h3>
                <p>
                  To hit your early November deadline with zero delays or liability risk, the work is partitioned into two clear stages:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#151720] border border-[#2A2B35] space-y-2">
                    <span className="text-[10px] font-bold text-[#C0A262] uppercase tracking-wider block">
                      Option 1: Early November Fast-Track
                    </span>
                    <h4 className="text-sm font-bold text-white">Brand Website Upgrade Only</h4>
                    <p className="text-[#9CA3AF] text-[11px]">
                      Full launch of the luxury black-and-gold website to replace Hostinger. Mobile-responsive with high-converting client intake forms.
                    </p>
                    <div className="text-base font-bold text-white pt-2">
                      £495 <span className="text-xs font-normal text-[#9CA3AF]">one-off (£250 deposit)</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#151720] border border-[#C0A262]/40 space-y-2">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                      Option 2: Complete Practice Platform
                    </span>
                    <h4 className="text-sm font-bold text-white">Full Financial OS + Website Included</h4>
                    <p className="text-[#9CA3AF] text-[11px]">
                      Complete proprietary platform: Live bank feeds, automated 9-box VAT engine, weekly client dropzone, and website included for free.
                    </p>
                    <div className="text-base font-bold text-white pt-2">
                      £7,000 <span className="text-xs font-normal text-[#9CA3AF]">flat (50% upfront £3,500)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-[#A1A1AA] border-t border-[#1F2028]">
                  💡 <strong>Credit Guarantee:</strong> If you start with Option 1 today (£495), the entire £495 is credited toward Phase 2, leaving only £6,505 remaining whenever you begin the platform build.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contact Strip */}
        <div className="bg-[#12131A] border border-[#2B2D3A] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <div className="font-bold text-white text-sm">Need immediate phone clarification?</div>
            <p className="text-[#9CA3AF] mt-0.5">
              Contact our engineering director directly or schedule your onboarding call.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="https://mercianwealth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 bg-[#1F2028] hover:bg-[#2A2B35] text-[#C0A262] border border-[#C0A262]/30 rounded-xl transition-colors font-medium text-center flex items-center justify-center gap-1.5"
            >
              <span>Mercian Wealth</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={generateWhatsAppDirectLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold rounded-xl transition-colors text-center flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: 07851055929</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1F2028] bg-[#0A0B0E] py-6 text-center text-xs text-[#71717A]">
        <p>© 2026 {BRAND.legalName} · Staging Deployment Portal</p>
      </footer>
    </div>
  );
}
