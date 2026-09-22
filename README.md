# La Codicia del Sabio — Web

Web del sistema de rol **La Codicia del Sabio**: clases, razas, mecánicas, manuales, bestiario, accesorios, campañas, mapamundi y lore, novedades y comunidad. Angular 21 con Supabase para las novedades, los eventos y las creaciones de la comunidad.

Se publica en GitHub Pages (https://alvaro219.github.io/lacodiciadelsabioweb/) cada vez que se sube algo a `main` (`.github/workflows/deploy.yml`).

## Desarrollo

```bash
npm install
npm start            # http://localhost:4200
npm run build:prod   # compilación de producción en dist/
```

## Datos del juego: salen de la app

Casi todo el contenido del juego (clases, subclases, razas, condiciones, propiedades, armas, accesorios, enemigos, campañas, lore, países del mapa y cifras) **no se escribe a mano**. Se exporta de la app Gestor de Rol a `src/app/data/game/*.json`, y las páginas se montan con esos datos.

Para actualizar la web con lo último de la app (por ejemplo, al preparar una temporada):

```bash
npm run sync-app                      # busca la app en ../gestorderol
npm run sync-app -- C:/ruta/a/la/app  # o en otra carpeta
```

Necesita Flutter instalado, porque el exportador es un test de la app (`tool/export_web_data_test.dart`). El comando hace, por orden:

1. Exporta los datos a `src/app/data/game/`.
2. Convierte los manuales de la app en `src/app/data/game/manuals.json`.
3. Copia en WebP a `src/assets/game/` las imágenes que usan esos datos, más los fondos de las cabeceras. Si un mismo dibujo se repite en varios archivos se toma por provisional y la web no lo muestra; se anota en `placeholder-images.json`. Hoy pasa con los enemigos.
4. Rehace la imagen para compartir en redes (`src/assets/og-image.jpg`).
5. Rehace el sitemap (`public/sitemap.xml`).

Después, revisa los cambios con `git diff`.

### Lo que sí se escribe a mano

- **Textos propios de la web por clase y raza** (color, rol, descripción, nombre de la pasiva, descripción de las subclases): `src/app/data/class-extras.ts` y `src/app/data/race-extras.ts`. El icono de cada una está en `src/app/data/icons.data.ts`. Si la app añade una clase o raza, hay que darle aquí su entrada.
- **Sección de la temporada de la portada** y el aviso de la cabecera: `src/app/pages/home/home.html` (busca `season-section`). La clase y la raza nuevas que destaca se eligen en `home.ts`.
- **Texto para buscadores sin JavaScript** (`<noscript>`) y descripción de `src/index.html`: llevan las cifras del juego escritas a mano.
- **Novedades, eventos y creaciones**: están en Supabase y se gestionan desde la propia web. Las imágenes se suben en WebP para que pesen poco.

## Manuales en PDF

Los PDF descargables (`src/assets/pdf/`) se generan a partir de las páginas de los manuales, con sus estilos de impresión. Con la web arrancada (`npm start`), en otra terminal:

```bash
npm run pdfs                              # usa http://localhost:4200
npm run pdfs -- http://localhost:4300     # si la web está en otro puerto
```

Usa el Edge o el Chrome instalados. Si no los encuentra, indica la ruta del navegador en la variable `BROWSER_PATH`.

## Sitemap

`npm run sitemap` rehace `public/sitemap.xml` con las páginas, las clases, las razas y las novedades publicadas. El despliegue lo vuelve a generar después de compilar, así que las novedades nuevas entran solas.
