import { calculateOrderTotals } from "@/lib/pricing";

type SendDeliveryEmailInput = {
  email: string;
  name: string;
  productIds: string[];
};

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export function isEmailConfigured() {
  return Boolean(
    process.env.UNISENDER_API_KEY && process.env.UNISENDER_LIST_ID && process.env.DELIVERY_FROM_EMAIL
  );
}

export async function sendDeliveryEmail({
  email,
  name,
  productIds
}: SendDeliveryEmailInput) {
  const totals = calculateOrderTotals(productIds);

  if (totals.items.length === 0) {
    throw new Error("Products not found");
  }

  const apiKey = getRequiredEnv("UNISENDER_API_KEY");
  const listId = getRequiredEnv("UNISENDER_LIST_ID");
  const from = getRequiredEnv("DELIVERY_FROM_EMAIL");
  const fromName = process.env.DELIVERY_FROM_NAME || "MacMagia";
  const customerName = name.trim() || "друг";

  const productsHtml = totals.items
    .map(
      (product) => `
        <div style="margin-bottom: 20px; padding: 16px; border: 1px solid #f2d7e3; border-radius: 14px; background: #fff9fc;">
          <p style="margin: 0 0 8px;"><strong>${product.title}</strong></p>
          <p style="margin: 0 0 12px;">${product.description}</p>
          <a
            href="${product.yandexDiskUrl}"
            style="display: inline-block; padding: 12px 18px; background: #c6849c; color: #ffffff; text-decoration: none; border-radius: 10px;"
          >
            Открыть колоду
          </a>
        </div>
      `
    )
    .join("");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6;">
      <h2 style="margin-bottom: 12px;">Спасибо за покупку, ${customerName}!</h2>
      <p>Оплата прошла успешно. Ниже собраны ссылки на все купленные колоды:</p>
      <div style="margin: 20px 0;">${productsHtml}</div>
      <p>
        Итого: <strong>${totals.total} руб.</strong>${totals.discount > 0 ? ` (скидка ${totals.discount} руб.)` : ""}
      </p>
      <p>Если письмо открылось не на том устройстве, просто сохраните ссылку и откройте ее позже.</p>
    </div>
  `;

  const subject =
    totals.items.length === 1
      ? `Ваша электронная колода: ${totals.items[0].title}`
      : `Ваш заказ электронных колод: ${totals.items.length} шт.`;

  const body = new URLSearchParams({
    format: "json",
    api_key: apiKey,
    email,
    sender_name: fromName,
    sender_email: from,
    subject,
    body: html,
    list_id: listId
  });

  const response = await fetch("https://api.unisender.com/ru/api/sendEmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: body.toString()
  });

  const payloadText = await response.text();

  if (!response.ok) {
    throw new Error(`UniSender delivery failed: ${payloadText}`);
  }

  let payload: unknown;

  try {
    payload = JSON.parse(payloadText);
  } catch {
    throw new Error(`UniSender delivery failed: ${payloadText}`);
  }

  if (payload && typeof payload === "object" && "error" in payload && payload.error) {
    const message =
      "error_info" in payload && typeof payload.error_info === "string"
        ? payload.error_info
        : String(payload.error);
    throw new Error(`UniSender delivery failed: ${message}`);
  }

  return payload;
}
