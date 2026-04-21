import HeroImageSlider from "@/components/HeroImageSlider";
import { products } from "@/data/products";

export default function HeroSection() {
  const heroImages = [
    "/images/hero-main-slide.png",
    ...(products.map((product) => product.coverImageSrc).filter(Boolean) as string[])
  ];

  return (
    <section className="hero section">
      <div className="hero__content">
        <div className="hero__split">
          <div>
            <div className="hero__badge-row">
              <p className="eyebrow">Электронные метафорические колоды</p>
              <span className="hero__badge">Мгновенная доставка на email</span>
            </div>
            <h1>Твоя личная колода МАК всегда в телефоне</h1>
            <p className="hero__text">
              Электронные метафорические карты. Не нужно ждать доставку - начни практику или
              самопознание прямо сейчас.
            </p>
          </div>

          <div className="hero__image-wrap">
            <HeroImageSlider images={heroImages} />
          </div>
        </div>

        <div className="hero__metrics">
          <div>
            <strong>⚡️ Моментальный доступ без ожидания</strong>
            <span>Отправим колоды автоматически на почту после оплаты.</span>
          </div>
          <div>
            <strong>💰 Цена в 3-5 раз ниже печатного аналога</strong>
            <span>Вы платите только за контент и энергию автора.</span>
          </div>
          <div>
            <strong>📱 Работает везде и не занимает места</strong>
            <span>Вся колода хранится в облаке или у вас на устройстве.</span>
          </div>
        </div>

        <div className="hero__actions">
          <a className="button button--primary" href="#catalog">
            Выбрать колоду
          </a>
        </div>
      </div>
    </section>
  );
}
