import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/auth/'], // Keep private parts private
    },
    sitemap: 'https://civilinaction14th.com/sitemap.xml',
  }
}
