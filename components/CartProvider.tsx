"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

import { calculateOrderTotals } from "@/lib/pricing";

type CartContextValue = {
  productIds: string[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  totals: ReturnType<typeof calculateOrderTotals>;
};

const CART_STORAGE_KEY = "digital-decks-cart";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [productIds, setProductIds] = useState<string[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as string[];
      if (Array.isArray(parsed)) {
        setProductIds(parsed);
      }
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(productIds));
  }, [productIds]);

  const value = useMemo<CartContextValue>(() => {
    const totals = calculateOrderTotals(productIds);

    return {
      productIds,
      addToCart: (productId) => {
        setProductIds((current) => (current.includes(productId) ? current : [...current, productId]));
      },
      removeFromCart: (productId) => {
        setProductIds((current) => current.filter((currentProductId) => currentProductId !== productId));
      },
      clearCart: () => {
        setProductIds([]);
      },
      isInCart: (productId) => productIds.includes(productId),
      totals
    };
  }, [productIds]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
