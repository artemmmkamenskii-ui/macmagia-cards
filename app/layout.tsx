import type { Metadata } from "next";

import { CartProvider } from "@/components/CartProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Электронные колоды",
  description:
    "Мини-лендинг для продажи электронных колод с онлайн-оплатой и автоматической отправкой ссылки на email."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
