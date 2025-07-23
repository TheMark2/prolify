'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image 
              src="/proplify.png" 
              alt="Proplify Logo" 
              width={60} 
              height={60}
              className="transition-opacity duration-300 group-hover:opacity-80"
            />
          </Link>
          
          {/* Navigation Links */}
          <nav className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-neutral-600 hover:text-neutral-900 transition-colors duration-300 text-sm font-medium"
            >
              Inicio
            </Link>
            <Link 
              href="/blog" 
              className="text-neutral-600 hover:text-neutral-900 transition-colors duration-300 text-sm font-medium"
            >
              Blog
            </Link>
          </nav>
          
          {/* Copyright */}
          <div className="text-neutral-500 text-xs text-center">
            © {new Date().getFullYear()} Proplify. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
