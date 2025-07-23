"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { IconBellCheck } from "@tabler/icons-react";

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WaitlistDialog({ open, onOpenChange }: WaitlistDialogProps) {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Aquí iría la lógica para enviar los datos a tu backend/API
      // Por ahora simulo una llamada
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      
      // Marcar en localStorage que el usuario ya se registró
      localStorage.setItem('proplify_waitlist_registered', 'true');
      
      // Cerrar el dialog después de 2 segundos
      setTimeout(() => {
        onOpenChange(false);
        setIsSubmitted(false);
        setFormData({ name: "", email: "", company: "" });
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-xl">
          <div className="flex flex-col items-center text-center py-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 ease-out">
            <div className="w-16 h-16 bg-neutral-50 border border-neutral-200 rounded-lg flex items-center justify-center mb-4 animate-in zoom-in-95 duration-300 delay-150">
              <IconBellCheck size={24} />
            </div>
            <h3 className="text-2xl font-lora font-medium mb-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-200">¡Gracias por unirte!</h3>
            <p className="text-base text-neutral-600 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-300">
              Te contactaremos pronto con novedades sobre Proplify y tu primer mes gratuito.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center mb-2 mb-6 mt-4 max-w-xl mx-auto animate-in fade-in-0 slide-in-from-top-3 duration-500">
            Obtén <span className="font-semibold text-neutral-700 font-lora">el primer mes gratuito</span> de nuestro software de gestión inmobiliaria.
          </DialogTitle>
          <p className="text-lg text-neutral-600 text-center animate-in fade-in-0 slide-in-from-top-4 duration-500 delay-200">
            Únete a la lista de espera
          </p>
        </DialogHeader>
        
        <div className="px-6 pb-6">
          <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-400">
            <div className="space-y-2">
              <Input
                label="Nombre de tu inmobiliaria"
                id="company"
                type="text"
                placeholder="Ej: Inmobiliaria Madrid Centro"
                value={formData.company}
                onChange={handleInputChange("company")}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Input
                label="Email profesional"
                id="email"
                type="email"
                placeholder="tu@inmobiliaria.com"
                value={formData.email}
                onChange={handleInputChange("email")}
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full mt-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registrando..." : "Unirme a la lista de espera"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
