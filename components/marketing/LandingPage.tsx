"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  CheckCircle2,
  MessageCircle,
  Calculator,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { TaxSavingsCalculator } from "@/components/marketing/TaxSavingsCalculator";

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"CONSULTATION" | "QUOTE">("CONSULTATION");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Bookkeeping & Management Accounts",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Lock body scroll and handle Escape key while mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleApplySavingsFromCalc = (details: {
    turnover: number;
    expenses: number;
    structure: "LTD" | "SOLE_TRADER";
    annualSavings: number;
    recommendedPlan: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      service: details.structure === "LTD" ? "Corporation Tax & Year-End" : "Self Assessment & Tax Returns",
      message: `I ran the Tax Optimizer on my £${details.turnover.toLocaleString()} turnover and £${details.expenses.toLocaleString()} expenses (estimated ~£${details.annualSavings.toLocaleString()}/yr savings). I would like to discuss the ${details.recommendedPlan}.`,
    }));
    setActiveTab("CONSULTATION");
  };

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-[#111111] font-sans antialiased selection:bg-[#C0A262] selection:text-white">
      {/* 1. Header: Black header with the gold framed logo, exact nav, Contact Us button, and Platform Demo button */}
      <header className="sticky top-0 z-40 bg-[#000000] text-white border-b border-[#222222] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              if (typeof window !== "undefined" && (window.location.pathname === "/" || window.location.pathname === "")) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-2 cursor-pointer"
            aria-label="Wealthwise Accountants Homepage"
          >
            <Image
              src={BRAND.logos.fullLogo}
              alt={BRAND.practiceName}
              width={260}
              height={40}
              priority
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#D1D5DB]">
            <a href="#calculator" className="hover:text-[#C0A262] transition-colors min-h-[44px] flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5 text-[#C0A262]" />
              <span>Tax Calculator</span>
            </a>
            <a href="#services" className="hover:text-[#C0A262] transition-colors min-h-[44px] flex items-center">
              Services
            </a>
            <a href="#process" className="hover:text-[#C0A262] transition-colors min-h-[44px] flex items-center">
              Process
            </a>
            <a href="#whyus" className="hover:text-[#C0A262] transition-colors min-h-[44px] flex items-center">
              Why Us
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* WhatsApp Direct Action */}
            <a
              href="https://wa.me/447737014274?text=Hello%20Wealthwise%20Accountants,%20I%20would%20like%20to%20enquire%20about%20accounting%20and%20tax%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-800/60 rounded-md transition-colors min-h-[44px]"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Platform Demo Link */}
            <Link
              href="/demo"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#C0A262] hover:text-white bg-[#111111] hover:bg-[#222222] border border-[#C0A262]/60 rounded-md transition-colors min-h-[44px]"
            >
              <span>Platform demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href="#contact"
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-black bg-[#C0A262] hover:bg-[#CDBA7A] rounded-md transition-colors min-h-[44px] flex items-center justify-center shadow-xs"
            >
              Contact Us
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-[#C0A262] min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer with Backdrop Lock */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 top-20 z-50 bg-black/80 backdrop-blur-sm md:hidden flex flex-col justify-start"
            onClick={() => setMobileMenuOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <div 
              className="bg-[#0A0A0A] border-b border-[#222222] px-6 py-6 space-y-4 text-base shadow-2xl animate-in slide-in-from-top-2 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <a
                href="#calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-white hover:text-[#C0A262] font-medium border-b border-[#1E1E1E] min-h-[44px] flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-[#C0A262]" />
                <span>Tax &amp; Retainer Calculator</span>
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-white hover:text-[#C0A262] font-medium border-b border-[#1E1E1E] min-h-[44px] flex items-center"
              >
                Services
              </a>
              <a
                href="#process"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-white hover:text-[#C0A262] font-medium border-b border-[#1E1E1E] min-h-[44px] flex items-center"
              >
                How it Works
              </a>
              <a
                href="#whyus"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-white hover:text-[#C0A262] font-medium border-b border-[#1E1E1E] min-h-[44px] flex items-center"
              >
                Why Us
              </a>
              <Link
                href="/demo"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-[#C0A262] font-semibold flex items-center justify-between border-b border-[#1E1E1E] min-h-[44px]"
              >
                <span>Interactive Platform Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/447737014274?text=Hello%20Wealthwise%20Accountants,%20I%20would%20like%20to%20enquire%20about%20accounting%20and%20tax%20services"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-emerald-400 font-semibold flex items-center justify-between border-b border-[#1E1E1E] min-h-[44px]"
              >
                <span>Chat on WhatsApp</span>
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 w-full py-3 bg-[#C0A262] text-black font-bold rounded-lg flex items-center justify-center text-sm shadow-sm min-h-[44px]"
              >
                Contact Wealthwise
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section: Exact Wording & Elements */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 overflow-hidden bg-[#F0F5FA] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl text-[#111111] leading-[1.15] tracking-tight">
                Clarity in every number.{" "}
                <span className="block mt-1 relative inline-block">
                  Confidence in every decision.
                  <span className="block w-full h-1 sm:h-1.5 bg-[#C0A262] mt-1.5 rounded-full" />
                </span>
              </h1>

              <div className="space-y-4 text-base sm:text-lg text-[#666666] leading-relaxed max-w-2xl">
                <p className="font-medium text-[#111111]">
                  Accounting, tax and payroll support for limited companies, small businesses, freelancers and landlords.
                </p>
                <p>
                  At Wealthwise Accountants, we keep things straightforward. Whether you need help with bookkeeping, payroll, VAT, annual accounts or tax planning, we’ll help you stay on top of the numbers and understand what they mean for your business.
                </p>
                <p>
                  We’re here to give clear advice, answer your questions and make sure you know where you stand.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 max-w-lg">
                <a
                  href="#calculator"
                  className="px-6 py-3.5 rounded-md bg-[#000000] hover:bg-[#222222] text-white font-medium text-sm text-center transition-colors min-h-[48px] flex items-center justify-center gap-2 shadow-sm"
                >
                  <Calculator className="w-4 h-4 text-[#C0A262]" />
                  <span>Estimate Tax Savings</span>
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3.5 rounded-md bg-[#C0A262] hover:bg-[#CDBA7A] text-black font-medium text-sm text-center transition-colors min-h-[48px] flex items-center justify-center shadow-xs"
                >
                  Get a free quote
                </a>
              </div>
            </div>

            {/* Right Column: Hero Photo (IMG_3098) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-xl border border-white">
                <Image
                  src={BRAND.logos.heroPhoto}
                  alt="Wealthwise Accountants Partners"
                  width={600}
                  height={800}
                  priority
                  className="w-full h-auto object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Scrolling Ticker Section */}
      <section className="bg-[#000000] text-white py-4 overflow-hidden border-y border-[#222222]">
        <div className="animate-ticker text-xs sm:text-sm tracking-widest font-semibold flex items-center gap-6 whitespace-nowrap">
          {Array(4)
            .fill(BRAND.tickerItems)
            .flat()
            .map((item, idx) => (
              <span key={idx} className="flex items-center gap-6">
                <span className="text-[#F0F5FA]">{item}</span>
                <span className="text-[#C0A262] font-black">•</span>
              </span>
            ))}
        </div>
      </section>

      {/* 4. Interactive Tax Savings & Fee Calculator */}
      <section id="calculator" className="py-16 sm:py-20 bg-[#F0F5FA] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TaxSavingsCalculator onApplySavings={handleApplySavingsFromCalc} />
        </div>
      </section>

      {/* 5. WHAT WE DO: 6 Services (Exact text & descriptions) */}
      <section id="services" className="py-20 bg-[#FFFFFF] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-[#C0A262]">
              WHAT WE DO
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl text-[#111111] mt-3">
              Every number your business depends on, under one roof.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BRAND.services.map((service, index) => (
              <div
                key={index}
                className="p-7 rounded-xl bg-[#F0F5FA] border border-[#E2E8F0] hover:border-[#C0A262] transition-colors space-y-3"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#C0A262]" />
                <h3 className="font-serif-heading text-xl text-[#111111]">
                  {service.title}
                </h3>
                <p className="text-sm text-[#666666] leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Statistics Section (Exact from live site) */}
      <section id="whyus" className="py-16 bg-[#000000] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {BRAND.stats.map((stat, idx) => (
              <div key={idx} className="border-l-2 border-[#C0A262] pl-4 sm:pl-6 py-2">
                <div className="font-serif-heading text-4xl sm:text-5xl text-white">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-[#D1D5DB] mt-2 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. HOW WE WORK: 3 Steps with side photo */}
      <section id="process" className="py-20 bg-[#F0F5FA] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Steps Left Column */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-[#C0A262]">
                  PROCESS
                </span>
                <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#111111] mt-2">
                  From first call to finished accounts in three steps.
                </h2>
              </div>

              <div className="space-y-6">
                {BRAND.processSteps.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl bg-white border border-[#E2E8F0] shadow-xs"
                  >
                    <span className="font-serif-heading text-2xl text-[#C0A262] font-bold block">
                      {p.number}
                    </span>
                    <h3 className="font-serif-heading text-lg text-[#111111] mt-1">
                      {p.title}
                    </h3>
                    <p className="text-sm text-[#666666] mt-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Photo Right Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-lg border border-[#E2E8F0]">
                <Image
                  src={BRAND.logos.processSidePhoto}
                  alt="Wealthwise Accounting Process"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. QUESTIONS (The 4 FAQs, exact text) */}
      <section className="py-20 bg-[#FFFFFF] border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-[#C0A262]">
              QUESTIONS
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#111111] mt-2">
              Everything you wanted to ask an accountant.
            </h2>
          </div>

          <div className="space-y-3">
            {BRAND.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-[#E2E8F0] rounded-xl overflow-hidden bg-[#F0F5FA]"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-base text-[#111111] hover:bg-white transition-colors min-h-[44px]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C0A262] shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-[#666666] leading-relaxed border-t border-[#E2E8F0] pt-4 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. GET STARTED: Exact Contact Form & Tabs */}
      <section id="contact" className="py-20 bg-[#F0F5FA] text-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Coordinates */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold tracking-widest uppercase text-[#C0A262]">
                GET STARTED
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#111111] leading-tight">
                Let’s talk about your numbers.
              </h2>
              <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
                Book a free 15-minute consultation or ask for a fixed-fee quote. Either way, you will hear back within one business day.
              </p>

              <div className="space-y-4 pt-4 border-t border-[#E2E8F0] text-sm">
                <a
                  href={BRAND.phone.tel}
                  className="flex items-center gap-3 text-[#111111] hover:text-[#C0A262] transition-colors min-h-[44px]"
                >
                  <div className="w-10 h-10 rounded-full bg-[#000000] text-[#C0A262] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-[#666666]">Phone</div>
                    <div className="font-bold text-sm">{BRAND.phone.display}</div>
                  </div>
                </a>

                {/* WhatsApp Direct Link */}
                <a
                  href="https://wa.me/447737014274?text=Hello%20Wealthwise%20Accountants,%20I%20would%20like%20to%20enquire%20about%20accounting%20and%20tax%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#111111] hover:text-emerald-700 transition-colors min-h-[44px]"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-900 text-emerald-300 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-[#666666]">WhatsApp</div>
                    <div className="font-bold text-sm text-emerald-800">Chat with Senior Accountant</div>
                  </div>
                </a>

                <a
                  href={BRAND.email.mailto}
                  className="flex items-center gap-3 text-[#111111] hover:text-[#C0A262] transition-colors min-h-[44px]"
                >
                  <div className="w-10 h-10 rounded-full bg-[#000000] text-[#C0A262] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-[#666666]">Email</div>
                    <div className="font-bold text-sm">{BRAND.email.primary}</div>
                  </div>
                </a>

                {/* Office address */}
                <div className="flex items-center gap-3 text-[#111111]">
                  <div className="w-10 h-10 rounded-full bg-[#000000] text-[#C0A262] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-[#666666]">Office</div>
                    <div className="font-medium text-sm">{BRAND.practiceOffice}</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 text-xs text-[#666666] space-y-1.5">
                <p>✓ Free 15-minute consultation — no obligation</p>
                <p>✓ Written fixed-fee quote within 24 hours</p>
                <p>✓ Simple, straightforward financial advice</p>
              </div>
            </div>

            {/* Right Column: Unified Responsive Form with Tabs */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-md">
              {/* Consultation vs Quote Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#F0F5FA] rounded-xl text-xs font-semibold mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("CONSULTATION");
                    setFormSubmitted(false);
                  }}
                  className={`py-2.5 rounded-lg transition-all min-h-[44px] ${
                    activeTab === "CONSULTATION"
                      ? "bg-[#000000] text-white shadow-xs"
                      : "text-[#666666] hover:text-[#111111]"
                  }`}
                >
                  Schedule a Consultation
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("QUOTE");
                    setFormSubmitted(false);
                  }}
                  className={`py-2.5 rounded-lg transition-all min-h-[44px] ${
                    activeTab === "QUOTE"
                      ? "bg-[#000000] text-white shadow-xs"
                      : "text-[#666666] hover:text-[#111111]"
                  }`}
                >
                  Request a Free Quote
                </button>
              </div>

              {formSubmitted ? (
                <div className="p-6 bg-[#F0F5FA] rounded-xl border border-[#C0A262] text-center space-y-3 animate-in fade-in">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-serif-heading text-lg text-[#111111]">
                    Enquiry Received
                  </h4>
                  <p className="text-xs text-[#666666] max-w-md mx-auto leading-relaxed">
                    Thank you for contacting <strong>{BRAND.practiceName}</strong>. Our senior accounting team will review your enquiry and get back to you within 1 business day.
                  </p>
                  <div className="pt-1 text-xs text-[#111111]">
                    Direct phone:{" "}
                    <a href={BRAND.phone.tel} className="text-[#C0A262] font-bold hover:underline">
                      {BRAND.phone.display}
                    </a>
                  </div>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs font-semibold text-[#9A7A3A] hover:underline min-h-[44px]"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-medium text-[#111111] mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={activeTab === "CONSULTATION" ? "Your full name" : "Joe Bloggs"}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1D5DB] focus:outline-none focus:ring-1 focus:ring-[#C0A262] text-xs min-h-[44px] bg-white text-[#111111]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-[#111111] mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder={activeTab === "CONSULTATION" ? "name@company.co.uk" : "joe@bloggs.co.uk"}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1D5DB] focus:outline-none focus:ring-1 focus:ring-[#C0A262] text-xs min-h-[44px] bg-white text-[#111111]"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-[#111111] mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder={activeTab === "CONSULTATION" ? "+44 7700 900000" : "+44 7700 123456"}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1D5DB] focus:outline-none focus:ring-1 focus:ring-[#C0A262] text-xs min-h-[44px] bg-white text-[#111111]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-[#111111] mb-1">
                      Choose a service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1D5DB] focus:outline-none focus:ring-1 focus:ring-[#C0A262] text-xs min-h-[44px] bg-white text-[#111111]"
                    >
                      <option>Bookkeeping &amp; Management Accounts</option>
                      <option>Self Assessment &amp; Tax Returns</option>
                      <option>VAT &amp; Making Tax Digital</option>
                      <option>Payroll &amp; Pensions</option>
                      <option>Corporation Tax &amp; Year-End</option>
                      <option>Business Advisory &amp; Cash Flow</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-[#111111] mb-1">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      placeholder={
                        activeTab === "CONSULTATION"
                          ? "e.g. I’m a sole trader and my tax return is due "
                          : "e.g. Limited company, 4 employees, need bookkeeping and payroll..."
                      }
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1D5DB] focus:outline-none focus:ring-1 focus:ring-[#C0A262] text-xs bg-white text-[#111111]"
                    />
                  </div>

                  <p className="text-[11px] text-[#666666]">
                    No spam, no obligation. Your details are only used to respond to your enquiry.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#000000] hover:bg-[#222222] text-white font-semibold text-xs rounded-lg transition-colors min-h-[44px] shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>{activeTab === "CONSULTATION" ? "Schedule Consultation" : "Request Free Quote"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 10. Footer: Exact Logo, Description, Contact, Direct Link to live Privacy Policy */}
      <footer className="bg-[#000000] text-[#D1D5DB] py-14 text-xs border-t border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#222222]">
            <div>
              <Link
                href="/"
                onClick={(e) => {
                  if (typeof window !== "undefined" && (window.location.pathname === "/" || window.location.pathname === "")) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="inline-block cursor-pointer"
                aria-label="Back to top"
              >
                <Image
                  src={BRAND.logos.fullLogo}
                  alt={BRAND.practiceName}
                  width={220}
                  height={35}
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <p className="mt-3 text-[#D1D5DB] max-w-md text-xs leading-relaxed">
                Accounting, tax and business support for businesses and individuals, from bookkeeping and payroll to annual accounts and tax returns.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <a href="#calculator" className="hover:text-[#C0A262] transition-colors min-h-[44px] flex items-center">
                Tax Calculator
              </a>
              <a href="#services" className="hover:text-[#C0A262] transition-colors min-h-[44px] flex items-center">
                Services
              </a>
              <a href="#process" className="hover:text-[#C0A262] transition-colors min-h-[44px] flex items-center">
                How it works
              </a>
              <a href="#whyus" className="hover:text-[#C0A262] transition-colors min-h-[44px] flex items-center">
                Why us
              </a>
              <Link
                href="/demo"
                className="px-3.5 py-2 rounded-md bg-[#111111] text-[#C0A262] hover:text-white border border-[#C0A262]/60 font-semibold transition-colors min-h-[44px] flex items-center"
              >
                Platform demo
              </Link>
            </div>
          </div>

          {/* Practice Details, Policy & Mercian Wealth Attribution Button */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2 pb-6 border-b border-[#222222]">
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#9CA3AF]">
              <span>{BRAND.practiceOffice}</span>
              <span>·</span>
              <a
                href={BRAND.website.privacyPolicyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C0A262] hover:underline flex items-center min-h-[36px]"
              >
                Privacy Policy
              </a>
            </div>

            {/* Designed & Built by Mercian Wealth Button */}
            <a
              href="https://mercianwealth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] hover:bg-[#1A1A1A] text-xs text-[#D1D5DB] border border-[#C0A262]/60 hover:border-[#C0A262] transition-all shadow-xs group min-h-[44px]"
              aria-label="Designed and built by Mercian Wealth"
            >
              <span className="text-[#9CA3AF] group-hover:text-white transition-colors">Designed &amp; Built by</span>
              <span className="font-semibold text-[#C0A262] group-hover:text-[#CDBA7A] transition-colors">Mercian Wealth</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C0A262] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[#9CA3AF] text-[11px]">
            <p>
              © 2026 {BRAND.legalName} · Company No. {BRAND.companyNumber} · Registered in {BRAND.registeredCountry}
            </p>
            <div className="flex items-center gap-4">
              <span>{BRAND.practiceOffice}</span>
              <span>·</span>
              <a
                href={BRAND.website.privacyPolicyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C0A262] hover:underline min-h-[44px] flex items-center"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
