"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CloudinaryImage from "./CloudinaryImage";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";

interface ProductCardProps {
  id: number | string;
  name: string;
  price: number;
  discount?: number; // <--- Aggiungiamo lo sconto opzionale
  imageUrls: string[] | null;
  altName: string;
}

export default function ProductCardComponent({
  id,
  name,
  price,
  discount = 0, // Fallback a 0 se non è scontato
  imageUrls,
  altName,
}: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Prodotto aggiunto:", id);
  };

  // Logica dinamica per calcolare il prezzo scontato
  const hasDiscount = discount !== null && discount > 0;
  console.log(
    `Calcolo prezzo: base ${price}€, sconto ${discount}%, ha sconto? ${hasDiscount}`,
  );
  const finalPrice = hasDiscount ? price - (price * discount) / 100 : price;

  return (
    <div className="flex flex-col h-full overflow-hidden transition-all duration-300 ">
      {/* AREA IMMAGINE (Resta identica, ottima struttura) */}
      <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
        <Link href={`/product/${id}`} className="block h-full w-full">
          <CloudinaryImage
            src={
              imageUrls && imageUrls.length > 0
                ? imageUrls[0]
                : "no-image_qo394q"
            }
            alt={altName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-110 "
          />
          {/* Overlay scuro isolato all'immagine */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-500" />
        </Link>

        {/* TASTO AGGIUNGI (Appare solo all'hover) */}
        <div className="absolute inset-x-0 bottom-4 px-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white font-bold py-3 rounded-lg shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <FontAwesomeIcon icon={faPlus} className="text-sm" />
            <span className="uppercase text-[10px] tracking-[0.2em]">
              Aggiungi
            </span>
          </button>
        </div>
      </div>

      {/* AREA INFO (Aggiornata con la logica del doppio prezzo) */}
      <div className="flex flex-col justify-start items-start py-4 px-2 text-left">
        <Link href={`/product/${id}`} className="w-full">
          <h3 className="text-black font-medium text-xs uppercase tracking-widest line-clamp-1 hover:text-purple-400 transition-colors">
            {name}
          </h3>
        </Link>

        {/* BLOCCO PREZZI BI-COLORE */}
        <div className="flex items-center gap-2 mt-1">
          {hasDiscount ? (
            <>
              {/* Prezzo Scontato in Rosso Oscuro/Rose */}
              <span className="text-rose-600 font-bold text-xs uppercase tracking-widest">
                {finalPrice.toFixed(2)} €
              </span>
              {/* Prezzo Vecchio Cancellato Grigio Smorzato */}
              <span className="text-zinc-400 line-through text-[11px] font-medium tracking-widest">
                {price.toFixed(2)} €
              </span>
            </>
          ) : (
            // Prezzo Standard (se non c'è sconto)
            <span className="text-black font-medium text-xs uppercase tracking-widest">
              {price.toFixed(2)} €
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
