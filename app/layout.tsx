import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. Importiamo il tuo componente Navbar reale
import NavbarComponent from "@/components/NavBarComponent";
import FooterComponent from "@/components/FooterComponent";

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

          {/* 4. Footer sempre presente */}
          <FooterComponent />
        </div>
      </body>
    </html>
  );
}
