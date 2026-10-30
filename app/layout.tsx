import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/brand";
import { PrototypeReviewBar } from "@/components/demo/PrototypeReviewBar";

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://wealthwiseaccountants.co.uk"),
  title: {
    default: "Wealthwise Accountants | Accounting & Tax Services",
    template: `%s | ${BRAND.practiceName}`,
  },
  description:
    "Accounting, tax, bookkeeping, VAT and payroll support from Wealthwise Accountants. Clear advice to help you understand your numbers and make confident decisions.",
  applicationName: BRAND.practiceName,
  authors: [{ name: BRAND.practiceName, url: "https://wealthwiseaccountants.co.uk" }],
  creator: BRAND.legalName,
  publisher: BRAND.legalName,
  generator: "Wealthwise Accountants Engine",
  keywords: [
    "Wealthwise Accountants",
    "Accountants Smethwick",
    "Chartered Certified Accountants",
    "UK Tax Accounting",
    "Self Assessment",
    "Corporation Tax",
    "Bookkeeping",
    "VAT Returns MTD",
    "Payroll Services",
    "Double-entry bookkeeping",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Wealthwise Accountants | Accounting & Tax Services",
    description:
      "Accounting, tax, bookkeeping, VAT and payroll support from Wealthwise Accountants. Clear advice to help you understand your numbers and make confident decisions.",
    url: "https://wealthwiseaccountants.co.uk",
    siteName: BRAND.practiceName,
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Wealthwise Accountants - Accounting & Tax Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wealthwise Accountants | Accounting & Tax Services",
    description:
      "Accounting, tax, bookkeeping, VAT and payroll support from Wealthwise Accountants.",
    images: ["/og-image.svg"],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: BRAND.logos.favicon32,
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: BRAND.logos.favicon192,
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: BRAND.logos.favicon192,
        sizes: "180x180",
        type: "image/png",
      },
      {
        url: "/apple-icon.svg",
        type: "image/svg+xml",
        sizes: "180x180",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${inter.variable} bg-[#F0F5FA]`}>
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className="bg-[#F0F5FA] text-[#111111] font-sans antialiased min-h-screen selection:bg-[#C0A262] selection:text-black flex flex-col">
        <PrototypeReviewBar />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
