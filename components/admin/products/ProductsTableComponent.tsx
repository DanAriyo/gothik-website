"use client";

import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faBoxOpen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

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
    <div className="w-full bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden text-zinc-900">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 text-zinc-600 text-xs font-mono uppercase tracking-wider border-b border-zinc-200">
              <th className="p-4 pl-6">Prodotto</th>
              <th className="p-4">Categoria</th>
              <th className="p-4">Prezzo</th>
              <th className="p-4">Sconto</th>
              <th className="p-4 pr-6 text-right">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
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
                  className="hover:bg-zinc-50/80 transition-colors group"
                >
                  {/* PRODOTTO */}
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl border border-zinc-200 overflow-hidden bg-zinc-100 flex-shrink-0 shadow-inner">
                        {imageSrc ? (
                          <CldImage
                            width="56"
                            height="56"
                            src={imageSrc}
                            alt={product.name}
                            crop="fill"
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-400 font-mono italic">
                            N/A
                          </div>
                        )}
                      </div>
                      <span className="font-bold text-xs sm:text-sm text-zinc-900 group-hover:text-red-600 transition-colors leading-snug">
                        {product.name}
                      </span>
                    </div>
                  </td>

                  {/* CATEGORIA */}
                  <td className="p-4 text-sm align-middle">
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-mono font-medium text-zinc-700">
                      {product.category.name}
                    </span>
                  </td>

                  {/* PREZZO DINAMICO CON DOPPIO LAYOUT */}
                  <td className="p-4 align-middle">
                    <div className="flex flex-col justify-center items-start">
                      {hasDiscount ? (
                        <>
                          <span className="font-mono text-red-600 font-bold text-sm">
                            {finalPrice.toFixed(2)} €
                          </span>
                          <span className="font-mono text-zinc-400 line-through text-xs">
                            {basePrice.toFixed(2)} €
                          </span>
                        </>
                      ) : (
                        <span className="font-mono text-zinc-900 font-bold text-sm">
                          {basePrice.toFixed(2)} €
                        </span>
                      )}
                    </div>
                  </td>

                  {/* SCONTO */}
                  <td className="p-4 align-middle text-sm">
                    {hasDiscount ? (
                      <span className="text-red-600 font-mono font-bold text-xs bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                        -{discountValue}%
                      </span>
                    ) : (
                      <span className="text-zinc-400 font-mono">-</span>
                    )}
                  </td>

                  {/* AZIONI */}
                  <td className="p-4 pr-6 text-right align-middle">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        className="inline-flex items-center justify-center bg-zinc-900 hover:bg-red-600 text-white text-xs p-2.5 rounded-lg transition-colors shadow-sm"
                        aria-label="Modifica"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} className="text-xs" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          // Logica di eliminazione da implementare
                        }}
                        className="inline-flex items-center justify-center bg-zinc-100 hover:bg-red-600 text-zinc-700 hover:text-white text-xs p-2.5 rounded-lg transition-colors shadow-sm border border-zinc-200 cursor-pointer"
                        aria-label="Elimina"
                      >
                        <FontAwesomeIcon icon={faTrashCan} className="text-xs" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="p-16 text-center text-zinc-400 flex flex-col items-center justify-center gap-3">
          <FontAwesomeIcon icon={faBoxOpen} className="text-3xl text-zinc-300" />
          <p className="uppercase tracking-wider text-xs font-mono">
            Nessun prodotto presente in catalogo.
          </p>
        </div>
      )}
    </div>
  );
}