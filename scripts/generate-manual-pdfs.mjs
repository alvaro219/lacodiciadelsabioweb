// generate-manual-pdfs.mjs
// Genera los PDF descargables de los manuales a partir de sus páginas de la
// web (con los estilos de impresión de guide-detail.scss).
//
//   1. Arranca la web: npm start
//   2. En otra terminal: npm run pdfs [-- http://localhost:4200]
//
// Usa el Edge o el Chrome instalados; si no los encuentra, indica la ruta del
// navegador en la variable de entorno BROWSER_PATH.

import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const baseUrl = (process.argv[2] ?? 'http://localhost:4200').replace(/\/$/, '');

const MANUALS = [
  { id: 'manual-del-jugador', title: 'Manual del Jugador', file: 'Manual_del_Jugador_LCDS.pdf' },
  { id: 'manual-del-master', title: 'Manual del Dungeon Master', file: 'Manual_del_Master_LCDS.pdf' },
];

const BROWSERS = [
  process.env.BROWSER_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);

const executablePath = BROWSERS.find((p) => existsSync(p));
if (!executablePath) {
  console.error('No encuentro Edge ni Chrome. Indica la ruta del navegador en BROWSER_PATH.');
  process.exit(1);
}

const browser = await puppeteer.launch({ executablePath, headless: true });
try {
  for (const manual of MANUALS) {
    const page = await browser.newPage();
    await page.goto(`${baseUrl}/manuales/${manual.id}`, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.emulateMediaType('print');
    const out = join(webRoot, 'src/assets/pdf', manual.file);
    await page.pdf({
      path: out,
      format: 'A4',
      printBackground: true,
      margin: { top: '16mm', bottom: '18mm', left: '14mm', right: '14mm' },
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: `<div style="width:100%;font-size:8px;color:#6a6280;padding:0 14mm;display:flex;justify-content:space-between;font-family:sans-serif">
        <span>La Codicia del Sabio · ${manual.title}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
    });
    console.log(`✔ ${manual.file}`);
    await page.close();
  }
} finally {
  await browser.close();
}
