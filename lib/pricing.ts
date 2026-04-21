import { getProductById, type Product } from "@/data/products";

export const BULK_DISCOUNT_THRESHOLD = 3;
export const BULK_DISCOUNT_PERCENT = 20;

export type OrderTotals = {
  items: Product[];
  quantity: number;
  subtotal: number;
  discount: number;
  total: number;
  qualifiesForDiscount: boolean;
};

export function calculateOrderTotals(productIds: string[]): OrderTotals {
  const items = productIds
    .map((productId) => getProductById(productId))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  const subtotal = items.reduce((sum, product) => sum + product.price, 0);
  const qualifiesForDiscount = items.length >= BULK_DISCOUNT_THRESHOLD;
  const discount = qualifiesForDiscount
    ? Math.round((subtotal * BULK_DISCOUNT_PERCENT) / 100)
    : 0;

  return {
    items,
    quantity: items.length,
    subtotal,
    discount,
    total: subtotal - discount,
    qualifiesForDiscount
  };
}
