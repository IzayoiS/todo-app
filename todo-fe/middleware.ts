import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (!token && pathname.startsWith("/todos")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/todos", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/todos"],
};
