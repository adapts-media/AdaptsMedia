import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "SESSION_SECRET is not set. Generate one with `openssl rand -base64 32` and add it to your environment variables."
    );
  }
  return new TextEncoder().encode(secret);
}

export type AdminSessionPayload = {
  role: "admin";
  expiresAt: string;
};

export async function encryptSession(payload: AdminSessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function decryptSession(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), { algorithms: ["HS256"] });
    return payload as unknown as AdminSessionPayload;
  } catch {
    return null;
  }
}

/** Sets the signed admin session cookie. Call only after verifying credentials. */
export async function createAdminSession() {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const session = await encryptSession({ role: "admin", expiresAt: expiresAt.toISOString() });

  (await cookies()).set(COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteAdminSession() {
  (await cookies()).delete(COOKIE_NAME);
}

/**
 * Data Access Layer check: verifies the admin session for Server
 * Components, Route Handlers and Server Actions. This is the source of
 * truth for authorization — `proxy.ts` only does an optimistic redirect
 * so logged-out users don't briefly see admin UI flash by.
 */
export async function verifyAdminSession() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  const session = await decryptSession(token);
  return Boolean(session?.role === "admin");
}

export { COOKIE_NAME as ADMIN_SESSION_COOKIE };
