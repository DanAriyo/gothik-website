import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. Importiamo il tuo componente Navbar reale
import NavbarComponent from "@/components/NavBarComponent";

// 2. CONFIGURAZIONE FONT AWESOME (Cruciale per la stabilità visiva)
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-gray-100`}
      >
        <div className="flex flex-col min-h-screen">
          {/* 3. Sostituiamo l'header statico con il tuo componente interattivo */}
          <NavbarComponent />

          {/* Il "cuore" delle tue pagine */}
          {/* Ho aggiunto un po' di padding top per evitare che il contenuto finisca sotto la Navbar sticky */}
          <main className="flex-grow pt-4">{children}</main>

          {/* Footer provvisorio */}
          <footer className="border-t border-purple-900/30 py-8 text-center text-gray-500 bg-zinc-950">
            <p>© 2026 Gothik Store - Acquisti sicuri e protetti</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
