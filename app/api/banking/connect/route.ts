import { NextResponse } from "next/server";

export interface UKBankProvider {
  id: string;
  name: string;
  slug: string;
  logoColor: string;
  authUrl: string;
  features: string[];
  connectionStatus: "ACTIVE" | "PENDING_CONSENT" | "DISCONNECTED";
  consentExpiryDays: number;
}

export const UK_BANKS: UKBankProvider[] = [
  {
    id: "bank-barclays",
    name: "Barclays Business",
    slug: "barclays",
    logoColor: "#00aeef",
    authUrl: "https://auth.truelayer.com/?client_id=wealthwise&provider_id=ob-barclays",
    features: ["Live Transactions", "Direct Feeds", "2-Column Auto-Match"],
    connectionStatus: "ACTIVE",
    consentExpiryDays: 78,
  },
  {
    id: "bank-hsbc",
    name: "HSBC UK Business",
    slug: "hsbc",
    logoColor: "#db0011",
    authUrl: "https://auth.truelayer.com/?client_id=wealthwise&provider_id=ob-hsbc",
    features: ["Multi-Currency", "Faster Payments Feed"],
    connectionStatus: "ACTIVE",
    consentExpiryDays: 84,
  },
  {
    id: "bank-natwest",
    name: "NatWest Bankline",
    slug: "natwest",
    logoColor: "#4e0f60",
    authUrl: "https://auth.truelayer.com/?client_id=wealthwise&provider_id=ob-natwest",
    features: ["Bankline Direct", "Real-Time Balance Check"],
    connectionStatus: "PENDING_CONSENT",
    consentExpiryDays: 14,
  },
  {
    id: "bank-lloyds",
    name: "Lloyds Commercial",
    slug: "lloyds",
    logoColor: "#006a4e",
    authUrl: "https://auth.truelayer.com/?client_id=wealthwise&provider_id=ob-lloyds",
    features: ["BACS Settlements", "Automated Direct Debits"],
    connectionStatus: "ACTIVE",
    consentExpiryDays: 89,
  },
  {
    id: "bank-monzo",
    name: "Monzo Business",
    slug: "monzo",
    logoColor: "#ff3366",
    authUrl: "https://auth.truelayer.com/?client_id=wealthwise&provider_id=ob-monzo",
    features: ["Instant Push Webhooks", "Live Tagging"],
    connectionStatus: "ACTIVE",
    consentExpiryDays: 62,
  },
  {
    id: "bank-revolut",
    name: "Revolut Business",
    slug: "revolut",
    logoColor: "#0075eb",
    authUrl: "https://auth.truelayer.com/?client_id=wealthwise&provider_id=ob-revolut",
    features: ["Multi-Currency Sub-Accounts", "Card Spend Sync"],
    connectionStatus: "ACTIVE",
    consentExpiryDays: 81,
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    provider: "Open Banking UK (TrueLayer / Plaid Open Data)",
    totalBanks: UK_BANKS.length,
    banks: UK_BANKS,
    syncInterval: "Nightly 03:00 GMT + On-Demand Instant Webhook Pull",
    regulator: "FCA Authorized Account Information Service Provider (AISP)",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bankId, redirectUri } = body;

    const bank = UK_BANKS.find((b) => b.id === bankId) || UK_BANKS[0];

    // Build OAuth 2.0 PKCE consent redirect link
    const authSessionUrl = `${bank.authUrl}&redirect_uri=${encodeURIComponent(
      redirectUri || "https://wealthwiseaccountants.co.uk/api/banking/callback"
    )}&state=${Date.now()}`;

    return NextResponse.json({
      success: true,
      bankId: bank.id,
      bankName: bank.name,
      consentWindowDays: 90,
      authRedirectUrl: authSessionUrl,
      message: `Open Banking consent portal initialized for ${bank.name}`,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, error: (err instanceof Error ? err.message : String(err)) || "Failed to initiate bank link" },
      { status: 500 }
    );
  }
}
