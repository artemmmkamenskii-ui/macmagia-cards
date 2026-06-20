import ProductCard from "@/components/ProductCard";
import { featuredProductId, products } from "@/data/products";

export default function CatalogSection() {
  return (
    <section className="section" id="catalog">
      <div className="section-heading">
        <p className="eyebrow">Ассортимент</p>
        <h2>Купить колоду МАК: каталог авторских электронных колод</h2>
        <p>
          В каталоге — авторские колоды метафорических ассоциативных карт по 190 руб. за колоду. При
          заказе от 3 колод сразу действует скидка 20%. Выбирайте ту, что откликается визуально:
          каждая работает по-своему глубоко.
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
