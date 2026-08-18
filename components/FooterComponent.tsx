"use client";

import {
  faInstagram,
  faTiktok,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function FooterComponent() {
  return (
    <footer className="border-t border-purple-900/30 bg-zinc-300 text-red-700 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Layout responsive: colonna su mobile, riga con estremi opposti da tablet/desktop */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
          
          {/* Elemento 1: Testo Copyright & Sicurezza (Sinistra su Desktop, Centro su Mobile) */}
          <div className="text-xs sm:text-sm md:text-base order-2 md:order-1 leading-relaxed">
            <p>
              © 2026 Gothik Store — Designed for the Darkness.
              <span className="hidden sm:inline"> </span>
              <br className="sm:hidden" />
              Acquisti sicuri e protetti.
            </p>
          </div>

          {/* Elemento 2: Social Links (Destra su Desktop, Centro su Mobile) */}
          <div className="flex items-center justify-center gap-6 text-xl sm:text-2xl order-1 md:order-2">
            <Link
              href="#"
              className="hover:text-purple-400 transition-colors duration-200"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link
              href="#"
              className="hover:text-purple-400 transition-colors duration-200"
              aria-label="TikTok"
            >
              <FontAwesomeIcon icon={faTiktok} />
            </Link>
            <Link
              href="#"
              className="hover:text-purple-400 transition-colors duration-200"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}