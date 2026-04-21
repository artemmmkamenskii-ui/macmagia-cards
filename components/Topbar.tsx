"use client";

import Link from "next/link";

import { useCart } from "@/components/CartProvider";

export default function Topbar() {
  const { totals } = useCart();

  return (
    <header className="topbar">
      <Link className="topbar__brand" href="/">
        МакМагия
      </Link>
      <nav className="topbar__nav">
        <Link href="/#catalog">Ассортимент</Link>
        <Link href="/#cart">Корзина</Link>
        <Link href="/#faq">FAQ</Link>
        <Link href="/requisites">Реквизиты</Link>
        <Link href="/#cart" className="topbar__cta">
          Корзина {totals.quantity > 0 ? `(${totals.quantity})` : ""}
        </Link>
      </nav>
    </header>
  );
}
