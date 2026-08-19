// src/app/admin/page.tsx
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import Link from "next/link";
import { StatCard, AdminLink } from "@/components/admin/DashboardCards";
import {
  faUsers,
  faBoxOpen,
  faTags,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export default async function AdminDashboard() {
  // 1. 🛡️ CONTROLLO DI SICUREZZA RIGIDO LATO SERVER
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect(routes.home);
  }

  // 2. 📦 RECUPERO DATI IN PARALLELO
  const [userCount, productCount, categoryCount] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.category.count(),
  ]);

  return (
    <div className="max-w-5xl mx-auto p-8 pb-24 text-zinc-300 min-h-full bg-black">
      {/* HEADER CENTRATO CON GLOW */}
      <div className="text-center mb-12 w-full">
        <h1 className="text-3xl font-black uppercase tracking-[0.2em] text-white text-center inline-block">
          <span className="text-red-500 shadow-red-500/20 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            DASHBOARD
          </span>
        </h1>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Utenti" value={userCount} icon={faUsers} />
        <StatCard title="Prodotti in Catalogo" value={productCount} icon={faBoxOpen} />
        <StatCard title="Categorie" value={categoryCount} icon={faTags} />
      </div>

      {/* QUICK ACTIONS SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SEZIONE COMPRENSIVA GESTIONE */}
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
              href={routes.admin.products.add}
              label="Nuovo Prodotto"
              icon={faPlus}
            />
            <AdminLink
              href={routes.admin.products.index}
              label="Vedi Tutti i Prodotti"
              icon={faBoxOpen}
            />
            <AdminLink
              href={routes.admin.categories.add}
              label="Nuova Categoria"
              icon={faPlus}
            />
            <AdminLink
              href={routes.admin.categories.index}
              label="Gestisci Categorie"
              icon={faTags}
            />
          </div>
        </div>

        {/* SEZIONE INFORMATIVA / MONITORAGGIO UTENTI */}
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
            href={routes.admin.users}
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-center font-black py-4 rounded-lg transition-all duration-300 uppercase text-xs tracking-[0.2em] border border-zinc-800 block"
          >
            Lista Amministratori
          </Link>
        </div>
      </div>
    </div>
  );
}