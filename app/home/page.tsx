import { prisma } from "@/lib/db";
import ProductCardComponent from "@/components/ProductCardComponent";
import { Key } from "react";

export default async function Home() {
  const products = await prisma.product.findMany();

  return (
    <div className="p-10 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {products.map((p: { id: string | number; name: string; discount: number | undefined; price: number; images: string[] | null; }) => (
          <div key={p.id} className="p-1 bg-white text-black">
            <ProductCardComponent
              id={p.id}
              name={p.name}
              discount={p.discount}
              price={p.price}
              imageUrls={p.images}
              altName={"Non disponibile"}
            />
          </div>
        ))}
        {products.length === 0 && (
          <p>Nessun prodotto trovato. Usa Prisma Studio!</p>
        )}
      </div>
    </div>
  );
}
