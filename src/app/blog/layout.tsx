import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Software Gestión Inmobiliaria | Proplify',
  description: 'Artículos sobre software inmobiliario, automatización, CRM para inmobiliarias y tendencias del sector inmobiliario español.',
  keywords: 'blog inmobiliario, software inmobiliario, CRM inmobiliarias, automatización inmobiliaria, tendencias inmobiliarias España',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
