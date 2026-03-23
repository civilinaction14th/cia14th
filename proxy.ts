import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const isAuthenticated = request.cookies.get("auth-status")?.value === "true";

  if (!isAuthenticated) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/registrasi-lomba/:path*"],
};
