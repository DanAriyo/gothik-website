"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-zinc-400 border-b border-red-5000 sticky top-0 z-50 text-white">
      <div className="mx-auto px-4 h-16 flex items-center justify-between">
        {/* LATO SINISTRO: Logo con Sidebar Popover */}
        <div className="flex items-center">
          <NavSidebar categories={categories} />
        </div>

        {/* CENTRO: Nome Store */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link href={routes.landing} className="group">
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
            <SearchBar />
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