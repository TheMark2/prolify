import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/contentful'

// Agregar headers para evitar cacheo
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://proplify.site'
  
  try {
    // Get all blog posts from Contentful
    const blogPosts = await getBlogPosts()
    console.log(`Found ${blogPosts.length} blog posts for sitemap`)
    
    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/showcase`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      },
    ]
    
    // Dynamic blog post pages
    const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.fields.slug}`,
      lastModified: new Date(post.sys.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
    
    const allPages = [...staticPages, ...blogPages]
    console.log(`Generated sitemap with ${allPages.length} total pages`)
    
    return allPages
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // Return basic sitemap even if blog posts fail
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
    ]
  }
}
