import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { createAdminSession } from "@/lib/session";

function safeCompare(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  // timingSafeEqual throws on mismatched lengths, so pad instead of
  // short-circuiting on length (which would itself leak timing info).
  if (bufA.length !== bufB.length) {
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export async function POST(request: Request) {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminUsername || !adminPassword) {
    console.error("[admin/login] ADMIN_USERNAME / ADMIN_PASSWORD is not configured.");
    return NextResponse.json({ error: "Admin login is not configured." }, { status: 500 });
  }

  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const usernameOk = Boolean(body.username) && safeCompare(body.username!, adminUsername);
  const passwordOk = Boolean(body.password) && safeCompare(body.password!, adminPassword);

  // Check both before responding (rather than short-circuiting on the
  // first mismatch) so a wrong username alone doesn't respond faster
  // than a wrong password, which would leak which one was wrong.
  if (!usernameOk || !passwordOk) {
    return NextResponse.json({ error: "Incorrect username or password" }, { status: 401 });
  }

  await createAdminSession(adminUsername);
  return NextResponse.json({ ok: true });
}
