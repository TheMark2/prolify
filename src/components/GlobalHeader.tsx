'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function GlobalHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200 transition-all duration-300 ${
      isScrolled ? 'py-3' : 'py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <Image 
              src="/proplify.png" 
              alt="Proplify Logo" 
              width={isScrolled ? 70 : 100} 
              height={isScrolled ? 70 : 100}
              className="transition-all duration-300"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
