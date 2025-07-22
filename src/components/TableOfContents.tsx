'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Extraer solo headings h2 del contenido HTML
  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h2'); // Solo h2 (subtítulos)
    
    const items: TocItem[] = Array.from(headings).map((heading) => {
      const level = 2; // Solo nivel 2
      const text = heading.textContent || '';
      // Crear un ID más limpio basado en el texto
      const id = `heading-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`;
      
      return { id, text, level };
    });
    
    setTocItems(items);
  }, [content]);

  // Observar intersecciones para determinar la sección activa
  useEffect(() => {
    if (tocItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0.5,
      }
    );

    // Esperar un poco para que el contenido se renderice
    const timeoutId = setTimeout(() => {
      // Añadir IDs a los headings h2 en el DOM y observarlos
      const articleElement = document.querySelector('article');
      if (articleElement) {
        const headings = articleElement.querySelectorAll('h2'); // Solo h2
        headings.forEach((heading, index) => {
          if (index < tocItems.length) {
            const tocItem = tocItems[index];
            heading.id = tocItem.id;
            observer.observe(heading);
          }
        });
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [tocItems]);

  // Scroll suave al hacer clic en un elemento del TOC
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <div className="sticky top-8 w-64 hidden lg:block">
      <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
        <h3 className="text-sm font-semibold text-black-950 uppercase tracking-wide mb-4">
          Índice
        </h3>
        <nav>
          <ul className="space-y-2">
            {tocItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToHeading(item.id)}
                  className={`
                    text-left w-full text-sm transition-colors duration-200 hover:text-black-950 pl-0
                    ${
                      activeId === item.id
                        ? 'text-black-950 font-medium border-l-2 border-black-950 pl-3'
                        : 'text-neutral-600'
                    }
                  `}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
