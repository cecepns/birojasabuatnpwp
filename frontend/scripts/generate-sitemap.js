/**
 * Generate sitemap.xml before production build.
 * Run: node scripts/generate-sitemap.js
 */

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = process.env.VITE_SITE_URL || 'https://birojasabuatnpwp.com';
const API_BASE =
  process.env.VITE_API_URL || 'https://api.kingcreativestudio.my.id/birojasanpwp';

const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/layanan', changefreq: 'monthly', priority: '0.9' },
  { path: '/tentang', changefreq: 'monthly', priority: '0.8' },
  { path: '/faq', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog', changefreq: 'daily', priority: '0.9' },
  { path: '/kontak', changefreq: 'monthly', priority: '0.7' },
];

const escapeXml = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const formatDate = (date) => {
  if (!date) return new Date().toISOString().split('T')[0];
  return new Date(date).toISOString().split('T')[0];
};

const fetchAllArticles = async () => {
  const articles = [];
  let page = 1;
  let totalPages = 1;

  try {
    while (page <= totalPages) {
      const url = `${API_BASE}/api/articles?page=${page}&limit=100&sort=published_at&order=desc`;
      const res = await fetch(url);
      if (!res.ok) break;

      const json = await res.json();
      if (!json.success || !Array.isArray(json.data)) break;

      articles.push(...json.data);
      totalPages = json.pagination?.totalPages || 1;
      page += 1;
    }
  } catch (err) {
    console.warn('[sitemap] Gagal fetch artikel dari API:', err.message);
  }

  return articles;
};

const buildUrlEntry = ({ loc, lastmod, changefreq, priority }) => `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

const generateSitemap = async () => {
  const today = formatDate(new Date());
  const entries = [];

  for (const route of STATIC_ROUTES) {
    entries.push(
      buildUrlEntry({
        loc: `${SITE_URL}${route.path}`,
        lastmod: today,
        changefreq: route.changefreq,
        priority: route.priority,
      })
    );
  }

  const articles = await fetchAllArticles();
  for (const article of articles) {
    if (!article.slug) continue;
    entries.push(
      buildUrlEntry({
        loc: `${SITE_URL}/blog/${article.slug}`,
        lastmod: formatDate(article.published_at),
        changefreq: 'monthly',
        priority: '0.7',
      })
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;

  const outputPath = join(__dirname, '../public/sitemap.xml');
  writeFileSync(outputPath, xml, 'utf8');

  console.log(`[sitemap] Generated ${entries.length} URLs → public/sitemap.xml`);
  console.log(`[sitemap] Static: ${STATIC_ROUTES.length}, Blog: ${articles.length}`);
};

generateSitemap();
