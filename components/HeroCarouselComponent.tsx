// components/HeroCarousel.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CloudinaryImage from "@/components/CloudinaryImage";

interface Section {
  id: string;
  alt: string;
  link: string;
}

export default function HeroCarousel({ sections }: { sections: Section[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sections.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [sections.length]);

  return (
    <>
      {/* Slideshow cliccabile */}
      <Link
        href={sections[currentIndex].link}
        className="group relative block w-full h-full cursor-pointer select-none"
      >
        {sections.map((section, index) => {
          const isActive = index === currentIndex;

          return (
            <div
              key={section.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <CloudinaryImage
                src={section.id}
                alt={section.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className={`object-cover object-center transition-transform duration-7000 ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
          );
        })}
      </Link>

      {/* Indicatori a barre */}
      <div className="absolute bottom-24 inset-x-0 z-30 flex justify-center items-center gap-2 pointer-events-none">
        {sections.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all duration-500 ${
              currentIndex === index
                ? "w-8 bg-red-500"
                : "w-2 bg-zinc-600/60 backdrop-blur-sm"
            }`}
          />
        ))}
      </div>
    </>
  );
}