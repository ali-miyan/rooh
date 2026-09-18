import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isSiteLive() {
  const value = process.env.SITE_LIVE?.trim().toLowerCase();
  return value === "true" || value === "1" || value === "yes";
}

export function middleware(request: NextRequest) {
  if (isSiteLive()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (pathname === "/maintenance") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/maintenance";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all paths except static assets and Next.js internals.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?)$).*)",
  ],
};
