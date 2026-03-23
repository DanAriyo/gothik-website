import { DefaultSession } from "next-auth"

// 1. "Apriamo" il modulo next-auth
declare module "next-auth" {
  
  // 2. Estendiamo l'interfaccia Session
  interface Session {
    user: {
      role?: string // ✨ Ora TS sa che esiste il ruolo nella sessione!
    } & DefaultSession["user"] // Manteniamo anche i campi standard (name, email...)
  }

  // 3. Estendiamo l'interfaccia User (quella che arriva dal DB)
  interface User {
    role?: string // ✨ Ora TS sa che l'utente nel DB ha un ruolo!
  }
}