import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Next.js 16 renamed Middleware to Proxy — same file convention, same
// runtime. See node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md
//
// This performs only an *optimistic* check (cookie signature is valid and
// unexpired) so logged-out users are redirected before any admin UI is
// sent down. The Route Handlers / Server Components underneath still call
// verifyAdminSession() themselves (src/lib/session.ts) as the real
// authorization boundary — Proxy is not a substitute for that.

const COOKIE_NAME = "admin_session";

async function hasValidSessionCookie(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const secret = process.env.SESSION_SECRET;
  if (!secret) return false;

  try {
    await jwtVerify(token, new TextEncoder().encode(secret), { algorithms: ["HS256"] });
    return true;
  } catch {
    return false;
  }
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoginRoute = pathname === "/admin/login";
  const isAdminRoute = pathname.startsWith("/admin") && !isLoginRoute;

  if (isAdminRoute) {
    const authed = await hasValidSessionCookie(request);
    if (!authed) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (isLoginRoute) {
    const authed = await hasValidSessionCookie(request);
    if (authed) {
      return NextResponse.redirect(new URL("/admin/leads", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
