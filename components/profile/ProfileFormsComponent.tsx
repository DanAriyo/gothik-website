// src/components/profile/ProfileForms.tsx
"use client";

import { useState, useActionState, useEffect } from "react";
import {
  updateUserNameAction,
  updateUserEmailAction,
  ProfileActionResult,
} from "@/lib/actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCheck,
  faXmark,
  faUser,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

// --- FORM MODIFICA NOME ---
export function EditNameForm({ initialName }: { initialName: string | null }) {
  const [isEditing, setIsEditing] = useState(false);
  const [nameValue, setNameValue] = useState(initialName || "");
  const [state, formAction, isPending] = useActionState<ProfileActionResult, FormData>(
    updateUserNameAction,
    {}
  );

  useEffect(() => {
    if (state?.success) {
      setIsEditing(false);
    }
  }, [state]);

  const handleCancel = () => {
    setNameValue(initialName || "");
    setIsEditing(false);
  };

  return (
    <div className="p-5 bg-white border border-zinc-200 rounded-2xl shadow-sm space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faUser} className="text-red-600 text-xs" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
            Nome Completo
          </span>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-700 hover:text-red-600 transition-colors cursor-pointer"
          >
            <FontAwesomeIcon icon={faPenToSquare} className="text-[11px]" />
            <span>Modifica</span>
          </button>
        )}
      </div>

      {!isEditing ? (
        <p className="text-base font-bold text-zinc-900">
          {initialName || <span className="text-zinc-400 font-normal italic">Nessun nome impostato</span>}
        </p>
      ) : (
        <form action={formAction} className="space-y-3 pt-1">
          <input
            name="name"
            type="text"
            required
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            placeholder="Il tuo nome"
            className="w-full bg-zinc-50 border border-zinc-300 focus:border-red-600 focus:bg-white focus:ring-1 focus:ring-red-600 p-2.5 rounded-xl text-sm text-zinc-900 outline-none transition-all font-medium"
          />

          {state?.error && (
            <p className="text-xs font-medium text-red-600">{state.error}</p>
          )}

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isPending}
              className="px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-mono font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <FontAwesomeIcon icon={faXmark} />
              <span>Annulla</span>
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-zinc-900 hover:bg-red-600 text-white text-xs font-mono font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer disabled:bg-zinc-400"
            >
              <FontAwesomeIcon icon={faCheck} />
              <span>{isPending ? "Salvataggio..." : "Salva"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// --- FORM MODIFICA EMAIL ---
export function EditEmailForm({ initialEmail }: { initialEmail: string | null }) {
  const [isEditing, setIsEditing] = useState(false);
  const [emailValue, setEmailValue] = useState(initialEmail || "");
  const [state, formAction, isPending] = useActionState<ProfileActionResult, FormData>(
    updateUserEmailAction,
    {}
  );

  useEffect(() => {
    if (state?.success) {
      setIsEditing(false);
    }
  }, [state]);

  const handleCancel = () => {
    setEmailValue(initialEmail || "");
    setIsEditing(false);
  };

  return (
    <div className="p-5 bg-white border border-zinc-200 rounded-2xl shadow-sm space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faEnvelope} className="text-red-600 text-xs" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
            Indirizzo Email
          </span>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-700 hover:text-red-600 transition-colors cursor-pointer"
          >
            <FontAwesomeIcon icon={faPenToSquare} className="text-[11px]" />
            <span>Modifica</span>
          </button>
        )}
      </div>

      {!isEditing ? (
        <p className="text-base font-mono font-bold text-zinc-900">
          {initialEmail || <span className="text-zinc-400 font-normal italic">Nessuna email impostata</span>}
        </p>
      ) : (
        <form action={formAction} className="space-y-3 pt-1">
          <input
            name="email"
            type="email"
            required
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            placeholder="nome@dominio.it"
            className="w-full bg-zinc-50 border border-zinc-300 focus:border-red-600 focus:bg-white focus:ring-1 focus:ring-red-600 p-2.5 rounded-xl text-sm font-mono text-zinc-900 outline-none transition-all"
          />

          {state?.error && (
            <p className="text-xs font-medium text-red-600">{state.error}</p>
          )}

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isPending}
              className="px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-mono font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <FontAwesomeIcon icon={faXmark} />
              <span>Annulla</span>
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-zinc-900 hover:bg-red-600 text-white text-xs font-mono font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer disabled:bg-zinc-400"
            >
              <FontAwesomeIcon icon={faCheck} />
              <span>{isPending ? "Salvataggio..." : "Salva"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}