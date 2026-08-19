import { prisma } from "@/lib/prisma";
import { routes } from "@/lib/routes";
import Link from "next/link";
import CategoryCard from "../../../components/admin/categories/CategoryCardComponent";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTags } from "@fortawesome/free-solid-svg-icons";

export default async function CategoriesPage() {
  // 1. 🛡️ Controllo di sicurezza lato server
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect(routes.home);
  }

  // 2. Query categorie con conteggio prodotti
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { products: true } },
    },
  });

  return (
    <div className="min-h-screen bg-zinc-100/70 text-zinc-900 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FontAwesomeIcon icon={faTags} className="text-red-600 text-xs" />
              <p className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-red-600">
                Organizzazione Store
              </p>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 uppercase">
              Gestione <span className="text-red-600">Categorie</span>
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Organizza, crea e gestisci le sezioni tematiche del catalogo.
            </p>
          </div>

          <Link
            href={routes.admin.categories.add}
            className="inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-red-600 text-white font-mono font-bold py-3.5 px-6 rounded-xl transition-colors duration-200 uppercase text-xs tracking-wider shadow-sm"
          >
            <FontAwesomeIcon icon={faPlus} className="text-xs" />
            <span>Nuova Categoria</span>
          </Link>
        </div>

        {/* GRIGLIA CATEGORIE */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category: { id: string; name: string; _count: { products: number; }; }) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-16 rounded-2xl border border-zinc-200 shadow-sm text-center text-zinc-400 flex flex-col items-center justify-center gap-3">
            <FontAwesomeIcon icon={faTags} className="text-3xl text-zinc-300" />
            <p className="uppercase tracking-wider text-xs font-mono">
              Nessuna categoria presente. Crea la prima per iniziare.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}