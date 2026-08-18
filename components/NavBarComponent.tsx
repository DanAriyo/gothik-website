"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faXmark,
  faUserShield,
  faHistory,
  faGear,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import CloudinaryImage from "./CloudinaryImage";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import SearchBar from "@/components/SearchBarComponent";

// Definiamo i tipi per le props che arrivano dal Layout
interface NavBarProps {
  isAdmin: boolean;
  isAuthenticated: boolean;
  session: any;
  categories: { id: string; name: string }[];
}

export default function NavBarComponent({
  isAdmin,
  isAuthenticated,
  session,
  categories,
}: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-zinc-400 border-b border-red-5000 sticky top-0 z-50 text-white">
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
                <PopoverButton
                  id="logo-popover-btn"
                  className="flex items-center outline-none focus:ring-0"
                >
                  <FontAwesomeIcon icon={faBars} />
                </PopoverButton>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-300"
                  enterFrom="opacity-0 -translate-x-full"
                  enterTo="opacity-100 translate-x-0"
                  leave="transition ease-in duration-200"
                  leaveFrom="opacity-100 translate-x-0"
                  leaveTo="opacity-0 -translate-x-full"
                >
                  <PopoverPanel className="fixed left-0 top-0 z-[60] h-screen w-full sm:w-1/3 bg-zinc-400 backdrop-blur-2xl border-r border-red-500 shadow-[10px_0_30px_rgba(0,0,0,0.5)] outline-none">
                    <div className="flex flex-col h-full p-8 relative">
                      <button
                        onClick={() => close()}
                        className="absolute top-6 right-6 text-red-700 hover:text-red-900 transition-colors p-2"
                      >
                        <FontAwesomeIcon icon={faXmark} size="xl" />
                      </button>

                      <div className="mb-12">
                        <CloudinaryImage
                          src="copy_of_img_0149_e8ap8v"
                          alt="Gothik Store"
                          width={200}
                          height={80}
                          className=""
                        />
                      </div>

                      {/* CONTENUTO NAVIGAZIONE CON SCROLLBAR PERSONALIZZATA */}
                      <nav className="flex-1 overflow-y-auto pr-4 space-y-12 custom-scrollbar">
                        {/* 1. SEZIONE BRAND */}
                        <div>
                          <Link
                            href="/about-us"
                            onClick={() => close()}
                            className="group block"
                          >
                            <span className="text-xl text-red-700 font-bold uppercase tracking-tighter group-hover:text-red-900 transition duration-300">
                              About Us
                            </span>
                          </Link>
                        </div>

                        {/* 2. SEZIONE SETTORI (CATEGORIE) */}
                        <div className="space-y-6">
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 border-b border-red-500 pb-2">
                            Categorie
                          </p>

                          <div className="flex flex-col gap-5">
                            {categories && categories.length > 0 ? (
                              categories.map((cat) => (
                                <Link
                                  key={cat.id}
                                  href={`/home?category=${cat.id}`}
                                  onClick={() => close()}
                                  className="group flex items-center justify-between transition-all"
                                >
                                  <span className="text-lg font-medium text-red-700 group-hover:text-white group-hover:translate-x-2 transition-all duration-300 uppercase tracking-wider">
                                    {cat.name}
                                  </span>
                                </Link>
                              ))
                            ) : (
                              <p className="text-xs italic text-zinc-700">
                                Nessuna categoria disponibile al momento.
                              </p>
                            )}
                          </div>
                        </div>
                      </nav>

                      <div className="pt-8 border-t border-red-500 mt-auto">
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
        {/* CENTRO: Nome Store */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link href= {routes.landing} className="group">
            <CloudinaryImage
              src="copy_of_img_0149_e8ap8v"
              alt="Gothik Store"
              width={100}
              height={40}
              className=""
            />
          </Link>
        </div>

        {/* LATO DESTRO: Icone Azione (Profilo e Carrello) */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-4">
            <SearchBar/>
          </div>
          {/* USER DROPDOWN POPOVER */}
          <Popover className="hover:text-purple-500 transition relative">
            {({ open }) => (
              <>
                <PopoverButton className="flex items-center outline-none hover:text-red-500 transition-colors duration-300 focus:ring-0 cursor-pointer">
                  {isAuthenticated && session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Profilo"
                      width={28}
                      height={28}
                      className="rounded-full border border-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faUser} className="text-lg" />
                  )}
                </PopoverButton>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <PopoverPanel className="absolute right-0 z-50 mt-4 w-64 origin-top-right rounded-xl bg-black/95 backdrop-blur-xl border border-purple-900/50 shadow-2xl ring-1 ring-purple-500/20 outline-none">
                    <div className="p-4">
                      {!isAuthenticated ? (
                        /* STATO: NON LOGGATO */
                        <div className="text-center py-2">
                          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-4">
                            Accedi
                          </p>
                          <button
                            onClick={() => signIn("google")}
                            className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold py-2 px-4 rounded-md hover:bg-purple-600 hover:text-white transition-all duration-300"
                          >
                            <FontAwesomeIcon icon={faArrowRightToBracket} />
                            Login
                          </button>
                        </div>
                      ) : (
                        /* STATO: LOGGATO */
                        <div className="space-y-1">
                          <div className="pb-3 mb-2 border-b border-purple-900/30">
                            <p className="text-sm font-bold truncate text-zinc-200">
                              {session?.user?.name}
                            </p>
                          </div>

                          {isAdmin && (
                            <Link
                              href="/admin/dashboard"
                              className="flex items-center gap-3 p-2 text-sm text-purple-400 hover:bg-purple-900/20 rounded-lg transition font-bold"
                            >
                              <FontAwesomeIcon
                                icon={faUserShield}
                                className="w-4"
                              />
                              Dashboard Admin
                            </Link>
                          )}

                          <Link
                            href="/orders"
                            className="flex items-center gap-3 p-2 text-sm text-zinc-400 hover:bg-white/5 hover:text-white rounded-lg transition"
                          >
                            <FontAwesomeIcon icon={faHistory} className="w-4" />
                            I miei ordini
                          </Link>

                          <Link
                            href="/profile"
                            className="flex items-center gap-3 p-2 text-sm text-zinc-400 hover:bg-white/5 hover:text-white rounded-lg transition"
                          >
                            <FontAwesomeIcon icon={faGear} className="w-4" />
                            Impostazioni
                          </Link>

                          <button
                            onClick={() => signOut()}
                            className="w-full mt-2 flex items-center gap-3 p-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition border-t border-purple-900/20 pt-3"
                          >
                            <FontAwesomeIcon
                              icon={faArrowRightToBracket}
                              className="rotate-180 w-4"
                            />
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  </PopoverPanel>
                </Transition>
              </>
            )}
          </Popover>

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
