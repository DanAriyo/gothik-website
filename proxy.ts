// ./proxy.ts
export { auth as proxy } from "@/auth"

// Configura su quali rotte deve agire il "buttafuori"
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}