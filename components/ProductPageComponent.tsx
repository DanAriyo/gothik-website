"use client";

import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";

// Definiamo il tipo in base al tuo modello Prisma
interface Product {
  id: number;
  name: string;
  price: number;
  description: string | null;
  sizes: string[];
  images: string[];
  // discount non è nel DB? Lo aggiungiamo come opzionale
  discount?: number;
}

export default function ProductPageComponent({
  product,
}: {
  product: Product;
}) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");

  // Gestione sconto (se non presente nel DB usiamo 0)
  const discount = product.discount || 0;
  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount
    ? product.price - (product.price * discount) / 100
    : product.price;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
      {/* SEZIONE IMMAGINI (Galleria) */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-900 border border-purple-900/20">
        <Image
          src={product.images[currentImgIndex] || "/gothik-logo.svg"}
          alt={product.name}
          fill
          className="object-cover"
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
              className="bg-black/50 p-2 rounded-full hover:bg-purple-600"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={() =>
                setCurrentImgIndex((prev) => (prev + 1) % product.images.length)
              }
              className="bg-black/50 p-2 rounded-full hover:bg-purple-600"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        )}
      </div>

      {/* SEZIONE INFO */}
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-black uppercase tracking-tighter">
          {product.name}
        </h1>

        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold text-purple-400">
            {finalPrice.toFixed(2)} €
          </span>
          {hasDiscount && (
            <span className="text-zinc-500 line-through">
              {product.price.toFixed(2)} €
            </span>
          )}
        </div>

        <p className="text-zinc-400 italic">{product.description}</p>

        {/* MENU A TENDINA */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
            Taglia
          </label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg text-white focus:border-purple-500 outline-none"
          >
            {product.sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <button className="bg-white text-black py-4 rounded-xl font-black uppercase hover:bg-purple-600 hover:text-white transition-all active:scale-95 shadow-lg shadow-purple-900/20">
          <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
          Aggiungi al Carrello
        </button>
      </div>
    </div>
  );
}
