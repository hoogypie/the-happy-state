import { NextRequest, NextResponse } from "next/server";
import createMollie from "@mollie/api-client";

const mollie = createMollie({ apiKey: process.env.MOLLIE_API_KEY! });

const PLANS: Record<string, Record<string, { amount: string; desc: string }>> = {
  core:  { m1: { amount: "119.00", desc: "Core lidmaatschap — 1 maand" },  m3: { amount: "327.00", desc: "Core lidmaatschap — 3 maanden" },  m6: { amount: "594.00", desc: "Core lidmaatschap — 6 maanden" } },
  flow:  { m1: { amount: "149.00", desc: "Flow lidmaatschap — 1 maand" },  m3: { amount: "417.00", desc: "Flow lidmaatschap — 3 maanden" },  m6: { amount: "774.00", desc: "Flow lidmaatschap — 6 maanden" } },
  state: { m1: { amount: "229.00", desc: "State lidmaatschap — 1 maand" }, m3: { amount: "627.00", desc: "State lidmaatschap — 3 maanden" }, m6: { amount: "1134.00", desc: "State lidmaatschap — 6 maanden" } },
};

export async function POST(req: NextRequest) {
  try {
    const { plan, duration, userId, email } = await req.json();
    const planData = PLANS[plan]?.[duration];
    if (!planData) return NextResponse.json({ error: "Ongeldig plan" }, { status: 400 });

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://the-happy-state.vercel.app";

    const payment = await mollie.payments.create({
      amount: { currency: "EUR", value: planData.amount },
      description: planData.desc,
      redirectUrl: `${baseUrl}/dashboard?payment=success&plan=${plan}&duration=${duration}`,
      webhookUrl: `${baseUrl}/api/webhook/mollie`,
      metadata: { userId, email, plan, duration },
    });

    return NextResponse.json({ checkoutUrl: payment.getCheckoutUrl() });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Betaling aanmaken mislukt" }, { status: 500 });
  }
}