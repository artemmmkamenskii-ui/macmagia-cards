import { NextResponse } from "next/server";

import { sendDeliveryEmail, isEmailConfigured } from "@/lib/email";
import { isProcessed, markProcessed, unmarkProcessed } from "@/lib/idempotency";
import { getYooKassaPayment, isYooKassaConfigured, verifyWebhookSecret } from "@/lib/yookassa";

type YooKassaWebhookBody = {
  event?: string;
  object?: {
    id?: string;
  };
};

export async function POST(request: Request) {
  try {
    const webhookSecret = request.headers.get("x-webhook-secret");

    if (!verifyWebhookSecret(webhookSecret)) {
      return NextResponse.json({ error: "Invalid webhook secret." }, { status: 401 });
    }

    if (!isYooKassaConfigured() || !isEmailConfigured()) {
      return NextResponse.json(
        { error: "Оплата или email-доставка еще не настроены." },
        { status: 503 }
      );
    }

    const body = (await request.json()) as YooKassaWebhookBody;

    if (body.event !== "payment.succeeded" || !body.object?.id) {
      return NextResponse.json({ ok: true });
    }

    const paymentId = body.object.id;

    const payment = await getYooKassaPayment(paymentId);

    if (!payment.paid || payment.status !== "succeeded" || !payment.metadata) {
      return NextResponse.json({ ok: true });
    }

    const source = payment.metadata.source;

    if (source !== "cards") {
      const forwardKey = `${paymentId}:forward:${source}`;
      if (isProcessed(forwardKey)) {
        return NextResponse.json({ ok: true });
      }
      if (source) {
        markProcessed(forwardKey);
        try {
          const forwardUrl = `https://macmagia.ru/${source}/api/payment/webhook`;
          await fetch(forwardUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          });
        } catch (forwardError) {
          unmarkProcessed(forwardKey);
          throw forwardError;
        }
      }
      return NextResponse.json({ ok: true });
    }

    const emailKey = `${paymentId}:email`;
    if (isProcessed(emailKey)) {
      console.log(`[webhook] payment ${paymentId} already delivered, skipping retry`);
      return NextResponse.json({ ok: true });
    }

    const email = payment.metadata.email;
    const name = payment.metadata.name;
    const rawProductIds = payment.metadata.productIds;

    if (!email || !name || !rawProductIds) {
      return NextResponse.json({ error: "Payment metadata is incomplete." }, { status: 400 });
    }

    let productIds: string[] = [];

    try {
      const parsed = JSON.parse(rawProductIds) as string[];
      if (Array.isArray(parsed)) {
        productIds = parsed;
      }
    } catch {
      return NextResponse.json({ error: "Invalid product list in payment metadata." }, { status: 400 });
    }

    if (productIds.length === 0) {
      return NextResponse.json({ error: "No products found in payment metadata." }, { status: 400 });
    }

    markProcessed(emailKey);
    try {
      await sendDeliveryEmail({ email, name, productIds });
      console.log(`[webhook] delivery email sent to ${email} for payment ${paymentId}`);
    } catch (deliveryError) {
      unmarkProcessed(emailKey);
      const reason = deliveryError instanceof Error ? deliveryError.message : String(deliveryError);
      console.error(`[webhook] delivery email FAILED for ${email} (payment ${paymentId}): ${reason}`);
      throw deliveryError;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook processing failed.";
    console.error(`[webhook] processing error: ${message}`);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
