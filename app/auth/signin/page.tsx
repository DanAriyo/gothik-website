// app/auth/signin/page.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { auth, signIn } from "@/auth";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";

export default async function SignInPage() {

  const session = await auth();
  if (session?.user) {
    redirect(routes.home);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-white px-4">
      <div className="w-full max-w-md space-y-8 p-10 rounded-2xl bg-zinc-950 border border-purple-900/20 shadow-[0_0_50px_rgba(168,85,247,0.05)]">
        <div className="text-center">
          <h1 className="text-2xl font-medium uppercase tracking-[0.3em] text-zinc-100">
            Gothik<span className="text-purple-600"> - </span>Auth
          </h1>
          <p className="mt-2 text-xs text-zinc-500 uppercase tracking-widest">
            Accedi all'oscurità
          </p>
        </div>

        <div className="space-y-4">
          {/* LOGIN CON GOOGLE */}
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: routes.home });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-lg font-bold uppercase text-[10px] tracking-widest hover:bg-purple-600 hover:text-white transition-all active:scale-95"
            >
              <FontAwesomeIcon icon={faGoogle} className="text-base" />
              Continua con Google
            </button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-800"></span>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-zinc-950 px-2 text-zinc-600 tracking-widest">
                Oppure
              </span>
            </div>
          </div>

          {/* FORM CREDENZIALI (Placeholder per ora) */}
          <div className="space-y-3 opacity-50 pointer-events-none">
            <input
              type="email"
              placeholder="EMAIL"
              className="w-full bg-transparent border border-zinc-800 p-3 rounded-lg text-xs outline-none focus:border-purple-500 transition-colors"
            />
            <button className="w-full border border-zinc-800 py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest">
              Accedi con Email
            </button>
          </div>
        </div>

        <p className="text-[9px] text-center text-zinc-700 uppercase tracking-[0.2em] leading-relaxed">
          Protezione crittografica attiva <br /> Sessioni gestite via Proxy
          sicuro
        </p>
      </div>
    </div>
  );
}
