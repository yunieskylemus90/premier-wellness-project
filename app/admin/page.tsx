import { redirect } from "next/navigation";
import { getChatGPTUser } from "../chatgpt-auth";
import AdminPanel from "./admin-panel";

function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export default async function AdminPage() {
  const user = await getChatGPTUser();
  const adminEmails = getAdminEmails();

  if (!user) redirect("/signin-with-chatgpt?return_to=/admin");
  if (!adminEmails.includes(user.email.toLowerCase())) redirect("/");

  return <AdminPanel adminEmail={user.email} />;
}
