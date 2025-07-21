export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Proplify",
    "description": "Nueva plataforma digital para inmobiliarias españolas. Automatiza marketing, integra Idealista/Fotocasa, CRM inmobiliario con IA. Próximamente disponible.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "description": "Prueba gratuita disponible"
    },
    "creator": {
      "@type": "Organization",
      "name": "Proplify Team",
      "url": "https://proplify.vercel.app"
    },
    "keywords": "software gestión inmobiliaria España, plataforma digital inmobiliarias, CRM inmobiliario español, automatización inmobiliaria SaaS",
    "audience": {
      "@type": "Audience",
      "audienceType": "Real Estate Professionals",
      "geographicArea": {
        "@type": "Country",
        "name": "Spain"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
