"use client";
import { useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { updateProductAction } from "@/lib/actions/productActions";
import Link from "next/link";

interface ProductEditProps {
  product: any;
  categories: any[];
}

export default function ProductEditComponent({
  product,
  categories,
}: ProductEditProps) {
  // Inizializziamo gli stati con i dati correnti del prodotto
  // Gestiamo il fallback sicuro nel caso in cui le immagini o le taglie siano stringhe JSON o già array
  const [images, setImages] = useState<string[]>(() => {
    if (!product.images) return [];
    if (Array.isArray(product.images)) return product.images;
    try {
      return JSON.parse(product.images);
    } catch {
      return [];
    }
  });

  const [selectedSizes, setSelectedSizes] = useState<string[]>(() => {
    if (!product.sizes) return [];
    if (Array.isArray(product.sizes)) return product.sizes;
    try {
      return JSON.parse(product.sizes);
    } catch {
      return [];
    }
  });

  const [rawPrice, setRawPrice] = useState(
    product.price ? product.price.toString().replace(".", ",") : "",
  );
  const [discount, setDiscount] = useState(product.discount || 0);
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

  // Uniamo l'ID del prodotto all'azione di aggiornamento del server
  const updateWithId = updateProductAction.bind(null, product.id);

  return (
    <div className="max-w-5xl mx-auto p-8 text-zinc-300">
      {/* TITOLO CENTRATO */}
      <div className="flex items-center mb-12 w-full">
        <h1 className="text-3xl font-black uppercase tracking-[0.2em] text-white text-center inline-block">
          Rimodella{" "}
          <span className="text-purple-500 shadow-purple-500/20 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            Articolo
          </span>
        </h1>
      </div>

      <form
        action={updateWithId}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-zinc-950 p-8 rounded-xl border border-zinc-900 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
      >
        {/* COLONNA SINISTRA: DATI DEL PRODOTTO (7 slot su 12) */}
        <div className="lg:col-span-7 space-y-6">
          {/* NOME PRODOTTO */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 block">
              Nome Prodotto *
            </label>
            <input
              name="name"
              type="text"
              required
              defaultValue={product.name}
              placeholder="Es. VESTE DEL CREPUSCOLO"
              className="w-full bg-black border border-zinc-800 focus:border-purple-600 p-3 rounded text-sm text-white outline-none transition-all duration-300 placeholder:text-zinc-700"
            />
          </div>

          {/* CATEGORIA */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 block">
              Categoria *
            </label>
            <div className="relative">
              <select
                name="categoryId"
                required
                defaultValue={product.categoryId}
                className="w-full bg-black border border-zinc-800 focus:border-purple-600 p-3 rounded text-sm text-zinc-400 focus:text-white outline-none transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="">Seleziona Categoria</option>
                {categories.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.id}
                    className="bg-black text-white"
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-600 text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* DESCRIZIONE */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 block">
              Descrizione Oscura
            </label>
            <textarea
              name="description"
              id="description"
              rows={5}
              defaultValue={product.description}
              placeholder="Descrivi l'articolo nel dettaglio..."
              className="w-full bg-black border border-zinc-800 p-3 rounded text-sm text-white focus:border-purple-600 outline-none placeholder:text-zinc-700 resize-none min-h-[120px] transition-colors duration-300"
              required
            />
          </div>

          {/* BLOCCO COMPATTO PREZZO E SCONTO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-900">
            {/* INPUT PREZZO */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 block">
                Prezzo Originale (€) *
              </label>
              <input
                name="price"
                type="text"
                required
                placeholder="00,00"
                value={rawPrice}
                onChange={(e) => setRawPrice(e.target.value)}
                pattern="^\d+([,.]\d{2})?$"
                className="w-full bg-black border border-zinc-800 p-3 rounded font-mono text-sm text-white outline-none focus:border-purple-600 transition-colors duration-300 placeholder:text-zinc-800 peer"
              />
              <p className="mt-1 hidden peer-invalid:block text-[9px] text-red-500 font-black uppercase tracking-tighter">
                Formato richiesto: 00,00
              </p>
            </div>

            {/* SELEZIONE SCONTO */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 block">
                  Applica Sconto
                </label>
                <span className="text-xs font-mono font-black text-purple-400 bg-purple-950/30 px-2 py-0.5 rounded border border-purple-900/40 min-w-[45px] text-center shadow-[0_0_10px_rgba(168,85,247,0.1)]">
                  {discount === 0 ? "NO" : `-${discount}%`}
                </span>
              </div>

              <div className="relative flex items-center h-[46px] bg-black px-4 border border-zinc-800 rounded">
                <input
                  type="range"
                  min="0"
                  max="75"
                  step="5"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-purple-600 outline-none
                    [&::-webkit-slider-runnable-track]:bg-zinc-900 [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-lg
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:-mt-[5px]
                    [&::-webkit-slider-thumb]:shadow-[0_0_10px_#a855f7] [&::-webkit-slider-thumb]:transition-all hover:[&::-webkit-slider-thumb]:scale-125 active:[&::-webkit-slider-thumb]:scale-110"
                />
              </div>
              <input type="hidden" name="discount" value={discount} />
            </div>
          </div>

          {/* VISUALIZZAZIONE RISULTATO PREZZO FINALE */}
          {rawPrice && (
            <div className="p-4 bg-black/40 rounded-lg border border-zinc-900 flex justify-between items-center transition-all">
              <span className="text-[10px] uppercase font-black tracking-widest text-zinc-500">
                A Catalogo:
              </span>
              <div className="text-right">
                {discount > 0 && (
                  <span className="text-xs line-through text-zinc-600 mr-2 font-mono">
                    {rawPrice}€
                  </span>
                )}
                <span className="text-2xl font-black text-purple-400 tracking-tighter font-mono">
                  {calculateFinalPrice()}€
                </span>
              </div>
            </div>
          )}

          {/* TAGLIE DISPONIBILI */}
          <div className="space-y-2 pt-4 border-t border-zinc-900">
            <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 block">
              Taglie Disponibili
            </label>
            <div className="flex gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`w-11 h-11 bg-black border text-xs font-black rounded transition-all duration-300 ${
                    selectedSizes.includes(size)
                      ? "bg-purple-950/30 border-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                      : "border-zinc-800 text-zinc-500 hover:border-purple-900/50 hover:text-zinc-300"
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

        {/* COLONNA DESTRA: MEDIA E AZIONI DI SALVATAGGIO (5 slot su 12) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:border-l lg:border-zinc-900 lg:pl-8">
          {/* SEZIONE INPUT IMMAGINI */}
          <div className="space-y-3 w-full flex-1 flex flex-col">
            <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 block">
              Immagini *
            </label>

            <CldUploadWidget
              uploadPreset="gothik_store_preset"
              options={{ cloudName: "dc8irqxrf" }}
              onSuccess={(res: any) => {
                setImages((prev) => [...prev, res.info.public_id]);
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="w-full h-36 border border-dashed border-zinc-800 rounded-xl hover:border-purple-600/60 hover:bg-purple-950/10 transition-all duration-300 flex flex-col items-center justify-center group cursor-pointer p-4"
                >
                  <span className="text-xs font-bold text-zinc-400 group-hover:text-purple-400 transition-colors uppercase tracking-widest">
                    Inserisci Altra Immagine
                  </span>
                  <span className="text-[9px] text-zinc-600 font-mono mt-2 uppercase tracking-tighter">
                    {images.length === 0
                      ? "Nessun file sacrificato"
                      : `${images.length} file pronti nell'abisso`}
                  </span>
                </button>
              )}
            </CldUploadWidget>

            {/* Griglia Anteprime delle immagini correnti */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                {images.map((img) => (
                  <div
                    key={img}
                    className="aspect-square bg-black rounded border border-zinc-800 overflow-hidden relative group shadow-inner"
                  >
                    <CldImage
                      width="150"
                      height="150"
                      src={img}
                      alt="Anteprima"
                      crop="fill"
                      className="object-cover w-full h-full opacity-70 group-hover:opacity-30 transition-all duration-300"
                    />

                    {/* Overlay Rimuovi */}
                    <button
                      type="button"
                      onClick={() => removeImage(img)}
                      className="absolute inset-0 bg-red-950/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200"
                    >
                      <span className="text-[8px] font-black uppercase tracking-widest bg-red-700 text-white px-2 py-1 rounded-sm shadow-md">
                        Rimuovi
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* BOTTONI DI AZIONE (Ancorati in fondo) */}
          <div className="pt-4 border-t border-zinc-900 lg:border-t-0 lg:pt-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/admin/products"
              className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white font-black py-4 rounded-lg transition-all duration-300 uppercase text-center text-xs tracking-[0.2em] border border-zinc-800"
            >
              Annulla
            </Link>
            <button
              type="submit"
              disabled={images.length === 0}
              className="flex-[2] bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-900/50 disabled:text-zinc-700 disabled:border-zinc-900 disabled:cursor-not-allowed text-white font-black py-4 rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_35px_rgba(168,85,247,0.4)] transition-all duration-300 uppercase text-xs tracking-[0.2em] border border-purple-500/30 disabled:shadow-none"
            >
              Aggiorna
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
