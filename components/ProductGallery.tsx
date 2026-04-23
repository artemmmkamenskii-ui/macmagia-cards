"use client";

import Image from "next/image";
import { useMemo, useRef, useState, type MouseEvent, type TouchEvent } from "react";

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
  const touchStartX = useRef<number | null>(null);

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

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    const targetElement = event.target as HTMLElement;
    if (targetElement.closest(".product-page__controls")) {
      touchStartX.current = null;
      return;
    }

    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) {
      return;
    }

    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const deltaX = endX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) < 35) {
      return;
    }

    if (deltaX > 0) {
      showPrevious();
    } else {
      showNext();
    }
  }

  function handlePreviousClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    showPrevious();
  }

  function handleNextClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    showNext();
  }

  function handlePreviousTouchEnd(event: TouchEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    showPrevious();
  }

  function handleNextTouchEnd(event: TouchEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    showNext();
  }

  return (
    <div
      className="product-page__main-photo product-page__main-photo--image"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Image
        key={images[activeIndex]}
        src={images[activeIndex]}
        alt={`Фото колоды ${title}`}
        fill
        unoptimized
        className="product-page__photo"
        sizes="(max-width: 980px) 100vw, 42vw"
      />

      {images.length > 1 ? (
        <div className="product-page__controls">
          <button
            aria-label="Предыдущее фото"
            type="button"
            onClick={handlePreviousClick}
            onTouchStart={(event) => event.stopPropagation()}
            onTouchEnd={handlePreviousTouchEnd}
          >
            ←
          </button>
          <button
            aria-label="Следующее фото"
            type="button"
            onClick={handleNextClick}
            onTouchStart={(event) => event.stopPropagation()}
            onTouchEnd={handleNextTouchEnd}
          >
            →
          </button>
        </div>
      ) : null}
    </div>
  );
}
