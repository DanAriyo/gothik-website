import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import {routes} from "@/lib/routes";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 1. Controlla se l'utente è autenticato tramite il token di NextAuth
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;

  // 2. Definiamo le rotte pubbliche accessibili a chi NON è loggato
  // (Includiamo la root "/" che funge da landing page e le pagine di autenticazione)
  const isLandingPage = pathname === routes.landing || pathname === routes.about ;
  const isAuthRoute = pathname.startsWith(routes.auth.signIn);
  const isStaticFile = pathname.startsWith("/_next") || pathname.includes(".");

  // Se è un file statico o una rotta di autenticazione, lascialo passare
  if (isStaticFile || isAuthRoute) {
    return NextResponse.next();
  }

  // 3. SE L'UTENTE NON È LOGGATO
  if (!isAuthenticated) {
    // Se tenta di accedere a qualsiasi cosa che NON sia la landing page (es. /home, /home?category=..., /admin, ecc.)
    if (!isLandingPage) {
      // Reindirizzalo alla pagina di login (puoi aggiungere un parametro ?callbackUrl se vuoi riportarlo dove era dopo il login)
      const loginUrl = new URL(routes.auth.signIn, request.url);
      return NextResponse.redirect(loginUrl);
    }
    // Se si trova sulla landing page, lascialo navigare liberamente
    return NextResponse.next();
  }

  // 4. SE L'UTENTE È LOGGATO
  // Se prova a tornare sulla landing page o sul login, rimandalo direttamente alla homepage dello shop
  if (isAuthenticated && (isLandingPage || pathname.startsWith(routes.auth.signIn))) {
    return NextResponse.redirect(new URL(routes.home, request.url));
  }

  return NextResponse.next();
}

// Configura il matcher per far girare il middleware su tutte le pagine tranne i file di sistema
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};