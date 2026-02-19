import { prisma } from "@/lib/db";

export default async function Home() {
  const products = await prisma.product.findMany();

  return (
    <div className="p-10 font-sans">
      <h1 className="text-4xl font-bold mb-8">Gothik Store 2026</h1>
      <div className="grid gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="p-4 border rounded-xl shadow-lg bg-zinc-900 text-white"
          >
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-purple-400 font-bold">{p.price} €</p>
          </div>
        ))}
        {products.length === 0 && (
          <p>Nessun prodotto trovato. Usa Prisma Studio!</p>
        )}
      </div>
    </div>
  );
}
