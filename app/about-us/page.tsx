// app/about-us/page.tsx
import Link from "next/link";
import { routes } from "@/lib/routes";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6 py-24 sm:py-32">
      <div className="max-w-2xl w-full mx-auto space-y-12">
        
        {/* INTESTAZIONE */}
        <div className="border-b border-zinc-900 pb-6 text-center sm:text-left">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-red-500 mb-2">
            Manifesto — Made in Romagna
          </p>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-zinc-100">
            Gothik <span className="text-red-500">Store</span>
          </h1>
        </div>

        {/* TESTO PRESENTAZIONE BRAND */}
        <div className="space-y-6 text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
          <p>
            Nato a <strong className="text-white">Cesena</strong>, <strong>Gothik</strong> è un progetto streetwear indipendente che unisce la cultura underground locale a un design contemporaneo, essenziale e senza compromessi.
          </p>

          <p>
            Crediamo in una moda autentica, fatta di tagli studiati, vestibilità decise e materiali selezionati con cura. Ogni capo è pensato per chi vive la strada e gli spazi urbani, trasformando l'estetica quotidiana in un'identità precisa e riconoscibile.
          </p>

          <p>
            Non seguiamo le tendenze di massa: realizziamo collezioni a tiratura limitata, valorizzando le nostre radici e offrendo una prospettiva streetwear pura, diretta e radicata nel territorio.
          </p>
        </div>

        {/* DETTAGLIO LOCATION & CTA */}
        <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
              Sede & Origine
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">
              Cesena (FC), Italia
            </span>
          </div>

          <Link
            href={routes?.home || "/home"}
            className="inline-block px-8 py-3 bg-zinc-950 hover:bg-zinc-900 text-white border border-zinc-800 hover:border-red-500 text-xs font-mono font-bold uppercase tracking-[0.2em] rounded-xl shadow-lg transition-all duration-300"
          >
            Esplora i Capi
          </Link>
        </div>

      </div>
    </div>
  );
}