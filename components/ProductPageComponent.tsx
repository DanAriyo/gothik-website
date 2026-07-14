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
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-16 text-zinc-100 mt-10">
      {/* SEZIONE IMMAGINI (Galleria) */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900 border border-purple-900/20 shadow-[0_0_50px_rgba(168,85,247,0.05)]">
        <CloudinaryImage
          src={product.images[currentImgIndex] || "no-image_qo394q"}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {product.images.length > 1 && (
          <div className="absolute inset-0 flex justify-between items-center px-4">
            <button
              onClick={() =>
                setCurrentImgIndex(
                  (prev) =>
                    (prev - 1 + product.images.length) % product.images.length,
                )
              }
              className="bg-black/60 backdrop-blur-md p-3 rounded-full hover:bg-purple-600 text-white transition-colors focus:ring-2 focus:ring-purple-500 outline-none"
              aria-label="Immagine precedente"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={() =>
                setCurrentImgIndex((prev) => (prev + 1) % product.images.length)
              }
              className="bg-black/60 backdrop-blur-md p-3 rounded-full hover:bg-purple-600 text-white transition-colors focus:ring-2 focus:ring-purple-500 outline-none"
              aria-label="Immagine successiva"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        )}
      </div>

      {/* SEZIONE INFO */}
      <div className="flex flex-col justify-between items-start gap-8">
        <div className="w-full space-y-6">
          <h1 className="text-black font-bold text-3xl uppercase tracking-widest hover:text-purple-400 transition-colors">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-4">
            <span className="text-purple-400 font-black text-2xl tracking-widest">
              {finalPrice.toFixed(2)} €
            </span>
            {hasDiscount && (
              <span className="text-zinc-500 line-through text-sm tracking-widest">
                {product.price.toFixed(2)} €
              </span>
            )}
          </div>

          <div className="max-w-md border-t border-purple-900/20 pt-6">
            <p className="text-zinc-400 font-light text-sm leading-relaxed tracking-wide">
              {product.description ||
                "Nessuna descrizione disponibile per questo manufatto."}
            </p>
          </div>
        </div>

        {/* SELEZIONE TAGLIA E AZIONE DI ACQUISTO */}
        <div className="w-full space-y-8">
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em]">
              Seleziona Taglia
            </label>
            <div className="relative">
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full bg-zinc-950 border border-purple-900/30 rounded-lg py-3 px-4 text-sm text-zinc-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none appearance-none cursor-pointer transition-all"
              >
                {product.sizes.map((s) => (
                  <option key={s} value={s} className="bg-zinc-950 text-zinc-200">
                    {s}
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