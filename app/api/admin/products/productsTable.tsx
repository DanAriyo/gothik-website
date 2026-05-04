import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc", // I più recenti in alto
    },
  });

  return (
    <div className="p-8 bg-black min-h-screen text-zinc-300">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
            Gestione <span className="text-purple-500">Arsenale</span>
          </h1>
          <p className="text-zinc-500 text-sm">
            Lista completa degli articoli nel catalogo oscuro.
          </p>
        </div>
        <Link
          href="/admin/products/add"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
        >
          + NUOVO PRODOTTO
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-900 text-zinc-500 text-xs uppercase tracking-widest border-b border-zinc-800">
              <th className="p-4">Prodotto</th>
              <th className="p-4">Categoria</th>
              <th className="p-4">Prezzo</th>
              <th className="p-4">Sconto</th>
              <th className="p-4 text-right">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {products.map((product) => {
              // --- LOGICA DI ESTRAZIONE IMMAGINE ---
              let imageSrc: string = "";

              if (Array.isArray(product.images) && product.images.length > 0) {
                imageSrc = product.images[0];
              } else if (typeof product.images === "string") {
                try {
                  const parsed = JSON.parse(product.images);
                  if (Array.isArray(parsed) && parsed.length > 0) {
                    imageSrc = parsed[0];
                  }
                } catch (e) {
                  imageSrc = "";
                }
              }

              return (
                <tr
                  key={product.id}
                  className="hover:bg-purple-900/5 transition-colors group"
                >
                  <td className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded border border-zinc-700 overflow-hidden bg-black">
                      {imageSrc ? (
                        <CldImage
                          width="48"
                          height="48"
                          src={imageSrc} // Passiamo la stringa pulita
                          alt={product.name}
                          crop="fill"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-600">
                          N/A
                        </div>
                      )}
                    </div>
                    <span className="font-bold text-white group-hover:text-purple-400 transition-colors">
                      {product.name}
                    </span>
                  </td>
                  <td className="p-4 text-sm">
                    <span className="px-2 py-1 rounded-md bg-zinc-800 border border-zinc-700">
                      {product.category.name}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-white">
                    {Number(product.price).toFixed(2)}€
                  </td>
                  <td className="p-4">
                    {product.discount > 0 ? (
                      <span className="text-red-500 font-bold">
                        -{product.discount}%
                      </span>
                    ) : (
                      <span className="text-zinc-600">-</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="inline-block bg-zinc-800 hover:bg-purple-600 hover:text-white text-zinc-400 text-xs font-black py-2 px-4 rounded transition-all border border-zinc-700"
                    >
                      MODIFICA / DETTAGLI
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="p-20 text-center text-zinc-600 uppercase tracking-widest text-sm">
            L'abisso è vuoto. Non ci sono prodotti.
          </div>
        )}
      </div>
    </div>
  );
}
