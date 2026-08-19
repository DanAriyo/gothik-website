// src/app/profile/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import { prisma } from "@/lib/db";
import { EditNameForm, EditEmailForm } from "@/components/profile/ProfileFormsComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faShieldHalved,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

export default async function ProfilePage() {
  // 1. 🛡️ Controllo di sicurezza lato server
  const session = await auth();
  if (!session?.user?.email) {
    redirect(routes.home);
  }

  // 2. Recupero utente da Supabase con select selettiva (no password o hash)
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      isBlocked: true,
    },
  });

  if (!user || user.isBlocked) {
    redirect(routes.home);
  }

  return (
    <div className="min-h-screen bg-zinc-100/70 text-zinc-900 py-12 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* HEADER PROFILO */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FontAwesomeIcon icon={faUserCircle} className="text-red-600 text-xs" />
              <p className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-red-600">
                Impostazioni Account
              </p>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 uppercase">
              Il Tuo Profilo
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1.5 rounded-lg border ${
                user.role === "ADMIN"
                  ? "bg-red-50 text-red-600 border-red-200"
                  : "bg-white text-zinc-700 border-zinc-200 shadow-sm"
              }`}
            >
              {user.role === "ADMIN" && (
                <FontAwesomeIcon icon={faShieldHalved} className="text-[11px]" />
              )}
              RUOLO: {user.role}
            </span>
          </div>
        </div>

        {/* CONTENITORI FORM CLIENT-SIDE */}
        <div className="space-y-4">
          <EditNameForm initialName={user.name} />
          <EditEmailForm initialEmail={user.email} />
        </div>

        {/* METADATI ACCOUNT */}
        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm flex items-center justify-between text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCalendarDays} className="text-zinc-400" />
            <span>Membro dal:</span>
          </div>
          <span className="font-bold text-zinc-800">
            {new Date(user.createdAt).toLocaleDateString("it-IT", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

      </div>
    </div>
  );
}