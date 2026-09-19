import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json() as { password?: unknown };
  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (!configuredPassword || body.password !== configuredPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_session", "authenticated", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}