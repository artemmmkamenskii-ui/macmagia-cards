"use client";

import { useMemo, useState, type FormEvent } from "react";

import { useCart } from "@/components/CartProvider";
import { withBasePath } from "@/lib/basePath";
import { BULK_DISCOUNT_PERCENT, BULK_DISCOUNT_THRESHOLD } from "@/lib/pricing";

type CheckoutState = {
  name: string;
  email: string;
};

const initialState: CheckoutState = {
  name: "",
  email: ""
};

export default function CartSection() {
  const { productIds, totals, removeFromCart, clearCart } = useCart();
  const [form, setForm] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const formatted = useMemo(
    () => ({
      subtotal: new Intl.NumberFormat("ru-RU").format(totals.subtotal),
      discount: new Intl.NumberFormat("ru-RU").format(totals.discount),
      total: new Intl.NumberFormat("ru-RU").format(totals.total)
    }),
    [totals.discount, totals.subtotal, totals.total]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (productIds.length === 0) {
      setError("Добавьте хотя бы одну колоду в корзину.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(withBasePath("/api/payment/create"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          productIds
        })
      });

      const data = (await response.json()) as { error?: string; confirmationUrl?: string };

      if (!response.ok || !data.confirmationUrl) {
        throw new Error(data.error || "Не удалось создать оплату.");
      }

      window.location.href = data.confirmationUrl;
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : "Произошла ошибка при оплате.";
      setError(message);
      setIsSubmitting(false);
    }
  }

  return (
    <section className="section" id="cart">
      <div className="section-heading">
        <p className="eyebrow">Корзина</p>
        <h2>Выберите несколько колод и оплатите одним заказом</h2>
        <p>
          Каждая колода стоит 190 руб. Если в корзине {BULK_DISCOUNT_THRESHOLD} и больше колод,
          скидка {BULK_DISCOUNT_PERCENT}% применяется автоматически.
        </p>
      </div>

      <div className="cart-layout">
        <div className="cart-card">
          <div className="cart-card__header">
            <h3>Ваши колоды</h3>
            {productIds.length > 0 ? (
              <button className="cart-card__clear" type="button" onClick={clearCart}>
                Очистить
              </button>
            ) : null}
          </div>

          {totals.items.length > 0 ? (
            <div className="cart-list">
              {totals.items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.subtitle}</p>
                  </div>

                  <div className="cart-item__actions">
                    <span>{item.price} руб.</span>
                    <button type="button" onClick={() => removeFromCart(item.id)}>
                      Убрать
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="cart-empty">
              <strong>Корзина пока пустая</strong>
              <p>Добавь колоды из каталога, и здесь сразу появится итог заказа.</p>
            </div>
          )}
        </div>

        <div className="cart-card cart-card--summary">
          <h3>Оформление заказа</h3>

          <div className="cart-summary">
            <div>
              <span>Колоды</span>
              <strong>{totals.quantity}</strong>
            </div>
            <div>
              <span>Сумма</span>
              <strong>{formatted.subtotal} руб.</strong>
            </div>
            <div>
              <span>Скидка</span>
              <strong>{totals.discount > 0 ? `- ${formatted.discount} руб.` : "0 руб."}</strong>
            </div>
            <div className="cart-summary__total">
              <span>К оплате</span>
              <strong>{formatted.total} руб.</strong>
            </div>
          </div>

          {totals.qualifiesForDiscount ? (
            <p className="cart-badge">Скидка {BULK_DISCOUNT_PERCENT}% уже применена</p>
          ) : (
            <p className="cart-badge cart-badge--muted">
              Добавьте еще {Math.max(BULK_DISCOUNT_THRESHOLD - totals.quantity, 0)} колод(ы) для
              скидки {BULK_DISCOUNT_PERCENT}%
            </p>
          )}

          <form className="cart-form" onSubmit={handleSubmit}>
            <label>
              <span>Ваше имя</span>
              <input
                type="text"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Как к вам обращаться"
                required
              />
            </label>

            <label>
              <span>Email для отправки колод</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="mail@example.com"
                required
              />
            </label>

            <button disabled={isSubmitting || totals.quantity === 0} type="submit">
              {isSubmitting ? "Переходим к оплате..." : "Оплатить заказ"}
            </button>

            {error ? <p className="product-card__error">{error}</p> : null}
          </form>
        </div>
      </div>
    </section>
  );
}
