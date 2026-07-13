// app/admin/products/add-product/page.tsx
import { prisma } from "@/lib/prisma";
import AddProductForm from "../../../../components/admin/forms/AddProductForm";
import { auth } from "@/auth";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";

export default async function AddProductPage() {

  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect(routes.home);
  }
  
  // Recuperiamo le categorie dal DB per il menu a tendina
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-white">
          <span className="text-purple-600">Nuovo Prodotto</span>
        </h1>
      </div>

      {/* Passiamo le categorie al form Client */}
      <AddProductForm categories={categories} />
    </div>
  );
}
