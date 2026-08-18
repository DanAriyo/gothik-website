// components/ProductPageComponent.tsx
"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import CloudinaryImage from "./CloudinaryImage";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string | null;
  sizes: string[];
  images: string[];
  discount?: number;
}

export default function ProductPageComponent({
  product,
}: {
  product: Product;
}) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");

  const discount = product.discount || 0;
  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount
    ? product.price - (product.price * discount) / 100
    : product.price;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 text-zinc-100 mt-2 sm:mt-6">
      {/* SEZIONE IMMAGINI (Galleria) - 7 colonne su desktop per maggiore impatto visivo */}
      <div className="md:col-span-7 flex flex-col gap-4">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-900 border border-red-950/40 shadow-2xl">
          <CloudinaryImage
            src={product.images[currentImgIndex] || "no-image_qo394q"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
          {product.images.length > 1 && (
            <div className="absolute inset-0 flex justify-between items-center px-3 sm:px-4 pointer-events-none">
              <button
                type="button"
                onClick={() =>
                  setCurrentImgIndex(
                    (prev) =>
                      (prev - 1 + product.images.length) % product.images.length,
                  )
                }
                className="pointer-events-auto bg-black/70 backdrop-blur-md p-2.5 sm:p-3 rounded-full hover:bg-red-600 text-white transition-colors focus:ring-2 focus:ring-red-500 outline-none cursor-pointer"
                aria-label="Immagine precedente"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="text-sm sm:text-base" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrentImgIndex((prev) => (prev + 1) % product.images.length)
                }
                className="pointer-events-auto bg-black/70 backdrop-blur-md p-2.5 sm:p-3 rounded-full hover:bg-red-600 text-white transition-colors focus:ring-2 focus:ring-red-500 outline-none cursor-pointer"
                aria-label="Immagine successiva"
              >
                <FontAwesomeIcon icon={faChevronRight} className="text-sm sm:text-base" />
              </button>
            </div>
          )}
        </div>

        {/* Indicatori a pallino/badge sotto la foto per desktop/tablet */}
        {product.images.length > 1 && (
          <div className="flex justify-center items-center gap-2 pt-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentImgIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentImgIndex === index
                    ? "w-6 bg-red-500"
                    : "w-2 bg-zinc-700 hover:bg-zinc-500"
                }`}
                aria-label={`Vai alla foto ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* SEZIONE INFO - 5 colonne su desktop, fissa durante lo scroll (sticky) */}
      <div className="md:col-span-5 md:sticky md:top-24 h-fit flex flex-col justify-between gap-6 sm:gap-8 bg-zinc-950/60 p-6 sm:p-8 rounded-2xl border border-zinc-900">
        <div className="w-full space-y-4 sm:space-y-6">
          <h1 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight hover:text-red-500 transition-colors">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-3 sm:gap-4">
            <span className="text-red-500 font-black text-2xl sm:text-3xl tracking-tight">
              {finalPrice.toFixed(2)} €
            </span>
            {hasDiscount && (
              <span className="text-zinc-500 line-through text-sm sm:text-base font-mono">
                {product.price.toFixed(2)} €
              </span>
            )}
          </div>

          <div className="w-full border-t border-zinc-800 pt-5 sm:pt-6">
            <p className="text-zinc-400 font-normal text-xs sm:text-sm leading-relaxed tracking-wide">
              {product.description ||
                "Nessuna descrizione disponibile per questo capo."}
            </p>
          </div>
        </div>

        {/* SELEZIONE TAGLIA E AZIONE DI ACQUISTO */}
        <div className="w-full space-y-6 pt-2">
          <div className="flex flex-col gap-2.5">
            <label className="text-[10px] sm:text-xs font-mono font-bold text-red-500 uppercase tracking-[0.25em]">
              Seleziona Taglia
            </label>
            <div className="relative">
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-xs sm:text-sm text-zinc-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none appearance-none cursor-pointer transition-all font-mono"
              >
                {product.sizes.map((s) => (
                  <option key={s} value={s} className="bg-zinc-900 text-zinc-200">
                    Taglia: {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}