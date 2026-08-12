// app/page.tsx
import Link from "next/link";
import LandingImageCardComponent from "@/components/LandingImageCardComponent";

export default function LandingPage() {
  const previewImages = [
    { id: "gtmoxbu0zumh169u2fej", alt: "Manufatto Oscuro 1" },
    { id: "gtmoxbu0zumh169u2fej", alt: "Manufatto Oscuro 2" },
    { id: "s97yqoadlk7jsukestaj", alt: "Manufatto Oscuro 3" },
    { id: "s97yqoadlk7jsukestaj", alt: "Manufatto Oscuro 4" },
  ];

  return (
    <div className="relative min-h-screen bg-white text-white flex flex-col justify-between p-6 sm:p-12 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />

      <header className="z-10 text-center py-6">
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-[0.3em] text-zinc-400">
          Gothik{" "}
          <span className="text-purple-600 shadow-purple-500/20 drop-shadow-[0_0_25px_rgba(168,85,247,0.4)]">
            Store
          </span>
        </h1>
        <p className="text-xs font-mono tracking-widest text-zinc-500 mt-2 uppercase">
          Archivio Abbigliamento & Capi Ritualistici
        </p>
      </header>

      {/* GALLERIA VISIVA */}
      <section className="z-10 max-w-6xl mx-auto w-full my-auto py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {previewImages.map((img, index) => (
            <LandingImageCardComponent
              key={index}
              imageId={img.id}
              altText={img.alt}
            />
          ))}
        </div>
      </section>

      {/* LINK D'INGRESSO ALL'ARCHIVIO */}
      <div className="z-10 text-center py-6 flex flex-col items-center gap-4">
        <Link
          href="/home"
          className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-zinc-400 hover:text-purple-400 border-b border-zinc-800 hover:border-purple-500/50 pb-1 transition-all duration-300 focus:ring-2 focus:ring-purple-500 outline-none cursor-pointer"
        >
          Esplora la collezione completa
        </Link>
      </div>
    </div>
  );
}
