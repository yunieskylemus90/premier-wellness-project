import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AdminPanel from "./admin-panel";

export default async function AdminPage() {
  const session = (await cookies()).get("admin_session")?.value;
  if (session !== "authenticated") redirect("/admin/login");

  return <AdminPanel />;
}
