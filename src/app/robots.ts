import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://tantuleela-git-main-coder-vedanshs-projects.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/shop', '/custom-orders'],
      disallow: ['/admin/', '/account/', '/checkout/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
