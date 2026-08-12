import { prisma } from "@/lib/db";
import ProductCardComponent from "@/components/ProductCardComponent";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faFilter } from "@fortawesome/free-solid-svg-icons";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  // 1. Estraiamo il parametro category dall'URL
  const { category: selectedCategoryId } = await searchParams;

  // 2. Query con filtro opzionale e recupero del nome della categoria selezionata
  const [products, selectedCategory] = await Promise.all([
    prisma.product.findMany({
      where: selectedCategoryId ? { categoryId: selectedCategoryId } : {},
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
      {/* 🏷️ BADGE DEL FILTRO SELEZIONATO */}
      {selectedCategory && (
        <div className="mb-6 p-4 bg-zinc-900 text-white rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faFilter} className="text-purple-400" />
            <span className="text-sm font-bold uppercase tracking-wider">
              Categoria: {selectedCategory.name}
            </span>
          </div>
          <Link
            href="/home"
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white bg-zinc-800 px-3 py-1.5 rounded transition-colors"
          >
            <span>Rimuovi Filtro</span>
            <FontAwesomeIcon icon={faXmark} />
          </Link>
        </div>
      )}

      {/* GRIGLIA PRODOTTI (Struttura invariata) */}
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
          <p>Nessun prodotto trovato. Usa Prisma Studio!</p>
        )}
      </div>
    </div>
  );
}
