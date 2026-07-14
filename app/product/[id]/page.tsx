// app/product/[id]/page.tsx
import { prisma } from "@/lib/prisma"; 
import { notFound } from "next/navigation";
import ProductPageComponent from "@/components/ProductPageComponent"; 

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Unwrapping della Promise (fondamentale)
  const resolvedParams = await params; 
  const productId = resolvedParams.id; 

  if (!productId) {
    notFound();
  }

  // 2. Recupero del prodotto
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    notFound(); 
  }

  // 3. 🛡️ SANITIZZAZIONE E CONVERSIONE SICURA DEI TIPI
  // Evitiamo che campi nulli o indefiniti mandino in crash il client
  const safeProduct = {
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description ?? null, // Trasforma undefined in null
    sizes: product.sizes || [], // Se non ci sono taglie, passa un array vuoto
    images: product.images || [], // Se nullo, passa un array vuoto per evitare crash su .length
    discount: product.discount ?? 0, // Default a 0 se non c'è sconto
  };

  return <ProductPageComponent product={safeProduct} />;
}