// src/components/admin/forms/AddCategoryForm.tsx
"use client";

import { createCategoryAction } from "@/lib/actions/categoryActions";
import { routes } from "@/lib/routes";
import Link from "next/link";

export default function AddCategoryForm() {
  return (
    <div className="max-w-2xl mx-auto p-8 text-zinc-300">
      {/* HEADER CENTRATO CON GLOW */}
      <div className="text-center mb-12 w-full">
        <h1 className="text-3xl font-black uppercase tracking-[0.2em] text-white block">
          Nuova Categoria
        </h1>
      </div>

      {/* FORM COMPATTO CENTRATO */}
      <form
        action={createCategoryAction}
        className="bg-zinc-950 p-8 rounded-xl border border-zinc-900 shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-6"
      >
        {/* NOME CATEGORIA */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 block">
            Nome Categoria *
          </label>
          <input
            name="name"
            type="text"
            required
            className="w-full bg-black border border-zinc-800 focus:border-purple-600 p-3 rounded text-sm text-white outline-none transition-all duration-300 placeholder:text-zinc-800"
          />
        </div>

        {/* PULSANTI DI AZIONE */}
        <div className="pt-4 border-t border-zinc-900 flex gap-3">
          <Link
            href={routes.admin.dashboard} 
            className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-center font-black py-4 rounded-lg transition-all duration-300 uppercase text-xs tracking-[0.2em] border border-zinc-800 flex items-center justify-center"
          >
            Annulla
          </Link>

          <button
            type="submit"
            className="flex-[2] bg-purple-600 hover:bg-purple-700 text-white font-black py-4 rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_35px_rgba(168,85,247,0.4)] transition-all duration-300 uppercase text-xs tracking-[0.2em] border border-purple-500/30 active:scale-[0.98]"
          >
            Crea Categoria
          </button>
        </div>
      </form>
    </div>
  );
}