// Run after build: node scripts/generate-sitemap.mjs
import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = 'https://tuqwzvlsaeqlhgjrgvze.supabase.co';
const SUPABASE_ANON_KEY = process.env['SUPABASE_ANON_KEY'] || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1cXd6dmxzYWVxbGhnanJndnplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MjQ4MTYsImV4cCI6MjA3OTIwMDgxNn0.HtsMDrny9mXAmSxmkfHaF04lFvIMYcK_SfDoT15ehL0';
const BASE_URL = 'https://alvaro219.github.io/lacodiciadelsabioweb';

const STATIC_ROUTES = [
  { url: '',            changefreq: 'weekly',  priority: '1.0' },
  { url: '/novedades',  changefreq: 'daily',   priority: '0.9' },
  { url: '/comunidad',  changefreq: 'weekly',  priority: '0.8' },
  { url: '/eventos',    changefreq: 'weekly',  priority: '0.8' },
  { url: '/creaciones', changefreq: 'weekly',  priority: '0.8' },
  { url: '/manuales',   changefreq: 'monthly', priority: '0.7' },
  { url: '/mecanicas',  changefreq: 'monthly', priority: '0.7' },
  { url: '/condiciones',changefreq: 'monthly', priority: '0.6' },
  { url: '/armas',      changefreq: 'monthly', priority: '0.6' },
];

async function main() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const { data: novedades } = await supabase
    .from('novedades')
    .select('id, published_at')
    .order('published_at', { ascending: false });

  const today = new Date().toISOString().split('T')[0];

  const urls = [
    ...STATIC_ROUTES.map(r => `
  <url>
    <loc>${BASE_URL}${r.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`),
    ...(novedades ?? []).map(n => `
  <url>
    <loc>${BASE_URL}/novedades/${n.id}</loc>
    <lastmod>${(n.published_at ?? today).split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`)
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  const outPath = join(__dirname, '..', 'dist', 'lacodiciadelsabio-web', 'browser', 'sitemap.xml');
  writeFileSync(outPath, xml, 'utf-8');
  console.log(`✅ sitemap.xml generado con ${(novedades ?? []).length} novedades en ${outPath}`);
}

main().catch(console.error);
