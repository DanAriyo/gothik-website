// components/LandingImageCardComponent.tsx
"use client";

import CloudinaryImage from "./CloudinaryImage";

interface LandingImageCardProps {
  imageId: string;
  altText?: string;
}

export default function LandingImageCardComponent({
  imageId,
  altText = "Manufatto in anteprima",
}: LandingImageCardProps) {
  return (
    <div className="flex flex-col h-full overflow-hidden transition-all duration-300">
      {/* AREA IMMAGINE (Resta identica, ottima struttura) */}
      <div className="group relative aspect-[4/5] w-full overflow-hidden bg-zinc-900 rounded-lg">
        <CloudinaryImage
          src={imageId || "no-image_qo394q"}
          alt={altText}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        {/* Soft overlay scuro che reagisce all'hover per dare l'effetto gothik */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 pointer-events-none" />
      </div>
    </div>
  );
}
