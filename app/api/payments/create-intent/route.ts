import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { invoiceId, invoiceNumber, amountPence, customerName, paymentMethod } = body;

    if (!amountPence || amountPence <= 0) {
      return NextResponse.json(
        { success: false, error: "Invalid payment amount" },
        { status: 400 }
      );
    }

    const amountPounds = (amountPence / 100).toFixed(2);

    // Stripe PaymentIntent structure
    const stripeIntent = {
      id: `pi_${Date.now()}_secret_${Math.random().toString(36).substring(2, 9)}`,
      clientSecret: `pi_${Date.now()}_secret_${Math.random().toString(36).substring(2, 15)}`,
      currency: "gbp",
      amountPence,
      amountFormatted: `£${amountPounds}`,
      status: "requires_payment_method",
      paymentMethodTypes: ["card", "link", "apple_pay", "google_pay"],
    };

    // PayPal REST API order structure
    const paypalOrder = {
      id: `PAYPAL-ORD-${Date.now().toString().slice(-7)}`,
      intent: "CAPTURE",
      status: "CREATED",
      purchase_units: [
        {
          reference_id: invoiceNumber || "INV-2026",
          amount: {
            currency_code: "GBP",
            value: amountPounds,
          },
          description: `Settlement for Invoice ${invoiceNumber} - Wealth Wise Accountant Client Portal`,
        },
      ],
      links: [
        {
          href: `https://www.sandbox.paypal.com/checkoutnow?token=EC-${Date.now()}`,
          rel: "approve",
          method: "GET",
        },
      ],
    };

    return NextResponse.json({
      success: true,
      invoiceId,
      invoiceNumber,
      amountPence,
      currency: "GBP",
      stripe: stripeIntent,
      paypal: paypalOrder,
      supportedRails: [
        "Debit/Credit Cards (Visa, Mastercard, Amex)",
        "Apple Pay & Google Pay",
        "Instant UK Bank Transfer (Open Banking)",
        "PayPal One-Click Checkout",
      ],
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
