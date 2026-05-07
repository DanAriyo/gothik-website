"use client";

import { useState } from "react";
import { updateProductAction } from "@/lib/actions/productActions";
import Link from "next/link";

interface ProductEditProps {
  product: any;
  categories: any[];
}

export default function ProductEditComponent({
  product,
  categories,
}: ProductEditProps) {
  // Stati per il calcolo del prezzo in tempo reale
  // Convertiamo il punto in virgola per l'estetica dell'input
  const [rawPrice, setRawPrice] = useState(
    product.price.toString().replace(".", ","),
  );
  const [discount, setDiscount] = useState(product.discount || 0);

  const calculateFinalPrice = () => {
    const priceNum = parseFloat(rawPrice.replace(",", "."));
    if (isNaN(priceNum)) return "0,00";
    const final = priceNum - (priceNum * discount) / 100;
    return final.toLocaleString("it-IT", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const updateWithId = updateProductAction.bind(null, product.id);

  return (
    <div className="max-w-4xl mx-auto p-8 text-zinc-300">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-white uppercase tracking-widest">
          Rimodella <span className="text-purple-500">Articolo</span>
        </h1>
        <p className="text-zinc-500 text-sm mt-2 font-mono">ID: {product.id}</p>
      </div>

      <form action={updateWithId} className="space-y-8">
        <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 shadow-2xl space-y-6">
          {/* NOME E CATEGORIA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs uppercase font-bold text-zinc-500 mb-2 block">
                Nome Prodotto
              </label>
              <input
                name="name"
                defaultValue={product.name}
                className="w-full bg-black border border-zinc-800 p-3 rounded-xl text-white focus:border-purple-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="text-xs uppercase font-bold text-zinc-500 mb-2 block">
                Settore (Categoria)
              </label>
              <select
                name="categoryId"
                defaultValue={product.categoryId}
                className="w-full bg-black border border-zinc-800 p-3 rounded-xl text-white focus:border-purple-500 outline-none transition-all appearance-none"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* DESCRIZIONE */}
          <div>
            <label className="text-xs uppercase font-bold text-zinc-500 mb-2 block">
              Descrizione Oscura
            </label>
            <textarea
              name="description"
              defaultValue={product.description}
              rows={4}
              className="w-full bg-black border border-zinc-800 p-3 rounded-xl text-white focus:border-purple-500 outline-none transition-all"
            />
          </div>

          {/* PREZZO E SCONTO (LOGICA DINAMICA) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-black/40 rounded-xl border border-zinc-800/50">
            <div>
              <label className="text-xs uppercase font-bold text-zinc-500 mb-2 block">
                Prezzo Originale (€)
              </label>
              <input
                name="price"
                type="text"
                value={rawPrice}
                onChange={(e) => setRawPrice(e.target.value)}
                pattern="^\d+([,.]\d{2})?$"
                className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-lg text-white focus:border-purple-500 outline-none peer"
              />
              <p className="mt-1 hidden peer-invalid:block text-[9px] text-red-500 font-black">
                FORMATO: 00,00
              </p>
            </div>

            <div>
              <label className="text-xs uppercase font-bold text-zinc-500 mb-2 block">
                Applica Sconto
              </label>
              <div className="flex flex-wrap gap-2">
                {[0, 10, 20, 30, 50].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setDiscount(val)}
                    className={`flex-1 py-2 rounded-lg text-[10px] font-black border transition-all ${
                      discount === val
                        ? "bg-purple-600 border-purple-500 text-white"
                        : "bg-zinc-900 border-zinc-800 text-zinc-500"
                    }`}
                  >
                    {val === 0 ? "NO" : `${val}%`}
                  </button>
                ))}
              </div>
              <input type="hidden" name="discount" value={discount} />
            </div>

            {/* FEEDBACK PREZZO FINALE */}
            <div className="md:col-span-2 pt-4 border-t border-zinc-800 flex justify-between items-center">
              <span className="text-xs uppercase font-bold text-zinc-500">
                Risultato a catalogo:
              </span>
              <span className="text-2xl font-black text-purple-400 tracking-tighter">
                {calculateFinalPrice()}€
              </span>
            </div>
          </div>
        </div>

        {/* AZIONI */}
        <div className="flex gap-4">
          <Link
            href="/api/admin/products"
            className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white text-center font-bold py-4 rounded-xl border border-zinc-800 transition-all"
          >
            ANNULLA
          </Link>
          <button
            type="submit"
            className="flex-[2] bg-purple-600 hover:bg-purple-700 text-white font-black py-4 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all"
          >
            AGGIORNA ARSENALE
          </button>
        </div>
      </form>
    </div>
  );
}
