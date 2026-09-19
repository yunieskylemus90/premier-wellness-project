"use client";

import { FormEvent, useState } from "react";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const password = new FormData(event.currentTarget).get("password");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (response.ok) {
      window.location.href = "/admin";
      return;
    }
    setError("Contraseña incorrecta");
    setLoading(false);
  }

  return <main className="admin-login-shell"><form className="admin-login-card" onSubmit={submit}><span className="admin-eyebrow">Premier Wellness</span><h1>Acceso administrativo</h1><p>Ingresa la contraseña para administrar los clientes.</p><label>Contraseña<input name="password" type="password" autoComplete="current-password" required /></label><button className="button primary" type="submit" disabled={loading}>{loading ? "Verificando..." : "Entrar"}</button>{error && <p className="form-message error">{error}</p>}</form></main>;
}