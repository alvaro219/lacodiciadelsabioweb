// sync-images.mjs
// Copia a la web, en WebP y al tamaño que se muestran, las imágenes de la app
// que usan los datos exportados (avatares, enemigos, accesorios y armas) y los
// fondos de las páginas.
//
//   node scripts/sync-images.mjs [carpeta de la app]
//
// Por defecto lee ../gestorderol y escribe en src/assets/game/, que se vacía
// antes para no dejar imágenes que ya no se usan.
//
// Si un mismo dibujo se repite en varios archivos distintos es un marcador
// provisional (hoy pasa con todos los enemigos): no se copia y se anota en
// src/app/data/game/placeholder-images.json para que la web no lo muestre.

import { createHash } from 'node:crypto';
import { readFileSync, rmSync, mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const appRoot = resolve(process.argv[2] ?? join(webRoot, '..', 'gestorderol'));
const dataDir = join(webRoot, 'src/app/data/game');
const outDir = join(webRoot, 'src/assets/game');

const read = (name) => JSON.parse(readFileSync(join(dataDir, `${name}.json`), 'utf8'));

/** Ancho máximo según la carpeta de la imagen. */
const WIDTHS = { avatars: 320, enemies: 480, accessories: 256, weapons: 256, battlegrounds: 1600, backgrounds: 1600 };

/** Un dibujo repetido en al menos tantos archivos se considera provisional. */
const PLACEHOLDER_COPIES = 3;

// Fondos de las páginas (no vienen en los datos).
const EXTRA = [
  'assets/wallpaper.png',
  'assets/battlegrounds/game_background_3.png',
  // Moneda de los precios (la web no usa el emoji 🪙: Windows 10 no lo dibuja).
  'assets/accessories/gold_loot_04.png',
  // Pixel art pequeño (576×324): se guarda sin pérdida y la web lo escala con image-rendering: pixelated.
  ...[6, 7, 12, 13, 18, 58, 76].map((n) => `assets/backgrounds/background ${n}.png`),
];

const images = new Set(EXTRA);
for (const c of read('classes')) if (c.preparado?.avatar) images.add(c.preparado.avatar);
// Cada raza muestra como mucho 8 avatares (MAX_RACE_AVATARS en races.data.ts).
for (const r of read('races')) for (const a of r.avatares.slice(0, 8)) images.add(a);
for (const e of read('enemies')) if (e.image) images.add(e.image);
for (const a of read('accessories')) if (a.imagen) images.add(a.imagen);
for (const w of Object.values(read('weapons'))) if (w) images.add(w);
// Omnimek no tiene avatares propios en la app: la web usa el de su personaje preparado.
images.add('assets/avatars/sticker_noble_unknow_man_01.png');

// Archivos que existen, con el hash de su contenido.
const hashes = new Map();
for (const path of images) {
  const src = join(appRoot, path);
  if (!existsSync(src)) {
    console.warn(`No existe en la app: ${path}`);
    continue;
  }
  hashes.set(path, createHash('md5').update(readFileSync(src)).digest('hex'));
}
const copies = new Map();
for (const hash of hashes.values()) copies.set(hash, (copies.get(hash) ?? 0) + 1);
const placeholders = [...hashes].filter(([, hash]) => copies.get(hash) >= PLACEHOLDER_COPIES).map(([path]) => path).sort();

rmSync(outDir, { recursive: true, force: true });
let total = 0;
let count = 0;
for (const path of [...hashes.keys()].sort()) {
  if (placeholders.includes(path)) continue;
  const folder = path.split('/')[1];
  const width = WIDTHS[folder] ?? 1600;
  const dest = join(outDir, path.replace(/^assets\//, '').replace(/\.png$/i, '.webp'));
  mkdirSync(dirname(dest), { recursive: true });
  const info = await sharp(join(appRoot, path))
    .resize({ width, height: width, fit: 'inside', withoutEnlargement: true })
    .webp(folder === 'backgrounds' ? { lossless: true } : { quality: folder === 'battlegrounds' || path.endsWith('wallpaper.png') ? 72 : 80 })
    .toFile(dest);
  total += info.size;
  count++;
}
writeFileSync(join(dataDir, 'placeholder-images.json'), JSON.stringify(placeholders, null, 2) + '\n');
console.log(`${count} imágenes en src/assets/game (${(total / 1048576).toFixed(1)} MB)`);
if (placeholders.length) console.log(`${placeholders.length} dibujos provisionales repetidos que la web no muestra`);
