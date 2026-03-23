import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      // Usiamo le variabili che hai settato nel .env
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // 🛡️ Questa parte è fondamentale per la sicurezza!
    async session({ session, user }) {
      if (session.user) {
        // Prendiamo il ruolo dal Database (grazie all'adapter) 
        // e lo mettiamo nella sessione che legge il browser
        // @ts-ignore
        session.user.role = user.role; 
        session.user.id = user.id;
        session.user.role = user.role;  
        console.log("Sessione aggiornata con ruolo e id:", session.user);
      }
      return session;
    },
  },
})