import Link from "next/link";

import CartSection from "@/components/CartSection";
import JsonLd from "@/components/JsonLd";
import BenefitsSection from "@/components/Sections/BenefitsSection";
import CatalogSection from "@/components/Sections/CatalogSection";
import FaqSection from "@/components/Sections/FaqSection";
import FinalCtaSection from "@/components/Sections/FinalCtaSection";
import HeroSection from "@/components/Sections/HeroSection";
import Topbar from "@/components/Topbar";

export default function HomePage() {
  return (
    <main className="page-shell">
      <JsonLd />
      <Topbar />
      <HeroSection />
      <CatalogSection />
      <CartSection />
      <BenefitsSection />
      <FaqSection />
      <FinalCtaSection />

      <footer className="footer">
        <p>Продажа электронных колод</p>
        <nav>
          <Link href="/policy">Политика конфиденциальности</Link>
          <Link href="/offer">Публичная оферта</Link>
          <Link href="/requisites">Реквизиты</Link>
        </nav>
      </footer>
    </main>
  );
}
