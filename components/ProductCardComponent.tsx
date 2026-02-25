import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CloudinaryImage from "./CloudinaryImage";
import Image from "next/image";

// Definiamo un'interfaccia chiara per le Props
interface ProductCardProps {
  id: number | string;
  name: string;
  price: number;
  imageUrls: string[] | null;
  altName: string;
}

export default function ProductCardComponent({
  id,
  name,
  price,
  imageUrls,
  altName,
}: ProductCardProps) {
  return (
    <div className="group bg-zinc-900 border border-purple-900/30 rounded-xl p-4 hover:border-purple-500 transition-all duration-300 flex flex-col h-full hover:shadow-[0_0_15px_rgba(168,85,247,0.1)]">
      {/* Container Immagine con Aspect Ratio fisso */}
      <div className="relative w-full h-64 overflow-hidden rounded-lg bg-zinc-800">
        <CloudinaryImage
          src={
            imageUrls == null || imageUrls.length === 0
              ? "/gothik-logo.svg"
              : imageUrls[0]
          }
          alt={altName}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Info Prodotto */}
      <div className="mt-4 flex flex-col flex-grow">
        <h3 className="text-white font-bold text-lg line-clamp-1">{name}</h3>
        <p className="text-purple-400 font-bold mt-1 text-xl italic">
          {price.toFixed(2)} €
        </p>

        {/* Spingiamo i bottoni sempre in fondo per allinearli tra le varie card */}
        <div className="flex justify-between items-center mt-auto pt-4 gap-2">
          <Link
            href={`/product/${id}`}
            className="flex-grow text-center text-xs font-bold uppercase tracking-wider bg-zinc-800 hover:bg-purple-600 text-white px-4 py-2.5 rounded-lg transition-all active:scale-95"
          >
            Dettagli
          </Link>

          <button
            className="bg-purple-600 hover:bg-purple-500 text-white p-2.5 rounded-lg transition-all active:scale-95 shadow-lg shadow-purple-900/20"
            aria-label="Aggiungi al carrello"
          >
            <FontAwesomeIcon icon={faPlus} className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
