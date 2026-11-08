import { GetServerSideProps } from 'next';
import { getDatabase } from '@/lib/db';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const db = getDatabase();
  const baseUrl = 'https://bayraktarcreative.com';

  const staticPages = [
    '',
    '/hizmetler',
    '/projeler',
    '/reels',
    '/hakkimizda',
    '/iletisim',
  ];

  const projectUrls = db.projects
    .filter((p) => p.status === 'published')
    .map((p) => `/projeler/${p.slug}`);

  const allUrls = [...staticPages, ...projectUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map((url) => {
      return `
    <url>
      <loc>${baseUrl}${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${url === '' ? 'daily' : 'weekly'}</changefreq>
      <priority>${url === '' ? '1.0' : '0.8'}</priority>
    </url>
  `;
    })
    .join('')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default function Sitemap() {
  return null;
}
