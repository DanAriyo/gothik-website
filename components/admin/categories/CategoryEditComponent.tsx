"use client";

import { updateCategoryAction } from "@/lib/actions/categoryActions";
import Link from "next/link";

export default function CategoryEditComponent({
  category,
}: {
  category: { id: string; name: string };
}) {
  // Prepariamo l'azione legandola all'ID della categoria
  const updateWithId = updateCategoryAction.bind(null, category.id);

  return (
    <div className="max-w-2xl mx-auto p-8 text-zinc-300">
      {/* HEADER CENTRATO CON GLOW */}
      <div className="text-center mb-12 w-full">
        <h1 className="text-3xl font-black uppercase tracking-[0.2em] text-white text-center inline-block">
          Rimodella{" "}
          <span className="text-purple-500 shadow-purple-500/20 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            Settore
          </span>
        </h1>
        <p className="text-zinc-600 font-mono text-xs mt-3">
          Stai modificando l'essenza originale di:{" "}
          <span className="text-purple-400 italic">"{category.name}"</span>
        </p>
      </div>

      {/* FORM TOTAL BLACK GEOMETRICO */}
      <form
        action={updateWithId}
        className="bg-zinc-950 p-8 rounded-xl border border-zinc-900 shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-6"
      >
        {/* NOME CATEGORIA */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 block">
            Nuovo Nome Categoria *
          </label>
          <input
            name="name"
            type="text"
            required
            defaultValue={category.name}
            placeholder="Es. CALZATURE OSCURE, ACCESSORI RITUALISTICI..."
            className="w-full bg-black border border-zinc-800 focus:border-purple-600 p-3 rounded text-sm text-white outline-none transition-all duration-300 placeholder:text-zinc-800"
          />
        </div>

        {/* PULSANTI DI AZIONE MINIMALI COMPATTI */}
        <div className="pt-4 border-t border-zinc-900 flex gap-3">
          <Link
            href="/admin/dashboard"
            className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-center font-black py-4 rounded-lg transition-all duration-300 uppercase text-xs tracking-[0.2em] border border-zinc-800 flex items-center justify-center"
          >
            Annulla
          </Link>

          <button
            type="submit"
            className="flex-[2] bg-purple-600 hover:bg-purple-700 text-white font-black py-4 rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_35px_rgba(168,85,247,0.4)] transition-all duration-300 uppercase text-xs tracking-[0.2em] border border-purple-500/30 active:scale-[0.98]"
          >
            Salva Mutazione
          </button>
        </div>
      </form>
    </div>
  );
}
