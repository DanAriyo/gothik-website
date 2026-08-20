// app/auth/signin/page.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { auth, signIn } from "@/auth";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth();
  if (session?.user) {
    redirect(routes.home);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100/70 text-zinc-900 py-12 px-4 sm:px-8">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl border border-zinc-200 shadow-sm space-y-6">
        
        {/* HEADER */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <p className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-red-600">
              Area Autenticata
            </p>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 uppercase">
            Accedi allo <span className="text-red-600">Store</span>
          </h1>
          <p className="text-xs text-zinc-500">
            Scegli come accedere al tuo account.
          </p>
        </div>

        <div className="space-y-6">
          {/* LOGIN CON GOOGLE */}
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: routes.home });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-zinc-900 hover:bg-red-600 text-white py-3.5 px-4 rounded-xl font-mono font-bold uppercase text-xs tracking-wider transition-colors duration-200 shadow-sm cursor-pointer"
            >
              <FontAwesomeIcon icon={faGoogle} className="text-sm" />
              <span>Continua con Google</span>
            </button>
          </form>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-mono">
              <span className="bg-white px-3 text-zinc-400 tracking-wider">
                Oppure tramite email
              </span>
            </div>
          </div>

          {/* FORM RESEND (Magic Link Passwordless) */}
          <form
            action={async (formData) => {
              "use server";
              await signIn("resend", formData);
            }}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 block">
                Indirizzo Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
                  <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="nome@dominio.it"
                  className="w-full bg-zinc-50 border border-zinc-300 focus:border-red-600 focus:bg-white focus:ring-1 focus:ring-red-600 pl-10 pr-4 py-3 rounded-xl text-sm font-mono text-zinc-900 outline-none transition-all placeholder:text-zinc-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled
              className="w-full flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-mono font-bold py-3.5 px-4 rounded-xl transition-colors duration-200 uppercase text-xs tracking-wider border border-zinc-200 cursor-pointer shadow-sm mt-2"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
              <span>Invia Magic Link</span>
            </button>
          </form>
        </div>

        <div className="pt-4 border-t border-zinc-100 text-center">
          <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest leading-relaxed">
            Riceverai un link temporaneo per accedere senza password
          </p>
        </div>

      </div>
    </div>
  );
}