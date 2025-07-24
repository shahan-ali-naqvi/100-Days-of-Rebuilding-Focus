import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/auth/login") {
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }
  
  if (req.auth && req.nextUrl.pathname === "/auth/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}