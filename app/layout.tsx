import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Wealth Wise Accountant — Intelligent Financial Platform & Client Workspace",
    template: "%s | Wealth Wise Accountant",
  },
  description:
    "Dedicated UK accounting practice platform and client portal. Double-entry general ledger, automated bank reconciliation, MTD VAT management, and secure document vault.",
  applicationName: "Wealth Wise Accountant Platform OS",
  authors: [{ name: "Wealth Wise Accountant Practice" }],
  generator: "Wealth Wise Accountant Engine",
  keywords: [
    "Wealth Wise Accountant",
    "accounting platform",
    "UK accountant",
    "double-entry ledger",
    "client portal",
    "VAT MTD",
    "bank reconciliation",
    "general ledger",
    "statutory accounts",
  ],
  creator: "Wealth Wise Accountant Ltd",
  publisher: "Wealth Wise Accountant Ltd",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://wealthwiseaccountant.co.uk"
  ),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml", sizes: "180x180" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Wealth Wise Accountant — Intelligent Financial Platform & Client Workspace",
    description:
      "Enterprise-grade double-entry accounting engine, client document vault, and automated reconciliation queue for UK businesses.",
    url: "https://wealthwiseaccountant.co.uk",
    siteName: "Wealth Wise Accountant",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Wealth Wise Accountant Platform OS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wealth Wise Accountant — Intelligent Financial Platform",
    description:
      "Dedicated UK accounting practice platform and client collaboration portal.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
