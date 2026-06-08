import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://eurofuels.miguelangelcolmenero.es';

const routes = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/stats', priority: 0.8, changefreq: 'daily' },
  { path: '/about', priority: 0.3, changefreq: 'monthly' }
];

const today = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

const publicPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(publicPath, sitemap);
console.log(`Sitemap generated at ${publicPath}`);
