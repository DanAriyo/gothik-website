import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBoxOpen,
  faTags,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export default async function AdminDashboard() {
  // 🛡️ Recupero dati dal DB in parallelo (Solo dati rilevanti per la modalità Catalogo Showcase)
  const [userCount, productCount, categoryCount] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.category.count(),
  ]);

  return (
    // Rimpiazza la linea del div principale con questa:
    <div className="max-w-5xl mx-auto p-8 pb-24 text-zinc-300 min-h-full bg-black">
      {/* HEADER CENTRATO CON GLOW */}
      <div className="text-center mb-12 w-full">
        <h1 className="text-3xl font-black uppercase tracking-[0.2em] text-white text-center inline-block">
          <span className="text-purple-500 shadow-purple-500/20 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            DASHBOARD
          </span>
        </h1>
      </div>

      {/* STATS GRID (Look geometrico total-black con bordi finissimi) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Utenti" value={userCount} icon={faUsers} />
        <StatCard
          title="Prodotti in Catalogo"
          value={productCount}
          icon={faBoxOpen}
        />
        <StatCard title="Categorie" value={categoryCount} icon={faTags} />
      </div>

      {/* QUICK ACTIONS SECTIONS (Struttura a 12 colonne speculare ai form) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SEZIONE COMPRENSIVA GESTIONE (Occupa 7 slot su 12) */}
        <div className="lg:col-span-7 bg-zinc-950 p-8 rounded-xl border border-zinc-900 shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-6">
          <div>
            <h2 className="text-[10px] uppercase font-black tracking-widest text-zinc-500 block mb-1">
              Archivio di Controllo
            </h2>
            <p className="text-xs text-zinc-600 font-mono">
              Modifica la struttura e i prodotti visibili a catalogo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdminLink
              href="/api/admin/products/add-product"
              label="Nuovo Prodotto"
              icon={faPlus}
            />
            <AdminLink
              href="/api/admin/products"
              label="Vedi Tutti i Prodotti"
              icon={faBoxOpen}
            />
            <AdminLink
              href="/api/admin/categories/add-category"
              label="Nuova Categoria"
              icon={faPlus}
            />
            <AdminLink
              href="/api/admin/categories"
              label="Gestisci Categorie"
              icon={faTags}
            />
          </div>
        </div>

        {/* SEZIONE INFORMATIVA / MONITORAGGIO UTENTI (Occupa 5 slot su 12) */}
        <div className="lg:col-span-5 bg-zinc-950 p-8 rounded-xl border border-zinc-900 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-[10px] uppercase font-black tracking-widest text-zinc-500 block mb-1">
              Sicurezza & Accessi
            </h2>
            <p className="text-xs text-zinc-600 font-mono">
              Monitoraggio degli account autorizzati.
            </p>
          </div>

          <div className="bg-black/30 p-4 rounded-lg border border-zinc-900/60 border-dashed flex-1 flex items-center">
            <p className="text-xs text-zinc-500 font-mono leading-relaxed">
              // Stato:{" "}
              <span className="text-green-500 font-bold">Protetto</span>
              <br />
              L'accesso a queste impostazioni è crittografato tramite Google
              OAuth. Solo gli account esplicitamente inclusi nella whitelist
              possono manipolare l'arsenale.
            </p>
          </div>

          <Link
            href="/api/admin/users"
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-center font-black py-4 rounded-lg transition-all duration-300 uppercase text-xs tracking-[0.2em] border border-zinc-800 block"
          >
            Lista Amministratori
          </Link>
        </div>
      </div>
    </div>
  );
}

// 🔮 Sotto-componenti interni ri-stilizzati per il tema dark luxury

function StatCard({ title, value, icon }: any) {
  return (
    <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-900 flex items-center justify-between shadow-lg">
      <div>
        <p className="text-[10px] uppercase font-black tracking-widest text-zinc-500">
          {title}
        </p>
        <p className="text-3xl font-black mt-2 text-white font-mono tracking-tighter">
          {value}
        </p>
      </div>
      <div className="w-10 h-10 bg-black border border-zinc-800 rounded flex items-center justify-center text-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.05)]">
        <FontAwesomeIcon icon={icon} className="text-sm" />
      </div>
    </div>
  );
}

function AdminLink({ href, label, icon }: any) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 bg-black border border-zinc-800 hover:border-purple-600 p-4 rounded transition-all duration-300 group shadow-inner"
    >
      <div className="w-8 h-8 rounded bg-zinc-900/50 border border-zinc-800 group-hover:border-purple-900 flex items-center justify-center transition-colors">
        <FontAwesomeIcon
          icon={icon}
          className="text-zinc-500 group-hover:text-purple-400 group-hover:scale-110 transition text-xs"
        />
      </div>
      <span className="font-bold text-xs uppercase tracking-wider text-zinc-400 group-hover:text-white transition-colors">
        {label}
      </span>
    </Link>
  );
}
