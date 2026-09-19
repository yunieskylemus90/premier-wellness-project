import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { getChatGPTUser } from "../../../chatgpt-auth";
import { getDb } from "@/db";
import { contactRequests } from "@/db/schema";

function isAdmin(email: string) {
  return (process.env.ADMIN_EMAILS ?? "").split(",").map((value) => value.trim().toLowerCase()).includes(email.toLowerCase());
}

async function requireAdmin() {
  const user = await getChatGPTUser();
  return user && isAdmin(user.email) ? user : null;
}

export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const contacts = await getDb().select().from(contactRequests).orderBy(desc(contactRequests.createdAt));
  return NextResponse.json({ contacts });
}

export async function DELETE(request: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!Number.isInteger(id)) return NextResponse.json({ error: "Invalid contact id" }, { status: 400 });
  await getDb().delete(contactRequests).where(eq(contactRequests.id, id));
  return NextResponse.json({ ok: true });
}
