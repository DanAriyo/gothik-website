"use client";
import { useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { createProductAction } from "@/lib/actions/productActions";

export default function AddProductForm({ categories }: { categories: any[] }) {
  const [images, setImages] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const removeImage = (publicId: string) => {
    setImages((prev) => prev.filter((img) => img !== publicId));
  };

  return (
    <form
      action={createProductAction}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-zinc-900/50 p-8 rounded-2xl border border-purple-900/20"
    >
      {/* SEZIONE TESTUALE */}
      <div className="space-y-4">
        <div>
          <label className="text-xs uppercase font-bold text-zinc-500">
            Nome Prodotto *
          </label>
          <input
            name="name"
            required
            className="w-full border border-zinc-800 p-2 rounded focus:border-purple-500 outline-none"
          />
        </div>

        <div>
          <label className="text-xs uppercase font-bold text-zinc-500">
            Categoria *
          </label>
          <select
            name="categoryId"
            required
            className="w-full border border-zinc-800 p-2 rounded focus:border-purple-500 outline-none"
          >
            <option value="">Seleziona Categoria</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase font-bold text-zinc-500">
            Descrizione
          </label>
          <textarea
            name="description"
            id="description"
            rows={5} // Definisce l'altezza iniziale
            placeholder="Descrivi il prodotto in modo accattivante..."
            className="w-full bg-black border border-zinc-800 p-3 rounded focus:border-purple-500 outline-none text-white resize-y min-h-[120px] transition-colors"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase font-bold text-zinc-500">
              Prezzo (€) *
            </label>
            <input
              name="price"
              type="number"
              step="0.01"
              required
              className="w-full border border-zinc-800 p-2 rounded"
            />
          </div>
          <div>
            <label className="text-xs uppercase font-bold text-zinc-500">
              Sconto (%)
            </label>
            <input
              name="discount"
              type="number"
              defaultValue="0"
              className="w-full border border-zinc-800 p-2 rounded"
            />
          </div>
        </div>

        <div>
          <label className="text-xs uppercase font-bold text-zinc-500">
            Taglie Disponibili
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-3 py-1 rounded text-xs font-bold border transition-all duration-200 ${
                  selectedSizes.includes(size)
                    ? "bg-purple-600 border-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]"
                    : "bg-black border-zinc-800 text-zinc-500 hover:border-purple-500"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {/* Campi nascosti serializzati per la Server Action */}
          <input
            type="hidden"
            name="sizes"
            value={JSON.stringify(selectedSizes)}
          />
          <input type="hidden" name="images" value={JSON.stringify(images)} />
        </div>
      </div>

      {/* SEZIONE MEDIA */}
      <div className="space-y-4 mt-6">
        <label className="text-xs uppercase font-bold text-zinc-500">
          Immagini Cloudinary (Multiple) *
        </label>

        <CldUploadWidget
          uploadPreset="gothik_store_preset"
          options={{
            cloudName: "dc8irqxrf",
          }}
          onSuccess={(res: any) => {
            setImages((prev) => [...prev, res.info.public_id]);
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="w-full h-32 border-2 border-dashed border-zinc-800 rounded-xl hover:border-purple-500 hover:bg-purple-900/5 transition-all flex flex-col items-center justify-center group"
            >
              <span className="text-zinc-500 group-hover:text-purple-400 transition">
                Evoca Immagini Oscure
              </span>
              <span className="text-[10px] text-zinc-600 mt-1">
                {images.length === 0
                  ? "Nessun file caricato"
                  : `${images.length} file pronti`}
              </span>
            </button>
          )}
        </CldUploadWidget>

        {/* Griglia Anteprime */}
        <div className="grid grid-cols-3 gap-2">
          {images.map((img) => (
            <div
              key={img}
              className="h-24 bg-black rounded border border-purple-900/30 overflow-hidden relative group"
            >
              <div className="p-2 text-[8px] text-zinc-500 break-all leading-tight opacity-50">
                {/* SOSTITUISCI IL TESTO CON L'IMMAGINE REALE */}
                <CldImage
                  width="200"
                  height="200"
                  src={img}
                  alt="Anteprima"
                  crop="fill"
                  className="object-cover w-full h-full opacity-80 group-hover:opacity-40 transition-opacity"
                />
              </div>

              {/* Overlay Rimuovi (Più visibile al passaggio del mouse) */}
              <button
                type="button"
                onClick={() => removeImage(img)}
                className="absolute inset-0 bg-red-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200"
              >
                <span className="text-[10px] font-black uppercase tracking-tighter bg-red-600 px-2 py-1 rounded">
                  Rimuovi
                </span>
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={images.length === 0}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-900 disabled:text-zinc-700 disabled:border-zinc-800 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all mt-6 border border-purple-500/50"
        >
          PUBBLICA NEL CATALOGO
        </button>
      </div>
    </form>
  );
}
