"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check, Languages, MapPin, Menu, Phone, ShieldCheck, X } from "lucide-react";

const copy = {
  es: {
    nav: ["Inicio", "Cómo podemos ayudarte", "Nuestra clínica", "Contacto"], badge: "Atención en español e inglés",
    title: "¿Tuviste un accidente? Da el primer paso hacia tu rehabilitación.",
    intro: "Habla con nuestro equipo en Westchester para recibir orientación sobre una evaluación y conocer las opciones disponibles para tu recuperación.",
    call: "Llamar ahora", appointment: "Quiero que me llamen", addressLabel: "Respuesta rápida", hours: "Tus datos se mantienen privados", trust: "Atención en español e inglés",
    quickTitle: "Solicita una llamada", quickText: "Completa estos datos y nuestro equipo se comunicará contigo.",
    helpEyebrow: "Tu próximo paso", helpTitle: "Atención pensada para después de un accidente", helpText: "Comenzamos escuchándote, evaluamos tu condición y te explicamos los próximos pasos sin complicaciones.",
    cards: [["Evaluación inicial", "Una conversación clara para entender cómo te sientes y orientarte correctamente."], ["Plan de recuperación", "Recomendaciones personalizadas según la evaluación y los servicios disponibles."], ["Atención bilingüe", "Comunícate cómodamente en español o inglés durante todo el proceso."]],
    locationTitle: "Estamos en el corazón de Westchester", locationText: "Fácil acceso desde Coral Way, Bird Road, Kendall y áreas cercanas de Miami.",
    formTitle: "Solicita que te llamemos", formText: "Déjanos tus datos de contacto. No incluyas diagnósticos, lesiones ni información de seguro.",
    name: "Nombre y apellido", phone: "Teléfono", email: "Correo electrónico", language: "Idioma preferido", submit: "Solicitar llamada", consent: "Al enviar, aceptas recibir una llamada relacionada con tu solicitud.", footer: "La información de este sitio es educativa y no sustituye una evaluación médica."
  },
  en: {
    nav: ["Home", "How we help", "Our clinic", "Contact"], badge: "Care in English and Spanish",
    title: "Were you in an accident? Take the first step toward rehabilitation.",
    intro: "Speak with our Westchester team about an evaluation and learn about the options available to support your recovery.",
    call: "Call now", appointment: "Call me back", addressLabel: "Prompt response", hours: "Your contact details stay private", trust: "Care in English and Spanish",
    quickTitle: "Request a call", quickText: "Share your contact details and our team will reach out.",
    helpEyebrow: "Your next step", helpTitle: "Care designed for life after an accident", helpText: "We start by listening, evaluate your condition and explain the next steps without unnecessary complexity.",
    cards: [["Initial evaluation", "A clear conversation to understand how you feel and guide you appropriately."], ["Recovery plan", "Personalized recommendations based on your evaluation and available services."], ["Bilingual care", "Communicate comfortably in English or Spanish throughout the process."]],
    locationTitle: "In the heart of Westchester", locationText: "Convenient access from Coral Way, Bird Road, Kendall and nearby Miami communities.",
    formTitle: "Ask us to call you", formText: "Leave your contact information. Do not include diagnoses, injuries or insurance information.",
    name: "Full name", phone: "Phone", email: "Email address", language: "Preferred language", submit: "Request a call", consent: "By submitting, you agree to receive a call regarding your request.", footer: "This website provides educational information and does not replace a medical evaluation."
  }
} as const;

export default function Home() {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const t = copy[lang];
  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setFormState("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error("Request failed");
      form.reset(); setFormState("success");
    } catch { setFormState("error"); }
  }
  return <main>
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Premier Wellness Medical Center"><span className="brand-mark">PW</span><span><strong>Premier Wellness</strong><small>Medical Center</small></span></a>
      <nav className={menuOpen ? "nav open" : "nav"} aria-label="Primary navigation">{t.nav.map((item, i) => <a key={item} href={["#inicio", "#ayuda", "#clinica", "#contacto"][i]} onClick={() => setMenuOpen(false)}>{item}</a>)}<a className="nav-phone" href="tel:+17868172979"><Phone size={16}/> (786) 817-2979</a></nav>
      <button className="language" onClick={() => setLang(lang === "es" ? "en" : "es")} aria-label="Change language"><Languages size={17}/> {lang === "es" ? "EN" : "ES"}</button>
      <a className="header-call" href="tel:+17868172979"><Phone size={17}/> (786) 817-2979</a>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">{menuOpen ? <X/> : <Menu/>}</button>
    </header>
    <section className="hero" id="inicio">
      <div className="hero-copy"><div className="eyebrow"><span/> {t.badge}</div><h1>{t.title}</h1><p className="hero-intro">{t.intro}</p>
        <div className="hero-actions"><a className="button primary" href="tel:+17868172979"><Phone size={18}/> {t.call}</a><a className="button secondary" href="#contacto">{t.appointment} <ArrowRight size={18}/></a></div>
        <div className="trust-line"><ShieldCheck size={19}/> {t.trust}</div></div>
      <div className="hero-visual" aria-label="Premier Wellness clinic welcome area"><div className="visual-glow"/><form className="lead-card" onSubmit={submitContact}><span className="lead-kicker"><Check size={15}/> {t.addressLabel}</span><h2>{t.quickTitle}</h2><p>{t.quickText}</p><label>{t.name}<input name="name" autoComplete="name" required maxLength={100}/></label><label>{t.phone}<input name="phone" type="tel" autoComplete="tel" required maxLength={30}/></label><input type="hidden" name="language" value={lang}/><button className="button primary" type="submit" disabled={formState === "sending"}>{formState === "sending" ? (lang === "es" ? "Enviando..." : "Sending...") : t.appointment} <ArrowRight size={18}/></button><small>{t.hours}</small>{formState === "success" && <p className="form-message success">{lang === "es" ? "Recibimos tu solicitud. Te contactaremos pronto." : "We received your request. We will contact you soon."}</p>}{formState === "error" && <p className="form-message error">{lang === "es" ? "Llámanos al (786) 817-2979." : "Please call (786) 817-2979."}</p>}</form></div>
    </section>
    <section className="help-section" id="ayuda"><div className="section-heading"><span>{t.helpEyebrow}</span><h2>{t.helpTitle}</h2><p>{t.helpText}</p></div><div className="card-grid">{t.cards.map(([title, body], index) => <article className="service-card" key={title}><span className="card-number">0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    <section className="location-section" id="clinica"><div className="location-panel"><MapPin size={28}/><div><span>Westchester · Miami</span><h2>{t.locationTitle}</h2><p>{t.locationText}</p></div></div><a className="button light" href="https://maps.google.com/?q=2780+SW+87th+Ave+Suite+108+Miami+FL+33165" target="_blank" rel="noreferrer">Google Maps <ArrowRight size={18}/></a></section>
    <section className="contact-section" id="contacto"><div className="contact-copy"><span>Premier Wellness</span><h2>{t.formTitle}</h2><p>{t.formText}</p></div><form className="contact-form" onSubmit={submitContact}><label>{t.name}<input name="name" autoComplete="name" required maxLength={100}/></label><div className="form-row"><label>{t.phone}<input name="phone" type="tel" autoComplete="tel" required maxLength={30}/></label><label>{t.email}<input name="email" type="email" autoComplete="email" maxLength={150}/></label></div><label>{t.language}<select name="language" defaultValue={lang}><option value="es">Español</option><option value="en">English</option></select></label><button className="button primary" type="submit" disabled={formState === "sending"}>{formState === "sending" ? (lang === "es" ? "Enviando..." : "Sending...") : t.submit} <ArrowRight size={18}/></button><small>{t.consent}</small>{formState === "success" && <p className="form-message success">{lang === "es" ? "Gracias. Recibimos tu solicitud y te contactaremos pronto." : "Thank you. We received your request and will contact you soon."}</p>}{formState === "error" && <p className="form-message error">{lang === "es" ? "No pudimos enviar la solicitud. Llámanos al (786) 817-2979." : "We could not send your request. Please call (786) 817-2979."}</p>}</form></section>
    <footer><div className="brand footer-brand"><span className="brand-mark">PW</span><span><strong>Premier Wellness</strong><small>Medical Center</small></span></div><p>{t.footer}</p><p>© 2026 Premier Wellness Medical Center</p></footer><div className="mobile-cta"><a href="tel:+17868172979"><Phone size={18}/> {t.call}</a><a href="#inicio">{t.appointment}</a></div>
  </main>;
}
