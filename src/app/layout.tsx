import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from 'next/font/google';
import "./globals.css";
import StructuredData from '@/components/StructuredData';
import GlobalHeader from '@/components/GlobalHeader';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  style: 'italic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Proplify - Software Gestión Inmobiliaria España | Plataforma Digital Todo-en-Uno",
  description: "Nueva plataforma digital para inmobiliarias españolas. Automatiza marketing, integra Idealista/Fotocasa, CRM inmobiliario con IA. Únete a la lista de espera.",
  keywords: "software gestión inmobiliaria España, plataforma digital inmobiliarias, CRM inmobiliario español, automatización inmobiliaria SaaS, software captación leads inmobiliarios, gestión propiedades digital, marketing inmobiliario automatizado, Idealista integración, Fotocasa API, software inmobiliario español",
  authors: [{ name: "Proplify Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Proplify - Software Gestión Inmobiliaria España",
    description: "La plataforma digital todo-en-uno para inmobiliarias españolas. Automatiza tu negocio inmobiliario con IA.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proplify - Software Gestión Inmobiliaria España",
    description: "Plataforma digital para inmobiliarias: automatiza marketing, integra portales, convierte más leads.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${plusJakarta.variable} ${lora.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className={plusJakarta.variable}>
        <GlobalHeader />
        
        {/* Main Content */}
        <main className="min-h-screen bg-white">
          {children}
        </main>
      </body>
    </html>
  );
}
