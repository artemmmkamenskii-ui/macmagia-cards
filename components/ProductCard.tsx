"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import AddToCartButton from "@/components/AddToCartButton";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
  isFeatured?: boolean;
};

export default function ProductCard({ product, isFeatured = false }: ProductCardProps) {
  const galleryImages = useMemo(() => {
    const merged = [product.coverImageSrc, ...product.gallery].filter(Boolean) as string[];
    return Array.from(new Set(merged));
  }, [product.coverImageSrc, product.gallery]);
  const [activeIndex, setActiveIndex] = useState(0);
  const formattedPrice = useMemo(
    () => new Intl.NumberFormat("ru-RU").format(product.price),
    [product.price]
  );

  function showPrevious() {
    setActiveIndex((current) => (current === 0 ? galleryImages.length - 1 : current - 1));
  }

  function showNext() {
    setActiveIndex((current) => (current === galleryImages.length - 1 ? 0 : current + 1));
  }

  return (
    <article className={`product-card${isFeatured ? " product-card--featured" : ""}`}>
      <div className="product-card__media">
        <Link className="product-card__media-link" href={`/products/${product.id}`}>
          {galleryImages.length > 0 ? (
            <div className="product-card__cover">
              {galleryImages.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={`Обложка колоды ${product.title}`}
                  fill
                  className={`product-card__cover-photo${i === activeIndex ? " product-card__cover-photo--active" : ""}`}
                  sizes="(max-width: 980px) 100vw, 30vw"
                />
              ))}
            </div>
          ) : (
            <div className="product-card__placeholder">
              <span>{product.placeholderNote}</span>
              <strong>Место под обложку колоды</strong>
            </div>
          )}
        </Link>

        {galleryImages.length > 1 ? (
          <div className="product-card__controls">
            <button
              aria-label="Предыдущее фото"
              type="button"
              onClick={showPrevious}
            >
              ←
            </button>
            <button
              aria-label="Следующее фото"
              type="button"
              onClick={showNext}
            >
              →
            </button>
          </div>
        ) : null}
      </div>

      <div className="product-card__top">
        <p className="product-card__format">{product.format}</p>
        <h3>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </h3>
        <p className="product-card__subtitle">{product.subtitle}</p>
      </div>

      <p className="product-card__description">{product.description}</p>

      <ul className="product-card__list">
        {product.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>

      <div className="product-card__price">
        <span>{formattedPrice} руб.</span>
        <small>При покупке от 3 колод корзина автоматически даст скидку 20%</small>
      </div>

      <div className="product-card__actions">
        <Link className="button button--ghost" href={`/products/${product.id}`}>
          Подробнее
        </Link>
        <AddToCartButton productId={product.id} />
      </div>
    </article>
  );
}
