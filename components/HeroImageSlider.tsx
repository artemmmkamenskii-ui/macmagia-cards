"use client";

import Image from "next/image";
import { useMemo } from "react";

type HeroImageSliderProps = {
  images: string[];
};

export default function HeroImageSlider({ images }: HeroImageSliderProps) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);

  if (safeImages.length === 0) {
    return null;
  }

  return (
    <div className="hero-image-slider">
      <Image
        src={safeImages[0]}
        alt="Фото колоды"
        fill
        priority
        className="hero__image"
        sizes="(max-width: 980px) 100vw, 42vw"
      />
    </div>
  );
}
