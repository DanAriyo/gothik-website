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
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";

export default function NavBarComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black border-b border-purple-900/50 sticky top-0 z-50 text-white">
      <div className="mx-auto px-4 h-16 flex items-center justify-between">
        {/* LATO SINISTRO: Logo con Sidebar Popover */}
        <div className="flex items-center">
          <Popover>
            {({ open, close }) => (
              <div
                className="flex items-center"
                onMouseEnter={() => {
                  if (window.innerWidth >= 768 && !open) {
                    document.getElementById("logo-popover-btn")?.click();
                  }
                }}
                onMouseLeave={() => {
                  if (window.innerWidth >= 768 && open) {
                    close();
                  }
                }}
              >
                {/* Il Pulsante deve essere dentro Popover */}
                <PopoverButton
                  id="logo-popover-btn"
                  className="flex items-center outline-none focus:ring-0"
                >
                  <Image
                    src="/gothik-logo-dark.svg"
                    alt="Gothik Store Logo"
                    width={50}
                    height={50}
                    className={`object-contain transition-transform duration-300 ${
                      open ? "scale-110" : "hover:scale-110"
                    }`}
                    priority
                  />
                </PopoverButton>

                {/* La Transition e il Panel devono essere dentro Popover */}
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-300"
                  enterFrom="opacity-0 -translate-x-full"
                  enterTo="opacity-100 translate-x-0"
                  leave="transition ease-in duration-200"
                  leaveFrom="opacity-100 translate-x-0"
                  leaveTo="opacity-0 -translate-x-full"
                >
                  <PopoverPanel className="fixed left-0 top-0 z-[60] h-screen w-full sm:w-1/3 bg-black/95 backdrop-blur-2xl border-r border-purple-900/40 shadow-[10px_0_30px_rgba(0,0,0,0.5)] outline-none">
                    <div className="flex flex-col h-full p-8 relative">
                      {/* Bottone X per chiudere */}
                      <button
                        onClick={() => close()}
                        className="absolute top-6 right-6 text-zinc-500 hover:text-purple-500 transition-colors p-2"
                      >
                        <FontAwesomeIcon icon={faXmark} size="xl" />
                      </button>

                      {/* Contenuto Sidebar */}
                      <div className="mb-12">
                        <Image
                          src="/gothik-logo-dark.svg"
                          alt="Logo"
                          width={60}
                          height={60}
                          className="mb-4"
                        />
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-500">
                          Gothik Archive
                        </p>
                      </div>

                      <nav className="space-y-8 flex-1">
                        <Link
                          href="/chi-siamo"
                          onClick={() => close()}
                          className="group block"
                        >
                          <span className="text-2xl font-bold uppercase tracking-tighter group-hover:text-purple-400 transition">
                            Il Nostro Culto
                          </span>
                          <p className="text-xs text-zinc-500 lowercase">
                            scopri la nostra filosofia oscura
                          </p>
                        </Link>
                        {/* ... Altri Link ... */}
                      </nav>

                      <div className="pt-8 border-t border-purple-900/20">
                        <p className="text-[10px] text-zinc-600 uppercase tracking-widest">
                          © 2026 Gothik Store
                        </p>
                      </div>
                    </div>
                  </PopoverPanel>
                </Transition>
              </div>
            )}
          </Popover>
        </div>
        {/* CENTRO: Links Desktop (nascosti su mobile) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link href="/" className="group">
            <p className="md:text-3xl font-black uppercase tracking-tighter transition-colors duration-300 group-hover:text-zinc-200">
              Gothik<span className="text-purple-600"> - </span>Store
            </p>
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
    </nav>
  );
}
