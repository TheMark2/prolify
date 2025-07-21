import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from 'next/font/google';
import "./globals.css";

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
  title: "Proplify - Plataforma SaaS para Inmobiliarias Españolas",
  description: "La plataforma todo-en-uno para inmobiliarias españolas. Gestiona propiedades, automatiza marketing, integra portales como Idealista y Fotocasa, y convierte más leads con IA.",
  keywords: "inmobiliaria, SaaS, Idealista, Fotocasa, Pisos.com, gestión propiedades, marketing inmobiliario, IA leads",
  authors: [{ name: "Proplify Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${plusJakarta.variable} ${lora.variable} font-sans antialiased bg-white text-[#171717]`}>
        {children}
      </body>
    </html>
  );
}
