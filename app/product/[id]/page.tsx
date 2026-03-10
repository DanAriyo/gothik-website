import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductPageComponent from "@/components/ProductPageComponent";

// Rendiamo la funzione correttamente async (lo era già, ma ora gestiamo la promise)
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Unwrapping della Promise (fondamentale!)
  const resolvedParams = await params;

  // 2. Ora possiamo accedere all'id in sicurezza
  const productId = resolvedParams.id;

  // Sicurezza: controllo se l'ID è un numero valido
  if (productId === undefined) {
    notFound();
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    notFound();
  }

  return <ProductPageComponent product={product} />;
}
