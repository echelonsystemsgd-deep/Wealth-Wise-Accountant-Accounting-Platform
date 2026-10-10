"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  Phone,
  Mail,
  MapPin,
  Calendar,
  HelpCircle,
  ChevronDown,
  ExternalLink,
  Users,
  Award,
  Send,
  X,
  FileQuestion,
  LockKeyhole,
} from "lucide-react";

interface LandingPageProps {
  onEnterApp: (role: "ACCOUNTANT" | "CLIENT") => void;
  onOpenLogin: () => void;
}

export function LandingPage({ onEnterApp, onOpenLogin }: LandingPageProps) {
  const [pricingMode, setPricingMode] = useState<"INCLUDED_RETAINER" | "STANDALONE_SAAS">("INCLUDED_RETAINER");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  // Quick enquiry form state
  const [enquiryName, setEnquiryName] = useState("");
  const [enquiryEmail, setEnquiryEmail] = useState("");
  const [enquiryPhone, setEnquiryPhone] = useState("");
  const [enquiryService, setEnquiryService] = useState("Bookkeeping & Management Accounts");
  const [enquiryMessage, setEnquiryMessage] = useState("");
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySubmitted(true);
  };

  const faqs = [
    {
      q: "How does your pricing work?",
      a: "Most clients pay a fixed monthly fee agreed up front, based on the work involved — bookkeeping packages start from £54/month and self-assessment returns from £150 one-off. You will always receive a written quote before any work begins, with zero hidden surprises or hourly meters.",
    },
    {
      q: "How is Wealthwise Platform OS different from standard Xero or QuickBooks?",
      a: "Standard Xero charges you or your practice £30 to £55+ per month per client seat and treats you like another subscription number. Wealthwise Platform OS is custom-engineered for our practice: you get direct, seamless double-entry accounting, real-time receipt capture, and instant UK bank feeds completely integrated with your dedicated Wealthwise accountant overseeing every nominal ledger posting.",
    },
    {
      q: "Can I switch to Wealthwise from my existing accountant?",
      a: "Yes, and it is easier than most people expect. We handle the professional clearance letter and the complete handover of records directly with your previous accountant, usually within one week, at no cost to you.",
    },
    {
      q: "How quickly do I get a quote after contacting you?",
      a: "Within one business day of your consultation or enquiry. The quote is fixed, itemised, and valid for 30 days, so you can compare it in your own time.",
    },
    {
      q: "Is Making Tax Digital (MTD) and VAT compliance fully supported?",
      a: "Yes. Our platform and practice team handle full MTD VAT returns, quarterly submissions, Corporation Tax (CT600) computations, and Companies House statutory filings accurately and on time.",
    },
  ];

  const practiceStats = [
    { value: "5+", label: "Years advising local businesses" },
    { value: "250+", label: "Active UK clients looked after" },
    { value: "£1.2m+", label: "Tax legally saved since 2021" },
    { value: "100%", label: "HMRC & Companies House deadlines met" },
  ];

  const coreServices = [
    {
      title: "Bookkeeping & Management Accounts",
      desc: "Clean, up-to-date books every month, plus plain-English reports that show exactly where your money goes.",
      icon: Layers,
    },
    {
      title: "VAT & Making Tax Digital",
      desc: "MTD-compliant VAT registration, returns and reviews, so you never overpay or miss an HMRC deadline.",
      icon: ShieldCheck,
    },
    {
      title: "Corporation Tax & Year-End",
      desc: "Statutory accounts and corporation tax for limited companies, planned before the year ends, not after.",
      icon: Scale,
    },
    {
      title: "Self Assessment & Tax Returns",
      desc: "Personal tax returns filed accurately and on time with every tax relief and allowance you are entitled to.",
      icon: Calculator,
    },
    {
      title: "Payroll & Auto-Enrolment Pensions",
      desc: "Payslips, RTI submissions and auto-enrolment workplace pensions handled smoothly for teams of 1 to 100.",
      icon: Users,
    },
    {
      title: "Business Advisory & Cash Flow",
      desc: "Forecasts, pricing and growth planning from accountants who treat your business like their own.",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#f4efe6] font-sans selection:bg-[#d4af37] selection:text-black">
      {/* Top Practice Announcement / Contact Bar */}
      <div className="bg-[#08090a] text-[#c9b896] text-xs py-2.5 px-4 border-b border-[#2a2418]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs font-medium">
            <a
              href="tel:+447737014274"
              className="flex items-center gap-1.5 text-[#d4af37] hover:text-[#f3e5ab] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>+44 7737 014274</span>
            </a>
            <span className="hidden sm:inline text-[#3d3424]">|</span>
            <a
              href="mailto:info@wealthwiseaccountants.co.uk"
              className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>info@wealthwiseaccountants.co.uk</span>
            </a>
            <span className="hidden md:inline text-[#3d3424]">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-[#a8997a]">
              <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>65 Waterloo Road, Smethwick, B66 4JS</span>
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto sm:ml-0">
            <span className="text-[11px] text-[#a8997a]">
              Company No. <strong className="text-[#f4efe6]">16819892</strong>
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] bg-[#1a1711] text-[#e5c158] border border-[#524320] px-2.5 py-0.5 rounded-full font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
              Open for Consultations
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#0c0d0e]/95 backdrop-blur-md border-b border-[#242018] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Custom Gold Box Logo */}
            <div className="relative bg-white px-2.5 py-1 rounded-md border border-[#d4af37]/60 shadow-xs flex items-center justify-center">
              <Image
                src="/images/wealthwise-gold-logo.png"
                alt="Wealth Wise Logo"
                width={140}
                height={28}
                priority
                className="h-6 sm:h-7 w-auto object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="hidden sm:inline-block font-extrabold text-base tracking-tight text-white">
                  Accountants
                </span>
                <span className="text-[10px] bg-[#1d1912] text-[#d4af37] px-2 py-0.5 rounded font-mono font-bold border border-[#4a3d1f]">
                  PLATFORM OS
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-[#9c8e73] font-medium">
                Accounting & Tax Services · Bespoke Financial Platform
              </p>
            </div>
          </div>

          {/* Quick Anchor Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-[#c5b597]">
            <a href="#services" className="hover:text-[#d4af37] transition-colors">
              Services
            </a>
            <a href="#howitworks" className="hover:text-[#d4af37] transition-colors">
              How It Works
            </a>
            <a href="#team" className="hover:text-[#d4af37] transition-colors">
              Our Team
            </a>
            <a href="#xero-comparison" className="hover:text-[#d4af37] transition-colors">
              Why Us vs Xero
            </a>
            <a href="#pricing" className="hover:text-[#d4af37] transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-[#d4af37] transition-colors">
              FAQ
            </a>
            <a href="#contact" className="hover:text-[#d4af37] transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenLogin}
              className="px-3.5 py-2 text-xs font-semibold text-[#d4af37] hover:text-[#f3e5ab] hover:bg-[#1f1a12] border border-[#3d321b] rounded-lg transition-colors min-h-[38px]"
            >
              Client Login
            </button>
            <button
              onClick={() => onEnterApp("ACCOUNTANT")}
              className="px-4 py-2 text-xs font-bold text-[#0d0e11] bg-[#c9a84c] hover:bg-[#d8b85c] rounded-lg shadow-sm transition-all flex items-center gap-1.5 min-h-[38px]"
            >
              <span>Practice Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden border-b border-[#242018] bg-gradient-to-b from-[#111214] via-[#0e0f11] to-[#0c0d0e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1811] border border-[#54431e] text-xs text-[#e7c768] mb-6 font-medium shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
            <span>Accounting, Tax & Payroll for UK Limited Companies & Sole Traders</span>
            <span className="text-[#6d5727]">|</span>
            <span className="font-semibold text-white">Dedicated Proprietary OS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
            Every number your business depends on,{" "}
            <span className="text-[#c9a84c] underline decoration-[#c9a84c]/40 decoration-wavy underline-offset-8">
              under one roof.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#b8a88a] max-w-3xl mx-auto leading-relaxed">
            At Wealthwise Accountants, we keep things straightforward. Whether you need help with bookkeeping, payroll, VAT, annual accounts, or tax planning, we help you stay on top of the numbers with clear advice and our own dedicated cloud accounting platform.
          </p>

          {/* Action Callouts */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 max-w-lg mx-auto">
            <a
              href="#contact"
              className="px-6 py-3.5 rounded-xl bg-[#c9a84c] hover:bg-[#d8b85c] text-[#0d0e11] font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Calendar className="w-4 h-4 text-[#0d0e11]" />
              <span>Schedule a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => onEnterApp("CLIENT")}
              className="px-6 py-3.5 rounded-xl bg-[#17140e] hover:bg-[#231e15] text-[#f4efe6] font-bold text-sm transition-all border border-[#4a3d1f] shadow-xs flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Building2 className="w-4 h-4 text-[#d4af37]" />
              <span>Launch Client Portal Demo</span>
            </button>
          </div>

          {/* Live Practice Proof Metrics */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {practiceStats.map((stat, i) => (
              <div
                key={i}
                className="p-4 bg-[#141518] rounded-2xl border border-[#2b271d] shadow-sm text-center"
              >
                <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-[#d4af37] to-[#faecc3] bg-clip-text text-transparent tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-[#a39478] font-medium mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Practice Team Spotlight */}
      <section id="team" className="py-20 bg-[#0f1012] border-b border-[#242018]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden border-2 border-[#d4af37]/40 shadow-2xl shadow-black/80 bg-[#16171a]">
                <Image
                  src="/images/wealthwise-team.png"
                  alt="Wealthwise Accountants Partners"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover object-top hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-5 text-center">
                  <div className="font-extrabold text-white text-base">
                    Wealthwise Senior Leadership Team
                  </div>
                  <p className="text-xs text-[#d4af37] mt-0.5">
                    Qualified UK Accountants & Strategic Advisors
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#1d1912] border border-[#524320] text-xs font-bold text-[#d4af37]">
                <Award className="w-3.5 h-3.5" />
                <span>ABOUT WEALTHWISE ACCOUNTANTS</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                Real accountants who treat your business like their own.
              </h2>
              <p className="text-sm sm:text-base text-[#b8a88a] leading-relaxed">
                Registered in England & Wales (Company No. 16819892) with practice offices at 65 Waterloo Road, Smethwick. We founded Wealthwise Accountants to eliminate the cold, impersonal experience of corporate accounting firms and the spiralling subscription costs of third-party accounting apps.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#141518] border border-[#2b271d]">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                    Direct Partner Access
                  </h4>
                  <p className="text-xs text-[#9c8e73] mt-1.5">
                    Speak directly with the qualified accountants managing your books, not junior ticketing queues.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#141518] border border-[#2b271d]">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                    Fixed Transparent Fees
                  </h4>
                  <p className="text-xs text-[#9c8e73] mt-1.5">
                    Agreed upfront with zero hidden hourly meters. Free platform access included in all retainers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section id="services" className="py-20 bg-[#0c0d0e] border-b border-[#242018]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] bg-[#1d1912] px-3 py-1 rounded-md border border-[#524320]">
              WHAT WE DO
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3">
              Full-Spectrum UK Accounting & Tax Solutions
            </h2>
            <p className="text-sm sm:text-base text-[#b8a88a] mt-2">
              From day-to-day bookkeeping to complex corporation tax structuring, our qualified accountants take care of everything.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreServices.map((service, index) => {
              const IconComp = service.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-[#121316] border border-[#26221a] hover:border-[#d4af37]/50 hover:bg-[#16171b] transition-all space-y-3 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#1a1711] border border-[#4d3d1e] flex items-center justify-center text-[#d4af37] font-bold shadow-xs group-hover:scale-105 transition-transform">
                    <IconComp className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <h3 className="text-base font-bold text-white">{service.title}</h3>
                  <p className="text-xs sm:text-sm text-[#a39478] leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works: 3-Step Process */}
      <section id="howitworks" className="py-20 bg-[#0f1012] border-b border-[#242018]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              OUR SIMPLE PROCESS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
              Straightforward Accounting in 3 Steps
            </h2>
            <p className="text-sm text-[#b8a88a] mt-2">
              No endless onboarding checklists or confusing jargon. Just real accountants handling your numbers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#141518] border border-[#26221a] shadow-xs relative">
              <span className="text-4xl font-black text-[#362e1e]">01</span>
              <h3 className="text-lg font-bold text-white mt-2">Book Your Free Consultation</h3>
              <p className="text-xs sm:text-sm text-[#a39478] mt-2 leading-relaxed">
                A relaxed 15-minute call or coffee. Bring your questions, we will bring straight answers and zero jargon.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141518] border border-[#26221a] shadow-xs relative">
              <span className="text-4xl font-black text-[#362e1e]">02</span>
              <h3 className="text-lg font-bold text-white mt-2">Get a Clear Plan & Fixed-Fee Quote</h3>
              <p className="text-xs sm:text-sm text-[#a39478] mt-2 leading-relaxed">
                Within 24 hours you receive a written plan and an agreed fixed monthly fee. No hourly meters, no surprises.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141518] border border-[#26221a] shadow-xs relative">
              <span className="text-4xl font-black text-[#d4af37]">03</span>
              <h3 className="text-lg font-bold text-white mt-2">We Handle The Numbers</h3>
              <p className="text-xs sm:text-sm text-[#a39478] mt-2 leading-relaxed">
                Bookkeeping, tax, payroll, and HMRC deadlines — done. You get your evenings and weekends back.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Wealthwise OS Advantage over Xero & QuickBooks */}
      <section id="xero-comparison" className="py-20 bg-[#0c0d0e] border-b border-[#242018]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              SOFTWARE COMPARISON
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
              Why Wealthwise Platform OS Beats Off-The-Shelf Xero
            </h2>
            <p className="text-sm text-[#b8a88a] mt-2">
              Most accountancy firms force clients to purchase expensive Xero and Dext subscriptions. We built our own unified accounting operating system.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[620px] rounded-2xl overflow-hidden border border-[#302a1e] shadow-xl">
              <thead>
                <tr className="bg-[#17140e] text-[#f4efe6] font-semibold border-b border-[#3d331f]">
                  <th className="py-4 pl-5">Platform Dimension</th>
                  <th className="py-4 px-4 bg-[#141518] text-[#a8997a]">Standard Xero + Dext Add-ons</th>
                  <th className="py-4 pr-5 text-[#d4af37]">Wealthwise Accountants OS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#242018] bg-[#0f1012]">
                <tr className="hover:bg-[#15161a]">
                  <td className="py-3.5 pl-5 font-semibold text-white">Software Cost to Client</td>
                  <td className="py-3.5 px-4 text-rose-400 font-medium">£30 – £55+ / month per client</td>
                  <td className="py-3.5 pr-5 text-[#e5c158] font-bold">£0 extra — Included with your accounting package</td>
                </tr>
                <tr className="hover:bg-[#15161a]">
                  <td className="py-3.5 pl-5 font-semibold text-white">Receipt & Invoice Chasing</td>
                  <td className="py-3.5 px-4 text-[#9c8e73]">Disjointed WhatsApp, email trails, separate logins</td>
                  <td className="py-3.5 pr-5 text-white font-semibold">Unified 1-tap receipt vault & in-app client portal</td>
                </tr>
                <tr className="hover:bg-[#15161a]">
                  <td className="py-3.5 pl-5 font-semibold text-white">Accountant Oversight</td>
                  <td className="py-3.5 px-4 text-[#9c8e73]">DIY software with detached periodic reviews</td>
                  <td className="py-3.5 pr-5 text-white font-semibold">Live dual workspace: you and your accountant in real time</td>
                </tr>
                <tr className="hover:bg-[#15161a]">
                  <td className="py-3.5 pl-5 font-semibold text-white">Bookkeeping Invariants</td>
                  <td className="py-3.5 px-4 text-[#9c8e73]">Generic cloud ledger</td>
                  <td className="py-3.5 pr-5 text-[#e5c158] font-bold">Strict pence-precision double-entry (Σ Debits = Σ Credits)</td>
                </tr>
                <tr className="hover:bg-[#15161a]">
                  <td className="py-3.5 pl-5 font-semibold text-white">Direct Support</td>
                  <td className="py-3.5 px-4 text-[#9c8e73]">Automated help desks and chatbots</td>
                  <td className="py-3.5 pr-5 text-[#e5c158] font-bold">Direct line to your Smethwick accountancy team</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Transparent Pricing Section */}
      <section id="pricing" className="py-20 bg-[#0f1012] border-b border-[#242018]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1d1912] border border-[#524320] text-xs font-bold text-[#d4af37] mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Transparent & Fixed Monthly Fees</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Clear Pricing, Zero Surprises
            </h2>
            <p className="text-sm text-[#b8a88a] mt-2">
              Bookkeeping packages start from £54/month. Platform access is bundled directly for all accounting clients.
            </p>

            {/* Pricing Mode Toggle */}
            <div className="mt-6 inline-flex items-center p-1 bg-[#151619] rounded-xl border border-[#302a1e] text-xs font-semibold shadow-inner">
              <button
                onClick={() => setPricingMode("INCLUDED_RETAINER")}
                className={`px-4 py-2 rounded-lg transition-all min-h-[38px] ${
                  pricingMode === "INCLUDED_RETAINER"
                    ? "bg-gradient-to-r from-[#d4af37] to-[#c59e2b] text-black font-extrabold shadow-sm"
                    : "text-[#a8997a] hover:text-white"
                }`}
              >
                Option A: Bundled with Wealthwise Accountancy (£0 Software Fee)
              </button>
              <button
                onClick={() => setPricingMode("STANDALONE_SAAS")}
                className={`px-4 py-2 rounded-lg transition-all min-h-[38px] ${
                  pricingMode === "STANDALONE_SAAS"
                    ? "bg-gradient-to-r from-[#d4af37] to-[#c59e2b] text-black font-extrabold shadow-sm"
                    : "text-[#a8997a] hover:text-white"
                }`}
              >
                Option B: Standalone Platform Subscription
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Sole Trader / Self Assessment */}
            <div className="p-6 rounded-2xl border border-[#2b271d] bg-[#131417] hover:border-[#423924] transition-all flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-xs font-bold text-[#9c8e73] uppercase tracking-wider">
                  Self-Employed / Landlord
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Starter & Sole Trader</h3>
                <p className="text-xs text-[#8c7f66] mt-1">
                  For freelancers, contractors and self-assessment individuals.
                </p>

                <div className="my-5">
                  <div className="text-3xl font-extrabold text-white">
                    {pricingMode === "INCLUDED_RETAINER" ? "£54" : "£9"}
                    <span className="text-xs font-normal text-[#8c7f66]"> / month</span>
                  </div>
                  <p className="text-[11px] text-[#d4af37] font-medium mt-1">
                    {pricingMode === "INCLUDED_RETAINER"
                      ? "✓ Includes full bookkeeping + Self Assessment filing"
                      : "Direct software access only"}
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-[#c4b597] pt-3 border-t border-[#26221a]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span>Annual Self-Assessment tax return</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span>Monthly expense receipt capture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span>HMRC deadline management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span>Direct phone & email accountant contact</span>
                  </li>
                </ul>
              </div>

              <a
                href="#contact"
                className="mt-6 w-full py-2.5 bg-[#1b1c20] hover:bg-[#25262c] text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center min-h-[42px] border border-[#383327]"
              >
                Get Sole Trader Quote
              </a>
            </div>

            {/* Limited Company Package */}
            <div className="p-6 rounded-2xl border-2 border-[#d4af37] bg-[#16171b] shadow-xl relative flex flex-col justify-between">
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-[#d4af37] to-[#c59e2b] text-black text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                Most Popular
              </div>
              <div>
                <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                  Limited Companies
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Full Ltd Management</h3>
                <p className="text-xs text-[#a39478] mt-1">
                  Complete end-to-end accounting, tax and payroll for active UK companies.
                </p>

                <div className="my-5">
                  <div className="text-3xl font-extrabold text-white">
                    {pricingMode === "INCLUDED_RETAINER" ? "£110" : "£19"}
                    <span className="text-xs font-normal text-[#8c7f66]"> / month</span>
                  </div>
                  <p className="text-[11px] text-[#e5c158] font-medium mt-1">
                    {pricingMode === "INCLUDED_RETAINER"
                      ? "✓ Year-end statutory accounts + Corporation Tax included"
                      : "Saves £200+/year compared to Xero Growing"}
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-[#e6d8bc] pt-3 border-t border-[#302a1e]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span>Companies House statutory accounts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span>Corporation Tax (CT600) filing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span>Quarterly MTD VAT return submissions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span>Director payroll & pension auto-enrolment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span>Full Wealthwise Platform OS access included</span>
                  </li>
                </ul>
              </div>

              <a
                href="#contact"
                className="mt-6 w-full py-2.5 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#c59e2b] text-black font-extrabold text-xs rounded-lg shadow-md transition-all flex items-center justify-center min-h-[42px] hover:brightness-110"
              >
                Get Limited Company Quote
              </a>
            </div>

            {/* Growth & Advisory */}
            <div className="p-6 rounded-2xl border border-[#2b271d] bg-[#131417] hover:border-[#423924] transition-all flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-xs font-bold text-[#9c8e73] uppercase tracking-wider">
                  Growing Teams & Scale
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Advisory & Multi-Entity</h3>
                <p className="text-xs text-[#8c7f66] mt-1">
                  For multi-director firms, group structures and ambitious businesses.
                </p>

                <div className="my-5">
                  <div className="text-3xl font-extrabold text-white">
                    {pricingMode === "INCLUDED_RETAINER" ? "£195" : "£39"}
                    <span className="text-xs font-normal text-[#8c7f66]"> / month</span>
                  </div>
                  <p className="text-[11px] text-[#d4af37] font-medium mt-1">
                    {pricingMode === "INCLUDED_RETAINER"
                      ? "✓ Monthly management accounts + Cash flow forecasts"
                      : "Multi-entity consolidation engine"}
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-[#c4b597] pt-3 border-t border-[#26221a]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span>Everything in Ltd Management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span>Monthly board-ready management packs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span>Cash flow projections & runway analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span>Dedicated senior partner advisory call</span>
                  </li>
                </ul>
              </div>

              <a
                href="#contact"
                className="mt-6 w-full py-2.5 bg-[#1b1c20] hover:bg-[#25262c] text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center min-h-[42px] border border-[#383327]"
              >
                Speak to Senior Partner
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section id="faq" className="py-20 bg-[#0c0d0e] border-b border-[#242018]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              QUESTIONS & ANSWERS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
              Everything You Wanted to Ask an Accountant
            </h2>
            <p className="text-sm text-[#b8a88a] mt-2">
              Straightforward answers with zero jargon.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-[#26221a] rounded-xl overflow-hidden bg-[#121316] transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:bg-[#18191f] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#d4af37] shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#a8997a] leading-relaxed border-t border-[#26221a] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Consultation Booking Form */}
      <section id="contact" className="py-20 bg-[#08090b] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Direct Practice Contact Info */}
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] bg-[#1d1912] px-3 py-1 rounded-md border border-[#524320]">
                GET IN TOUCH
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Let&apos;s talk about your numbers.
              </h2>
              <p className="text-sm sm:text-base text-[#b8a88a] leading-relaxed">
                Book a free 15-minute consultation or ask for a fixed-fee quote. Either way, you will hear back within one business day.
              </p>

              <div className="space-y-4 pt-4 border-t border-[#242018] text-sm">
                <a
                  href="tel:+447737014274"
                  className="flex items-center gap-3 text-[#f4efe6] hover:text-[#d4af37] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#17140e] border border-[#3d331f] flex items-center justify-center text-[#d4af37] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#8c7f66]">Direct Phone</div>
                    <div className="font-bold text-white text-base">+44 7737 014274</div>
                  </div>
                </a>

                <a
                  href="mailto:info@wealthwiseaccountants.co.uk"
                  className="flex items-center gap-3 text-[#f4efe6] hover:text-[#d4af37] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#17140e] border border-[#3d331f] flex items-center justify-center text-[#d4af37] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#8c7f66]">Email Address</div>
                    <div className="font-bold text-white text-base">info@wealthwiseaccountants.co.uk</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-[#f4efe6]">
                  <div className="w-10 h-10 rounded-xl bg-[#17140e] border border-[#3d331f] flex items-center justify-center text-[#d4af37] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#8c7f66]">Practice Office</div>
                    <div className="font-medium text-white text-sm">
                      65 Waterloo Road, Smethwick, B66 4JS
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 text-xs text-[#a8997a] space-y-1">
                <p>✓ Free 15-minute consultation — no obligation</p>
                <p>✓ Written fixed-fee quote within 24 hours</p>
                <p>✓ Simple, straightforward financial advice</p>
              </div>
            </div>

            {/* Right Column: Contact & Quote Form */}
            <div className="bg-[#121316] text-[#f4efe6] p-6 sm:p-8 rounded-3xl border border-[#2e281b] shadow-2xl">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Request a Written Fixed-Fee Quote
              </h3>
              <p className="text-xs text-[#9c8e73] mt-1 mb-6">
                Tell us about your business and receive an itemised quote within 1 business day.
              </p>

              {enquirySubmitted ? (
                <div className="p-6 bg-[#1a1711] rounded-2xl border border-[#54431e] text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#d4af37] mx-auto" />
                  <h4 className="text-base font-bold text-white">Enquiry Received</h4>
                  <p className="text-xs text-[#c9b896]">
                    Thank you! A Wealthwise accountant will review your details and contact you within one business day with your clear written plan.
                  </p>
                  <button
                    onClick={() => setEnquirySubmitted(false)}
                    className="text-xs font-semibold text-[#d4af37] underline mt-2"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-[#c9b896] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      placeholder="e.g. John Smith"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d0e10] border border-[#302a1e] text-white placeholder-[#5a5241] focus:outline-hidden focus:ring-2 focus:ring-[#d4af37] text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#c9b896] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={enquiryEmail}
                        onChange={(e) => setEnquiryEmail(e.target.value)}
                        placeholder="john@example.co.uk"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d0e10] border border-[#302a1e] text-white placeholder-[#5a5241] focus:outline-hidden focus:ring-2 focus:ring-[#d4af37] text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#c9b896] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={enquiryPhone}
                        onChange={(e) => setEnquiryPhone(e.target.value)}
                        placeholder="+44 7..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d0e10] border border-[#302a1e] text-white placeholder-[#5a5241] focus:outline-hidden focus:ring-2 focus:ring-[#d4af37] text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#c9b896] mb-1">
                      Service Required
                    </label>
                    <select
                      value={enquiryService}
                      onChange={(e) => setEnquiryService(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d0e10] border border-[#302a1e] text-white focus:outline-hidden focus:ring-2 focus:ring-[#d4af37] text-xs"
                    >
                      <option>Bookkeeping & Management Accounts</option>
                      <option>Limited Company Annual Accounts & CT600</option>
                      <option>VAT & Making Tax Digital</option>
                      <option>Self Assessment Tax Return</option>
                      <option>Payroll & Auto-Enrolment Pensions</option>
                      <option>Full Retainer & Platform OS Access</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#c9b896] mb-1">
                      Tell us about your business (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={enquiryMessage}
                      onChange={(e) => setEnquiryMessage(e.target.value)}
                      placeholder="e.g. Ltd company with 2 directors, turnover £120k, currently switching from previous accountant..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d0e10] border border-[#302a1e] text-white placeholder-[#5a5241] focus:outline-hidden focus:ring-2 focus:ring-[#d4af37] text-xs"
                    />
                  </div>

                  <p className="text-[11px] text-[#7d7055]">
                    No spam, no obligation. Your details are only used to respond to your enquiry in accordance with our{" "}
                    <button
                      type="button"
                      onClick={() => setPrivacyModalOpen(true)}
                      className="text-[#d4af37] underline"
                    >
                      Privacy Policy
                    </button>.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#c59e2b] text-black font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 min-h-[44px] hover:brightness-110"
                  >
                    <Send className="w-4 h-4 text-black" />
                    <span>Send Enquiry for Free Quote</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Practice Footer */}
      <footer className="bg-[#050607] text-[#8c7f66] py-14 text-xs border-t border-[#242018]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#1c1913]">
            <div>
              <div className="flex items-center gap-3">
                <div className="bg-white px-2 py-0.5 rounded border border-[#d4af37]/60">
                  <Image
                    src="/images/wealthwise-gold-logo.png"
                    alt="Wealth Wise Logo"
                    width={110}
                    height={22}
                    className="h-5 w-auto object-contain"
                  />
                </div>
                <span className="font-extrabold text-white text-base">
                  Wealthwise Accountants Limited
                </span>
              </div>
              <p className="mt-2 text-[#9c8e73] max-w-md text-xs leading-relaxed">
                Accounting, tax and payroll support for limited companies, small businesses, freelancers and landlords across the United Kingdom.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onEnterApp("ACCOUNTANT")}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#c59e2b] text-black font-bold hover:brightness-110 transition-colors"
              >
                Accountant Hub
              </button>
              <button
                onClick={() => onEnterApp("CLIENT")}
                className="px-4 py-2 rounded-lg bg-[#141518] text-[#f4efe6] font-bold hover:bg-[#1f2025] transition-colors border border-[#302a1e]"
              >
                Client Workspace
              </button>
              <button
                onClick={() => setPrivacyModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-transparent text-[#d4af37] hover:text-[#f3e5ab] text-xs font-semibold underline"
              >
                Privacy Policy
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[#756a54] text-[11px]">
            <p>
              © 2026 Wealthwise Accountants Limited · Company No. 16819892 · Registered in England & Wales
            </p>
            <p>
              Registered Office: 128 Edith Road, Smethwick, England, B66 4QZ · Practice: 65 Waterloo Road, Smethwick, B66 4JS · Tel: +44 7737 014274
            </p>
          </div>
        </div>
      </footer>

      {/* Complete Official Privacy Policy Modal */}
      {privacyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#121316] text-[#e6decb] rounded-3xl border border-[#3d321d] shadow-2xl max-w-3xl w-full p-6 sm:p-8 space-y-5 my-auto max-h-[90vh] overflow-y-auto text-xs sm:text-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#2a2417]">
              <div>
                <h3 className="text-lg font-black text-white">Privacy Policy</h3>
                <p className="text-xs text-[#d4af37]">Last updated: 24 September 2026</p>
              </div>
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="text-[#9c8e73] hover:text-white p-2 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-[#b8a88a] max-h-[60vh] overflow-y-auto pr-2">
              <p>
                At Wealthwise Accountants, we take your privacy seriously. This Privacy Policy explains how we collect, use, store and protect your personal information when you visit our website, contact us, make an enquiry or use our services.
              </p>

              <h4 className="text-sm font-bold text-white pt-2">1. Who we are</h4>
              <p>
                Wealthwise Accountants Limited provides accounting, tax, payroll and business advisory services, including bookkeeping and management accounts, VAT and Making Tax Digital, corporation tax and year-end accounts, self assessment and tax returns, payroll and pensions, and business advisory and cash flow support.
              </p>
              <p>
                For the purposes of UK data protection law, Wealthwise Accountants Limited is the data controller responsible for the personal information covered by this Privacy Policy.
                <br />
                <strong>Wealthwise Accountants Limited</strong> · Company number: 16819892 · Registered office: 128 Edith Road, Smethwick, England, B66 4QZ · Website: wealthwiseaccountants.co.uk · Email: info@wealthwiseaccountants.co.uk · Telephone: +44 7737 014274
              </p>

              <h4 className="text-sm font-bold text-white pt-2">2. Information we collect</h4>
              <p>
                When you use our website or contact Wealthwise Accountants, we may collect: your full name, email address, telephone number, the service you are interested in, information you provide about your business or circumstances, and technical information about your use of our website.
              </p>

              <h4 className="text-sm font-bold text-white pt-2">3. How we use your information</h4>
              <p>
                We use your personal information to respond to enquiries, arrange consultations, provide accounting and tax services, prepare statutory accounts, meet HMRC and Companies House legal requirements, maintain business records, and protect systems against fraud.
              </p>

              <h4 className="text-sm font-bold text-white pt-2">4. Our lawful bases</h4>
              <p>
                We rely on Contract (to provide requested services), Legal Obligation (complying with UK tax and company law), Legitimate Interests (answering enquiries and running our business securely), and Consent where specified.
              </p>

              <h4 className="text-sm font-bold text-white pt-2">5. Who we share information with</h4>
              <p>
                We never sell your personal information. We may share information where necessary with HM Revenue & Customs (HMRC), Companies House, secure cloud accounting providers, and law enforcement when required by UK law.
              </p>

              <h4 className="text-sm font-bold text-white pt-2">6. How to exercise your rights</h4>
              <p>
                Under UK GDPR, you have the right to request access, correction, deletion, or restriction of your personal data. Contact us at <strong>info@wealthwiseaccountants.co.uk</strong>. You also have the right to lodge a complaint with the UK Information Commissioner&apos;s Office (ICO).
              </p>
            </div>

            <div className="pt-4 border-t border-[#2a2417] flex justify-end">
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c59e2b] text-black font-extrabold text-xs"
              >
                Close Privacy Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
