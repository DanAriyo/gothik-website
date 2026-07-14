// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌌 Inizio purificazione e popolamento database...");

  // 1. Pulizia precauzionale per evitare duplicati e conflitti di chiavi esterne
  // Eliminiamo prima i prodotti e poi le categorie per rispettare i vincoli di integrità
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  console.log("🧹 Database purificato. Evocazione delle nuove entità...");

  // 2. Creazione delle Categorie di Base
  const topwearCategory = await prisma.category.create({
    data: { name: "Topwear" },
  });

  const jeansCategory = await prisma.category.create({
    data: { name: "Jeans" },
  });

  console.log("📁 Categorie 'Topwear' e 'Jeans' create con successo.");

  // 3. Creazione dei Prodotti associati alle categorie e alle immagini di Cloudinary
  
  // --- CATEGORIA: TOPWEAR ---
  await prisma.product.create({
    data: {
      name: "T-Shirt Gothic Oversize",
      description: "T-shirt dal taglio rilassato con dettagli esoterici stampati a contrasto.",
      price: 39.99,
      discount: 10.0, // Float
      sizes: ["S", "M", "L", "XL"],
      // ☁️ Primo vestito: i tuoi primi due ID richiesti
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
      // ☁️ Secondo vestito: i tuoi successivi due ID richiesti
      images: ["htono5ziwx5exxnvnnxr", "yejrtj1ohoo2j99ad3rn"],
      categoryId: topwearCategory.id,
    },
  });

  // --- CATEGORIA: JEANS ---
  await prisma.product.create({
    data: {
      name: "Jeans Cargo Black Obsidian",
      description: "Jeans cargo larghi con maxi tasche geometriche, cinte regolabili e hardware metallico scuro.",
      price: 89.90,
      discount: 15.0,
      sizes: ["S", "M", "L"],
      // ☁️ Terzo vestito: selezione dei tuoi ID rimanenti
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
      // ☁️ Quarto vestito: selezione dei tuoi ID rimanenti
      images: ["y52aeyfhywpxkmnhmmzx", "gtmoxbu0zumh169u2fej"],
      categoryId: jeansCategory.id,
    },
  });

  console.log("⚔️ Arsenale prodotti popolato con successo con 4 articoli!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Errore durante il seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });