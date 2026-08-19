// src/components/admin/users/UsersTable.tsx
"use client";

import { useState, useTransition } from "react";
import { toggleBlockUserAction, toggleRoleUserAction } from "@/lib/actions/adminUserActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShieldHalved,
  faBan,
  faCheck,
  faMagnifyingGlass,
  faCartShopping,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

interface UserItem {
  id: string;
  name: string | null;
  email: string | null;
  role: "ADMIN" | "CUSTOMER";
  createdAt: Date;
  isBlocked: boolean;
  _count: {
    orders: number;
    reviews: number;
  };
}

export default function UsersTable({ users, currentAdminId }: { users: UserItem[]; currentAdminId?: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();

  // Filtro ricerca lato client
  const filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = u.name?.toLowerCase().includes(term);
    const emailMatch = u.email?.toLowerCase().includes(term);
    return nameMatch || emailMatch;
  });

  const handleToggleBlock = (userId: string) => {
    if (confirm("Vuoi modificare lo stato di accesso di questo utente?")) {
      startTransition(async () => {
        await toggleBlockUserAction(userId);
      });
    }
  };

  const handleRoleChange = (userId: string, currentRole: "ADMIN" | "CUSTOMER") => {
    const nextRole = currentRole === "ADMIN" ? "CUSTOMER" : "ADMIN";
    if (confirm(`Confermi il cambio ruolo a ${nextRole}?`)) {
      startTransition(async () => {
        await toggleRoleUserAction(userId, nextRole);
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden text-zinc-900 space-y-4 p-6">
      {/* BARRA DI RICERCA */}
      <div className="relative max-w-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xs" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cerca per nome o email..."
          className="w-full bg-zinc-50 border border-zinc-300 focus:border-red-600 focus:bg-white focus:ring-1 focus:ring-red-600 pl-10 pr-4 py-2.5 rounded-xl text-xs font-mono outline-none transition-all placeholder:text-zinc-400"
        />
      </div>

      {/* TABELLA UTENTI */}
      <div className="overflow-x-auto border border-zinc-200/80 rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 text-zinc-600 text-xs font-mono uppercase tracking-wider border-b border-zinc-200">
              <th className="p-4 pl-6">Cliente</th>
              <th className="p-4">Ruolo</th>
              <th className="p-4">Attività</th>
              <th className="p-4">Registrazione</th>
              <th className="p-4">Stato</th>
              <th className="p-4 pr-6 text-right">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-xs">
            {filteredUsers.map((user) => {
              const isSelf = user.id === currentAdminId;

              return (
                <tr key={user.id} className="hover:bg-zinc-50/80 transition-colors">
                  {/* CLIENTE */}
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-600 font-bold font-mono">
                        {user.name ? user.name.charAt(0).toUpperCase() : <FontAwesomeIcon icon={faUser} className="text-xs" />}
                      </div>
                      <div>
                        <p className="font-bold text-zinc-900">{user.name || "Senza Nome"}</p>
                        <p className="text-[11px] font-mono text-zinc-500">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* RUOLO */}
                  <td className="p-4 align-middle">
                    <span
                      className={`inline-flex items-center gap-1 font-mono font-bold text-[10px] px-2 py-0.5 rounded-md border ${
                        user.role === "ADMIN"
                          ? "bg-red-50 text-red-600 border-red-200"
                          : "bg-zinc-100 text-zinc-700 border-zinc-200"
                      }`}
                    >
                      {user.role === "ADMIN" && <FontAwesomeIcon icon={faShieldHalved} className="text-[9px]" />}
                      {user.role}
                    </span>
                  </td>

                  {/* ATTIVITÀ (ORDINI) */}
                  <td className="p-4 align-middle font-mono text-zinc-600">
                    <div className="flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faCartShopping} className="text-zinc-400 text-[10px]" />
                      <span>{user._count.orders} ordini</span>
                    </div>
                  </td>

                  {/* DATA REGISTRAZIONE */}
                  <td className="p-4 align-middle font-mono text-zinc-500">
                    <div className="flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faCalendarDays} className="text-zinc-400 text-[10px]" />
                      <span>
                        {new Date(user.createdAt).toLocaleDateString("it-IT", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </td>

                  {/* STATO ACCOUNT */}
                  <td className="p-4 align-middle">
                    {user.isBlocked ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                        <FontAwesomeIcon icon={faBan} className="text-[9px]" />
                        Bloccato
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                        <FontAwesomeIcon icon={faCheck} className="text-[9px]" />
                        Attivo
                      </span>
                    )}
                  </td>

                  {/* AZIONI */}
                  <td className="p-4 pr-6 text-right align-middle">
                    <div className="flex items-center justify-end gap-2">
                      {!isSelf ? (
                        <>
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => handleRoleChange(user.id, user.role)}
                            className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-mono font-bold px-2.5 py-1.5 rounded-lg border border-zinc-200 transition-colors cursor-pointer text-[10px]"
                          >
                            {user.role === "ADMIN" ? "Imposta Cliente" : "Rendi Admin"}
                          </button>

                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => handleToggleBlock(user.id)}
                            className={`font-mono font-bold px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer text-[10px] ${
                              user.isBlocked
                                ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200"
                                : "bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                            }`}
                          >
                            {user.isBlocked ? "Sblocca" : "Blocca"}
                          </button>
                        </>
                      ) : (
                        <span className="text-[10px] font-mono text-zinc-400 italic">Il tuo account</span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="p-8 text-center text-zinc-400 font-mono text-xs">
          Nessun cliente corrisponde alla ricerca.
        </div>
      )}
    </div>
  );
}