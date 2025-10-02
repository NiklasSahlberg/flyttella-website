import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_next/',
        '/admin/',
        '/private/',
        '*.json',
        '/scripts/',
        '/test-report-api.js',
        '/token.json'
      ],
    },
    sitemap: 'https://www.flyttella.se/sitemap.xml',
  }
}
