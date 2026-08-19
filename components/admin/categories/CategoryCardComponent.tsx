"use client";

import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan, faBoxArchive } from "@fortawesome/free-solid-svg-icons";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    _count: { products: number };
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(routes.admin.categories.edit(category.id));
  };

  const handleDelete = () => {
    console.log("Elimina:", category.id);
  };

  return (
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
            <FontAwesomeIcon icon={faBoxArchive} className="text-zinc-400 text-[10px]" />
            {category._count.products} {category._count.products === 1 ? "ARTICOLO" : "ARTICOLI"}
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
          onClick={handleDelete}
          className="p-2.5 bg-zinc-50 hover:bg-red-50 text-zinc-400 hover:text-red-600 rounded-xl transition-colors duration-200 border border-zinc-200 hover:border-red-200 cursor-pointer"
          aria-label={`Elimina categoria ${category.name}`}
        >
          <FontAwesomeIcon icon={faTrashCan} className="text-xs" />
        </button>
      </div>
    </div>
  );
}