// app/page.tsx
import Link from "next/link";
import CloudinaryImage from "@/components/CloudinaryImage";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";

export default function LandingPage() {
  const lookbookSections = [
    {
      id: "gtmoxbu0zumh169u2fej",
      title: "Nuova Collezione",
      subtitle: "Autunno / Inverno 2026",
      link: routes.home,
    },
    {
      id: "gtmoxbu0zumh169u2fej",
      title: "Capi Ritualistici",
      subtitle: "Strutture & Volumi Oversize",
      link: routes.home,
    },
    {
      id: "s97yqoadlk7jsukestaj",
      title: "Archivio Oscuro",
      subtitle: "Edizione Limitata",
      link: routes.home,
    },
    {
      id: "s97yqoadlk7jsukestaj",
      title: "Accessori & Dettagli",
      subtitle: "Esplora la Selezione",
      link: routes.home,
    },
  ];

  return (
    <div className="relative w-full bg-black text-white">
      {/* 1. SEZIONI VERTICALI FULL-SCREEN (Stile Zara/Uniqlo) */}
      <main className="w-full">
        {lookbookSections.map((section, index) => (
          <section
            key={index}
            className="relative w-full h-screen flex flex-col justify-end p-8 sm:p-16 overflow-hidden border-b border-zinc-900"
          >
            {/* Immagine Full-Width e Full-Height */}
            <div className="absolute inset-0 z-0">
              <CloudinaryImage
                src={section.id}
                alt={section.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
              {/* Overlay scuro per leggibilità */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            {/* Testo + Call-to-action per ogni singola immagine */}
            <div className="relative z-10 max-w-xl space-y-3 mb-12 sm:mb-8">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">
                {section.subtitle}
              </p>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                {section.title}
              </h2>
              <div>
                <Link
                  href={section.link}
                  className="inline-block mt-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-300 hover:text-white border-b border-zinc-500 hover:border-white pb-1 transition-all duration-300"
                >
                  Esplora Capi ➔
                </Link>
              </div>
            </div>
          </section>
        ))}
      </main>

      {/* 2. BOTTONE FLUTTUANTE SEMPRE VISIBILE (Sticky Floating CTA) */}
      <div className="fixed bottom-6 inset-x-0 z-40 flex justify-center pointer-events-none px-4">
        <Link
          href="/home"
          className="pointer-events-auto bg-zinc-950/90 hover:bg-black text-white border border-zinc-800 hover:border-zinc-500 px-6 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-[0.2em] shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Entra nello Shop
        </Link>
      </div>
    </div>
  );
}