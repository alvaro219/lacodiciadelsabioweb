// sync-from-app.mjs
// Actualiza la web con los datos de la app Gestor de Rol: `npm run sync-app`.
//
//  1. Exporta los datos del juego a src/app/data/game/*.json
//     (flutter test tool/export_web_data_test.dart, en la app).
//  2. Convierte los manuales de la app (scripts/sync-manuals.mjs).
//  3. Copia las imágenes que usan esos datos (scripts/sync-images.mjs).
//
// La app se busca en ../gestorderol; se puede indicar otra carpeta:
//   npm run sync-app -- C:/ruta/a/gestorderol

import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const appRoot = resolve(process.argv[2] ?? join(webRoot, '..', 'gestorderol'));

if (!existsSync(join(appRoot, 'tool/export_web_data_test.dart'))) {
  console.error(`No encuentro la app en ${appRoot}. Indica su carpeta: npm run sync-app -- <carpeta>`);
  process.exit(1);
}

function run(title, command, args, cwd) {
  console.log(`\n▶ ${title}`);
  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    // flutter es un .bat en Windows y necesita el intérprete de comandos.
    shell: command === 'flutter' && process.platform === 'win32',
    env: { ...process.env, WEB_DATA_DIR: join(webRoot, 'src/app/data/game') },
  });
  if (result.status !== 0) {
    console.error(`\n✖ Falló: ${title}`);
    process.exit(result.status ?? 1);
  }
}

run('Exportar los datos de la app', 'flutter', ['test', 'tool/export_web_data_test.dart'], appRoot);
run('Convertir los manuales', process.execPath, [join(webRoot, 'scripts/sync-manuals.mjs'), appRoot], webRoot);
run('Copiar las imágenes', process.execPath, [join(webRoot, 'scripts/sync-images.mjs'), appRoot], webRoot);
console.log('\n✔ Web actualizada con los datos de la app. Revisa los cambios con git diff.');
