// Utilidades para los datos que llegan de la app.

/** Identificador de URL a partir de un nombre: «Artista Marcial» → «artista-marcial». */
export function slugify(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Ruta en la web de una imagen de la app: «assets/avatars/x.png» →
 * «assets/game/avatars/x.webp». Las copia `npm run sync-app`.
 */
export function gameImage(appPath: string | null | undefined): string | null {
  if (!appPath) return null;
  return appPath.replace(/^assets\//, 'assets/game/').replace(/\.png$/i, '.webp');
}

export interface AbilityText {
  /** Coste en recursos y acciones: «⚡⚡, 🟢🟢». */
  cost: string;
  /** Lo que acompaña al coste: frecuencia, requisitos o el disparador de una reacción. */
  notes: string;
  /** El efecto. */
  body: string;
}

/**
 * Separa el texto de una habilidad de la app en coste, notas y efecto. En la
 * app el coste y sus condiciones van antes de un salto de párrafo («\n\n»).
 */
export function splitAbility(text: string): AbilityText {
  const cut = text.indexOf('\n\n');
  const header = cut >= 0 ? text.slice(0, cut).trim() : '';
  const body = (cut >= 0 ? text.slice(cut + 2) : text).trim();
  // El coste son los grupos de iconos del principio, separados por comas y
  // terminados en punto: «🚫⚡, 🟢🟢🟢.»
  const match = header.match(/^((?:[🚫⚡💧🟢🔶️]+\s*,?\s*)+)\.\s*/u);
  if (!match) return { cost: '', notes: header, body };
  return { cost: match[1].replace(/,\s*$/, '').trim(), notes: header.slice(match[0].length).trim(), body };
}

/** «+1 FUE» → { attribute: 'FUE', modifier: 1 }. */
export function parseTrait(trait: string): { attribute: string; modifier: number } {
  const m = trait.trim().match(/^([+-−]?\d+)\s+(.+)$/);
  if (!m) return { attribute: trait, modifier: 0 };
  return { attribute: m[2], modifier: parseInt(m[1].replace('−', '-'), 10) };
}

/** Nombre de dado: 8 → «1d8»; con varios ataques, «2d4». */
export function dieLabel(die: number, attacks = 1): string {
  return `${attacks}d${die}`;
}
