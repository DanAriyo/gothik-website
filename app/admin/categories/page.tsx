import { prisma } from "@/lib/prisma";
import { routes } from "@/lib/routes";
import Link from "next/link";
import CategoryCard from "../../../components/admin/categories/CategoryCardComponent";



export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { products: true } },
    },
  });

  return (
    <div className="p-8 bg-black min-h-screen text-zinc-300">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-widest">
            Settori <span className="text-purple-500">Oscuri</span>
          </h1>
        </div>
        <Link
          href={routes.admin.categories.add}
          className="bg-zinc-900 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-xl transition-all border border-purple-900/30"
        >
          + NUOVA CATEGORIA
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category: { id: string; name: string; _count: { products: number; }; }) => (
          // Passiamo i dati al componente client
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
