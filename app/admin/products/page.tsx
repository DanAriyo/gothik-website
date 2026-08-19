import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ProductsTableComponent from "../../../components/admin/products/ProductsTableComponent";
import { auth } from "@/auth";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBoxOpen } from "@fortawesome/free-solid-svg-icons";

export default async function AdminProductsPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect(routes.home);
  }

  // Query eseguita sul server
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-zinc-100/70 text-zinc-900 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FontAwesomeIcon icon={faBoxOpen} className="text-red-600 text-xs" />
              <p className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-red-600">
                Inventario Store
              </p>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 uppercase">
              Gestione <span className="text-red-600">Prodotti</span>
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Visualizza, modifica e gestisci tutti i capi e gli articoli presenti a catalogo.
            </p>
          </div>

          <Link
            href={routes.admin.products.add}
            className="inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-red-600 text-white font-mono font-bold py-3.5 px-6 rounded-xl transition-colors duration-200 uppercase text-xs tracking-wider shadow-sm"
          >
            <FontAwesomeIcon icon={faPlus} className="text-xs" />
            <span>Nuovo Prodotto</span>
          </Link>
        </div>

        {/* TABELLA PRODOTTI */}
        <div>
          <ProductsTableComponent products={products} />
        </div>

      </div>
    </div>
  );
}