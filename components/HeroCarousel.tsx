"use client";

import Image from "next/image";
import { useState } from "react";

import type { HeroSlide } from "@/data/products";

type HeroCarouselProps = {
  slides: HeroSlide[];
};

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  function showPrevious() {
    setActiveIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
  }

  function showNext() {
    setActiveIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
  }

  return (
    <div className="hero-carousel">
      <div className="hero-carousel__stage">
        <div className="hero-carousel__image">
          {activeSlide.imageSrc ? (
            <Image
              src={activeSlide.imageSrc}
              alt={activeSlide.title}
              fill
              priority={activeIndex === 0}
              className="hero-carousel__image-photo"
              sizes="(max-width: 980px) 100vw, 36vw"
            />
          ) : (
            <>
              <span>{activeSlide.placeholderNote}</span>
              <strong>{activeSlide.title}</strong>
              <p>{activeSlide.caption}</p>
            </>
          )}
        </div>

        <div className="hero-carousel__controls">
          <button aria-label="Предыдущее фото" type="button" onClick={showPrevious}>
            ←
          </button>
          <button aria-label="Следующее фото" type="button" onClick={showNext}>
            →
          </button>
        </div>
      </div>

      <div className="hero-carousel__thumbs">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={`hero-carousel__thumb${index === activeIndex ? " hero-carousel__thumb--active" : ""}`}
            type="button"
            onClick={() => setActiveIndex(index)}
          >
            {slide.imageSrc ? (
              <Image
                src={slide.imageSrc}
                alt={slide.title}
                fill
                className="hero-carousel__thumb-photo"
                sizes="(max-width: 720px) 100vw, 12vw"
              />
            ) : (
              <span>{slide.placeholderNote}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
