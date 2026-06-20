import type { Metadata } from "next";

import { CartProvider } from "@/components/CartProvider";
import CookieConsent from "@/components/CookieConsent";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://macmagia.ru"),
  title: "Купить метафорические карты (МАК): электронные колоды — МакМагия",
  description:
    "Купить метафорические ассоциативные карты (МАК): авторские электронные колоды с мгновенной отправкой на email и работой прямо в телефоне. Колоды для психологов и для себя, оплата онлайн.",
  alternates: {
    canonical: "https://macmagia.ru/cards"
  },
  openGraph: {
    type: "website",
    siteName: "МакМагия",
    url: "https://macmagia.ru/cards",
    title: "Купить метафорические карты (МАК): электронные колоды — МакМагия",
    description:
      "Авторские электронные колоды метафорических ассоциативных карт. Мгновенная доставка на email, работа прямо в телефоне.",
    images: [
      {
        url: "/cards/images/hero-main-slide.png",
        width: 1200,
        height: 630,
        alt: "Метафорические карты МАК — электронные колоды МакМагия"
      }
    ],
    locale: "ru_RU"
  },
  twitter: {
    card: "summary_large_image",
    title: "Купить метафорические карты (МАК): электронные колоды",
    description:
      "Авторские электронные колоды МАК. Мгновенная доставка на email, работа в телефоне.",
    images: ["/cards/images/hero-main-slide.png"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <CartProvider>{children}</CartProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
