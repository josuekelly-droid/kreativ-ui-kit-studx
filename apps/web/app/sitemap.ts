import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kreativ-ui-kit-studx.vercel.app';
  
  const routes = [
    { url: `${baseUrl}/`, priority: 1.0, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/builder`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/pricing`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/dashboard`, priority: 0.7, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/docs`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/about`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/contact`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/sign-in`, priority: 0.5, changeFrequency: 'yearly' as const },
    { url: `${baseUrl}/sign-up`, priority: 0.5, changeFrequency: 'yearly' as const },
  ];

  return routes;
}