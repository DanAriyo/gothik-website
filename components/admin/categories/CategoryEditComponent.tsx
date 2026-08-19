"use client";

import { updateCategoryAction } from "@/lib/actions/categoryActions";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function CategoryEditComponent({
  category,
}: {
  category: { id: string; name: string };
}) {
  // Prepariamo l'azione legandola all'ID della categoria
  const updateWithId = updateCategoryAction.bind(null, category.id);

  return (
    <div className="max-w-xl mx-auto py-8 px-4 text-zinc-900">
      {/* HEADER PULITO */}
      <div className="mb-8 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
          <FontAwesomeIcon icon={faPenToSquare} className="text-red-600 text-xs" />
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
            Modifica Categoria
          </p>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950">
          Modifica <span className="text-red-600">{category.name}</span>
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Aggiorna il nome della categoria all'interno del catalogo.
        </p>
      </div>

      {/* FORM COMPATTO */}
      <form
        action={updateWithId}
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
            defaultValue={category.name}
            placeholder="Es. Felpe, T-Shirt, Accessori"
            className="w-full bg-zinc-50 border border-zinc-300 focus:border-red-600 focus:bg-white focus:ring-1 focus:ring-red-600 p-3.5 rounded-xl text-sm text-zinc-900 outline-none transition-all duration-200 placeholder:text-zinc-400 font-medium"
          />
        </div>

        {/* PULSANTI DI AZIONE */}
        <div className="pt-4 border-t border-zinc-100 flex flex-col-reverse sm:flex-row gap-3">
          <Link
            href="/admin/categories"
            className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-900 text-center font-mono font-bold py-3.5 px-4 rounded-xl transition-colors duration-200 uppercase text-xs tracking-wider flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
            <span>Annulla</span>
          </Link>

          <button
            type="submit"
            className="flex-[2] bg-zinc-900 hover:bg-red-600 text-white font-mono font-bold py-3.5 px-4 rounded-xl transition-all duration-200 uppercase text-xs tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <FontAwesomeIcon icon={faCheck} className="text-xs" />
            <span>Salva Modifiche</span>
          </button>
        </div>
      </form>
    </div>
  );
}