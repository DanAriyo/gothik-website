import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Importeremo i componenti una volta creati
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";

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
      {" "}
      {/* Cambiato in italiano */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-gray-100`}
      >
        <div className="flex flex-col min-h-screen">
          {/* Navbar provvisoria - la sposteremo in un componente */}
          <header className="border-b border-purple-900/30 bg-black/50 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
              <span className="text-xl font-bold tracking-tighter text-purple-500">
                GOTHIK STORE
              </span>
              {/* Qui andranno i link di navigazione e carrello */}
            </div>
          </header>

          {/* Il "cuore" delle tue pagine */}
          <main className="flex-grow">{children}</main>

          {/* Footer provvisorio */}
          <footer className="border-t border-purple-900/30 py-8 text-center text-gray-500">
            <p>© 2026 Gothik Store - Acquisti sicuri e protetti</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
