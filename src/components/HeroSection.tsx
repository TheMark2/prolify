'use client';

import { Button } from '@/components/ui/Button';
import { PlayIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24">
      <div className="text-center space-y-8 sm:space-y-12 lg:space-y-16 justify-center">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <Image src="/proplify.png" alt="Logo" width={100} height={100} />
        </div>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black-950 mb-4 leading-tight mt-4 sm:mt-6 lg:mt-8 px-2">
          La plataforma todo-en-uno para{' '}
          <span className="text-neutral-700 font-lora font-medium italic">inmobiliarias</span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-black-600 max-w-4xl mx-auto leading-relaxed mt-4 sm:mt-6 lg:mt-8 px-4">
          Gestiona propiedades, automatiza marketing, integra con todo tipo de portales, 
          y convierte más leads con IA. Todo esto y mucho mas desde una sola plataforma.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center mt-6 sm:mt-8 px-4">
          <Button
            variant="primary"
            size="md"
            icon={<RocketLaunchIcon className="w-4 h-4" />}
            onClick={() => {
              document.getElementById('email-capture')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
            className="w-full sm:w-auto max-w-sm"
          >
            Únete a la lista de espera
          </Button>
        </div>

        {/* Hero Image */}
        <div className="mt-8 sm:mt-12 lg:mt-16 max-w-5xl mx-auto border border-neutral-200 rounded-xl px-4 sm:px-0">
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
