import { prisma } from "@/lib/db";
import ProductCardComponent from "@/components/ProductCardComponent";

export default async function Home() {
  const products = await prisma.product.findMany();

  return (
    <div className="p-10 font-sans">
      <h1 className="text-4xl font-bold mb-8">Gothik Store 2026</h1>
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
              imageUrl={p.imageUrl}
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
