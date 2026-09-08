// components/SearchBar.tsx
"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  onSearchStateChange?: (isOpen: boolean) => void;
}

export default function SearchBar({ onSearchStateChange }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const inputRef = useRef<HTMLInputElement>(null);

  // Comunica lo stato di apertura al genitore
  const handleOpenToggle = (openState: boolean) => {
    setIsOpen(openState);
    if (onSearchStateChange) {
      onSearchStateChange(openState);
    }
  };

  // Focus automatico sull'input quando si clicca la lente
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Sincronizza l'input se la query cambia nell'URL
  useEffect(() => {
    setQuery(searchParams.get("search") || "");
  }, [searchParams]);

  // Esegue la ricerca solo quando si preme INVIO
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (query.trim()) {
      params.set("search", query.trim());
    } else {
      params.delete("search");
    }

    startTransition(() => {
      const targetPath = pathname === "/" ? "/home" : pathname;
      router.push(`${targetPath}?${params.toString()}`);
    });
  };

  // Chiude la barra e rimuove il parametro di ricerca
  const handleClose = () => {
    handleOpenToggle(false);
    setQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative flex items-center">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => handleOpenToggle(true)}
          className="text-white hover:text-red-500 transition-colors duration-300 p-2 outline-none cursor-pointer"
          title="Cerca nel catalogo"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-base" />
        </button>
      ) : (
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center bg-zinc-900/95 border border-zinc-700 rounded-full px-3 py-1.5 shadow-2xl backdrop-blur-md transition-all duration-300 absolute right-0 z-50"
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-zinc-500 text-xs mr-2"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca..."
            className="bg-transparent text-xs text-white placeholder-zinc-500 outline-none w-44 sm:w-48 font-mono"
          />
          <button
            type="button"
            onClick={handleClose}
            className="text-white hover:text-red-500 transition-colors duration-300 ml-2 p-1 text-xs cursor-pointer"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </form>
      )}
    </div>
  );
}
