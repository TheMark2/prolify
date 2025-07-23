import Link from 'next/link';
import Image from 'next/image';
import { PaperAirplaneIcon } from '@heroicons/react/16/solid';
import { getBlogPosts } from '@/lib/contentful';

// Enable ISR - regenerate blog list every 60 seconds if there's a request
export const revalidate = 60;

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <div>
      {/* Blog Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Blog Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-black-950 mb-4 tracking-tight">
            Blog <span className="font-medium font-lora text-neutral-800">inmobiliario</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mt-8">
            Descubre las últimas noticias y tendencias de software inmobiliario.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="space-y-8">
          {/* Featured Post */}
          {blogPosts.filter(post => post.fields.featured).slice(0, 1).map((post) => (
            <Link key={post.sys.id} href={`/blog/${post.fields.slug}`} className="group block">
              <article className="relative overflow-hidden rounded-2xl bg-white transition-all duration-300 border border-neutral-200">
                <div className="absolute inset-0 bg-white"></div>

                <div className="relative z-10 flex flex-col lg:flex-row gap-8 p-8">
                  {/* Image Section */}
                  <div className="lg:w-1/3 flex-shrink-0">
                    <div className="aspect-[4/3] bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg flex items-center justify-center">
                      <Image 
                        src={post.fields.featuredImage?.fields.file.url ? `https:${post.fields.featuredImage.fields.file.url}` : '/images/blog-placeholder.jpg'} 
                        alt={post.fields.title} 
                        width={500} 
                        height={500}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="lg:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-neutral-50 text-black-950 uppercase">
                          {post.fields.category}
                        </span>
                        <span className="text-sm text-neutral-500">
                          {new Date(post.fields.publishedDate).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      <h2 className="text-3xl font-bold text-black-950 mb-4 group-hover:text-neutral-700 transition-colors leading-tight">
                        {post.fields.title}
                      </h2>
                      
                      <div className="relative mb-6">
                        <p className="text-lg text-neutral-600 leading-relaxed max-h-24 overflow-hidden">
                          {post.fields.excerpt}
                        </p>
                        {post.fields.excerpt && post.fields.excerpt.length > 150 && (
                          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                        )}
                      </div>
                    </div>
                    <span className="inline-flex items-center text-black-950 font-medium text-base group-hover:text-neutral-700 transition-colors">
                      Leer artículo completo
                      <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}

          {/* Regular Posts Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {blogPosts.filter(post => !post.fields.featured).map((post) => (
              <Link key={post.sys.id} href={`/blog/${post.fields.slug}`} className="group">
                <article className="bg-white justify-between flex flex-col border border-neutral-200 rounded-xl p-6 h-full hover:border-neutral-300 transition-colors duration-200">
                <div className="flex flex-col">
                    <div className="mb-4">
                        <span className="inline-block px-3 py-1 text-xs font-medium text-neutral-600 bg-neutral-100 rounded-full uppercase">
                        {post.fields.category}
                        </span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-black-950 mb-3 group-hover:text-neutral-700 transition-colors leading-tight">
                        {post.fields.title}
                    </h2>
                    
                    <div className="relative mb-4 flex-grow">
                        <p className="text-neutral-600 text-sm leading-relaxed max-h-16 overflow-hidden">
                        {post.fields.excerpt}
                        </p>
                        {post.fields.excerpt && post.fields.excerpt.length > 120 && (
                        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                        )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4">
                    <time className="text-xs text-neutral-400">
                      {new Date(post.fields.publishedDate).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </time>
                    
                    <span className="inline-flex items-center text-black-950 font-medium text-sm group-hover:text-neutral-700 transition-colors">
                      Leer más
                      <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-neutral-50 rounded-xl p-8 border border-neutral-200">
          <h3 className="text-4xl font-bold mb-6 max-w-4xl mx-auto">
            Únete a la lista de espera de nuestro software de gestión inmobiliaria a cambio <span className="font-medium font-lora text-neutral-800">del primer mes gratuito.</span> 
          </h3>
          
          <Link 
            href="/#email-capture"
            className="inline-flex items-center justify-center px-6 py-3 bg-neutral-800 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors gap-2"
          >
            <PaperAirplaneIcon className="w-4 h-4" />
            Únete a la lista de espera
          </Link>
        </div>
      </main>
    </div>
  );
}
