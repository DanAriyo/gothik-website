import { prisma } from "@/lib/db";
import ProductCardComponent from "@/components/ProductCardComponent";

export default async function Home() {
  const products = await prisma.product.findMany();

  return (
    <div className="p-10 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="p-4 border rounded-xl shadow-lg bg-zinc-900 text-white"
          >
            <ProductCardComponent
              id={p.id}
              name={p.name}
              price={p.price}
              imageUrls={p.images}
              altName={"rotto"}
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
