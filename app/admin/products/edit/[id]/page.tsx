import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import ProductEditComponent from "@/components/admin/products/ProductEditComponent";
import { auth } from "@/auth";
import { routes } from "@/lib/routes";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect(routes.home);
  }
  
  // 1. Unwrapping dei parametri
  const { id } = await params;

  // 2. Recupero parallelo di Prodotto e Categorie
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id: id },
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  // 3. Controllo esistenza
  if (!product) {
    notFound();
  }

  return <ProductEditComponent product={product} categories={categories} />;
}
