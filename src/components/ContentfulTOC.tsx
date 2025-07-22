'use client';

import { useEffect, useState } from 'react';
import { Document, BLOCKS, Block, Text } from '@contentful/rich-text-types';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface ContentfulTOCProps {
  document: Document;
}

export default function ContentfulTOC({ document }: ContentfulTOCProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [progress, setProgress] = useState(0);

  // Extraer headings del documento de Contentful
  useEffect(() => {
    const extractHeadings = (content: Block[]): TocItem[] => {
      const headings: TocItem[] = [];
      
      content.forEach((node) => {
        if (node.nodeType === BLOCKS.HEADING_2 || 
            node.nodeType === BLOCKS.HEADING_3 || 
            node.nodeType === BLOCKS.HEADING_4) {
          
          const text = (node.content[0] as Text)?.value || '';
          const level = node.nodeType === BLOCKS.HEADING_2 ? 2 : 
                       node.nodeType === BLOCKS.HEADING_3 ? 3 : 4;
          const id = `heading-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`;
          
          headings.push({ id, text, level });
        }
      });
      
      return headings;
    };

    const headings = extractHeadings(document.content);
    setTocItems(headings);
  }, [document]);

  // Observar intersecciones para determinar la sección activa y calcular progreso
  useEffect(() => {
    if (tocItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = entry.target.id;
            setActiveId(currentId);
            
            // Calcular progreso basado en la posición del elemento activo
            const currentIndex = tocItems.findIndex(item => item.id === currentId);
            if (currentIndex !== -1) {
              const progressPercentage = ((currentIndex + 1) / tocItems.length) * 100;
              setProgress(progressPercentage);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0.5,
      }
    );

    // Observar todos los headings
    tocItems.forEach(({ id }) => {
      const element = window.document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [tocItems]);

  // Función para scroll suave
  const scrollToHeading = (id: string) => {
    const element = window.document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-24 border border-neutral-200 rounded-lg p-6">
      <nav className="relative">
        {/* Línea de progreso vertical minimalista */}
        <div className="absolute left-1 top-0 bottom-0 w-px bg-neutral-200">
          <div 
            className="w-full bg-neutral-800 transition-all duration-300 ease-out"
            style={{ height: `${progress}%` }}
          />
        </div>
        
        <ul className="space-y-2 relative">
          {tocItems.map(({ id, text, level }, index) => {
            const isActive = activeId === id;
            const isPassed = tocItems.findIndex(item => item.id === activeId) > index;
            
            return (
              <li key={id} className="relative flex items-center">
                {/* Punto minimalista del timeline */}
                <div className={`
                  absolute left-0 w-2 h-2 rounded-full transition-all duration-200 z-10
                  ${isActive 
                    ? 'bg-neutral-800 scale-125' 
                    : isPassed 
                      ? 'bg-neutral-600' 
                      : 'bg-neutral-300'
                  }
                `} />
                
                {/* Contenido del item */}
                <button
                  onClick={() => scrollToHeading(id)}
                  className={`
                    block w-full text-left text-xs leading-relaxed transition-colors duration-200 ml-5
                    ${level === 3 ? 'ml-7' : ''}
                    ${level === 4 ? 'ml-9' : ''}
                    ${
                      isActive
                        ? 'text-neutral-900 font-medium'
                        : isPassed
                          ? 'text-neutral-600 hover:text-neutral-900'
                          : 'text-neutral-400 hover:text-neutral-700'
                    }
                  `}
                >
                  {text}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
