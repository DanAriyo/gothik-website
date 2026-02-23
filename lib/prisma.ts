import { PrismaClient } from '@prisma/client'

// 1. Definiamo una funzione che crea una nuova istanza di Prisma
const prismaClientSingleton = () => {
  return new PrismaClient()
}

// 2. Prepariamo un tipo per TypeScript per riconoscere il nostro singleton
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

// 3. Se esiste già un'istanza globale, usiamo quella. Altrimenti ne creiamo una nuova.
const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

// 4. Se siamo in modalità "Sviluppo", salviamo l'istanza globalmente.
// Questo impedisce a Next.js di creare nuove connessioni ogni volta che salvi un file.
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma