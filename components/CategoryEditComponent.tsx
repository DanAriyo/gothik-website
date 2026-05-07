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
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white uppercase tracking-widest">
          Rimodella <span className="text-purple-500">Settore</span>
        </h1>
        <p className="text-zinc-500 text-sm mt-2">
          Stai modificando l'essenza della categoria:{" "}
          <span className="text-zinc-300 italic">{category.name}</span>
        </p>
      </div>

      <form
        action={updateWithId}
        className="bg-zinc-900/50 p-8 rounded-2xl border border-purple-900/20 shadow-xl"
      >
        <div className="space-y-6">
          <div>
            <label className="text-xs uppercase font-bold text-zinc-500 mb-2 block">
              Nuovo Nome Categoria
            </label>
            <input
              name="name"
              type="text"
              defaultValue={category.name}
              required
              className="w-full bg-black border border-zinc-800 p-3 rounded-xl focus:border-purple-500 outline-none text-white transition-all shadow-inner"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Link
              href="/api/admin/categories"
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white text-center font-bold py-4 rounded-xl transition-all border border-zinc-700"
            >
              ABBANDONA
            </Link>

            <button
              type="submit"
              className="flex-[2] bg-purple-600 hover:bg-purple-700 text-white font-black py-4 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all border border-purple-500/50"
            >
              SALVA MUTAZIONE
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
