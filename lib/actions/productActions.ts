"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";


export async function createProductAction(formData: FormData) {

  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Accesso negato: non hai i permessi per creare prodotti.");
  }
  const name = formData.get("name") as string;
  const categoryId = formData.get("categoryId") as string;
  const priceRaw = formData.get("price") as string;
  const price = parseFloat(priceRaw.replace(',', '.'));
  const discount = parseFloat(formData.get("discount") as string);
  const description = formData.get("description") as string;
  
  // 1. Recuperiamo le stringhe grezze
  const rawSizes = formData.get("sizes") as string;
  const rawImages = formData.get("images") as string;

  // 2. Parsiamo con sicurezza (se il campo è vuoto, usiamo un array vuoto)
  let sizes: string[] = [];
  let images: string[] = [];

  try {
    sizes = rawSizes ? JSON.parse(rawSizes) : [];
    images = rawImages ? JSON.parse(rawImages) : [];
  } catch (error) {
    console.error("Errore nel parsing dei dati array:", error);
    // Qui potresti gestire l'errore o restituire un messaggio all'utente
  }

  try {
    // Spostiamo la creazione dentro un try per gestire errori DB
    await prisma.product.create({
      data: { name, price, discount, categoryId, sizes, images, description }
    });
  } catch (error) {
    console.error("Errore database:", error);
    throw new Error("Errore durante il salvataggio del prodotto.");
  }

  // Il redirect va FUORI dal try/catch
  redirect("/admin/products");
}

export async function updateProductAction(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const categoryId = formData.get("categoryId") as string;
  const rawPrice = formData.get("price") as string;
  const discount = parseInt(formData.get("discount") as string);
  const description = formData.get("description") as string;

  // Pulizia prezzo per il database (virgola -> punto)
  const cleanPrice = parseFloat(rawPrice.replace(",", "."));

  if (isNaN(cleanPrice)) throw new Error("Prezzo non valido");

  await prisma.product.update({
    where: { id },
    data: {
      name,
      categoryId,
      price: cleanPrice,
      discount,
      description,
    },
  });

  revalidatePath("/admin/products");

  redirect("/admin/products");
}