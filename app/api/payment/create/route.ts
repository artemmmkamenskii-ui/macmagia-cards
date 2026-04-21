import { NextResponse } from "next/server";

import { getProductById } from "@/data/products";
import { calculateOrderTotals } from "@/lib/pricing";
import { createYooKassaPayment, isYooKassaConfigured } from "@/lib/yookassa";

type CreatePaymentBody = {
  email?: string;
  name?: string;
  productIds?: string[];
};

function isValidEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreatePaymentBody;
    const email = body.email?.trim() || "";
    const name = body.name?.trim() || "";
    const productIds = Array.isArray(body.productIds)
      ? body.productIds.map((productId) => productId.trim()).filter(Boolean)
      : [];

    if (!name || !email || productIds.length === 0) {
      return NextResponse.json(
        { error: "Заполните имя, email и добавьте хотя бы одну колоду." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Введите корректный email." }, { status: 400 });
    }

    if (productIds.some((productId) => !getProductById(productId))) {
      return NextResponse.json({ error: "Одна из выбранных колод не найдена." }, { status: 404 });
    }

    const totals = calculateOrderTotals(productIds);

    if (totals.items.length !== productIds.length) {
      return NextResponse.json({ error: "Не удалось собрать заказ." }, { status: 400 });
    }

    if (!isYooKassaConfigured()) {
      return NextResponse.json(
        { error: "ЮKassa еще не настроена. Добавьте ключи в .env.local." },
        { status: 503 }
      );
    }

    const payment = await createYooKassaPayment({
      email,
      name,
      productIds
    });

    return NextResponse.json(payment);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Не удалось создать оплату.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
