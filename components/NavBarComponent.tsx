"use client";

import { useState } from "react";
import Link from "next/link";
import CloudinaryImage from "./CloudinaryImage";
import { routes } from "@/lib/routes";
import SearchBar from "@/components/SearchBarComponent";
import NavSidebar from "@/components/navbar/NavSideBarComponent";
import NavUserMenu from "@/components/navbar/NavUserMenuComponent";

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="bg-zinc-400 border-b border-red-500 sticky top-0 z-50 text-white">
      <div className="mx-auto px-4 h-20 flex items-center justify-between relative">
        {/* LATO SINISTRO: Logo con Sidebar Popover */}
        <div className="flex items-center">
          <NavSidebar categories={categories} />
        </div>

        {/* CENTRO: Nome Store (Scompare solo su mobile quando la ricerca è aperta) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
          <Link
            href={routes.landing}
            className={`transition-all duration-300 ${
              isSearchOpen
                ? "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"
                : "opacity-100"
            }`}
          >
            <CloudinaryImage
              src="copy_of_img_0149_e8ap8v"
              alt="Gothik Store"
              width={120}
              height={40}
              className="object-contain"
            />
          </Link>
        </div>

        {/* LATO DESTRO: Icone Azione (Ricerca e Profilo) */}
        <div className="flex items-center gap-5 ml-auto">
          <div className="flex items-center gap-4">
            <SearchBar onSearchStateChange={setIsSearchOpen} />
          </div>

          {/* USER DROPDOWN POPOVER */}
          <NavUserMenu
            isAdmin={isAdmin}
            isAuthenticated={isAuthenticated}
            session={session}
          />
        </div>
      </div>
    </nav>
  );
}
