"use client";

import { createCategoryAction } from "@/lib/actions/categoryActions";
import Link from "next/link";

export default function AddCategoryPage() {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white uppercase tracking-widest">
          Evoca Nuova <span className="text-purple-500">Categoria</span>
        </h1>
        <p className="text-zinc-500 text-sm mt-2">
          Definisci un nuovo settore per il tuo arsenale oscuro.
        </p>
      </div>

      <form
        action={createCategoryAction}
        className="bg-zinc-900/50 p-8 rounded-2xl border border-purple-900/20 shadow-xl"
      >
        <div className="space-y-6">
          <div>
            <label className="text-xs uppercase font-bold text-zinc-500 mb-2 block">
              Nome Categoria *
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="es. Calzature Oscure, Accessori Ritualistici..."
              className="w-full bg-black border border-zinc-800 p-3 rounded-xl focus:border-purple-500 outline-none text-white transition-all"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Link
              href="/admin/products/add-product"
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white text-center font-bold py-4 rounded-xl transition-all border border-zinc-700"
            >
              ANNULLA
            </Link>

            <button
              type="submit"
              className="flex-[2] bg-purple-600 hover:bg-purple-700 text-white font-black py-4 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all border border-purple-500/50"
            >
              CREA CATEGORIA
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
