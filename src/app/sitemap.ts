import type { MetadataRoute } from 'next'

import { siteConfig } from '@/lib/seo'
import { connectDB } from '@/lib/db'
import { BlogPost, BlogSettings } from '@/models/Blog'
import { visiblePostFilter } from '@/lib/blog-filters'
import { GallerySettings } from '@/models/Gallery'

const baseUrl = siteConfig.url


// Rendu à la demande : revalidatePath("/sitemap.xml") ne purge pas le cache des
// routes de métadonnées (vérifié en production), un article déposé ou retiré par
// PHARE n'y apparaîtrait — ou n'en sortirait — qu'au prochain build.
export const dynamic = 'force-dynamic'
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Les pages du dispositif manquaient au sitemap : Google ne les trouvait que par les
    // menus, et PHARE, qui lit le sitemap pour vérifier ses liens internes, refusait d'y lier.
    ...['comment-ca-marche', 'cpf', 'financement', 'accompagnateur', 'cadre-legal', 'prescripteurs', 'partenaires', 'fondateur'].map((p) => ({
      url: `${baseUrl}/${p}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]

  try {
    await connectDB()

    // Gallery page if enabled
    const gallerySettings = await GallerySettings.findOne()
    if (gallerySettings?.enabled) {
      pages.push({
        url: `${baseUrl}/gallery`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }

    // Blog pages if enabled
    const blogSettings = await BlogSettings.findOne()
    if (blogSettings?.enabled) {
      pages.push({
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })

      // Individual blog posts
      const posts = await BlogPost.find(visiblePostFilter()).select('slug updatedAt publishedAt')
      for (const post of posts) {
        pages.push({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.updatedAt || post.publishedAt),
          changeFrequency: 'weekly',
          priority: 0.7,
        })
      }
    }
  } catch (error) {
    console.error('Sitemap generation error:', error)
  }

  return pages
}
