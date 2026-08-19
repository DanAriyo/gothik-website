// src/components/admin/DashboardCards.tsx
"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface StatCardProps {
  title: string;
  value: number;
  icon: IconDefinition;
}

export function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-900 flex items-center justify-between shadow-lg">
      <div>
        <p className="text-[10px] uppercase font-black tracking-widest text-zinc-500">
          {title}
        </p>
        <p className="text-3xl font-black mt-2 text-white font-mono tracking-tighter">
          {value}
        </p>
      </div>
      <div className="w-10 h-10 bg-black border border-zinc-800 rounded flex items-center justify-center text-red-500 shadow-[0_0_15px_rgba(168,85,247,0.05)]">
        <FontAwesomeIcon icon={icon} className="text-sm" />
      </div>
    </div>
  );
}

interface AdminLinkProps {
  href: string;
  label: string;
  icon: IconDefinition;
}

export function AdminLink({ href, label, icon }: AdminLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 bg-black border border-zinc-800 hover:border-purple-600 p-4 rounded transition-all duration-300 group shadow-inner"
    >
      <div className="w-8 h-8 rounded bg-zinc-900/50 border border-zinc-800 group-hover:border-purple-900 flex items-center justify-center transition-colors">
        <FontAwesomeIcon
          icon={icon}
          className="text-zinc-500 group-hover:text-purple-400 group-hover:scale-110 transition text-xs"
        />
      </div>
      <span className="font-bold text-xs uppercase tracking-wider text-zinc-400 group-hover:text-white transition-colors">
        {label}
      </span>
    </Link>
  );
}