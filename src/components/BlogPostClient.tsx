"use client";

import * as React from "react";
import { WaitlistDialog } from "@/components/WaitlistDialog";

interface BlogPostClientProps {
  post: any;
  readingTime: number;
  featuredImageUrl?: string;
  children: React.ReactNode;
}

export default function BlogPostClient({ 
  post, 
  readingTime, 
  featuredImageUrl, 
  children 
}: BlogPostClientProps) {
  const [showWaitlistDialog, setShowWaitlistDialog] = React.useState(false);

  React.useEffect(() => {
    // Verificar si el usuario ya se registró en la lista de espera
    const hasRegistered = localStorage.getItem('proplify_waitlist_registered');
    
    // Verificar si ya se mostró el dialog en esta sesión
    const dialogShownThisSession = sessionStorage.getItem('proplify_dialog_shown');
    
    // Solo mostrar el dialog si:
    // 1. El usuario no se ha registrado antes
    // 2. No se ha mostrado el dialog en esta sesión
    // 3. Han pasado al menos 3 segundos (para que el usuario pueda empezar a leer)
    if (!hasRegistered && !dialogShownThisSession) {
      const timer = setTimeout(() => {
        setShowWaitlistDialog(true);
        // Marcar que ya se mostró en esta sesión
        sessionStorage.setItem('proplify_dialog_shown', 'true');
      }, 3000); // 3 segundos de delay

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDialogClose = (open: boolean) => {
    setShowWaitlistDialog(open);
  };

  return (
    <>
      {children}
      <WaitlistDialog 
        open={showWaitlistDialog} 
        onOpenChange={handleDialogClose}
      />
    </>
  );
}
