// src/lib/actions/userActions.ts
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export type ProfileActionResult = {
  success?: boolean;
  error?: string;
};

// 1. Aggiornamento Nome
export async function updateUserNameAction(
  prevState: ProfileActionResult | null,
  formData: FormData
): Promise<ProfileActionResult> {
  const session = await auth();
  if (!session?.user?.id && !session?.user?.email) {
    return { error: "Non autorizzato. Effettua il login." };
  }

  const name = formData.get("name")?.toString().trim();

  if (!name || name.length < 2) {
    return { error: "Il nome deve contenere almeno 2 caratteri." };
  }

  if (name.length > 50) {
    return { error: "Il nome non può superare 50 caratteri." };
  }

  try {
    await prisma.user.update({
      where: { email: session.user.email! },
      data: { name },
    });

    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    return { error: "Errore durante l'aggiornamento del nome." };
  }
}

// 2. Aggiornamento Email
export async function updateUserEmailAction(
  prevState: ProfileActionResult | null,
  formData: FormData
): Promise<ProfileActionResult> {
  const session = await auth();
  if (!session?.user?.email) {
    return { error: "Non autorizzato. Effettua il login." };
  }

  const email = formData.get("email")?.toString().trim().toLowerCase();

  // Validazione Regex Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { error: "Inserisci un indirizzo email valido." };
  }

  if (email === session.user.email.toLowerCase()) {
    return { error: "La nuova email coincide con quella attuale." };
  }

  try {
    // 🛡️ Verifica che l'email non sia già utilizzata da un altro account
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Questo indirizzo email è già associato a un altro account." };
    }

    await prisma.user.update({
      where: { email: session.user.email },
      data: { 
        email,
        emailVerified: null // Resetta la verifica se l'email cambia
      },
    });

    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    return { error: "Errore durante l'aggiornamento dell'email." };
  }
}