import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { contactRequests } from "@/db/schema";

const validSources = new Set(["website", "landing", "google_maps", "call", "admin"]);

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const language = body.language === "en" ? "en" : "es";
    const rawSource = typeof body.source === "string" ? body.source.trim().toLowerCase() : "website";
    const source = validSources.has(rawSource) ? rawSource : "website";
    const status = typeof body.status === "string" && ["new", "contacted", "follow_up", "closed"].includes(body.status) ? body.status : "new";
    const emailValid = email.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (name.length < 2 || name.length > 100 || phone.length < 7 || phone.length > 30 || email.length > 150 || !emailValid) {
      return NextResponse.json({ error: "Invalid contact information" }, { status: 400 });
    }

    await getDb().insert(contactRequests).values({
      name,
      phone,
      email: email || null,
      preferredLanguage: language,
      consent: true,
      status,
      source,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact request failed", error);
    return NextResponse.json({ error: "Unable to save request" }, { status: 500 });
  }
}
