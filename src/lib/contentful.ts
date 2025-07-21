import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';

// Configuración del cliente de Contentful
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

// Tipos TypeScript para los posts del blog
export interface BlogPost {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    slug: string;
    content: Document;
    excerpt: string;
    category: string;
    featured?: boolean;
    featuredImage?: {
      fields: {
        file: {
          url: string;
          details: {
            image: {
              width: number;
              height: number;
            };
          };
        };
        title: string;
      };
    };
    publishedDate: string;
  };
}

// Función para obtener todos los posts del blog
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      order: ['-fields.publishedDate'],
    });

    return entries.items as unknown as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Función para obtener un post específico por slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    });

    return (entries.items[0] as unknown as BlogPost) || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Función para obtener todos los slugs (para generateStaticParams)
export async function getBlogPostSlugs(): Promise<string[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      select: ['fields.slug'],
    });

    return entries.items.map((item: any) => item.fields.slug);
  } catch (error) {
    console.error('Error fetching blog post slugs:', error);
    return [];
  }
}
