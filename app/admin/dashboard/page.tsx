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
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <div className="min-h-screen bg-zinc-100/70 text-zinc-900 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
              <p className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-red-600">
                Pannello di Controllo
              </p>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 mt-1 uppercase">
              Dashboard Admin
            </h1>
          </div>

          <div className="text-xs font-mono text-zinc-500 bg-white px-4 py-2 rounded-lg border border-zinc-200 shadow-sm w-fit">
            Autenticato come: <span className="font-bold text-zinc-800">{session.user.email}</span>
          </div>
        </div>

        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard 
            title="Utenti Registrati" 
            value={userCount} 
            icon={faUsers} 
          />
          <StatCard 
            title="Prodotti in Catalogo" 
            value={productCount} 
            icon={faBoxOpen} 
          />
          <StatCard 
            title="Categorie Attive" 
            value={categoryCount} 
            icon={faTags} 
          />
        </div>

        {/* AZIONI & GESTIONE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* SEZIONE GESTIONE CATALOGO (8 Colonne) */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200/80 shadow-sm space-y-6">
            <div className="border-b border-zinc-100 pb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
                Gestione Catalogo & Categorie
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Aggiungi nuovi articoli, aggiorna le disponibilità e gestisci le categorie.
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

          {/* SEZIONE AMMINISTRATORI & SICUREZZA (4 Colonne) */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200/80 shadow-sm flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FontAwesomeIcon icon={faShieldHalved} className="text-red-600 text-sm" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
                  Amministrazione
                </h2>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Gestisci e controlla l'elenco degli utenti con permessi amministrativi abilitati.
              </p>
            </div>

            <Link
              href={routes.admin.users}
              className="w-full bg-zinc-900 hover:bg-red-600 text-white text-center font-mono font-bold py-3.5 px-4 rounded-xl transition-colors duration-200 uppercase text-xs tracking-wider shadow-sm flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faUsers} className="text-xs" />
              <span>Lista Amministratori</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}