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
  const { addToCart, removeFromCart, isInCart } = useCart();
  const added = isInCart(productId);

  function handleClick() {
    if (added) {
      removeFromCart(productId);
    } else {
      addToCart(productId);
    }
  }

  return (
    <div className="add-to-cart">
      <button
        className={`button ${variant === "ghost" ? "button--ghost" : "button--primary"}`}
        type="button"
        onClick={handleClick}
      >
        {added ? "Убрать из корзины" : label || "В корзину"}
      </button>
      {added ? (
        <Link className="button button--secondary" href="/#cart">
          Перейти в корзину
        </Link>
      ) : null}
    </div>
  );
}
