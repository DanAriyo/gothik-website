import { prisma } from "@/lib/db";
import ProductCardComponent from "@/components/ProductCardComponent";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  // 1. Estrazione dei parametri dall'URL
  const { category: selectedCategoryId, search: searchQuery } = await searchParams;

  // 2. Costruzione dinamica della clausola WHERE di Prisma
  const whereCondition: any = {};

  if (selectedCategoryId) {
    whereCondition.categoryId = selectedCategoryId;
  }

  if (searchQuery) {
    whereCondition.OR = [
      { name: { contains: searchQuery, mode: "insensitive" } },
      { description: { contains: searchQuery, mode: "insensitive" } },
    ];
  }

  // 3. Esecuzione query in parallelo
  const [products, selectedCategory] = await Promise.all([
    prisma.product.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" },
    }),
    selectedCategoryId
      ? prisma.category.findUnique({
          where: { id: selectedCategoryId },
          select: { name: true },
        })
      : null,
  ]);

  return (
    <div className="p-10 font-sans">
      {/* 🏷️ BADGE FILTRI ATTIVI (Categoria e/o Ricerca) */}
      {(selectedCategory || searchQuery) && (
        <div className="mb-6 p-4 bg-zinc-900 text-white rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            {selectedCategory && (
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faFilter} className="text-red-500" />
                <span className="text-sm font-bold uppercase tracking-wider">
                  Categoria: {selectedCategory.name}
                </span>
              </div>
            )}
            {selectedCategory && searchQuery && <span className="text-zinc-600">|</span>}
            {searchQuery && (
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-red-500" />
                <span className="text-sm font-bold uppercase tracking-wider">
                  Ricerca: "{searchQuery}"
                </span>
              </div>
            )}
          </div>

          <Link
            href="/home"
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white bg-zinc-800 px-3 py-1.5 rounded transition-colors"
          >
            <span>Rimuovi Filtri</span>
            <FontAwesomeIcon icon={faXmark} />
          </Link>
        </div>
      )}

      {/* GRIGLIA PRODOTTI (Invariata) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {products.map(
          (p: {
            id: string | number;
            name: string;
            discount: number | undefined;
            price: number;
            images: string[] | null;
          }) => (
            <div key={p.id} className="p-1 bg-white text-black">
              <ProductCardComponent
                id={p.id}
                name={p.name}
                discount={p.discount}
                price={p.price}
                imageUrls={p.images}
                altName={"Non disponibile"}
              />
            </div>
          ),
        )}
        {products.length === 0 && (
          <p className="text-zinc-500">Nessun prodotto trovato con questi filtri.</p>
        )}
      </div>
    </div>
  );
}