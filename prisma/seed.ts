// prisma/seed.ts
import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client"; 

// 1. Configurazione del Pool di connessione al database PostgreSQL locale
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// 2. Inizializzazione sicura del client con l'adapter richiesto da Prisma v7
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌌 Inizio purificazione e popolamento database (Prisma v7)...");

  // Eliminazione precauzionale (prima prodotti, poi categorie) per i vincoli di foreign key
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  console.log("🧹 Database purificato. Evocazione delle nuove entità...");

  // Creazione Categorie
  const topwearCategory = await prisma.category.create({
    data: { name: "Topwear" },
  });

  const jeansCategory = await prisma.category.create({
    data: { name: "Jeans" },
  });

  console.log("📁 Categorie 'Topwear' e 'Jeans' create con successo.");

  // Creazione Prodotti (Topwear)
  await prisma.product.create({
    data: {
      name: "T-Shirt Gothic Oversize",
      description: "T-shirt dal taglio rilassato con dettagli esoterici stampati a contrasto.",
      price: 39.99,
      discount: 10.0,
      sizes: ["S", "M", "L", "XL"],
      images: ["iykcyman9fbdgzhhjmc3", "v8vjxriya9wih4zggo6s"], 
      categoryId: topwearCategory.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Felpa Hoodie Dark Ceremony",
      description: "Felpa con cappuccio oversize in pesante cotone garzato, cerniere asimmetriche.",
      price: 79.90,
      discount: 0.0,
      sizes: ["M", "L", "XL"],
      images: ["htono5ziwx5exxnvnnxr", "yejrtj1ohoo2j99ad3rn"],
      categoryId: topwearCategory.id,
    },
  });

  // Creazione Prodotti (Jeans)
  await prisma.product.create({
    data: {
      name: "Jeans Cargo Black Obsidian",
      description: "Jeans cargo larghi con maxi tasche geometriche, cinte regolabili e hardware metallico scuro.",
      price: 89.90,
      discount: 15.0,
      sizes: ["S", "M", "L"],
      images: ["gothik-bike-3_esyvaj", "s97yqoadlk7jsukestaj"],
      categoryId: jeansCategory.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Jeans Distressed Void Slim",
      description: "Jeans dal taglio aderente con strappi rifiniti a mano e texture slavata effetto cenere.",
      price: 69.90,
      discount: 0.0,
      sizes: ["M", "L"],
      images: ["y52aeyfhywpxkmnhmmzx", "gtmoxbu0zumh169u2fej"],
      categoryId: jeansCategory.id,
    },
  });

  console.log("⚔️ Arsenale prodotti popolato con successo con 4 articoli!");
}

main()
  .then(async () => {
    // 🛡️ Sicurezza: Disconnessione pulita di Prisma e rilascio del pool di Postgres
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error("❌ Errore durante il seeding:", e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });