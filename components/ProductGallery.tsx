"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type ProductGalleryProps = {
  title: string;
  coverImageSrc?: string;
  gallery: string[];
};

export default function ProductGallery({ title, coverImageSrc, gallery }: ProductGalleryProps) {
  const images = useMemo(() => {
    const merged = [coverImageSrc, ...gallery].filter(Boolean) as string[];
    return Array.from(new Set(merged));
  }, [coverImageSrc, gallery]);
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="product-page__main-photo">
        <strong>Главное фото колоды</strong>
      </div>
    );
  }

  function showPrevious() {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  }

  function showNext() {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  }

  return (
    <>
      <div className="product-page__main-photo product-page__main-photo--image">
        <Image
          src={images[activeIndex]}
          alt={`Фото колоды ${title}`}
          fill
          className="product-page__photo"
          sizes="(max-width: 980px) 100vw, 42vw"
        />

        {images.length > 1 ? (
          <div className="product-page__controls">
            <button aria-label="Предыдущее фото" type="button" onClick={showPrevious}>
              ←
            </button>
            <button aria-label="Следующее фото" type="button" onClick={showNext}>
              →
            </button>
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="product-page__thumbs">
          {images.map((imageSrc, index) => (
            <button
              key={imageSrc}
              type="button"
              className={`product-page__thumb product-page__thumb--image${
                index === activeIndex ? " product-page__thumb--active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Показать фото ${index + 1}`}
            >
              <Image
                src={imageSrc}
                alt={`Миниатюра колоды ${title}`}
                fill
                className="product-page__photo"
                sizes="(max-width: 980px) 50vw, 10vw"
              />
            </button>
          ))}
        </div>
      ) : null}
    </>
  );
}
