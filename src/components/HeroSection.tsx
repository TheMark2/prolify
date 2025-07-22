'use client';

import { Button } from '@/components/ui/Button';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center space-y-8 justify-center">
        {/* Navigation */}
        <nav className="flex justify-center mb-8">
          <Link 
            href="/blog" 
            className="text-neutral-600 hover:text-black-950 font-medium transition-colors"
          >
            Blog
          </Link>
        </nav>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black-950 mb-4 leading-tight mt-4 sm:mt-6 lg:mt-8 px-2">
          Software de gestión inmobiliaria{' '}
          <span className="text-neutral-700 font-lora font-medium italic">plataforma digital todo-en-uno</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-black-600 max-w-4xl mx-auto leading-relaxed mt-4 sm:mt-6 lg:mt-8 px-4">
          Próximamente: CRM inmobiliario español completo. Automatiza marketing inmobiliario, integra Idealista y Fotocasa, 
          gestiona propiedades digitalmente y convierte más leads con IA. Únete a la lista de espera.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center sm:mt-16 mt-8">
          <Button
            variant="primary"
            size="md"
            icon={<RocketLaunchIcon className="w-4 h-4" />}
            onClick={() => {
              document.getElementById('email-capture')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            Únete a la lista de espera
          </Button>
        </div>

        {/* Hero Image */}
        <div className="mt-16 max-w-5xl mx-auto border border-neutral-200 rounded-xl">
          <Image 
            src="/HeroMuestra.png" 
            alt="Proplify Platform Preview" 
            width={1200} 
            height={800}
            className="w-full h-auto rounded-xl"
            priority
          />
        </div>
      </div>
    </div>
  );
}
