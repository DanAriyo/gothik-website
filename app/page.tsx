// app/page.tsx
import Link from "next/link";
import CloudinaryImage from "@/components/CloudinaryImage";
import { routes } from "@/lib/routes";

export default function LandingPage() {
  const lookbookSections = [
    { id: "gtmoxbu0zumh169u2fej", alt: "Lookbook Collezione 1", link: routes.home },
    { id: "gtmoxbu0zumh169u2fej", alt: "Lookbook Collezione 2", link: routes.home },
    { id: "s97yqoadlk7jsukestaj", alt: "Lookbook Collezione 3", link: routes.home },
    { id: "s97yqoadlk7jsukestaj", alt: "Lookbook Collezione 4", link: routes.home },
  ];

  return (
    <div className="relative w-full bg-black text-white">
      {/* 1. SEZIONI VERTICALI FULL-SCREEN TOTALMENTE CLICCABILI */}
      <main className="w-full">
        {lookbookSections.map((section, index) => (
          <Link
            key={index}
            href={section.link}
            className="group relative block w-full h-screen overflow-hidden border-b border-zinc-900 cursor-pointer select-none"
          >
            {/* Immagine Full-Width con zoom fluido in hover */}
            <div className="absolute inset-0 z-0">
              <CloudinaryImage
                src={section.id}
                alt={section.alt}
                fill
                preload={index === 0}
                sizes="100vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Overlay scuro leggero che sfuma al passaggio del mouse */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
            </div>
          </Link>
        ))}
      </main>

      {/* 2. BOTTONE FLUTTUANTE FISSO */}
      <div className="fixed bottom-6 inset-x-0 z-40 flex justify-center pointer-events-none px-4">
        <Link
          href={routes.home}
          className="pointer-events-auto bg-zinc-950/90 hover:bg-black text-white border border-zinc-800 hover:border-zinc-500 px-6 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-[0.2em] shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          Entra nello Shop
        </Link>
      </div>
    </div>
  );
}