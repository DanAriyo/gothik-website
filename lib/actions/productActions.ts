"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createProductAction(formData: FormData) {
  const name = formData.get("name") as string;
  const categoryId = formData.get("categoryId") as string;
  const price = parseFloat(formData.get("price") as string);
  const discount = parseFloat(formData.get("discount") as string);
  
  // Decodifichiamo gli array inviati come stringhe JSON
  const sizes = JSON.parse(formData.get("sizes") as string);
  const images = JSON.parse(formData.get("images") as string);

  await prisma.product.create({
    data: {
      name,
      price,
      discount,
      categoryId,
      sizes,
      images,
      description: "Aggiungi una descrizione qui se vuoi...",
    }
  });

  redirect("/admin/products");
}