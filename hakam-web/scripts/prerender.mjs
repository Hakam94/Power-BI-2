// Static prerendering: after `vite build`, this boots a tiny local static
// server for dist/, visits each real route in a headless browser, and
// overwrites that route's index.html with the fully-rendered DOM (SEO
// component's meta/canonical/JSON-LD included).
//
// Why: the SEO component (src/components/SEO.jsx) sets tags client-side
// via useEffect, which Googlebot handles fine (it executes JS), but
// link-preview bots (Slack, Twitter/X, LinkedIn) only read the raw HTML
// they fetch and never run JavaScript — without this, shared links would
// always show the generic homepage title/description. Baking the rendered
// HTML into each route's own index.html fixes that for every crawler.
//
// React still mounts on top of the prerendered markup on load (a plain
// createRoot().render(), not true hydration) — a brief, harmless flash
// while JS takes over, standard for this kind of build-time SSG-lite setup.
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { weeklyUpdates } from '../src/data/weeklyUpdates.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

// Must match vite.config.js's own GH_PAGES-driven base path exactly.
const BASE_PATH = process.env.GH_PAGES ? '/Power-BI-2' : '';

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.json': 'application/json',
  '.txt': 'text/plain',
  '.xml': 'application/xml'
};

async function fileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

// Minimal static file server with SPA fallback: any request that doesn't
// resolve to a real file gets dist/index.html, so the headless browser can
// navigate straight to a client-side route (e.g. /weekly/some-slug) exactly
// like a real visitor would.
function startServer() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      let urlPath = decodeURIComponent(req.url.split('?')[0]);
      if (BASE_PATH && urlPath.startsWith(BASE_PATH)) {
        urlPath = urlPath.slice(BASE_PATH.length) || '/';
      }
      let filePath = path.join(distDir, urlPath);
      if (!(await fileExists(filePath)) || (await stat(filePath)).isDirectory()) {
        filePath = path.join(distDir, 'index.html');
      }
      const body = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': MIME_TYPES[path.extname(filePath)] || 'application/octet-stream' });
      res.end(body);
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

async function prerenderRoute(browser, origin, route) {
  const page = await browser.newPage();
  // 'networkidle' can hang here (e.g. blocked third-party font requests
  // that keep retrying) — 'load' plus a short explicit wait for React to
  // mount and SEO.jsx's useEffect to run is enough and far more reliable.
  await page.goto(`${origin}${BASE_PATH}${route}`, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(500);
  const html = await page.content();
  await page.close();

  const outDir = route === '/' ? distDir : path.join(distDir, route);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'index.html'), `<!doctype html>\n${html}`);
  console.log(`prerendered ${route}`);
}

const server = await startServer();
const { port } = server.address();
const origin = `http://127.0.0.1:${port}`;
// --no-sandbox: needed when this runs as root (this dev sandbox, and some
// CI containers) since Chromium's sandbox requires unprivileged namespaces.
const browser = await chromium.launch({ args: ['--no-sandbox'] });

const routes = [
  '/',
  '/weekly',
  ...weeklyUpdates.filter((update) => update.status === 'published').map((update) => `/weekly/${update.slug}`)
];

for (const route of routes) {
  await prerenderRoute(browser, origin, route);
}

await browser.close();
server.close();
console.log(`Prerendered ${routes.length} routes.`);
