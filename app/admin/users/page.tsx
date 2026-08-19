// src/app/admin/users/page.tsx
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import UsersTable from "@/components/admin/users/UsersTableComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUserShield, faUserCheck, faUserXmark } from "@fortawesome/free-solid-svg-icons";

export default async function AdminUsersPage() {
  // 1. 🛡️ Controllo di sicurezza lato server
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect(routes.home);
  }

  // 2. Query utenti con conteggio ordini e recensioni (escludendo password)
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      isBlocked: true,
      _count: {
        select: {
          orders: true,
          reviews: true,
        },
      },
    },
  });

  // 3. Statistiche riassuntive
  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.role === "ADMIN").length;
  const blockedCount = users.filter((u) => u.isBlocked).length;
  const activeCustomers = totalUsers - blockedCount;

  return (
    <div className="min-h-screen bg-zinc-100/70 text-zinc-900 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FontAwesomeIcon icon={faUsers} className="text-red-600 text-xs" />
              <p className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-red-600">
                Community & Account
              </p>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 uppercase">
              Gestione <span className="text-red-600">Clienti</span>
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Visualizza l'elenco di tutti gli utenti registrati, monitora le attività e gestisci i permessi.
            </p>
          </div>
        </div>

        {/* STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
              <FontAwesomeIcon icon={faUsers} />
              <span>Totale Iscritti</span>
            </div>
            <p className="text-2xl font-black text-zinc-900 font-mono">{totalUsers}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-mono mb-1">
              <FontAwesomeIcon icon={faUserCheck} />
              <span>Attivi</span>
            </div>
            <p className="text-2xl font-black text-emerald-600 font-mono">{activeCustomers}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm">
            <div className="flex items-center gap-2 text-red-600 text-xs font-mono mb-1">
              <FontAwesomeIcon icon={faUserShield} />
              <span>Admin</span>
            </div>
            <p className="text-2xl font-black text-zinc-900 font-mono">{adminCount}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
              <FontAwesomeIcon icon={faUserXmark} />
              <span>Bloccati</span>
            </div>
            <p className="text-2xl font-black text-red-600 font-mono">{blockedCount}</p>
          </div>
        </div>

        {/* TABELLA CON FILTRO */}
        <div>
          <UsersTable users={users} currentAdminId={session.user.id} />
        </div>

      </div>
    </div>
  );
}