import { getPublicAppUrl } from "@/lib/basePath";
import { calculateOrderTotals } from "@/lib/pricing";

type YooKassaAmount = {
  value: string;
  currency: "RUB";
};

type CreatePaymentInput = {
  email: string;
  name: string;
  productIds: string[];
};

type YooKassaPaymentResponse = {
  id: string;
  status: string;
  paid: boolean;
  confirmation?: {
    confirmation_url?: string;
  };
  metadata?: Record<string, string>;
  amount: YooKassaAmount;
};

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}


export function isYooKassaConfigured() {
  return Boolean(process.env.YOOKASSA_SHOP_ID && process.env.YOOKASSA_SECRET_KEY);
}

function getAuthHeader() {
  const shopId = getRequiredEnv("YOOKASSA_SHOP_ID");
  const secretKey = getRequiredEnv("YOOKASSA_SECRET_KEY");

  return `Basic ${Buffer.from(`${shopId}:${secretKey}`).toString("base64")}`;
}

export async function createYooKassaPayment({
  email,
  name,
  productIds
}: CreatePaymentInput) {
  const totals = calculateOrderTotals(productIds);

  if (totals.items.length === 0) {
    throw new Error("Products not found");
  }

  const normalizedEmail = email.replace(/\s+/g, "").toLowerCase();

  const description =
    totals.items.length === 1
      ? `Покупка электронной колоды "${totals.items[0].title}"`
      : `Покупка ${totals.items.length} электронных колод`;

  const response = await fetch("https://api.yookassa.ru/v3/payments", {
    method: "POST",
    headers: {
      Authorization: getAuthHeader(),
      "Content-Type": "application/json",
      "Idempotence-Key": crypto.randomUUID()
    },
    body: JSON.stringify({
      amount: {
        value: totals.total.toFixed(2),
        currency: "RUB"
      },
      capture: true,
      confirmation: {
        type: "redirect",
        return_url: `${getPublicAppUrl()}/success`
      },
      description,
      receipt: {
        customer: { email: normalizedEmail },
        items: totals.items.map((item) => {
          const unitPrice = totals.qualifiesForDiscount
            ? (totals.total / totals.quantity)
            : item.price;
          return {
            description: item.title,
            quantity: "1.00",
            amount: { value: unitPrice.toFixed(2), currency: "RUB" },
            vat_code: 1,
            payment_mode: "full_payment",
            payment_subject: "commodity"
          };
        })
      },
      metadata: {
        source: "cards",
        productIds: JSON.stringify(productIds),
        email: normalizedEmail,
        name,
        quantity: String(totals.quantity),
        subtotal: String(totals.subtotal),
        discount: String(totals.discount),
        total: String(totals.total)
      }
    })
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`YooKassa create payment failed: ${details}`);
  }

  const payment = (await response.json()) as YooKassaPaymentResponse;

  if (!payment.confirmation?.confirmation_url) {
    throw new Error("YooKassa did not return a confirmation URL");
  }

  return {
    paymentId: payment.id,
    confirmationUrl: payment.confirmation.confirmation_url
  };
}

export async function getYooKassaPayment(paymentId: string) {
  const response = await fetch(`https://api.yookassa.ru/v3/payments/${paymentId}`, {
    method: "GET",
    headers: {
      Authorization: getAuthHeader(),
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`YooKassa get payment failed: ${details}`);
  }

  return (await response.json()) as YooKassaPaymentResponse;
}

export function verifyWebhookSecret(secret: string | null) {
  const expected = process.env.YOOKASSA_WEBHOOK_SECRET;

  if (!expected) {
    return true;
  }

  return secret === expected;
}
