import Link from "next/link";
import { notFound } from "next/navigation";

import AddToCartButton from "@/components/AddToCartButton";
import ProductGallery from "@/components/ProductGallery";
import Topbar from "@/components/Topbar";
import { getProductById } from "@/data/products";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="product-page">
      <div className="product-page__shell">
        <Topbar />

        <Link className="product-page__back" href="/">
          ← Назад на главную
        </Link>

        <section className="product-page__hero">
          <div className="product-page__info product-page__info--full">
            <ProductGallery
              title={product.title}
              coverImageSrc={product.coverImageSrc}
              gallery={product.gallery}
            />
            <p className="eyebrow">Страница колоды</p>
            <h1>{product.title}</h1>
            <p className="product-page__subtitle">{product.subtitle}</p>

            <div className="product-page__buttons">
              <a className="button button--ghost" href="/#cart">
                Перейти в корзину
              </a>
              <a className="button button--secondary" href="/#faq">
                Условия покупки
              </a>
            </div>

            <p className="product-page__text">{product.detailText}</p>
            <ul className="product-page__list">
              {product.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>

            <div className="product-page__price-box">
              <strong>{new Intl.NumberFormat("ru-RU").format(product.price)} руб.</strong>
              <span>{product.format} · от 3 колод скидка 20%</span>
            </div>

            <AddToCartButton label="Заказать" productId={product.id} />
          </div>
        </section>
      </div>
    </main>
  );
}
