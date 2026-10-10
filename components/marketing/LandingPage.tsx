"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
} from "lucide-react";
import { BRAND } from "@/lib/brand";

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

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-[#111111] font-sans antialiased selection:bg-[#C0A262] selection:text-white">
      {/* 1. Header: Black header with the gold framed logo, exact nav, Contact Us button, and Platform Demo button */}
      <header className="sticky top-0 z-50 bg-[#000000] text-white border-b border-[#222222] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
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
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#D1D5DB]">
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
          <div className="flex items-center gap-3">
            {/* The One Addition: Unobtrusive Platform Demo Button */}
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

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0A0A0A] border-b border-[#222222] px-4 py-4 space-y-3 text-sm">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-white hover:text-[#C0A262]"
            >
              Services
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-white hover:text-[#C0A262]"
            >
              Process
            </a>
            <a
              href="#whyus"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-white hover:text-[#C0A262]"
            >
              Why Us
            </a>
            <Link
              href="/demo"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#C0A262] font-semibold"
            >
              Platform demo &rarr;
            </Link>
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
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 max-w-md">
                <a
                  href="#contact"
                  className="px-6 py-3.5 rounded-md bg-[#000000] hover:bg-[#222222] text-white font-medium text-sm text-center transition-colors min-h-[48px] flex items-center justify-center shadow-sm"
                >
                  Schedule a free consultation
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

      {/* 4. WHAT WE DO: 6 Services (Exact text & descriptions) */}
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

      {/* 5. Statistics Section (Exact from live site) */}
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

      {/* 6. HOW WE WORK: 3 Steps with side photo */}
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

      {/* 7. QUESTIONS (The 4 FAQs, exact text) */}
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

      {/* 8. GET STARTED: Exact Contact Form & Tabs */}
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

                {/* Plain text address (fixing the live site's wrong Yahoo mailto bug) */}
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
                <div className="p-6 bg-[#F0F5FA] rounded-xl border border-[#C0A262] text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#C0A262] mx-auto" />
                  <h4 className="font-serif-heading text-lg text-[#111111]">
                    Demo only, not sent
                  </h4>
                  <p className="text-xs text-[#666666] max-w-md mx-auto">
                    This is a preview prototype. No live message was dispatched. To speak with Wealthwise Accountants directly, call <strong>{BRAND.phone.display}</strong> or email <strong>{BRAND.email.primary}</strong>.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs font-semibold text-[#9A7A3A] underline min-h-[44px]"
                  >
                    Reset Form
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
                      placeholder={activeTab === "CONSULTATION" ? "Name" : "Joe Bloggs"}
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
                        placeholder={activeTab === "CONSULTATION" ? "Email" : "joe@bloggs.co.uk"}
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
                        placeholder={activeTab === "CONSULTATION" ? "+44 74 000 000" : "+44 7700 123456"}
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
                      <option>Bookkeeping & Management Accounts</option>
                      <option>Self Assessment & Tax Returns</option>
                      <option>VAT & Making Tax Digital</option>
                      <option>Payroll & Pensions</option>
                      <option>Corporation Tax & Year-End</option>
                      <option>Business Advisory & Cash Flow</option>
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

      {/* 9. Footer: Exact Logo, Description, Contact, Direct Link to live Privacy Policy */}
      <footer className="bg-[#000000] text-[#D1D5DB] py-14 text-xs border-t border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#222222]">
            <div>
              <Link href="/" className="inline-block">
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

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[#D1D5DB] text-[11px]">
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
