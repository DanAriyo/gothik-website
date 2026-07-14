import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import CategoryEditComponent from "@/components/admin/categories/CategoryEditComponent";
import { auth } from "@/auth";
import { routes } from "@/lib/routes";

export default async function EditCategoryPage({
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
