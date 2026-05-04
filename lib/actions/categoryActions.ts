"use server";

import { prisma } from "@/lib/prisma"; // Assicurati che il percorso sia corretto
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCategoryAction(formData: FormData) {
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
  redirect("/api/admin/products/add-product");
}