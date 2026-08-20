// Generates dist/sitemap.xml after the Vite build, listing the homepage,
// the weekly archive, and every PUBLISHED weekly article (drafts stay out
// of the sitemap — they're unlisted on the site too). Content-driven, so
// it stays in sync with weeklyUpdates.js without hand-editing a static file.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { weeklyUpdates } from '../src/data/weeklyUpdates.js';
import { SITE_URL } from '../src/config/site.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

const staticRoutes = ['/', '/weekly'];
const publishedRoutes = weeklyUpdates
  .filter((update) => update.status === 'published')
  .map((update) => `/weekly/${update.slug}`);

const routes = [...staticRoutes, ...publishedRoutes];
const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => `  <url>\n    <loc>${SITE_URL}${route}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join('\n')}
</urlset>
`;

writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
console.log(`sitemap.xml written with ${routes.length} URLs`);
