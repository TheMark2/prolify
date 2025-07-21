'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { supabase } from '@/lib/supabase';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !companyName) {
      setErrorMessage('Por favor, completa todos los campos requeridos.');
      setShowError(true);
      return;
    }

    setIsSubmitting(true);
    setShowError(false);
    
    try {
      // Insert the agency data into Supabase
      const { data, error } = await supabase
        .from('agencies')
        .insert([
          {
            company_name: companyName,
            email: email
          }
        ])
        .select();

      if (error) {
        // Handle specific error cases
        if (error.code === '23505') { // Unique constraint violation (duplicate email)
          setErrorMessage('Este email ya está registrado en nuestra lista de espera.');
        } else {
          setErrorMessage('Ha ocurrido un error. Inténtalo de nuevo.');
        }
        setShowError(true);
        return;
      }
      
      console.log('Agency successfully added to waitlist:', data);
      
      setShowSuccess(true);
      setEmail('');
      setCompanyName('');
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error('Unexpected error:', error);
      setErrorMessage('Ha ocurrido un error inesperado. Inténtalo de nuevo.');
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="email-capture" className="py-8 sm:py-12 lg:py-16 bg-neutral-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="text-center mb-6 sm:mb-8 space-y-6">
            <h3 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black-950 mb-4 leading-tight px-2">
                Impulsa tu negocio, <span className="font-medium font-lora text-neutral-800">automatiza tu trabajo</span>
            </h3>
            <p className="text-sm sm:text-base text-black-600 max-w-xl mx-auto leading-relaxed px-4">
              Únete a la lista de espera y sé de los primeros en acceder a Proplify. Te mantendremos informado sobre el lanzamiento y ofertas exclusivas.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 max-w-md mx-auto mt-12 sm:mt-16 px-4 sm:px-0">
            <Input
              label="Nombre de tu inmobiliaria"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Ej: Inmobiliaria Madrid Centro"
              required
            />
            
            <Input
              label="Email profesional"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@inmobiliaria.com"
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={isSubmitting}
              icon={!isSubmitting ? <PaperAirplaneIcon className="w-4 h-4" /> : undefined}
              className="w-full"
            >
              {isSubmitting ? 'Enviando...' : 'Unirme a la lista de espera'}
            </Button>
          </form>

          {/* Success Message */}
          {showSuccess && (
            <div className="flex justify-center mt-6">
              <div className="p-2 bg-neutral-100 border border-neutral-200 rounded-xl w-fit animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <p className="text-neutral-500 font-medium text-xs">
                    Te hemos añadido a la lista de espera. Te contactaremos pronto.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {showError && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs">!</span>
                </div>
                <p className="text-red-800 font-medium text-xs">
                  {errorMessage}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
