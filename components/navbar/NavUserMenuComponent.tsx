"use client";

import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserShield,
  faHistory,
  faGear,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { signIn, signOut } from "next-auth/react";
import { routes } from "@/lib/routes";

interface NavUserMenuProps {
  isAdmin: boolean;
  isAuthenticated: boolean;
  session: any;
}

export default function NavUserMenu({
  isAdmin,
  isAuthenticated,
  session,
}: NavUserMenuProps) {
  return (
    <Popover className="hover:text-red-500 transition relative">
      {({ open }) => (
        <>
          <PopoverButton className="flex items-center outline-none hover:text-red-500 transition-colors duration-300 focus:ring-0 cursor-pointer">
            {isAuthenticated && session?.user?.image ? (
              <Image
                src={session.user.image}
                alt="Profilo"
                width={28}
                height={28}
                className="rounded-full border border-red-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
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
            <PopoverPanel className="absolute right-0 z-50 mt-4 w-64 origin-top-right rounded-xl bg-black/95 backdrop-blur-xl border border-red-900/50 shadow-2xl ring-1 ring-red-500/20 outline-none">
              <div className="p-4">
                {!isAuthenticated ? (
                  /* STATO: NON LOGGATO */
                  <div className="text-center py-2">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-4">
                      Accedi
                    </p>
                    <button
                      onClick={() => signIn("google")}
                      className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold py-2 px-4 rounded-md hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faArrowRightToBracket} />
                      Login
                    </button>
                  </div>
                ) : (
                  /* STATO: LOGGATO */
                  <div className="space-y-1">
                    <div className="pb-3 mb-2 border-b border-red-900/30">
                      <p className="text-sm font-bold truncate text-zinc-200">
                        {session?.user?.name}
                      </p>
                    </div>

                    {isAdmin && (
                      <Link
                        href={routes.admin.dashboard}
                        className="flex items-center gap-3 p-2 text-sm text-red-400 hover:bg-red-900/20 rounded-lg transition font-bold"
                      >
                        <FontAwesomeIcon
                          icon={faUserShield}
                          className="w-4"
                        />
                        Dashboard Admin
                      </Link>
                    )}


                    <Link
                      href={routes.profile}
                      className="flex items-center gap-3 p-2 text-sm text-zinc-400 hover:bg-white/5 hover:text-white rounded-lg transition"
                    >
                      <FontAwesomeIcon icon={faUser} className="w-4" />
                      Profilo
                    </Link>

                    <button
                      onClick={() => signOut()}
                      className="w-full mt-2 flex items-center gap-3 p-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition border-t border-red-900/20 pt-3"
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
  );
}