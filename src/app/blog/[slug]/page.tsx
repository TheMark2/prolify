import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import { IconClockHour10 } from '@tabler/icons-react';
import ContentfulTOC from '@/components/ContentfulTOC';
import { getBlogPostBySlug, getBlogPostSlugs } from '@/lib/contentful';
import RichTextRenderer from '@/components/RichTextRenderer';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import BlogPostClient from '../../../components/BlogPostClient';

// Función para calcular minutos de lectura
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const textContent = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  const wordCount = textContent.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}



interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Enable ISR - regenerate pages every 60 seconds if there's a request
export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post no encontrado | Proplify',
      description: 'El artículo que buscas no se encuentra disponible.'
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proplify.com';
  const postUrl = `${baseUrl}/blog/${slug}`;
  const imageUrl = post.fields.featuredImage?.fields?.file?.url 
    ? `https:${post.fields.featuredImage.fields.file.url}` 
    : `${baseUrl}/og-default.jpg`;

  // Process keywords from Contentful (JSON format)
  let postKeywords = 'inmobiliaria, propiedades, gestión, ' + post.fields.category;
  if (post.fields.keywords) {
    try {
      const keywordsData = typeof post.fields.keywords === 'string' 
        ? JSON.parse(post.fields.keywords) 
        : post.fields.keywords;
      
      if (Array.isArray(keywordsData)) {
        postKeywords = keywordsData.join(', ');
      } else if (keywordsData.keywords && Array.isArray(keywordsData.keywords)) {
        postKeywords = keywordsData.keywords.join(', ');
      }
    } catch (error) {
      console.warn('Error parsing keywords for post:', slug, error);
    }
  }

  return {
    title: `${post.fields.title} | Proplify`,
    description: post.fields.excerpt || post.fields.title,
    keywords: postKeywords,
    authors: [{ name: 'Proplify' }],
    creator: 'Proplify',
    publisher: 'Proplify',
    category: 'Real Estate',
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.fields.title,
      description: post.fields.excerpt || post.fields.title,
      url: postUrl,
      siteName: 'Proplify',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.fields.title,
        },
      ],
      locale: 'es_ES',
      type: 'article',
      publishedTime: post.fields.publishedDate,
      modifiedTime: post.sys.updatedAt,
      authors: ['Proplify'],
      section: 'Real Estate',
      tags: ['inmobiliaria', 'propiedades', post.fields.category],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.fields.title,
      description: post.fields.excerpt || post.fields.title,
      images: [imageUrl],
      creator: '@proplify',
      site: '@proplify',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  // Convert rich text to HTML for reading time calculation
  const htmlContent = documentToHtmlString(post.fields.content);
  const readingTime = calculateReadingTime(htmlContent);

  // Get featured image URL if exists
  const featuredImageUrl = post.fields.featuredImage?.fields.file.url;

  return (
    <BlogPostClient post={post} readingTime={readingTime} featuredImageUrl={featuredImageUrl}>
      {/* Article */}
      <main className="max-w-7xl mx-auto px-8 sm:px-12 py-12">
        {/* Breadcrumb */}


        <div className="flex gap-12">
          {/* Table of Contents - Left Sidebar */}
          <aside className="hidden lg:block flex-shrink-0 w-64">
            <nav className="mb-8">
              <Link href="/blog" className="text-neutral-500 hover:text-neutral-700 transition-colors flex items-center gap-2 bg-neutral-50 px-4 py-2 rounded-lg w-fit font-medium text-sm">
                <ArrowLeftIcon className="w-3 h-3" />
                Volver al blog
              </Link>
            </nav>
            <ContentfulTOC document={post.fields.content} />
          </aside>

          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            {/* Article Header */}
            <header className="mb-12">
              {/* Desktop layout - original design */}
              <div className="hidden sm:flex mb-6 items-center justify-between">
                <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide border border-neutral-200 px-4 py-2 rounded-full bg-neutral-50">
                  {post.fields.category}
                </span>
                <time className="text-sm text-neutral-400">
                  {new Date(post.fields.publishedDate).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <span className="text-xs text-neutral-400 flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 bg-neutral-50">
                  <IconClockHour10 size={16} />
                  {readingTime} min de lectura
                </span>
              </div>

              {/* Mobile layout - category and reading time */}
              <div className="sm:hidden mb-4 flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide border border-neutral-200 px-4 py-2 rounded-full bg-neutral-50">
                  {post.fields.category}
                </span>
                <span className="text-xs text-neutral-400 flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 bg-neutral-50">
                  <IconClockHour10 size={16} />
                  {readingTime} min de lectura
                </span>
              </div>

              {/* Mobile date - smaller and above title */}
              <time className="sm:hidden block text-xs text-neutral-400 mb-2 mt-8">
                {new Date(post.fields.publishedDate).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>

              <h1 className="text-4xl sm:text-5xl font-bold text-black-950 leading-tight mb-8">
                {post.fields.title}
              </h1>
              {/* Featured Image */}
              {featuredImageUrl && (
                <div className="aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg overflow-hidden border border-neutral-200 mb-8">
                  <Image 
                    src={`https:${featuredImageUrl}`}
                    alt={post.fields.title} 
                    width={1200} 
                    height={675}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </header>

            {/* Article Content */}
            <div className="space-y-8">
              <RichTextRenderer document={post.fields.content} />
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center bg-neutral-50 rounded-xl p-8 border border-neutral-200">
              <h3 className="text-2xl font-bold mb-6 max-w-4xl mx-auto">
                Únete a la lista de espera de nuestro software de gestión inmobiliaria a cambio <span className="font-medium font-lora text-neutral-800">del primer mes gratuito.</span> 
              </h3>
              
              <Link 
                href="/#email-capture"
                className="inline-flex items-center justify-center px-6 py-3 bg-neutral-800 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Únete a la lista de espera
              </Link>
            </div>
          </div>
        </div>
      </main>
    </BlogPostClient>
  );
}
