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
  const priceRaw = formData.get("price") as string;
  const price = parseFloat(priceRaw.replace(',', '.'));
  const discount = parseFloat(formData.get("discount") as string);
  const description = formData.get("description") as string;
  
  // 1. Recuperiamo le categorie (ipotizzando che il form invii un JSON stringificato di ID o più valori)
  const rawCategoryIds = formData.get("categoryIds") as string;
  const rawSizes = formData.get("sizes") as string;
  const rawImages = formData.get("images") as string;

  let categoryIds: string[] = [];
  let sizes: string[] = [];
  let images: string[] = [];

  try {
    categoryIds = rawCategoryIds ? JSON.parse(rawCategoryIds) : [];
    sizes = rawSizes ? JSON.parse(rawSizes) : [];
    images = rawImages ? JSON.parse(rawImages) : [];
  } catch (error) {
    console.error("Errore nel parsing dei dati array:", error);
  }

  try {
    // 2. Creazione del prodotto collegandolo alle categorie tramite la tabella ponte
    await prisma.product.create({
      data: {
        name,
        price,
        discount,
        description,
        sizes,
        images,
        categories: {
          create: categoryIds.map((catId) => ({
            category: { connect: { id: catId } },
          })),
        },
      },
    });
  } catch (error) {
    console.error("Errore database:", error);
    throw new Error("Errore durante il salvataggio del prodotto.");
  }

  redirect("/admin/products");
}

export async function updateProductAction(id: string, formData: FormData) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Accesso negato: non hai i permessi per modificare prodotti.");
  }
  
  const name = formData.get("name") as string;
  const rawPrice = formData.get("price") as string;
  const discount = parseInt(formData.get("discount") as string);
  const description = formData.get("description") as string;
  
  const rawCategoryIds = formData.get("categoryIds") as string;
  const imagesRaw = formData.get("images") as string;

  const cleanPrice = parseFloat(rawPrice.replace(",", "."));
  if (isNaN(cleanPrice)) throw new Error("Prezzo non valido");

  let categoryIds: string[] = [];
  let imagesArray: string[] = [];
  
  try {
    categoryIds = rawCategoryIds ? JSON.parse(rawCategoryIds) : [];
    imagesArray = imagesRaw ? JSON.parse(imagesRaw) : [];
  } catch {
    categoryIds = [];
    imagesArray = [];
  }

  // Per aggiornare una relazione Many-to-Many in modo pulito:
  // 1. Cancelliamo le vecchie associazioni nella tabella ponte
  // 2. Creiamo le nuove associazioni
  await prisma.product.update({
    where: { id },
    data: {
      name,
      price: cleanPrice,
      discount,
      description,
      images: imagesArray,
      categories: {
        deleteMany: {}, // Rimuove i vecchi collegamenti
        create: categoryIds.map((catId) => ({
          category: { connect: { id: catId } },
        })), // Inserisce i nuovi collegamenti
      },
    },
  });

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProductAction(productId: string) {
  try {
    // 🛡️ Sicurezza: Verifica che l'utente sia autenticato e sia ADMIN
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      return { success: false, error: "Non autorizzato." };
    }

    const orderItemsCount = await prisma.orderItem.count({
      where: { productId },
    });

    if (orderItemsCount > 0) {
      await prisma.product.update({
        where: { id: productId },
        data: { isArchived: true }
      });
    } else {
      await prisma.cartItem.deleteMany({
        where: { productId },
      });

      // Nota: Le righe nella tabella ponte (ProductCategory) verranno eliminate
      // automaticamente se hai impostato onDelete: Cascade nel tuo schema Prisma.
      await prisma.product.delete({
        where: { id: productId },
      });
    }

    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    console.error("Errore eliminazione prodotto:", error);
    return { success: false, error: "Errore durante l'eliminazione del prodotto." };
  }
}