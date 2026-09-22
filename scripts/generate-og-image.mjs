// generate-og-image.mjs
// Crea la imagen que muestran las redes y los chats al compartir la web
// (src/assets/og-image.jpg, 1200×630): la ilustración de la app con el icono,
// el nombre del juego y sus cifras.
//
//   node scripts/generate-og-image.mjs [carpeta de la app]
//
// Se ejecuta con `npm run sync-app`, después de copiar las imágenes.

import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const appRoot = resolve(process.argv[2] ?? join(webRoot, '..', 'gestorderol'));
const stats = JSON.parse(readFileSync(join(webRoot, 'src/app/data/game/stats.json'), 'utf8'));

const W = 1200;
const H = 630;

const background = await sharp(join(appRoot, 'assets/wallpaper.png'))
  .resize(W, H, { fit: 'cover', position: 'centre' })
  .toBuffer();

const roundedCorners = Buffer.from('<svg width="132" height="132"><rect width="132" height="132" rx="28" fill="#fff"/></svg>');
const icon = await sharp(join(webRoot, 'src/assets/icons/icon.png'))
  .resize(132, 132)
  .composite([{ input: roundedCorners, blend: 'dest-in' }])
  .png()
  .toBuffer();

const overlay = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#0d0b1a" stop-opacity="0.94"/>
      <stop offset="0.55" stop-color="#0d0b1a" stop-opacity="0.72"/>
      <stop offset="1" stop-color="#0d0b1a" stop-opacity="0.15"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#shade)"/>
  <rect x="72" y="214" width="250" height="40" rx="20" fill="#0d0b1a" fill-opacity="0.6" stroke="#f0c040" stroke-opacity="0.6"/>
  <text x="197" y="241" text-anchor="middle" font-family="Georgia, serif" font-size="19" font-weight="bold" fill="#f7d774">${stats.temporadas}ª TEMPORADA</text>
  <text x="72" y="340" font-family="Georgia, serif" font-size="72" font-weight="bold" fill="#f0c040">La Codicia</text>
  <text x="72" y="420" font-family="Georgia, serif" font-size="72" font-weight="bold" fill="#f0c040">del Sabio</text>
  <text x="72" y="478" font-family="Segoe UI, sans-serif" font-size="28" fill="#f1eefc">Sistema de rol de mesa con app compañera</text>
  <text x="72" y="540" font-family="Segoe UI, sans-serif" font-size="24" font-weight="bold" fill="#c4b5fd">${stats.clases} clases · ${stats.subclases} subclases · ${stats.razas} razas · ${stats.enemigos} enemigos</text>
</svg>`;

await sharp(background)
  .composite([
    { input: Buffer.from(overlay), top: 0, left: 0 },
    { input: icon, top: 64, left: 72 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(join(webRoot, 'src/assets/og-image.jpg'));

console.log('Imagen para compartir en src/assets/og-image.jpg');
