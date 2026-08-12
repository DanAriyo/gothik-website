// app/page.tsx
import Link from "next/link";
import LandingImageCardComponent from "@/components/LandingImageCardComponent";
import CloudinaryImage from "@/components/CloudinaryImage";

export default function LandingPage() {
  const previewImages = [
    { id: "gtmoxbu0zumh169u2fej", alt: "Manufatto Oscuro 1" },
    { id: "gtmoxbu0zumh169u2fej", alt: "Manufatto Oscuro 2" },
    { id: "s97yqoadlk7jsukestaj", alt: "Manufatto Oscuro 3" },
    { id: "s97yqoadlk7jsukestaj", alt: "Manufatto Oscuro 4" },
  ];

  // ID dell'immagine d'impatto da usare come sfondo full-screen
  const heroBackgroundImageId = "s97yqoadlk7jsukestaj";

  return (
    <div className="relative min-h-screen bg-white text-white flex flex-col justify-between p-6 overflow-hidden">
      {/* BACKGROUND DECORATIVO CON GLOW VIOLA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />

      {/* GALLERIA VISIVA */}
      <section className="z-10 max-w-full mx-auto w-full my-auto py-8">
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
          className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-zinc-300 hover:text-purple-400 border-b border-zinc-700 hover:border-purple-500 pb-1 transition-all duration-300 focus:ring-2 focus:ring-purple-500 outline-none cursor-pointer drop-shadow-md"
        >
          Esplora la collezione completa
        </Link>
      </div>
    </div>
  );
}
