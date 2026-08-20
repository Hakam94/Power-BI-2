import { useEffect } from 'react';
import { SITE_URL, SITE_NAME } from '../config/site';

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!data) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

// Updates document title, description, canonical URL, Open Graph/Twitter
// tags, and JSON-LD structured data for the current route. This is
// client-side (runs after React mounts), so it helps crawlers that execute
// JavaScript (Googlebot does) but NOT link-preview bots that only read the
// raw HTML (Slack/Twitter/LinkedIn unfurlers, some others) — those will
// still see index.html's static defaults. Fixing that fully needs
// build-time prerendering, which is a bigger change than this basic pass.
export default function SEO({ title, description, path, type = 'website', jsonLd, noIndex = false }) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME} | Master Data Analytics, Power BI, SQL & AI`;
    const canonical = `${SITE_URL}${path}`;

    document.title = fullTitle;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    upsertLink('canonical', canonical);

    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:site_name', SITE_NAME);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);

    upsertJsonLd('seo-jsonld', jsonLd);
  }, [title, description, path, type, jsonLd]);

  return null;
}
