"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faBars,
  faUser,
  faXmark,
  faSkull,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NavBarComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black border-b border-purple-900/50 sticky top-0 z-50 text-white">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* LATO SINISTRO: Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/gothik-logo-dark.svg"
            alt="Gothik Store Logo"
            width={50}
            height={50}
            className="object-contain"
            priority
          />
        </Link>

        {/* CENTRO: Links Desktop (nascosti su mobile) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link href="/shop" className="hover:text-purple-400 transition">
            Shop
          </Link>
          <Link
            href="/new-arrivals"
            className="hover:text-purple-400 transition"
          >
            Novità
          </Link>
          <Link href="/about" className="hover:text-purple-400 transition">
            Dark World
          </Link>
        </div>

        {/* LATO DESTRO: Icone Azione */}
        <div className="flex items-center gap-5">
          {/* User Icon - Nascosta su mobile molto piccolo per pulizia */}
          <Link
            href="/profile"
            className="hidden sm:block hover:text-purple-500 transition"
          >
            <FontAwesomeIcon icon={faUser} />
          </Link>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="hover:text-purple-500 transition relative"
          >
            <FontAwesomeIcon icon={faCartArrowDown} />
            {/* Badge opzionale per il numero di oggetti */}
            <span className="absolute -top-2 -right-2 bg-purple-600 text-[10px] rounded-full px-1.5 py-0.5">
              0
            </span>
          </Link>

          {/* Toggle Menu Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-purple-500 text-xl focus:outline-none"
          >
            <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
          </button>
        </div>
      </div>

      {/* MENU MOBILE: Appare solo quando isMenuOpen è true */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-purple-900/30 animate-in slide-in-from-top duration-300">
          <div className="px-4 py-6 space-y-4">
            <Link href="/shop" className="block text-lg hover:text-purple-400">
              Shop
            </Link>
            <Link
              href="/new-arrivals"
              className="block text-lg hover:text-purple-400"
            >
              Novità
            </Link>
            <Link
              href="/profile"
              className="block text-lg hover:text-purple-400"
            >
              Profilo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
