import { NextRequest, NextResponse } from "next/server";
import createMollie from "@mollie/api-client";
import { createClient } from "@/lib/supabase/server";

const mollie = createMollie({ apiKey: process.env.MOLLIE_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    const paymentId = body.get("id") as string;
    if (!paymentId) return NextResponse.json({ error: "Geen payment ID" }, { status: 400 });

    const payment = await mollie.payments.get(paymentId);
    if (payment.status !== "paid") return NextResponse.json({ ok: true });

    const { userId, plan, duration } = payment.metadata as Record<string, string>;
    const supabase = await createClient();

    const months = duration === "m1" ? 1 : duration === "m3" ? 3 : 6;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + months);

    await supabase.from("subscriptions").upsert({
      user_id: userId,
      plan_slug: plan,
      status: "active",
      started_at: startDate.toISOString(),
      ends_at: endDate.toISOString(),
      mollie_payment_id: paymentId,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Webhook fout" }, { status: 500 });
  }
}