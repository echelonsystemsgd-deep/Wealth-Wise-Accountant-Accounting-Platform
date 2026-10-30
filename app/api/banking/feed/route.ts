import { NextResponse } from "next/server";

export interface BankFeedTransaction {
  id: string;
  bankId: string;
  accountNumberMasked: string;
  transactionDate: string;
  amountPence: number;
  description: string;
  payeeName: string;
  category: string;
  referenceId: string;
  confidenceScore: number;
  isReconciled: boolean;
}

export const SAMPLE_BANK_FEED: BankFeedTransaction[] = [
  {
    id: "tx-feed-101",
    bankId: "bank-barclays",
    accountNumberMasked: "••••9021",
    transactionDate: "2026-10-28",
    amountPence: 180000,
    description: "STRIPE PAYMENTS SETTLEMENT TRANSFER",
    payeeName: "Stripe Technology Europe",
    category: "Sales Revenue",
    referenceId: "STRIPE-TRANSFER-74892",
    confidenceScore: 99,
    isReconciled: false,
  },
  {
    id: "tx-feed-102",
    bankId: "bank-barclays",
    accountNumberMasked: "••••9021",
    transactionDate: "2026-10-27",
    amountPence: -8400,
    description: "GOOGLE WORKSPACE MONTHLY SUBSCRIPTION",
    payeeName: "Google Cloud UK Ltd",
    category: "Software & IT",
    referenceId: "GSUITE-OCT-9982",
    confidenceScore: 97,
    isReconciled: false,
  },
  {
    id: "tx-feed-103",
    bankId: "bank-barclays",
    accountNumberMasked: "••••9021",
    transactionDate: "2026-10-26",
    amountPence: -32500,
    description: "REGUS OFFICE SERVICED DESK SPACE",
    payeeName: "IWG Regus UK",
    category: "Rent & Rates",
    referenceId: "REGUS-BHM-4401",
    confidenceScore: 95,
    isReconciled: false,
  },
  {
    id: "tx-feed-104",
    bankId: "bank-revolut",
    accountNumberMasked: "••••4119",
    transactionDate: "2026-10-25",
    amountPence: -1490,
    description: "GITHUB COPILOT SEATS SUBSCRIPTION",
    payeeName: "GitHub Inc",
    category: "Software & IT",
    referenceId: "GH-OCT-0941",
    confidenceScore: 98,
    isReconciled: false,
  },
  {
    id: "tx-feed-105",
    bankId: "bank-revolut",
    accountNumberMasked: "••••4119",
    transactionDate: "2026-10-24",
    amountPence: 245000,
    description: "DIRECT BACS INVOICE SETTLEMENT KENSINGTON LTD",
    payeeName: "Kensington Media Group",
    category: "Consulting Turnover",
    referenceId: "BACS-KM-0284",
    confidenceScore: 100,
    isReconciled: true,
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    totalTransactions: SAMPLE_BANK_FEED.length,
    unreconciledCount: SAMPLE_BANK_FEED.filter((t) => !t.isReconciled).length,
    transactions: SAMPLE_BANK_FEED,
    lastSyncedAt: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === "SYNC_NOW") {
      // Simulate real-time AISP pull from UK bank
      const newTransactions: BankFeedTransaction[] = [
        {
          id: `tx-feed-${Date.now()}`,
          bankId: "bank-barclays",
          accountNumberMasked: "••••9021",
          transactionDate: new Date().toISOString().split("T")[0],
          amountPence: 95000,
          description: "INCOMING CLIENT FASTER PAYMENT",
          payeeName: "Apex Retail Services",
          category: "Turnover",
          referenceId: `FPS-${Date.now().toString().slice(-6)}`,
          confidenceScore: 98,
          isReconciled: false,
        },
      ];

      return NextResponse.json({
        success: true,
        syncedCount: newTransactions.length,
        message: "Live bank feed synced successfully via Open Banking AISP",
        newTransactions,
        syncedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true, message: "Feed up to date" });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to sync bank feed" },
      { status: 500 }
    );
  }
}
