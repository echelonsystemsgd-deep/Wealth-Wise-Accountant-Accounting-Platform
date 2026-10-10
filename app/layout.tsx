import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/brand";

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
  title: {
    default: "Wealthwise Accountants | Accounting & Tax Services",
    template: `%s | ${BRAND.practiceName}`,
  },
  description:
    "Accounting, tax, bookkeeping, VAT and payroll support from Wealthwise Accountants. Clear advice to help you understand your numbers and make confident decisions.",
  applicationName: BRAND.practiceName,
  authors: [{ name: BRAND.practiceName }],
  creator: BRAND.legalName,
  publisher: BRAND.legalName,
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
      },
      {
        url: BRAND.logos.favicon192,
        sizes: "192x192",
      },
    ],
    apple: [
      {
        url: BRAND.logos.favicon192,
        sizes: "180x180",
      },
    ],
  },
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
      <body className="bg-[#F0F5FA] text-[#111111] font-sans antialiased min-h-screen selection:bg-[#C0A262] selection:text-black">
        {children}
      </body>
    </html>
  );
}
