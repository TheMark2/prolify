'use client';

import { Button } from '@/components/ui/Button';
import { PlayIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center space-y-8 justify-center">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center space-x-4">
          <Image src="/proplify.png" alt="Logo" width={100} height={100} />
        </div>

        {/* Main Headline */}
        <h2 className="text-4xl sm:text-6xl font-bold text-black-950 mb-4 leading-tight">
          La plataforma todo-en-uno para{' '}
          <span className="text-neutral-700 font-lora font-medium italic">inmobiliarias</span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-black-600 max-w-4xl mx-auto leading-relaxed">
          Gestiona propiedades, automatiza marketing, integra con todo tipo de portales, 
          y convierte más leads con IA. Todo esto y mucho mas desde una sola plataforma.
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
