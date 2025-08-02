import { MetadataRoute } from 'next'
import prices from '../data/prices.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dugundavetiyesidunyasi.com'
  const currentDate = new Date()
  
  // Statik sayfalar
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gizlilik-politikasi`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/kullanim-sartlari`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/sade`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ekopolen`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/stylish`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Dinamik davetiye sayfaları
  const invitationPages: MetadataRoute.Sitemap = []
  
  // Her kategori için davetiye sayfalarını ekle
  const categories = ['sade', 'ekopolen', 'stylish']
  
  categories.forEach(category => {
    const categoryData = prices[category as keyof typeof prices]
    if (categoryData) {
      Object.keys(categoryData).forEach(code => {
        invitationPages.push({
          url: `${baseUrl}/${category}/${code}`,
          lastModified: currentDate,
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        })
      })
    }
  })

  return [...staticPages, ...invitationPages]
} 