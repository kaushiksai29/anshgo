import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/media/")) {
    const normalized = pathname.replace(/_rw_\d+/g, "_rw_600");
    const finalPath = normalized.replace(/\.JPG$/i, ".jpg");
    if (finalPath !== pathname) {
      const url = request.nextUrl.clone();
      url.pathname = finalPath;
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/media/:path*",
};
