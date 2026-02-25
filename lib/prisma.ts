import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// 1. Definiamo la funzione che crea l'istanza con l'adapter
const prismaClientSingleton = () => {
  // Il pool di connessioni gestisce la comunicazione fisica con Postgres
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  
  return new PrismaClient({ adapter });
};

// 2. Implementiamo il Singleton per Next.js
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// Se esiste già un'istanza globale (in sviluppo), usa quella, altrimenti creala
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;