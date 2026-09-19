"use client";

import { useEffect, useState } from "react";
import { LogOut, RefreshCw, Search, Trash2 } from "lucide-react";

type Contact = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  preferredLanguage: string;
  consent: boolean;
  source: string;
  createdAt: string;
};

export default function AdminPanel() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadContacts() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/contacts", { cache: "no-store" });
      if (!response.ok) throw new Error("No se pudieron cargar los contactos");
      const data = await response.json() as { contacts: Contact[] };
      setContacts(data.contacts);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Error al cargar");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadContacts(); }, []);

  async function removeContact(id: number) {
    if (!window.confirm("¿Eliminar esta solicitud de contacto?")) return;
    const response = await fetch(`/api/admin/contacts?id=${id}`, { method: "DELETE" });
    if (!response.ok) {
      setError("No se pudo eliminar el contacto");
      return;
    }
    setContacts((current) => current.filter((contact) => contact.id !== id));
  }

  const visibleContacts = contacts.filter((contact) =>
    [contact.name, contact.phone, contact.email ?? ""].join(" ").toLowerCase().includes(query.toLowerCase())
  );

  return <main className="admin-shell">
    <header className="admin-header">
      <div><span className="admin-eyebrow">Premier Wellness</span><h1>Panel de administración</h1><p>Solicitudes recibidas desde el sitio web.</p></div>
      <div className="admin-actions"><a className="admin-logout" href="/api/admin/logout"><LogOut size={16}/> Salir</a></div>
    </header>
    <section className="admin-content">
      <div className="admin-toolbar"><div><strong>{contacts.length}</strong><span>solicitudes</span></div><label className="admin-search"><Search size={17}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nombre, teléfono o correo" /></label><button className="admin-refresh" onClick={() => void loadContacts()} disabled={loading} aria-label="Actualizar contactos"><RefreshCw size={17}/></button></div>
      {error && <p className="admin-error">{error}</p>}
      {loading ? <p className="admin-empty">Cargando solicitudes...</p> : visibleContacts.length === 0 ? <p className="admin-empty">No hay solicitudes que mostrar.</p> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Cliente</th><th>Contacto</th><th>Idioma</th><th>Fecha</th><th><span className="sr-only">Acciones</span></th></tr></thead><tbody>{visibleContacts.map((contact) => <tr key={contact.id}><td><strong>{contact.name}</strong><small>{contact.source}</small></td><td><a href={`tel:${contact.phone}`}>{contact.phone}</a>{contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}</td><td>{contact.preferredLanguage === "en" ? "English" : "Español"}</td><td>{new Date(contact.createdAt).toLocaleString("es-US", { dateStyle: "medium", timeStyle: "short" })}</td><td><button className="admin-delete" onClick={() => void removeContact(contact.id)} aria-label={`Eliminar a ${contact.name}`}><Trash2 size={16}/></button></td></tr>)}</tbody></table></div>}
    </section>
  </main>;
}
