"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "macmagia_cookie_consent_v1";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  function accept() {
    window.localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Использование cookie">
      <p className="cookie-banner__text">
        Мы используем cookie для корректной работы сайта и улучшения сервиса. Продолжая пользоваться сайтом,
        вы соглашаетесь с{" "}
        <Link href="/policy" target="_blank">политикой конфиденциальности</Link>.
      </p>
      <button className="cookie-banner__button" type="button" onClick={accept}>
        Принимаю
      </button>
    </div>
  );
}
