"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import CloudinaryImage from "./CloudinaryImage";

interface Product {
  id: number;
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
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-16 text-white mt-10">
      {/* SEZIONE IMMAGINI (Galleria) */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900 border border-purple-900/20 shadow-2xl">
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
              className="bg-black/40 backdrop-blur-md p-3 rounded-full hover:bg-purple-600 transition-colors"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={() =>
                setCurrentImgIndex((prev) => (prev + 1) % product.images.length)
              }
              className="bg-black/40 backdrop-blur-md p-3 rounded-full hover:bg-purple-600 transition-colors"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        )}
      </div>

      {/* SEZIONE INFO */}
      <div className="flex flex-col justify-start items-start gap-10">
        {/* BLOCCO TESTATA (Stile ProductCard) */}
        <div className="flex flex-col gap-2">
          <h1 className="text-black font-medium text-2xl uppercase tracking-widest line-clamp-1 hover:text-purple-400 transition-colors">
            {product.name}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-black font-medium text-xs uppercase tracking-[0.3em]">
              {finalPrice.toFixed(2)} €
            </span>
            {hasDiscount && (
              <span className="text-black line-through text-2xl uppercase tracking-widest">
                {product.price.toFixed(2)} €
              </span>
            )}
          </div>
        </div>

        {/* DESCRIZIONE */}
        <div className="max-w-md">
          <p className="text-black font-medium text-2xl uppercase tracking-widest line-clamp-1 hover:text-purple-400 transition-colors">
            {product.description ||
              "nessuna descrizione disponibile per questo artefatto."}
          </p>
        </div>

        {/* SELEZIONE TAGLIA E AZIONE */}
        <div className="w-full flex flex-col gap-8 mt-4">
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em]">
              Seleziona Taglia
            </label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="bg-transparent border-b border-zinc-800 py-3 text-sm text-black focus:border-purple-500 outline-none appearance-none cursor-pointer transition-colors"
            >
              {product.sizes.map((s) => (
                <option key={s} value={s} className="bg-white text-black">
                  {s}
                </option>
              ))}
            </select>
          </div>

          <button className="w-full bg-white text-black py-5 rounded-lg font-black uppercase text-xs tracking-[0.2em] hover:bg-purple-600 hover:text-white transition-all active:scale-95 shadow-xl">
            <FontAwesomeIcon icon={faCartPlus} className="mr-3" />
            Aggiungi al Carrello
          </button>
        </div>
      </div>
    </div>
  );
}
