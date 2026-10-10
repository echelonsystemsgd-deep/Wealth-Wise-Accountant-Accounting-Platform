/**
 * Wealth Wise Accountant — Client Portfolio Seed Data
 * Portfolio of UK Limited Companies and Sole Traders managed by Wealth Wise Accountant.
 */

import { ManagedClient } from "./types";

export const SEEDED_CLIENTS: ManagedClient[] = [
  {
    id: "org-apex-1",
    practiceId: "prac-ww-1",
    companyName: "Apex Digital Solutions Ltd",
    tradingName: "Apex Tech",
    companyNumber: "12345678",
    vatNumber: "GB 987 6543 21",
    entityType: "LTD",
    primaryDirector: {
      name: "Marcus Sterling",
      email: "marcus@apexdigital.co.uk",
      phone: "+44 20 7946 0192",
    },
    assignedAccountant: {
      id: "usr-sarah-1",
      name: "Sarah Jenkins, ACCA",
      email: "sarah@wealthwiseaccountant.co.uk",
      role: "SENIOR_ACCOUNTANT",
    },
    tier: "PRO_LTD",
    billingModel: "INCLUDED_IN_RETAINER",
    monthlyFeePence: 24500, // £245/mo retainer
    complianceStatus: "GOOD_STANDING",
    deadlines: {
      nextVatReturnDate: "07 Nov 2026",
      nextAccountsDueDate: "31 Dec 2026",
      confirmationStatementDate: "14 Jan 2027",
    },
    healthMetrics: {
      unreconciledBankLinesCount: 4,
      pendingReceiptsCount: 2,
      draftInvoicesCount: 1,
      cashBalancePence: 2845000, // £28,450.00
      unpaidReceivablesPence: 495000, // £4,950.00
    },
    integrationAttentionRequired: {
      needsClientAction: [
        "Upload Q3 Barclaycard PDF receipt for £189.50 AWS hosting expense",
        "Confirm whether client dividend of £3,500 was transferred in Oct",
      ],
      needsAccountantAction: [
        "Review Box 1 and Box 4 VAT adjustments before November filing submission",
        "Sign off automated monthly depreciation journal entry",
      ],
    },
  },
  {
    id: "org-kensington-2",
    practiceId: "prac-ww-1",
    companyName: "Kensington Fine Dining Group Ltd",
    tradingName: "The Kensington Bistro",
    companyNumber: "13890214",
    vatNumber: "GB 451 9021 88",
    entityType: "LTD",
    primaryDirector: {
      name: "Elena Rostova",
      email: "elena@kensingtonbistro.co.uk",
      phone: "+44 20 8123 4567",
    },
    assignedAccountant: {
      id: "usr-sarah-1",
      name: "Sarah Jenkins, ACCA",
      email: "sarah@wealthwiseaccountant.co.uk",
      role: "SENIOR_ACCOUNTANT",
    },
    tier: "PRO_LTD",
    billingModel: "INCLUDED_IN_RETAINER",
    monthlyFeePence: 39500, // £395/mo retainer
    complianceStatus: "ACTION_REQUIRED",
    deadlines: {
      nextVatReturnDate: "07 Nov 2026",
      nextAccountsDueDate: "31 Jan 2027",
      confirmationStatementDate: "28 Feb 2027",
    },
    healthMetrics: {
      unreconciledBankLinesCount: 12,
      pendingReceiptsCount: 8,
      draftInvoicesCount: 3,
      cashBalancePence: 6412000, // £64,120.00
      unpaidReceivablesPence: 1240000, // £12,400.00
    },
    integrationAttentionRequired: {
      needsClientAction: [
        "Connect Open Banking feed (Zettle / Square merchant daily payout matching)",
        "Provide supplier invoice for wine inventory delivery (£2,450.00)",
      ],
      needsAccountantAction: [
        "Split POS card batch receipts between standard 20% VAT food and zero-rated ingredients",
      ],
    },
  },
  {
    id: "org-vanguard-3",
    practiceId: "prac-ww-1",
    companyName: "Vanguard Property Consultants LLP",
    tradingName: "Vanguard Real Estate",
    companyNumber: "OC412890",
    vatNumber: "GB 312 8765 09",
    entityType: "LLP",
    primaryDirector: {
      name: "David H. Sterling",
      email: "david@vanguardproperty.co.uk",
      phone: "+44 20 7901 8822",
    },
    assignedAccountant: {
      id: "usr-sarah-1",
      name: "Sarah Jenkins, ACCA",
      email: "sarah@wealthwiseaccountant.co.uk",
      role: "SENIOR_ACCOUNTANT",
    },
    tier: "ENTERPRISE_CFO",
    billingModel: "INCLUDED_IN_RETAINER",
    monthlyFeePence: 55000, // £550/mo retainer
    complianceStatus: "GOOD_STANDING",
    deadlines: {
      nextVatReturnDate: "07 Dec 2026",
      nextAccountsDueDate: "30 Apr 2027",
      confirmationStatementDate: "15 May 2027",
    },
    healthMetrics: {
      unreconciledBankLinesCount: 2,
      pendingReceiptsCount: 1,
      draftInvoicesCount: 0,
      cashBalancePence: 14250000, // £142,500.00
      unpaidReceivablesPence: 3100000, // £31,000.00
    },
    integrationAttentionRequired: {
      needsClientAction: [
        "Approve quarterly management accounts report pack",
      ],
      needsAccountantAction: [
        "Run capital allowances review on recent commercial office refurbishment",
      ],
    },
  },
  {
    id: "org-clara-sole-4",
    practiceId: "prac-ww-1",
    companyName: "Clara Bennett Architecture",
    tradingName: "Clara Bennett Studio",
    companyNumber: "N/A (Sole Trader)",
    entityType: "SOLE_TRADER",
    primaryDirector: {
      name: "Clara Bennett",
      email: "clara@clarabennett.co.uk",
      phone: "+44 77 0090 0145",
    },
    assignedAccountant: {
      id: "usr-david-2",
      name: "David Ward",
      email: "david@wealthwiseaccountant.co.uk",
      role: "BOOKKEEPER",
    },
    tier: "STARTER_SOLE_TRADER",
    billingModel: "DIRECT_SAAS_STARTER",
    monthlyFeePence: 900, // £9.00/mo self-serve SaaS
    complianceStatus: "GOOD_STANDING",
    deadlines: {
      nextVatReturnDate: "N/A (Under £90k threshold)",
      nextAccountsDueDate: "31 Jan 2027 (Self Assessment)",
      confirmationStatementDate: "N/A",
    },
    healthMetrics: {
      unreconciledBankLinesCount: 1,
      pendingReceiptsCount: 3,
      draftInvoicesCount: 1,
      cashBalancePence: 924000, // £9,240.00
      unpaidReceivablesPence: 185000, // £1,850.00
    },
    integrationAttentionRequired: {
      needsClientAction: [
        "Attach receipts for travel & mileage expenses claimed in September",
      ],
      needsAccountantAction: [
        "Review Sole Trader Self Assessment draft computation before tax season rush",
      ],
    },
  },
];
