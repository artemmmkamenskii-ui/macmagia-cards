import ProductCard from "@/components/ProductCard";
import { featuredProductId, products } from "@/data/products";

export default function CatalogSection() {
  return (
    <section className="section" id="catalog">
      <div className="section-heading">
        <p className="eyebrow">Ассортимент</p>
        <h2>Каталог с примерами реальных обложек</h2>
        <p>
          В каталоге представлены наши электронные колоды. Выбирайте ту, что откликается визуально:
          каждая работает по-своему глубоко, стиль изображения задает настроение всей практике.
        </p>
      </div>

      <div className="catalog-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            isFeatured={product.id === featuredProductId}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}
