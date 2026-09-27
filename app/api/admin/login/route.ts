import { NextResponse } from "next/server";
import { env } from "cloudflare:workers";

const DEV_FALLBACK_PASSWORD = "premierwellness123";

export async function POST(request: Request) {
  const body = await request.json() as { password?: unknown };
  const suppliedPassword = typeof body.password === "string" ? body.password : "";
  const configuredPassword = (env as unknown as { ADMIN_PASSWORD?: string }).ADMIN_PASSWORD ?? process.env.ADMIN_PASSWORD;
  const isLocalDevFallback = !configuredPassword && process.env.NODE_ENV !== "production" && suppliedPassword === DEV_FALLBACK_PASSWORD;

  if ((!configuredPassword && !isLocalDevFallback) || (configuredPassword && suppliedPassword !== configuredPassword)) {
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