// src/components/admin/forms/AddCategoryForm.tsx
"use client";

import { createCategoryAction } from "@/lib/actions/categoryActions";
import { routes } from "@/lib/routes";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddCategoryForm() {
  return (
    <div className="max-w-xl mx-auto py-8 px-4 text-zinc-900">
      {/* HEADER PULITO */}
      <div className="mb-8 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
          <FontAwesomeIcon icon={faTag} className="text-red-600 text-xs" />
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
            Catalogo Prodotti
          </p>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950">
          Nuova Categoria
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Crea una nuova categoria per organizzare i capi all'interno dello store.
        </p>
      </div>

      {/* FORM COMPATTO */}
      <form
        action={createCategoryAction}
        className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm space-y-6"
      >
        {/* NOME CATEGORIA */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 block">
            Nome Categoria *
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="Es. Felpe, T-Shirt, Accessori"
            className="w-full bg-zinc-50 border border-zinc-300 focus:border-red-600 focus:bg-white focus:ring-1 focus:ring-red-600 p-3.5 rounded-xl text-sm text-zinc-900 outline-none transition-all duration-200 placeholder:text-zinc-400 font-medium"
          />
        </div>

        {/* PULSANTI DI AZIONE */}
        <div className="pt-4 border-t border-zinc-100 flex flex-col-reverse sm:flex-row gap-3">
          <Link
            href={routes.admin.dashboard}
            className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-900 text-center font-mono font-bold py-3.5 px-4 rounded-xl transition-colors duration-200 uppercase text-xs tracking-wider flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
            <span>Annulla</span>
          </Link>

          <button
            type="submit"
            className="flex-[2] bg-zinc-900 hover:bg-red-600 text-white font-mono font-bold py-3.5 px-4 rounded-xl transition-all duration-200 uppercase text-xs tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <FontAwesomeIcon icon={faPlus} className="text-xs" />
            <span>Crea Categoria</span>
          </button>
        </div>
      </form>
    </div>
  );
}