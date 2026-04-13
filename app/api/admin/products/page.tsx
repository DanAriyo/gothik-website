import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true, // Includi i dati della categoria associata
    },
  });

  return (
    <div>
      <h1>Prodotti</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>Prezzo: {product.price}€</p>
            <p>Categoria: {product.category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
