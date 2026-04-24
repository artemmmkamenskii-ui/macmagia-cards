"use client";

import Link from "next/link";

import { useCart } from "@/components/CartProvider";

type AddToCartButtonProps = {
  productId: string;
  variant?: "primary" | "ghost";
  label?: string;
};

export default function AddToCartButton({
  productId,
  variant = "primary",
  label
}: AddToCartButtonProps) {
  const { addToCart, isInCart } = useCart();
  const added = isInCart(productId);

  return (
    <div className="add-to-cart">
      <button
        className={`button ${variant === "ghost" ? "button--ghost" : "button--primary"}`}
        type="button"
        onClick={() => addToCart(productId)}
        disabled={added}
      >
        {added ? "Уже в корзине" : label || "В корзину"}
      </button>
      {added ? (
        <Link className="button button--secondary" href="/#cart">
          Перейти в корзину
        </Link>
      ) : null}
    </div>
  );
}
