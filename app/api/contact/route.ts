import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { contactRequests } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const language = body.language === "en" ? "en" : "es";
    if (name.length < 2 || name.length > 100 || phone.length < 7 || phone.length > 30 || email.length > 150) {
      return NextResponse.json({ error: "Invalid contact information" }, { status: 400 });
    }
    await getDb().insert(contactRequests).values({ name, phone, email: email || null, preferredLanguage: language, consent: true, createdAt: new Date().toISOString() });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact request failed", error);
    return NextResponse.json({ error: "Unable to save request" }, { status: 500 });
  }
}
