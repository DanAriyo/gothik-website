import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CategoryEditComponent from "@/components/CategoryEditComponent";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Unwrapping dei parametri
  const { id } = await params;

  // 2. Recupero della categoria
  const category = await prisma.category.findUnique({
    where: { id: id },
  });

  // 3. Se non esiste, mostriamo 404
  if (!category) {
    notFound();
  }

  return <CategoryEditComponent category={category} />;
}
