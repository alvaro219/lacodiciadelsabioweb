// generate-sitemap.mjs
// Genera el sitemap de la web: páginas fijas, fichas de clases y razas (del
// catálogo de la app) y las novedades publicadas (de Supabase).
//
//   npm run sitemap          → public/sitemap.xml (se sube con la web)
//   node scripts/generate-sitemap.mjs --dist
//                            → además dist/.../sitemap.xml (lo usa el deploy)
//
// Si Supabase no responde, el sitemap se genera igual sin las novedades.

import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const SUPABASE_URL = 'https://tuqwzvlsaeqlhgjrgvze.supabase.co';
const SUPABASE_ANON_KEY =
  process.env['SUPABASE_ANON_KEY'] ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1cXd6dmxzYWVxbGhnanJndnplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MjQ4MTYsImV4cCI6MjA3OTIwMDgxNn0.HtsMDrny9mXAmSxmkfHaF04lFvIMYcK_SfDoT15ehL0';
const BASE_URL = 'https://alvaro219.github.io/lacodiciadelsabioweb';

const STATIC_ROUTES = [
  { url: '', changefreq: 'weekly', priority: '1.0' },
  { url: '/novedades', changefreq: 'daily', priority: '0.9' },
  { url: '/campanas', changefreq: 'monthly', priority: '0.8' },
  { url: '/mundo', changefreq: 'monthly', priority: '0.8' },
  { url: '/manuales', changefreq: 'monthly', priority: '0.8' },
  { url: '/manuales/manual-del-jugador', changefreq: 'monthly', priority: '0.7' },
  { url: '/manuales/manual-del-master', changefreq: 'monthly', priority: '0.7' },
  { url: '/mecanicas', changefreq: 'monthly', priority: '0.7' },
  { url: '/bestiario', changefreq: 'monthly', priority: '0.7' },
  { url: '/accesorios', changefreq: 'monthly', priority: '0.6' },
  { url: '/condiciones', changefreq: 'monthly', priority: '0.6' },
  { url: '/armas', changefreq: 'monthly', priority: '0.6' },
  { url: '/eventos', changefreq: 'weekly', priority: '0.7' },
  { url: '/creaciones', changefreq: 'weekly', priority: '0.7' },
];

/** Mismo identificador de URL que usa la web (src/app/utils/game.utils.ts). */
const slugify = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Misma URL de novedad que buildSlug() en la web: título + inicio del id. */
const novedadSlug = (title, id) => `${slugify(title)}-${id.slice(0, 8)}`;

async function fetchNovedades() {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data, error } = await supabase.from('novedades').select('id, title, published_at').order('published_at', { ascending: false });
    if (error) throw error;
    return data ?? [];
  } catch (e) {
    console.warn(`⚠️ No se pudieron leer las novedades (${e.message ?? e}); el sitemap va sin ellas.`);
    return [];
  }
}

const entry = (loc, lastmod, changefreq, priority) => `  <url>
    <loc>${BASE_URL}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

const today = new Date().toISOString().split('T')[0];
const catalog = JSON.parse(readFileSync(join(root, 'src/app/data/game/catalog.json'), 'utf8'));
const novedades = await fetchNovedades();

const urls = [
  ...STATIC_ROUTES.map((r) => entry(r.url, today, r.changefreq, r.priority)),
  ...catalog.clases.map((c) => entry(`/clases/${slugify(c.nombre)}`, today, 'monthly', '0.7')),
  ...catalog.razas.map((r) => entry(`/razas/${slugify(r)}`, today, 'monthly', '0.7')),
  ...novedades.map((n) => entry(`/novedades/${novedadSlug(n.title, n.id)}`, (n.published_at ?? today).split('T')[0], 'monthly', '0.8')),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

const targets = [join(root, 'public', 'sitemap.xml')];
if (process.argv.includes('--dist')) {
  const dist = join(root, 'dist', 'lacodiciadelsabio-web', 'browser');
  if (existsSync(dist)) targets.push(join(dist, 'sitemap.xml'));
}
for (const out of targets) writeFileSync(out, xml, 'utf-8');
console.log(`✅ sitemap.xml con ${urls.length} URLs (${novedades.length} novedades): ${targets.join(', ')}`);
