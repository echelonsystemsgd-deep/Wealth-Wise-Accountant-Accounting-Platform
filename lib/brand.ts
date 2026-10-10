/**
 * Wealthwise Accountants - Single Source of Truth Brand Token Dictionary
 *
 * Extracted directly from live WordPress Elementor build at:
 * https://wealthwiseaccountants.co.uk
 */

export const BRAND = {
  // Practice Names
  practiceName: "Wealthwise Accountants",
  legalName: "Wealthwise Accountants Limited",
  tradingName: "Wealthwise Accountants",

  // Legal & Regulatory Identifiers
  companyNumber: "16819892",
  registeredCountry: "England & Wales",
  // Note: 128 Edith Road is from Companies House filings/privacy policy,
  // while 65 Waterloo Road is the physical office displayed on the live site footer.
  practiceOffice: "65 Waterloo Road, Smethwick, B66 4JS",
  registeredOffice: "128 Edith Road, Smethwick, England, B66 4QZ",

  // Direct Contact Coordinates (Exact from live site)
  phone: {
    display: "+44 7737 014274",
    compact: "+447737014274",
    tel: "tel:+44%207737%20014274",
  },
  email: {
    primary: "info@wealthwiseaccountants.co.uk",
    mailto: "mailto:info@wealthwiseaccountants.co.uk",
  },
  website: {
    domain: "wealthwiseaccountants.co.uk",
    url: "https://wealthwiseaccountants.co.uk",
    privacyPolicyUrl: "https://wealthwiseaccountants.co.uk/privacy-policy/",
  },

  // Downloaded Original Media Asset Paths (from live Elementor uploads)
  logos: {
    fullLogo: "/images/Wealthwise-logo.png",
    croppedLogo: "/images/cropped-Wealthwise-logo.png",
    favicon192: "/images/favicon-192.png",
    favicon32: "/images/favicon-32.png",
    heroPhoto: "/images/IMG_3098.jpeg",
    processSidePhoto: "/images/process-side-photo.jpg",
  },

  // Color Tokens Extracted From Live Elementor CSS
  colors: {
    // Header & dark text
    headerBg: "#000000",
    headerText: "#FFFFFF",
    primary: "#000000",
    
    // Page backgrounds
    pageBg: "#F0F5FA", // --e-global-color-astglobalcolor5
    pageBgAlt: "#FBFBFB",
    cardBg: "#FFFFFF",
    
    // Gold & Accent Tokens
    goldPrimary: "#C0A262", // --e-global-color-secondary
    goldLight: "#CDBA7A",
    goldDark: "#9A7A3A",
    goldBorder: "#D5C8AA",
    goldStroke: "#C7A447",
    
    // Text colors
    textHeading: "#111111",
    textBody: "#666666",
    textMuted: "#334155",
    textLight: "#FFFFFF",
    
    // Borders
    borderLight: "#D1D5DB",
    borderSubtle: "rgba(0, 0, 0, 0.08)",
  },

  // Typography extracted from live site
  typography: {
    headingFont: "'DM Serif Display', Georgia, serif",
    bodyFont: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  // Verified Firm Statistics (Exact text from live site)
  stats: [
    { value: "5+", label: "years advising local businesses" },
    { value: "250+", label: "clients looked after" },
    { value: "£1.2m", label: "tax saved since 2021" },
    { value: "100%", label: "filing deadlines met" },
  ],

  // Core Practice Services (Exact titles and descriptions from live site)
  services: [
    {
      id: "bookkeeping",
      title: "Bookkeeping & Management Accounts",
      description:
        "Clean, up-to-date books every month, plus plain-English reports that show exactly where your money goes.",
    },
    {
      id: "vat",
      title: "VAT & Making Tax Digital",
      description:
        "MTD-compliant VAT registration, returns and reviews, so you never overpay or miss a deadline.",
    },
    {
      id: "corporation-tax",
      title: "Corporation Tax & Year-End",
      description:
        "Statutory accounts and corporation tax for limited companies, planned before the year ends not after.",
    },
    {
      id: "self-assessment",
      title: "Self Assessment & Tax Returns",
      description:
        "Personal tax returns filed accurately and on time with every relief and allowance you are entitled to.",
    },
    {
      id: "payroll",
      title: "Payroll & Pensions",
      description:
        "Payslips, RTI submissions and auto-enrolment pensions handled for teams of 1 to 100.",
    },
    {
      id: "advisory",
      title: "Business Advisory & Cash Flow",
      description:
        "Forecasts, pricing and growth planning from accountants who treat your business like their own.",
    },
  ],

  // 3-Step Process (Exact text from live site)
  processSteps: [
    {
      number: "01:",
      title: "Book your free consultation",
      description:
        "A relaxed 15-minute call or coffee. Bring your questions, we will bring straight answers and zero jargon.",
    },
    {
      number: "02:",
      title: "Get a clear plan & fixed-fee quote",
      description:
        "Within 24 hours you receive a written plan and a fixed monthly fee. No hourly meters, no surprises.",
    },
    {
      number: "03:",
      title: "We handle the numbers",
      description:
        "Bookkeeping, tax, payroll and deadlines — done. You get your evenings and weekends back.",
    },
  ],

  // Verified 4 FAQs (Exact titles and answers from live site)
  faqs: [
    {
      q: "What does the free consultation include?",
      a: "A 15-minute conversation about your situation, by phone, video or over coffee. We review your current setup, flag anything that needs attention, and tell you honestly whether we are the right fit. There is no charge and no obligation.",
    },
    {
      q: "How much do your services cost?",
      a: "Most clients pay a fixed monthly fee agreed up front, based on the work involved — bookkeeping packages start from £54/month and self-assessment returns from £150 one-off. You will always receive a written quote before any work begins.",
    },
    {
      q: "Can I switch from my current accountant?",
      a: "Yes, and it is easier than most people expect. We handle the professional clearance letter and the handover of records directly with your previous accountant, usually within a week, at no cost to you.",
    },
    {
      q: "How quickly will I get my quote?",
      a: "Within one business day of your consultation or enquiry. The quote is fixed, itemised and valid for 30 days, so you can compare it in your own time.",
    },
  ],

  // Ticker items
  tickerItems: [
    "BOOKKEEPING",
    "SELF ASSESSMENT",
    "PAYROLL",
    "CASH FLOW",
    "YEAR-END ACCOUNTS",
    "BUSINESS ADVISORY",
  ],
} as const;
