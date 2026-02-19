import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;

// 1. Creiamo il pool di connessione usando il driver 'pg'
const pool = new pg.Pool({ connectionString });

// 2. Creiamo l'adapter che fa da ponte tra Prisma e il driver
const adapter = new PrismaPg(pool);

// 3. Inizializziamo il client passandogli l'adapter
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || 
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;