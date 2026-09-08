// ./proxy.ts
export { auth as proxy } from "@/auth";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { routes } from "@/lib/routes";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 1. Controlla se l'utente è autenticato tramite il token di NextAuth
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;

  // 2. Definiamo le rotte pubbliche accessibili a chi NON è loggato
  const isLandingPage = pathname === routes.landing || pathname === routes.about;
  const isAuthRoute = pathname.startsWith(routes.auth.signIn);
  const isStaticFile = pathname.startsWith("/_next") || pathname.includes(".");

  // Se è un file statico o una rotta di autenticazione, lascialo passare
  if (isStaticFile || isAuthRoute) {
    return NextResponse.next();
  }

  // 3. SE L'UTENTE NON È LOGGATO
  if (!isAuthenticated) {
    if (!isLandingPage) {
      const loginUrl = new URL(routes.auth.signIn, request.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 4. SE L'UTENTE È LOGGATO
  if (isAuthenticated && (isLandingPage || pathname.startsWith(routes.auth.signIn))) {
    return NextResponse.redirect(new URL(routes.home, request.url));
  }

  return NextResponse.next();
}

// Configura su quali rotte deve agire il "buttafuori"
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};