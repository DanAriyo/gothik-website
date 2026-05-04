import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { auth } from "@/auth"; // 1. Importiamo la funzione di autenticazione
import "@fortawesome/fontawesome-svg-core/styles.css"; // Importa lo stile di Font Awesome7
import "./globals.css";
// Importiamo i tuoi componenti
import NavbarComponent from "@/components/NavBarComponent";
import FooterComponent from "@/components/FooterComponent";

// CONFIGURAZIONE FONT AWESOME
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gothik Store | Dark Fashion & Accessories",
  description: "Il tuo store sicuro per uno stile alternativo e ricercato",
};

// Rendiamo il RootLayout asincrono per poter usare await auth()
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 2. RECUPERO SESSIONE E LOGICA SICUREZZA
  const session = await auth();

  // Trasformiamo la presenza della sessione in un booleano chiaro
  const isAuthenticated = !!session;

  // Controlliamo il ruolo (assicurati che ADMIN sia scritto esattamente come nel DB)
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-gray-100`}
      >
        <div className="flex flex-col min-h-screen">
          {/* 3. PASSAGGIO PROPS ALLA NAVBAR */}
          {/* Passiamo isAdmin, isAuthenticated e l'intera sessione (per nome e immagine) */}
          <NavbarComponent
            isAdmin={isAdmin}
            isAuthenticated={isAuthenticated}
            session={session}
          />

          <main className="flex-grow pt-4">{children}</main>

          <FooterComponent />
        </div>
      </body>
    </html>
  );
}
