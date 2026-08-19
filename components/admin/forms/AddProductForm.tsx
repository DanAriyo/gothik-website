"use client";

import { useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { createProductAction } from "@/lib/actions/productActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowUp,
  faTrashCan,
  faTag,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

export default function AddProductForm({ categories }: { categories: any[] }) {
  const [images, setImages] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [rawPrice, setRawPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const availableSizes = ["S", "M", "L", "XL"];

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const removeImage = (publicId: string) => {
    setImages((prev) => prev.filter((img) => img !== publicId));
  };

  // Calcolo del prezzo finale
  const calculateFinalPrice = () => {
    const priceNum = parseFloat(rawPrice.replace(",", "."));
    if (isNaN(priceNum)) return "0,00";

    const final = priceNum - (priceNum * discount) / 100;
    return final.toLocaleString("it-IT", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <form
      action={createProductAction}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm max-w-5xl mx-auto text-zinc-900"
    >
      {/* COLONNA SINISTRA: DATI DEL PRODOTTO (7 slot su 12) */}
      <div className="lg:col-span-7 space-y-6">
        {/* NOME PRODOTTO */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 block">
            Nome Prodotto *
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="Es. Felpa Oversize Graphic"
            className="w-full bg-zinc-50 border border-zinc-300 focus:border-red-600 focus:bg-white focus:ring-1 focus:ring-red-600 p-3 rounded-xl text-sm text-zinc-900 outline-none transition-all duration-200 placeholder:text-zinc-400"
          />
        </div>

        {/* CATEGORIA */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 block">
            Categoria *
          </label>
          <div className="relative">
            <select
              name="categoryId"
              required
              className="w-full bg-zinc-50 border border-zinc-300 focus:border-red-600 focus:bg-white focus:ring-1 focus:ring-red-600 p-3 pr-10 rounded-xl text-sm text-zinc-800 outline-none transition-all duration-200 appearance-none cursor-pointer"
            >
              <option value="">Seleziona Categoria</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="text-zinc-900">
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500 text-xs">
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
          </div>
        </div>

        {/* DESCRIZIONE */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 block">
            Descrizione Prodotto
          </label>
          <textarea
            name="description"
            id="description"
            rows={4}
            placeholder="Descrivi i dettagli del capo, vestibilità e composizione..."
            className="w-full bg-zinc-50 border border-zinc-300 p-3 rounded-xl text-sm text-zinc-900 focus:border-red-600 focus:bg-white focus:ring-1 focus:ring-red-600 outline-none placeholder:text-zinc-400 resize-none min-h-[110px] transition-all duration-200"
            required
          />
        </div>

        {/* BLOCCO COMPATTO PREZZO E SCONTO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-100">
          {/* INPUT PREZZO */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 block">
              Prezzo (€) *
            </label>
            <input
              name="price"
              type="text"
              required
              placeholder="00,00"
              value={rawPrice}
              onChange={(e) => setRawPrice(e.target.value)}
              pattern="^\d+([,.]\d{2})?$"
              className="w-full bg-zinc-50 border border-zinc-300 p-3 rounded-xl font-mono text-sm text-zinc-900 outline-none focus:border-red-600 focus:bg-white focus:ring-1 focus:ring-red-600 transition-all duration-200 placeholder:text-zinc-400 peer"
            />
            <p className="mt-1 hidden peer-invalid:block text-[11px] text-red-600 font-medium">
              Formato richiesto: 00,00 (es. 49,99)
            </p>
          </div>

          {/* SELEZIONE SCONTO */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 block">
                Applica Sconto
              </label>
              <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                {discount === 0 ? "Nessuno" : `-${discount}%`}
              </span>
            </div>

            <div className="flex items-center h-[46px] bg-zinc-50 px-4 border border-zinc-300 rounded-xl">
              <input
                type="range"
                min="0"
                max="75"
                step="5"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-red-600 outline-none"
              />
            </div>
            <input type="hidden" name="discount" value={discount} />
          </div>
        </div>

        {/* ANTEPRIMA PREZZO FINALE */}
        {rawPrice && (
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 flex justify-between items-center">
            <div className="flex items-center gap-2 text-zinc-600 text-xs font-mono uppercase tracking-wider">
              <FontAwesomeIcon icon={faTag} className="text-red-600" />
              <span>Prezzo a Catalogo:</span>
            </div>
            <div className="text-right">
              {discount > 0 && (
                <span className="text-xs line-through text-zinc-400 mr-2 font-mono">
                  {rawPrice} €
                </span>
              )}
              <span className="text-xl font-black text-red-600 font-mono">
                {calculateFinalPrice()} €
              </span>
            </div>
          </div>
        )}

        {/* TAGLIE DISPONIBILI */}
        <div className="space-y-2 pt-4 border-t border-zinc-100">
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 block">
            Taglie Disponibili
          </label>
          <div className="flex gap-2">
            {availableSizes.map((size) => {
              const isSelected = selectedSizes.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`w-11 h-11 border text-xs font-mono font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-red-600 border-red-600 text-white shadow-sm"
                      : "bg-zinc-50 border-zinc-300 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-100"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>

          <input
            type="hidden"
            name="sizes"
            value={JSON.stringify(selectedSizes)}
          />
          <input type="hidden" name="images" value={JSON.stringify(images)} />
        </div>
      </div>

      {/* COLONNA DESTRA: MEDIA E INVIO (5 slot su 12) */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:border-l lg:border-zinc-100 lg:pl-8">
        {/* SEZIONE INPUT IMMAGINI */}
        <div className="space-y-3 w-full flex-1 flex flex-col">
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 block">
            Immagini del Prodotto *
          </label>

          <CldUploadWidget
            uploadPreset="gothik_store_preset"
            options={{
              cloudName: "dc8irqxrf",
              clientAllowedFormats: ["png", "jpg", "jpeg", "webp"],
              maxFileSize: 5000000,
            }}
            onSuccess={(res: any) => {
              if (res?.info?.public_id) {
                setImages((prev) => [...prev, res.info.public_id]);
              }
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="w-full h-36 border-2 border-dashed border-zinc-300 hover:border-red-500 hover:bg-red-50/50 rounded-2xl transition-all duration-200 flex flex-col items-center justify-center group cursor-pointer p-4 bg-zinc-50/50"
              >
                <FontAwesomeIcon
                  icon={faCloudArrowUp}
                  className="text-xl text-zinc-400 group-hover:text-red-600 transition-colors mb-2"
                />
                <span className="text-xs font-mono font-bold text-zinc-700 group-hover:text-red-600 transition-colors uppercase tracking-wider">
                  Carica Immagine
                </span>
                <span className="text-[11px] text-zinc-400 font-mono mt-1">
                  {images.length === 0
                    ? "Nessuna foto caricata"
                    : `${images.length} ${images.length === 1 ? "foto pronta" : "foto pronte"}`}
                </span>
              </button>
            )}
          </CldUploadWidget>

          {/* Griglia Anteprime */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-2.5 mt-2 max-h-[220px] overflow-y-auto pr-1">
              {images.map((img) => (
                <div
                  key={img}
                  className="aspect-square bg-zinc-100 rounded-xl border border-zinc-200 overflow-hidden relative group"
                >
                  <CldImage
                    width="150"
                    height="150"
                    src={img}
                    alt="Anteprima"
                    crop="fill"
                    className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
                  />

                  {/* Pulsante Rimuovi in hover */}
                  <button
                    type="button"
                    onClick={() => removeImage(img)}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 cursor-pointer text-white"
                    aria-label="Rimuovi immagine"
                  >
                    <div className="bg-red-600 p-2 rounded-full hover:bg-red-700 transition-colors">
                      <FontAwesomeIcon icon={faTrashCan} className="text-xs" />
                    </div>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BOTTONE PUBBLICA */}
        <div className="pt-4 border-t border-zinc-100 lg:border-t-0 lg:pt-0">
          <button
            type="submit"
            disabled={images.length === 0}
            className="w-full bg-zinc-900 hover:bg-red-600 disabled:bg-zinc-200 disabled:text-zinc-400 disabled:border-zinc-200 disabled:cursor-not-allowed text-white font-mono font-bold py-4 rounded-xl transition-all duration-200 uppercase text-xs tracking-widest shadow-sm cursor-pointer"
          >
            Pubblica Prodotto
          </button>
        </div>
      </div>
    </form>
  );
}