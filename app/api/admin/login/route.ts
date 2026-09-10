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
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error("[admin/login] ADMIN_PASSWORD is not configured.");
    return NextResponse.json({ error: "Admin login is not configured." }, { status: 500 });
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body.password || !safeCompare(body.password, adminPassword)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}
