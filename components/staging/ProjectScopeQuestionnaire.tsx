"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Send,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  FileText,
  Lock,
  KeyRound,
  AlertTriangle,
  ArrowRight,
  Eye,
  EyeOff,
  Database,
  Trash2,
  RefreshCw,
  XCircle,
  Shield,
  Activity,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { BulldozerDemolition } from "@/components/demolition/BulldozerDemolition";

interface ProjectScopeQuestionnaireProps {
  onUnlockPreview?: () => void;
}

export function ProjectScopeQuestionnaire({ onUnlockPreview }: ProjectScopeQuestionnaireProps) {
  // --------------------------------------------------------------------------
  // 1. DYNAMIC COUNTDOWN & 60-DAY SELF-DESTRUCTION STATE
  // --------------------------------------------------------------------------
  const [timeLeft, setTimeLeft] = useState({
    days: 59,
    hours: 23,
    minutes: 54,
    seconds: 32,
  });

  // Toggle for testing destruction mode immediately
  const [isDestroyed, setIsDestroyed] = useState(false);

  // --------------------------------------------------------------------------
  // 2. DEVELOPER ACCESS & SUBMISSIONS VIEWER STATE
  // --------------------------------------------------------------------------
  const [devPassword, setDevPassword] = useState("");
  const [isDevAuthenticated, setIsDevAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [showDevModal, setShowDevModal] = useState(false);
  const [devTab, setDevTab] = useState<"PREVIEW" | "SUBMISSIONS">("PREVIEW");
  const [submissionsList, setSubmissionsList] = useState<any[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);

  // Lock body scroll and handle Escape key while dev modal is active
  useEffect(() => {
    if (!showDevModal) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowDevModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showDevModal]);

  // --------------------------------------------------------------------------
  // 3. QUESTIONNAIRE FORM STATE
  // --------------------------------------------------------------------------
  const [activeTab, setActiveTab] = useState<"QUESTIONS" | "PROPOSAL">("QUESTIONS");
  const [submitted, setSubmitted] = useState(false);

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
    contact_name: "",
    contact_phone: "",
  });

  // Real calendar-anchored 60-day countdown with localStorage persistence
  useEffect(() => {
    const SIXTY_DAYS_MS = 60 * 24 * 60 * 60 * 1000;
    let targetTimestamp: number;

    try {
      const stored = localStorage.getItem("ww_staging_deadline");
      if (stored && !isNaN(Number(stored))) {
        targetTimestamp = Number(stored);
      } else {
        targetTimestamp = Date.now() + SIXTY_DAYS_MS;
        localStorage.setItem("ww_staging_deadline", String(targetTimestamp));
      }
    } catch {
      targetTimestamp = Date.now() + SIXTY_DAYS_MS;
    }

    const updateCountdown = () => {
      const now = Date.now();
      const diff = targetTimestamp - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsDestroyed(true);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  // Check session storage on mount
  useEffect(() => {
    try {
      if (sessionStorage.getItem("ww_staging_unlocked") === "true") {
        setIsDevAuthenticated(true);
      }
    } catch {}
  }, []);

  // Developer Password Verification: Gurtej@2008#
  const handleDevUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (devPassword.trim() === "Gurtej@2008#") {
      setIsDevAuthenticated(true);
      setAuthError(false);
      try {
        sessionStorage.setItem("ww_staging_unlocked", "true");
      } catch {}
      fetchSubmissions();
      if (onUnlockPreview) {
        setShowDevModal(false);
        onUnlockPreview();
      }
    } else {
      setAuthError(true);
    }
  };

  const fetchSubmissions = async () => {
    setLoadingSubmissions(true);
    try {
      const res = await fetch("/api/scope-submission");
      const data = await res.json();
      if (data.submissions) {
        setSubmissionsList(data.submissions);
      }
    } catch (err) {
      console.warn("Could not retrieve submissions:", err);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  const handleInputChange = (field: keyof typeof answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      await fetch("/api/scope-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
    } catch (err) {
      console.warn("Database sync error (proceeding to WhatsApp):", err);
    }

    const summaryText = encodeURIComponent(
      `Hi Dev, I have submitted the Project Scope Questionnaire for Wealth Wise Accountant.\n\n` +
      `Launch Timeline: Early November\n` +
      `Domain & Hosting: ${answers.q1_domain || "See database"}\n` +
      `Software Scope: ${answers.q4_launch_must_haves || "See database"}\n` +
      `Bank Feeds: ${answers.q7_bank_feeds || "See database"}\n` +
      `Budget / Preferred Route: ${answers.q11_budget || "See database"}\n\n` +
      `Please review our submission so we can lock in the build schedule.`
    );

    window.open(`https://wa.me/447851055929?text=${summaryText}`, "_blank");
  };

  const generateWhatsAppDirectLink = () => {
    const text = encodeURIComponent(
      "Hi Dev, reaching out regarding Wealth Wise Accountant platform scope and November launch schedule."
    );
    return `https://wa.me/447851055929?text=${text}`;
  };

  // --------------------------------------------------------------------------
  // 4. ANIMATED BULLDOZER DESTRUCTION VIEW (TRIGGERED AFTER 60 DAYS)
  // --------------------------------------------------------------------------
  if (isDestroyed) {
    return <BulldozerDemolition onReset={() => setIsDestroyed(false)} />;
  }

  // --------------------------------------------------------------------------
  // 5. NORMAL ACTIVE STAGING RESERVATION PORTAL
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0A0B0E] text-[#F3F4F6] font-sans antialiased selection:bg-[#C0A262] selection:text-black">
      {/* Top Advisory Bar */}
      <div className="bg-[#14151B] border-b border-[#2A2B35] px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#C0A262]">
            <Clock className="w-4 h-4 shrink-0 text-[#C0A262]" />
            <span className="font-semibold text-white">Project Staging System Status:</span>
            <span className="text-[#A1A1AA]">
              Reserved in Cloud Registry for 60 Days before automatic destruction.
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

      {/* Main Header with Logo and Developer Security Portal */}
      <header className="bg-[#0D0E12] border-b border-[#1F2028] py-3.5 px-3 sm:py-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              src={BRAND.logos.fullLogo}
              alt={BRAND.practiceName}
              width={220}
              height={36}
              priority
              className="h-7 sm:h-9 w-auto object-contain"
            />
            <span className="hidden xs:inline-block text-[9px] sm:text-[10px] font-bold bg-[#C0A262]/20 text-[#C0A262] border border-[#C0A262]/40 px-2 py-0.5 rounded">
              STAGING RESERVATION
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Discreet Inspect Prototype Preview Button */}
            <button
              onClick={() => {
                if (isDevAuthenticated && onUnlockPreview) {
                  onUnlockPreview();
                } else {
                  setShowDevModal(true);
                }
              }}
              className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-[#181A22] hover:bg-[#222530] text-[#C0A262] border border-[#C0A262]/35 text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm min-h-[38px] sm:min-h-[40px]"
              title="Inspect Prototype Preview (Password Protected)"
            >
              <Eye className="w-3.5 h-3.5 text-[#C0A262]" />
              <span>Inspect Prototype Preview</span>
            </button>

            {isDevAuthenticated && (
              <button
                onClick={() => setShowDevModal(true)}
                className="p-2 sm:p-2.5 rounded-lg bg-[#181A22] hover:bg-[#222530] text-[#71717A] hover:text-[#C0A262] border border-[#2B2D3A] transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
                title="Developer Submissions Vault"
              >
                <KeyRound className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* DEVELOPER ACCESS MODAL (PASSCODE PROTECTED: Gurtej@2008#) */}
      {showDevModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto" onClick={() => setShowDevModal(false)} role="dialog" aria-modal="true">
          <div className="bg-[#12131A] border border-[#2B2D3A] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-150" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-[#21232E] pb-4">
              <div className="flex items-center gap-2 text-white">
                <Shield className="w-5 h-5 text-[#C0A262]" />
                <h3 className="font-bold text-base">Inspect Prototype Preview</h3>
              </div>
              <button
                onClick={() => setShowDevModal(false)}
                className="text-[#71717A] hover:text-white text-xs px-2 py-1 rounded"
              >
                ✕ Close
              </button>
            </div>

            {!isDevAuthenticated ? (
              <form onSubmit={handleDevUnlock} className="space-y-4">
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Enter authorized password to toggle into the luxury website prototype and review logged client scope submissions:
                </p>
                <div className="space-y-1.5">
                  <input
                    type="password"
                    value={devPassword}
                    onChange={(e) => setDevPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full px-4 py-3 bg-[#0A0B0E] border border-[#2B2D3A] rounded-xl text-white text-xs focus:outline-none focus:border-[#C0A262]"
                  />
                  {authError && (
                    <p className="text-[11px] text-red-400 font-semibold pt-1">
                      Incorrect password. Please verify your credentials and try again.
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#C0A262] text-black font-bold rounded-xl text-xs hover:bg-[#D4B876] transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Authorize & Inspect Prototype</span>
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-[#21232E] pb-3">
                  <button
                    onClick={() => setDevTab("PREVIEW")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      devTab === "PREVIEW" ? "bg-[#C0A262] text-black" : "text-[#71717A] hover:text-white"
                    }`}
                  >
                    Bypass to Live Prototype
                  </button>
                  <button
                    onClick={() => {
                      setDevTab("SUBMISSIONS");
                      fetchSubmissions();
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      devTab === "SUBMISSIONS" ? "bg-[#C0A262] text-black" : "text-[#71717A] hover:text-white"
                    }`}
                  >
                    Review Client Scope Submissions ({submissionsList.length})
                  </button>
                </div>

                {devTab === "PREVIEW" ? (
                  <div className="space-y-4">
                    <p className="text-xs text-[#A1A1AA]">
                      Authentication successful. You have unrestricted access to the complete luxury website, Accountant Hub, and Client Portal.
                    </p>
                    <button
                      onClick={() => {
                        setShowDevModal(false);
                        if (onUnlockPreview) onUnlockPreview();
                      }}
                      className="w-full py-3 bg-[#C0A262] text-black font-bold rounded-xl text-xs hover:bg-[#D4B876] transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Enter Full Prototype (Client Bypassed)</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowDevModal(false);
                        setIsDestroyed(true);
                      }}
                      className="w-full py-2.5 bg-[#181A22] text-[#F59E0B] border border-[#F59E0B]/30 font-semibold rounded-xl text-xs hover:bg-[#202330] transition-colors flex items-center justify-center gap-2"
                    >
                      <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
                      <span>Test Bulldozer Demolition Mode (Day 0)</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Client Questionnaire Records:</span>
                      <button
                        onClick={fetchSubmissions}
                        className="text-[11px] text-[#C0A262] flex items-center gap-1 hover:underline"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Refresh Submissions</span>
                      </button>
                    </div>

                    <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                      {loadingSubmissions ? (
                        <p className="text-xs text-[#71717A]">Retrieving verified submissions...</p>
                      ) : submissionsList.length === 0 ? (
                        <div className="p-4 rounded-xl bg-[#0A0B0E] border border-[#21232E] text-center text-xs text-[#71717A]">
                          No client questionnaire submissions logged yet. The client is currently pending review.
                        </div>
                      ) : (
                        submissionsList.map((sub, idx) => (
                          <div key={idx} className="p-3.5 bg-[#0A0B0E] border border-[#21232E] rounded-xl space-y-1.5 text-xs">
                            <div className="flex items-center justify-between text-[#C0A262] font-bold">
                              <span>Submission #{idx + 1} · {sub.practice_name || "Wealth Wise"}</span>
                              <span className="text-[10px] text-[#71717A]">{sub.created_at || "Recent"}</span>
                            </div>
                            <div className="text-[#A1A1AA] text-[11px] space-y-1">
                              <div><strong>Domain/Hosting:</strong> {sub.q1_domain || "N/A"}</div>
                              <div><strong>Software Needs:</strong> {sub.q4_launch_must_haves || "N/A"}</div>
                              <div><strong>Preferred Route:</strong> {sub.q11_budget || "N/A"}</div>
                              <div><strong>Status:</strong> <span className="text-amber-400 font-bold">{sub.submission_status || "PENDING"}</span></div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Staging & Scope Container */}
      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-12 space-y-6 sm:space-y-10">
        {/* Reservation & Expiration Countdown Hero */}
        <div className="bg-[#12131A] border border-[#2B2D3A] rounded-xl sm:rounded-2xl p-4 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C0A262]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 border-b border-[#21232E] pb-5 sm:pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] sm:text-xs font-semibold">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Project Staging Lock Active</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif-heading text-white leading-tight">
                Wealth Wise Accountant — Practice Growth & Proprietary Platform Portal
              </h1>
              <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-2xl leading-relaxed">
                This dedicated build architecture and interactive prototype are reserved in our staging environment for <strong>60 days</strong>. Our engineering commitment is to deliver immediate and compounding profitability to Wealth Wise: eliminating <strong>£30,000–£50,000/year in third-party software fees (Xero + Dext)</strong>, retaining over <strong>£90,000 in practice capital</strong> across 3 years, and launching a luxury client-intake presence ready for your <strong>early November launch</strong>.
              </p>
            </div>

            {/* 60-Day Countdown Box */}
            <div className="w-full md:w-auto bg-[#0A0B0E] border border-[#2B2D3A] rounded-xl p-3.5 sm:p-4 text-center shrink-0 min-w-0 md:min-w-[260px]">
              <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider block mb-2">
                Staging Reservation Countdown
              </span>
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center">
                <div className="bg-[#151720] rounded-lg p-1.5 sm:p-2 border border-[#232530]">
                  <div className="text-lg sm:text-xl font-mono font-bold text-[#C0A262]" suppressHydrationWarning>
                    {String(timeLeft.days).padStart(2, "0")}
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-[#71717A] uppercase">Days</div>
                </div>
                <div className="bg-[#151720] rounded-lg p-1.5 sm:p-2 border border-[#232530]">
                  <div className="text-lg sm:text-xl font-mono font-bold text-[#C0A262]" suppressHydrationWarning>
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-[#71717A] uppercase">Hours</div>
                </div>
                <div className="bg-[#151720] rounded-lg p-1.5 sm:p-2 border border-[#232530]">
                  <div className="text-lg sm:text-xl font-mono font-bold text-[#C0A262]" suppressHydrationWarning>
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-[#71717A] uppercase">Mins</div>
                </div>
                <div className="bg-[#151720] rounded-lg p-1.5 sm:p-2 border border-[#232530]">
                  <div className="text-lg sm:text-xl font-mono font-bold text-[#C0A262]" suppressHydrationWarning>
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-[#71717A] uppercase">Secs</div>
                </div>
              </div>
              <p className="text-[9px] sm:text-[10px] text-[#71717A] mt-2">Target launch window: 1st – 2nd week November</p>
            </div>
          </div>

          {/* Quick Action Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-[#21232E] pb-3 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => setActiveTab("QUESTIONS")}
              className={`shrink-0 px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-all min-h-[40px] flex items-center gap-2 ${
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
              <span>Verified Proposal & Pricing Framework</span>
            </button>
          </div>

          {/* TAB 1: QUESTIONNAIRE FORM */}
          {activeTab === "QUESTIONS" && (
            <div className="space-y-8">
              <div className="bg-[#0A0B0E] p-4 rounded-xl border border-[#21232E] text-xs text-[#9CA3AF] leading-relaxed">
                <p className="font-semibold text-white mb-1">How this works:</p>
                To guarantee fixed-price execution and eliminate scope discrepancies, please provide short answers below. Submitting securely locks your requirements into our dedicated engineering schedule and opens WhatsApp for immediate confirmation.
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
                    Your business scope requirements have been securely logged in our technical pipeline. WhatsApp has opened with your executive summary for immediate delivery confirmation.
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
                  {/* Part 1: Launch & Website */}
                  <div className="space-y-4">
                    <div className="border-b border-[#21232E] pb-2 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#C0A262] uppercase tracking-wider">
                        Part 1: Launch & Website (Priority for November Launch)
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

                  {/* Part 2: The Software Platform */}
                  <div className="space-y-4">
                    <div className="border-b border-[#21232E] pb-2 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#C0A262] uppercase tracking-wider">
                        Part 2: The Software Platform (Functional Scope)
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

                  {/* Part 3: Commercials & Ownership */}
                  <div className="space-y-4">
                    <div className="border-b border-[#21232E] pb-2 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#C0A262] uppercase tracking-wider">
                        Part 3: Commercials, Ownership & Delivery Route
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
                            placeholder="e.g. 100% full independent code ownership with zero ongoing software vendor fees"
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
                      🔒 Submitting locks your project requirements into our dedicated delivery schedule.
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
