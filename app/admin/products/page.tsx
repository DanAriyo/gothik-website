import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ProductsTableComponent from "../../../components/admin/products/ProductsTableComponent";
import { auth } from "@/auth";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";

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
    <div className="p-8 bg-black min-h-screen text-zinc-300">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
            Gestione <span className="text-purple-500">Catalogo</span>
          </h1>
        </div>
        <Link
          href={routes.admin.products.add}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
        >
          + NUOVO PRODOTTO
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-md">
        {/* Passiamo i prodotti estratti dal server alla tabella client */}
        <ProductsTableComponent products={products} />
      </div>
    </div>
  );
}
