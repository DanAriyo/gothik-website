"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma"; // Assicurati che il percorso sia corretto
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCategoryAction(formData: FormData) {

  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Non autorizzato");
  }
  const name = formData.get("name") as string;

  if (!name) {
    throw new Error("Il nome della categoria è obbligatorio");
  }

  await prisma.category.create({
    data: {
      name: name,
    },
  });

  // Puliamo la cache della pagina prodotti (dove probabilmente c'è il dropdown)
  revalidatePath("/admin/products/add-product");
  // Redirigiamo l'utente (opzionale)
  redirect("/admin/products/add-product");
}

export async function updateCategoryAction(id: string, formData: FormData) {

  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Non autorizzato");
  }
  
  const name = formData.get("name") as string;

  if (!name || name.trim() === "") {
    throw new Error("Il nome della categoria non può essere vuoto.");
  }

  await prisma.category.update({
    where: { id },
    data: { name },
  });

  // Puliamo la cache per vedere subito i cambiamenti
  revalidatePath("/admin/categories");
  // Riportiamo l'admin alla lista delle categorie
  redirect("/admin/categories");
}

export async function deleteCategoryAction(id: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Non autorizzato");
  }

  if (!id) {
    throw new Error("ID categoria non valido.");
  }

  // Verifichiamo se ci sono prodotti collegati a questa categoria per evitare errori di integrità
  const productsCount = await prisma.product.count({
    where: { categoryId: id },
  });

  if (productsCount > 0) {
    throw new Error("Impossibile eliminare la categoria: ci sono prodotti associati.");
  }

  await prisma.category.delete({
    where: { id },
  });

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}