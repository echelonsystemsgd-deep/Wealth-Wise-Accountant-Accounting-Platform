# Wealthwise Accountants — Metadata, Custom Branding & Mobile Optimization Architecture Plan

**Document Version:** 2.0.0  
**Status:** Approved Architectural Implementation Specification & Production Standard  
**Project:** Wealthwise Accountants Operating System & Accounting Platform  
**Target Architecture:** Next.js (App Router), TypeScript, Tailwind CSS, Zero External Vendor Footprint  
**Footer Attribution Standard:** "Designed & Built by Mercian Wealth" ([mercianwealth.com](https://mercianwealth.com))

---

## 1. Executive Summary & Objectives

The Wealthwise Accountants platform is built to establish complete professional authority and client trust. The application presents **100% proprietary branding** with **zero external vendor footprint** (specifically eliminating any Next.js, Vercel, or starter template artifacts).

Simultaneously, because accountancy clients and business owners access receipts, invoices, tax calculators, and approvals on mobile devices, the entire interface is **fully mobile-optimised** across all workflows, ensuring zero-defect mobile behaviour by design.

At the footer of all environments (Marketing Portal, Staging Portal, Platform Demo Hub, Partner Practice OS, and Client Vault), a luxury interactive button attributes the engineering to **Mercian Wealth** linking to `https://mercianwealth.com`.

### Key Mandates
1. **Purge External Branding:** Total elimination of Next.js and Vercel artifacts, default starter SVGs (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`), framework headers (`X-Powered-By: Next.js`), external vendor callback URLs, and default starter metadata.
2. **Proprietary Metadata Suite:** Comprehensive Next.js 16 metadata implementation exclusively branding Wealthwise Accountants (Title templates, Open Graph, Twitter cards, Apple Mobile Web App configurations, Web Manifest, canonical URLs, and favicon/appicon assets).
3. **Custom Brand Assets:** High-resolution bespoke SVG, PNG, and ICO icons featuring Wealthwise Accountants' visual identity (Obsidian `#000000`, warm gold `#C0A262`, and clean white `#FFFFFF`).
4. **Footer Attribution Button:** Dedicated "Designed & Built by Mercian Wealth" pill button in all footers linking directly to `https://mercianwealth.com` with `target="_blank" rel="noopener noreferrer"`.
5. **Comprehensive Mobile Optimization:** Fluid layouts across all screen sizes (320px, 375px, 414px, 768px, 1024px+), eliminating horizontal overflow, optimizing tap targets (>= 44px), providing responsive table handling, mobile modal ergonomics, and prevention of iOS form zoom.
6. **Zero Coding Errors & Build Rigor:** 0 TypeScript compiler errors, 0 ESLint errors, 0 build failures, and 100% test suite pass rate.

---

## 2. External Footprint Elimination Plan

### 2.1 File System Deletions & Cleanups
The default Next.js starter repository template boilerplate assets in `/public` and `/app` have been permanently eliminated:
* **`public/next.svg`** -> Deleted.
* **`public/vercel.svg`** -> Deleted.
* **`public/file.svg`** -> Deleted.
* **`public/globe.svg`** -> Deleted.
* **`public/window.svg`** -> Deleted.
* **`app/favicon.ico`** & **`public/favicon.ico`** -> Converted from official `public/images/favicon-32.png` into genuine multi-resolution ICO files.

### 2.2 Framework Header Suppression
Next.js by default appends an HTTP response header `X-Powered-By: Next.js`. 
* **Target:** `next.config.ts`
* **Action:** Set `poweredByHeader: false`.
* **Result:** No HTTP response reveals the underlying server technology to inspect tools or automated scanners.

### 2.3 Vendor URL Purge in API Routes
Any fallback or OAuth callback redirect pointing to `*.vercel.app` has been scrubbed:
* **Target:** `app/api/banking/connect/route.ts`
* **Action:** Replaced `wealth-wise-platform-sigma.vercel.app` with `wealthwiseaccountants.co.uk`.

---

## 3. Wealthwise Accountants Proprietary Metadata Architecture

### 3.1 Metadata Specification Table

| Meta Property | Value | Rationale |
| :--- | :--- | :--- |
| **`title.default`** | `Wealthwise Accountants \| Accounting & Tax Services` | Official practice title |
| **`title.template`** | `%s \| Wealthwise Accountants` | Dynamic sub-page titling across all routes |
| **`description`** | `Accounting, tax, bookkeeping, VAT and payroll support from Wealthwise Accountants. Clear advice to help you understand your numbers and make confident decisions.` | Official firm value proposition |
| **`applicationName`** | `Wealthwise Accountants` | Progressive Web App and system identity |
| **`authors`** | `[{ name: "Wealthwise Accountants", url: "https://wealthwiseaccountants.co.uk" }]` | Practice authorship |
| **`creator`** | `Wealthwise Accountants Limited` | Legal entity declaration |
| **`publisher`** | `Wealthwise Accountants Limited` | Formal publisher record |
| **`keywords`** | `["Wealthwise Accountants", "Accountants Smethwick", "Chartered Certified Accountants", "UK Tax Accounting", "Self Assessment", "Corporation Tax", "Bookkeeping", "VAT Returns MTD", "Payroll Services"]` | Targeted accounting search indexing |
| **`metadataBase`** | `https://wealthwiseaccountants.co.uk` | Absolute URL resolution for social assets |
| **`robots`** | `{ index: false, follow: false }` | Protected staging/prototype indexing guard |
| **`openGraph.title`** | `Wealthwise Accountants \| Accounting & Tax Services` | High-trust social cards |
| **`openGraph.siteName`** | `Wealthwise Accountants` | Universal site identifier |
| **`openGraph.locale`** | `en_GB` | UK jurisdiction alignment |
| **`openGraph.images`** | `[{ url: "/og-image.svg", width: 1200, height: 630 }]` | Bespoke vector social banner with Mercian Wealth watermark |
| **`twitter.card`** | `summary_large_image` | High-resolution preview on communications channels |
| **`manifest`** | `/site.webmanifest` | PWA manifest configuration |

### 3.2 Viewport Configuration
Next.js 16 separates `viewport` from `metadata`:
```typescript
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};
```

### 3.3 Web App Manifest (`public/site.webmanifest`)
Provides full standalone mobile installation capabilities:
* `name`: `Wealthwise Accountants`
* `short_name`: `Wealthwise`
* `description`: `Accounting & Tax Services for UK Businesses and Individuals`
* `start_url`: `/`
* `display`: `standalone`
* `background_color`: `#F0F5FA`
* `theme_color`: `#000000`
* `icons`: 192x192, 32x32, and vector maskable icons

---

## 4. Visual Identity & Brand Assets Creation

### 4.1 Visual Hierarchy & Motif
* **Primary Mark:** Interlocking geometric monogram in polished gold (`#C0A262`) with white accents and obsidian background.
* **Palette:**
  * Obsidian Black: `#000000` / `#111111` (Primary Trust & Structure)
  * Rich Gold: `#C0A262` / `#CDBA7A` (Financial Prosperity & Precision Accent)
  * Page Slate: `#F0F5FA` (Soft readable background)
  * Pure White: `#FFFFFF` (Clarity)
* **Assets Generated:**
  1. `public/favicon.ico` & `app/favicon.ico` — Multi-resolution favicon generated from official 32x32 brand asset.
  2. `public/icon.svg` & `app/icon.svg` — Precision vector monogram with gold geometric accents.
  3. `public/apple-icon.svg` & `app/apple-icon.svg` — 180x180 iOS touch icon with gold border.
  4. `public/og-image.svg` — 1200x630 vector OpenGraph banner with practice coordinates and "Designed & Built by Mercian Wealth" watermark.

---

## 5. Mercian Wealth Footer Attribution Button

In accordance with agency engineering requirements, every environment features a luxury attribution button linking to `https://mercianwealth.com`:

```tsx
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
```

### Footers Equipped:
1. **Public Practice Landing Page** (`components/marketing/LandingPage.tsx`)
2. **Interactive Platform Demo Hub** (`app/demo/page.tsx`)
3. **Partner Practice OS Demo** (`app/demo/accountant/page.tsx`)
4. **Client Collaboration Portal Demo** (`app/demo/client/page.tsx`)
5. **Client Staging Deployment Portal** (`components/staging/ProjectScopeQuestionnaire.tsx`)

---

## 6. Mobile Optimization Engineering Standards

1. **Tap Targets:** Every button and interactive control satisfies >= 40–44px touch ergonomics.
2. **Horizontal Overflow Prevention:** Tables and filter strips wrapped in `overflow-x-auto scrollbar-none touch-pan-x`.
3. **Modal Isolation:** All modal overlays lock `body` scroll (`overflow: hidden`), handle backdrop click dismissal, and respond to the `Escape` key.
4. **Form Ergonomics:** Inputs styled with base 16px font on small screens to prevent iOS Safari auto-zoom.

---

## 7. Quality Gate Checklist

```
[x] 1. Zero external vendor branding (No Next.js, no Vercel).
[x] 2. Powered-by headers disabled in next.config.ts.
[x] 3. Genuine Wealthwise Accountants favicon.ico, icon.svg, apple-icon.svg.
[x] 4. Comprehensive metadata, OpenGraph, Twitter card, webmanifest in app/layout.tsx.
[x] 5. "Designed & Built by Mercian Wealth" interactive button in all footers linking to mercianwealth.com.
[x] 6. Automated Vitest suite passing (24/24 tests).
[x] 7. TypeScript compiler check passing (0 errors).
[x] 8. Production build passing (pnpm run build) across all routes.
```


---

## 8. Header Logo Navigation Behavior

Clicking the practice logo in the top navigation header on any page now seamlessly routes and resets viewport scroll to the top of the landing page:
- In `components/marketing/LandingPage.tsx`, clicking the logo checks `window.location.pathname === '/'` and executes smooth scrolling to top (`window.scrollTo({ top: 0, behavior: 'smooth' })`), avoiding redundant page reloads while providing instant viewport reset.
- In `components/demo/DemoHeader.tsx` and related portals, clicking the logo routes directly to `/` with the top scroll anchor preserved.
