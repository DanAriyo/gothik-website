"use client";

import { Fragment } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import CloudinaryImage from "@/components/CloudinaryImage";

interface NavSidebarProps {
  categories: { id: string; name: string }[];
}

export default function NavSidebar({ categories }: NavSidebarProps) {
  return (
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
  );
}