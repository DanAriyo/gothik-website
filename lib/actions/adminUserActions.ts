// src/lib/actions/adminUserActions.ts
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

// 🛡️ 1. Toggle Blocco Utente
export async function toggleBlockUserAction(targetUserId: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Non autorizzato.");
  }

  // Previene l'auto-blocco dell'amministratore corrente
  if (session.user.id === targetUserId || session.user.email === (await prisma.user.findUnique({ where: { id: targetUserId } }))?.email) {
    throw new Error("Non puoi bloccare il tuo stesso account amministratore.");
  }

  const user = await prisma.user.findUnique({
    where: { id: targetUserId },
    select: { isBlocked: true },
  });

  if (!user) throw new Error("Utente non trovato.");

  await prisma.user.update({
    where: { id: targetUserId },
    data: { isBlocked: !user.isBlocked },
  });

  revalidatePath("/admin/users");
}

// 🛡️ 2. Cambio Ruolo Utente
export async function toggleRoleUserAction(targetUserId: string, newRole: "ADMIN" | "CUSTOMER") {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Non autorizzato.");
  }

  if (session.user.id === targetUserId) {
    throw new Error("Non puoi modificare il ruolo del tuo stesso account.");
  }

  await prisma.user.update({
    where: { id: targetUserId },
    data: { role: newRole },
  });

  revalidatePath("/admin/users");
}