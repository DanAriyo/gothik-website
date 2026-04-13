import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBoxOpen,
  faCartShopping,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export default async function AdminDashboard() {
  // 🛡️ Recupero dati dal DB in parallelo (più veloce)
  const [userCount, productCount, orderCount] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.order.count(),
  ]);

  return (
    <div className="p-4">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">Dashboard Admin</h1>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-8">
        <StatCard
          title="Utenti Totali"
          value={userCount}
          icon={faUsers}
          color="text-blue-500"
        />
        <StatCard
          title="Articoli in Catalogo"
          value={productCount}
          icon={faBoxOpen}
          color="text-purple-500"
        />
        <StatCard
          title="Ordini Ricevuti"
          value={orderCount}
          icon={faCartShopping}
          color="text-green-500"
        />
      </div>

      {/* QUICK ACTIONS SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 m-8">
        <div className="bg-zinc-900/40 p-6 rounded-2xl border border-purple-900/20">
          <h2 className="text-xl font-bold mb-6">Gestione Catalogo</h2>
          <div className="grid grid-cols-2 gap-4">
            <AdminLink
              href="/api/admin/products/add-product"
              label="Nuovo Prodotto"
              icon={faPlus}
            />
            <AdminLink
              href="/admin/products/all-products"
              label="Vedi Tutti"
              icon={faBoxOpen}
            />
          </div>
        </div>

        <div className="bg-zinc-900/40 p-6 rounded-2xl border border-purple-900/20">
          <h2 className="text-xl font-bold mb-6">Operazioni Clienti</h2>
          <div className="grid grid-cols-2 gap-4">
            <AdminLink
              href="/admin/ordini"
              label="Ordini"
              icon={faCartShopping}
            />
            <AdminLink href="/admin/utenti" label="Utenti" icon={faUsers} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Sotto-componenti interni per pulizia codice
function StatCard({ title, value, icon, color }: any) {
  return (
    <div className="bg-zinc-900/60 p-6 rounded-2xl border border-white/5 flex items-center justify-between">
      <div>
        <p className="text-zinc-400 text-sm font-medium">{title}</p>
        <p className="text-3xl font-black mt-1 text-white">{value}</p>
      </div>
      <FontAwesomeIcon icon={icon} className={`text-2xl ${color}`} />
    </div>
  );
}

function AdminLink({ href, label, icon }: any) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 bg-zinc-800 hover:bg-purple-900/40 transition p-4 rounded-xl border border-white/5 group"
    >
      <FontAwesomeIcon
        icon={icon}
        className="text-purple-500 group-hover:scale-110 transition"
      />
      <span className="font-semibold text-sm">{label}</span>
    </Link>
  );
}
