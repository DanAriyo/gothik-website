"use client";

import Link from "next/link";
import { CldImage } from "next-cloudinary";

// Definiamo l'interfaccia per i dati che riceviamo dal server
interface ProductWithCategory {
  id: string;
  name: string;
  price: any; // O number a seconda dello schema
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

            return (
              <tr
                key={product.id}
                className="hover:bg-purple-900/5 transition-colors group"
              >
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
                <td className="p-4 text-sm align-middle">
                  <span className="px-2 py-1 rounded-md bg-zinc-800 border border-zinc-700">
                    {product.category.name}
                  </span>
                </td>
                <td className="p-4 font-mono text-white align-middle">
                  {Number(product.price).toFixed(2)}€
                </td>
                <td className="p-4 align-middle">
                  {product.discount > 0 ? (
                    <span className="text-red-500 font-bold">
                      -{product.discount}%
                    </span>
                  ) : (
                    <span className="text-zinc-600">-</span>
                  )}
                </td>
                <td className="p-4 text-right align-middle">
                  <Link
                    href={`/api/admin/products/edit/${product.id}`}
                    className="inline-block bg-zinc-800 hover:bg-purple-600 hover:text-white text-zinc-400 text-[10px] font-black py-2 px-4 rounded transition-all border border-zinc-700"
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
        <div className="p-20 text-center text-zinc-600 uppercase tracking-widest text-sm">
          L'abisso è vuoto. Non ci sono prodotti.
        </div>
      )}
    </div>
  );
}
