// app/page.tsx
import Link from "next/link";
import { routes } from "@/lib/routes";
import HeroCarousel from "@/components/HeroCarouselComponent";

export default function LandingPage() {
  const lookbookSections = [
    { id: "gothik-3_hh4pg1", alt: "Lookbook Collezione 1", link: routes.home },
    { id: "gothik-1_tm04vs", alt: "Lookbook Collezione 2", link: routes.home },
    { id: "gothik-4_ajfnzi", alt: "Lookbook Collezione 3", link: routes.home },
    { id: "gothik-2_jbp3jx", alt: "Lookbook Collezione 4", link: routes.home },
  ];

  return (
  <div className="relative w-full h-dvh bg-black text-white overflow-hidden m-0 p-0">
    
    {/* 1. Il carosello riempie tutto lo schermo */}
    <div className="absolute inset-0 w-full h-full">
      <HeroCarousel sections={lookbookSections} />
    </div>

    {/* 2. Il bottone posizionato in modo assoluto sopra le immagini */}
    <div className="absolute bottom-32 sm:bottom-32 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <Link
        href={routes.home}
        className="pointer-events-auto bg-zinc-950/90 hover:bg-black text-white border border-zinc-800 hover:border-red-500 px-7 py-3.5 rounded-full text-xs font-mono font-bold uppercase tracking-[0.2em] shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-center"
      >
        Entra nello Shop
      </Link>
    </div>

  </div>
);
}