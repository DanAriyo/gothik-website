"use client";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
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
                className={`px-3 py-1 rounded text-xs font-bold border ${selectedSizes.includes(size) ? "bg-purple-600 border-purple-500" : "bg-zinc-800 border-zinc-700"}`}
              >
                {size}
              </button>
            ))}
          </div>
          {/* Campi nascosti per inviare gli array alla Server Action */}
          <input
            type="hidden"
            name="sizes"
            value={JSON.stringify(selectedSizes)}
          />
          <input type="hidden" name="images" value={JSON.stringify(images)} />
        </div>
      </div>

      {/* SEZIONE MEDIA */}
      <div className="space-y-4">
        <label className="text-xs uppercase font-bold text-zinc-500">
          Immagini Cloudinary
        </label>
        <CldUploadWidget
          uploadPreset="tuo_preset"
          onSuccess={(res: any) =>
            setImages((prev) => [...prev, res.info.public_id])
          }
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="w-full h-32 border-2 border-dashed border-zinc-700 rounded-xl hover:border-purple-500 transition flex flex-col items-center justify-center"
            >
              <span className="text-zinc-500 text-sm">Carica Foto</span>
              <span className="text-[10px] text-purple-400 mt-1">
                {images.length} caricate
              </span>
            </button>
          )}
        </CldUploadWidget>

        <div className="grid grid-cols-3 gap-2">
          {images.map((img) => (
            <div
              key={img}
              className="h-20 bg-zinc-800 rounded border border-purple-900/30 overflow-hidden relative text-[8px] p-1 break-all"
            >
              {img}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-4 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all"
        >
          PUBBLICA NEL CATALOGO
        </button>
      </div>
    </form>
  );
}
