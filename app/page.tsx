import CartSection from "@/components/CartSection";
import BenefitsSection from "@/components/Sections/BenefitsSection";
import CatalogSection from "@/components/Sections/CatalogSection";
import FaqSection from "@/components/Sections/FaqSection";
import FinalCtaSection from "@/components/Sections/FinalCtaSection";
import HeroSection from "@/components/Sections/HeroSection";
import Topbar from "@/components/Topbar";

export default function HomePage() {
  return (
    <main className="page-shell">
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
          <a href="/policy">Политика конфиденциальности</a>
          <a href="/offer">Публичная оферта</a>
          <a href="/requisites">Реквизиты</a>
        </nav>
      </footer>
    </main>
  );
}
