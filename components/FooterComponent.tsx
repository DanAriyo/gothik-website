"use client";

import {
  faInstagram,
  faTiktok,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faSkull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function FooterComponent() {
  return (
    <footer className="border-t border-purple-900/30 bg-zinc-300 text-red-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          {/* Colonna 1: Tutto a SINISTRA */}
          <div className="flex items-center gap-2 text-red-700 font-bold text-xl tracking-tighter justify-start">
            Gothik Store
          </div>

          {/* Colonna 2: Tutto al CENTRO */}
          <div className="text-center text-sm md:text-base">
            <p>
              © 2026 Gothik Store — Designed for the Darkness.
              <br className="md:hidden" />{" "}
              {/* Va a capo solo su mobile per estetica */}
              Acquisti sicuri e protetti.
            </p>
          </div>

          {/* Colonna 3: Tutto a DESTRA */}
          <div className="flex justify-center md:justify-end gap-5 text-2xl">
            <Link href="#" className="hover:text-purple-400 transition-colors">
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link href="#" className="hover:text-purple-400 transition-colors">
              <FontAwesomeIcon icon={faTiktok} />
            </Link>
            <Link href="#" className="hover:text-purple-400 transition-colors">
              <FontAwesomeIcon icon={faFacebook} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
