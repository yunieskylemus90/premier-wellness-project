import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Rehabilitación después de un accidente | Premier Wellness Miami", description: "Solicita orientación y una evaluación en Premier Wellness Medical Center, Westchester. Atención en español e inglés después de un accidente.", keywords: ["rehabilitación después de accidente Miami", "clínica de accidentes Westchester", "accident rehabilitation Miami", "Premier Wellness Medical Center"], icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es"><body>{children}</body></html>; }
