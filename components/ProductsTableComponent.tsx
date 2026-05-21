"use client";

import Link from "next/link";
import { CldImage } from "next-cloudinary";

// Definiamo l'interfaccia per i dati che riceviamo dal server
interface ProductWithCategory {
  id: string;
  name: string;
  price: any;
  discount: number;
  images: any;
  category: {
    name: string;
  };
}

export default function ProductsTableComponent({
  products,
}: {
  products: ProductWithCategory[];
}) {
  return (
    <div className="w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-zinc-900 text-zinc-500 text-xs uppercase tracking-widest border-b border-zinc-800">
            <th className="p-4">Prodotto</th>
            <th className="p-4">Categoria</th>
            <th className="p-4">Prezzo</th>
            <th className="p-4">Sconto</th>
            <th className="p-4 text-right">Azioni</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {products.map((product) => {
            // --- LOGICA DI ESTRAZIONE IMMAGINE ---
            let imageSrc: string = "";
            if (Array.isArray(product.images) && product.images.length > 0) {
              imageSrc = product.images[0];
            } else if (typeof product.images === "string") {
              try {
                const parsed = JSON.parse(product.images);
                if (Array.isArray(parsed) && parsed.length > 0)
                  imageSrc = parsed[0];
              } catch (e) {
                imageSrc = "";
              }
            }

            // --- LOGICA CALCOLO PREZZO SCONTATO ---
            const basePrice = Number(product.price);
            const discountValue = product.discount || 0;
            const hasDiscount = discountValue > 0;
            const finalPrice = hasDiscount
              ? basePrice - (basePrice * discountValue) / 100
              : basePrice;

            return (
              <tr
                key={product.id}
                className="hover:bg-purple-900/5 transition-colors group"
              >
                {/* PRODOTTO */}
                <td className="p-4">
                  <div className="flex flex-col items-start gap-2">
                    <div className="w-16 h-16 rounded border border-zinc-700 overflow-hidden bg-black shadow-lg">
                      {imageSrc ? (
                        <CldImage
                          width="64"
                          height="64"
                          src={imageSrc}
                          alt={product.name}
                          crop="fill"
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-600 italic">
                          N/A
                        </div>
                      )}
                    </div>
                    <span className="font-bold text-xs text-white group-hover:text-purple-400 transition-colors max-w-[150px] leading-tight">
                      {product.name}
                    </span>
                  </div>
                </td>

                {/* CATEGORIA */}
                <td className="p-4 text-sm align-middle">
                  <span className="px-2 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-xs font-mono">
                    {product.category.name}
                  </span>
                </td>

                {/* PREZZO DINAMICO CON DOPPIO LAYOUT */}
                <td className="p-4 align-middle">
                  <div className="flex flex-col justify-center items-start gap-0.5">
                    {hasDiscount ? (
                      <>
                        {/* Prezzo finale a catalogo (Evidenziato in rosso cupo/rose) */}
                        <span className="font-mono text-rose-500 font-bold text-sm tracking-tighter">
                          {finalPrice.toFixed(2)}€
                        </span>
                        {/* Prezzo originale (Cancellato e ridotto) */}
                        <span className="font-mono text-zinc-500 line-through text-[11px] tracking-tighter">
                          {basePrice.toFixed(2)}€
                        </span>
                      </>
                    ) : (
                      // Prezzo intero se non c'è sconto
                      <span className="font-mono text-white text-sm tracking-tighter">
                        {basePrice.toFixed(2)}€
                      </span>
                    )}
                  </div>
                </td>

                {/* SCONTO */}
                <td className="p-4 align-middle text-sm">
                  {hasDiscount ? (
                    <span className="text-rose-500 font-mono font-black text-xs bg-rose-950/20 border border-rose-900/30 px-1.5 py-0.5 rounded">
                      -{discountValue}%
                    </span>
                  ) : (
                    <span className="text-zinc-600 font-mono">-</span>
                  )}
                </td>

                {/* AZIONI (URL Bonificato senza /api) */}
                <td className="p-4 text-right align-middle">
                  <Link
                    href={`/api/admin/products/edit/${product.id}`}
                    className="inline-block bg-zinc-900 hover:bg-purple-600 hover:text-white text-zinc-400 text-[10px] font-black py-2 px-4 rounded transition-all border border-zinc-800 hover:border-purple-500 shadow-md"
                  >
                    MODIFICA
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {products.length === 0 && (
        <div className="p-20 text-center text-zinc-600 uppercase tracking-widest text-sm font-mono">
          L'abisso è vuoto. Non ci sono prodotti.
        </div>
      )}
    </div>
  );
}
