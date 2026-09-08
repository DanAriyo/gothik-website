"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faBoxArchive,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { deleteCategoryAction } from "@/lib/actions/categoryActions"; // Assicurati che il percorso sia corretto

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    _count: { products: number };
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    router.push(routes.admin.categories.edit(category.id));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    try {
      await deleteCategoryAction(category.id);
      setIsModalOpen(false);
      router.refresh();
    } catch (error: any) {
      alert(
        error.message || "Si è verificato un errore durante l'eliminazione.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="group relative bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm hover:border-zinc-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
        {/* INTESTAZIONE CARD & BADGE CONTEGGIO */}
        <div>
          <div className="flex justify-between items-start gap-3 mb-3">
            <h2
              id={category.id}
              className="text-lg font-bold text-zinc-900 group-hover:text-red-600 transition-colors leading-snug"
            >
              {category.name}
            </h2>
            <span className="inline-flex items-center gap-1.5 bg-zinc-100 text-zinc-700 text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg border border-zinc-200/80 flex-shrink-0">
              <FontAwesomeIcon
                icon={faBoxArchive}
                className="text-zinc-400 text-[10px]"
              />
              {category._count.products}{" "}
              {category._count.products === 1 ? "ARTICOLO" : "ARTICOLI"}
            </span>
          </div>
        </div>

        {/* PULSANTI DI AZIONE */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-zinc-100">
          <button
            type="button"
            onClick={handleEdit}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-zinc-900 hover:bg-red-600 text-white text-xs font-mono font-bold py-2.5 px-4 rounded-xl transition-colors duration-200 uppercase tracking-wider cursor-pointer shadow-sm"
          >
            <FontAwesomeIcon icon={faPenToSquare} className="text-[10px]" />
            <span>Modifica</span>
          </button>

          <button
            type="button"
            onClick={handleOpenModal}
            className="p-2.5 bg-zinc-50 hover:bg-red-50 text-zinc-400 hover:text-red-600 rounded-xl transition-colors duration-200 border border-zinc-200 hover:border-red-200 cursor-pointer"
            aria-label={`Elimina categoria ${category.name}`}
          >
            <FontAwesomeIcon icon={faTrashCan} className="text-xs" />
          </button>
        </div>
      </div>

      {/* MODALE DI CONFERMA ELIMINAZIONE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xl max-w-md w-full p-6 space-y-6 text-zinc-900 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-100 text-red-600 rounded-xl flex-shrink-0">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className="text-xl"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-lg tracking-tight text-zinc-900">
                  Conferma eliminazione
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Sei sicuro di voler rimuovere la categoria{" "}
                  <strong className="text-zinc-800">"{category.name}"</strong>?
                  L'operazione non potrà essere annullata.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleCloseModal}
                disabled={isLoading}
                className="px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-mono font-bold text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                Annulla
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isLoading}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-bold transition-colors shadow-sm cursor-pointer disabled:opacity-50"
              >
                {isLoading ? "Eliminazione..." : "Sì, rimuovi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
