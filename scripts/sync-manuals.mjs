// sync-manuals.mjs
// Convierte los manuales de la app (Manual del Jugador y del Máster) en las
// secciones de las guías de la web, para que la web diga exactamente lo mismo.
//
//   node scripts/sync-manuals.mjs [carpeta de la app]
//
// Por defecto lee ../gestorderol y escribe src/app/data/game/manuals.json.
// Recorre, en orden, las llamadas a las funciones de maquetación de cada
// pantalla (_buildSection, _buildParagraph, _buildInfoBox...) y traduce cada
// una a un bloque de guía: párrafo, subtítulo, lista, tabla o nota.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const appRoot = resolve(process.argv[2] ?? join(webRoot, '..', 'gestorderol'));
const outFile = join(webRoot, 'src/app/data/game/manuals.json');

const MANUALS = [
  { id: 'manual-del-jugador', file: 'lib/screens/player_manual_screen.dart' },
  { id: 'manual-del-master', file: 'lib/screens/dm_manual_screen.dart' },
];

const SECTION_ICONS = {
  person_add_rounded: '🧙', bar_chart_rounded: '📊', auto_fix_high_rounded: '✨', timer_rounded: '⏱️',
  gps_fixed_rounded: '🎯', bolt_rounded: '⚡', swap_vert_rounded: '🔀', shield_rounded: '🛡️',
  security_rounded: '🧿', bug_report_rounded: '🧪', hotel_rounded: '🛏️', casino_rounded: '🎲',
  groups_rounded: '👥', diversity_3_rounded: '🌍', diamond_rounded: '💎', trending_up_rounded: '📈',
  table_chart_rounded: '📋', theater_comedy_rounded: '🎭', schedule_rounded: '🗓️', campaign_rounded: '📣',
  sports_kabaddi_rounded: '⚔️', warning_amber_rounded: '⚠️', design_services_rounded: '🗺️',
  emoji_events_rounded: '🏆', explore_rounded: '🧭', people_outline_rounded: '🗣️', tips_and_updates_rounded: '💡',
};

// Cabeceras de las tablas y cómo se lee cada fila. `cols` son los índices de
// los argumentos de texto de la función que forman las columnas.
const TABLES = {
  _buildDurationRow: { headers: ['Duración', 'Descripción'] },
  _buildStatRow: { headers: ['Atributo', 'Nombre', 'Para qué sirve'] },
  _buildDerivedStat: { headers: ['Estadística', 'Cómo funciona'] },
  _buildResourceRow: { headers: ['Recurso', 'Descripción'], row: (a) => [`${a[0]} ${a[1]}`, a[2]] },
  _buildActionCost: { headers: ['Acción', 'Coste'] },
  _buildResourceDetail: { headers: ['Recurso', 'Clases', 'Regeneración'] },
  _buildAbilityType: { headers: ['Tipo', 'Descripción'] },
  _buildArmorType: { headers: ['Armadura', 'Descripción'] },
  _buildArmorDetail: { headers: ['Armadura', 'Escudo', 'Iniciativa'] },
  _buildSaveType: { headers: ['Salvación', 'Resiste'] },
  _buildConditionType: { headers: ['Tipo', 'Efecto', 'Condiciones'] },
  _buildRestType: { headers: ['Descanso', 'Efecto'] },
  _buildAdvantageRow: { headers: ['Situación', 'Efecto'] },
  _buildClassSummary: { headers: ['Clase', 'Rol', 'Recurso'] },
  _buildRaceSummary: { headers: ['Raza', 'Rasgos', 'Movimiento y tamaño'] },
  _buildComparisonRow: { headers: ['Aspecto', 'Especialización', 'Multiclaseo'] },
  _buildProgressionRow: { headers: ['Nivel', 'Mejora', 'Recurso'] },
  _buildRefRow: { headers: ['Concepto', 'Valor'] },
  _buildRarityRow: { headers: ['Rareza', 'Efectos', 'Dónde se consigue'] },
  _buildDifficultyRow: { headers: ['Dificultad', 'CD'] },
  _buildSaveRow: { headers: ['Salvación', 'Resiste'] },
  _buildResourceBox: { headers: ['Recurso', 'Descripción'], row: (a) => [`${a[0]} ${a[1]}`, a[2]] },
  _buildTierRow: { headers: ['Tier', 'Descripción'] },
  _buildEncounterDifficulty: { headers: ['Dificultad', 'Composición'] },
  _buildEnemyStat: { headers: ['Estadística', 'Descripción'] },
};

// Funciones cuyas filas son «Título: texto» dentro de una lista.
const TITLED_LISTS = new Set(['_buildMulticlassRule', '_buildTip']);

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Devuelve el índice del paréntesis que cierra el que abre en `open`. */
function matchParen(src, open) {
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    const ch = src[i];
    if (ch === "'" || ch === '"') {
      i = skipString(src, i);
      continue;
    }
    if (ch === '(' || ch === '[' || ch === '{') depth++;
    if (ch === ')' || ch === ']' || ch === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  throw new Error('Paréntesis sin cerrar en la posición ' + open);
}

function skipString(src, start) {
  const quote = src[start];
  for (let i = start + 1; i < src.length; i++) {
    if (src[i] === '\\') { i++; continue; }
    if (src[i] === quote) return i;
  }
  throw new Error('Cadena sin cerrar en la posición ' + start);
}

/** Separa los argumentos de nivel superior de una llamada. */
function splitArgs(inner) {
  const args = [];
  let depth = 0, current = '';
  for (let i = 0; i < inner.length; i++) {
    const ch = inner[i];
    if (ch === "'" || ch === '"') {
      const end = skipString(inner, i);
      current += inner.slice(i, end + 1);
      i = end;
      continue;
    }
    if ('([{'.includes(ch)) depth++;
    if (')]}'.includes(ch)) depth--;
    if (ch === ',' && depth === 0) {
      args.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) args.push(current.trim());
  return args;
}

/** Valor de un argumento: texto (con las cadenas adyacentes unidas), booleano o null. */
function argValue(arg) {
  const value = arg.replace(/^[a-zA-Z]+:\s*/, '');
  if (value === 'true') return true;
  if (value === 'false') return false;
  const strings = [...value.matchAll(/'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"/g)];
  if (!strings.length || /^[A-Za-z_]/.test(value)) return null;
  return strings
    .map((m) => (m[1] ?? m[2]).replace(/\\n/g, '\n').replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\$/g, '$'))
    .join('');
}

const html = (text) => escapeHtml(text).replace(/\n/g, '<br>');

function convert(file) {
  const src = readFileSync(join(appRoot, file), 'utf8').replace(/\r\n/g, '\n');
  // Solo el contenido: termina donde empiezan las definiciones de las funciones.
  const body = src.slice(0, src.search(/\n  Widget _build[A-Za-z]+\(/));
  const sections = [];
  let section = null;

  const push = (block) => {
    if (!section) throw new Error('Bloque fuera de una sección en ' + file);
    const last = section.content.at(-1);
    // Filas seguidas de la misma tabla o de la misma lista van juntas.
    if (last && last._from === block._from && (block.type === 'table' || block.type === 'list' || block.type === 'ordered-list')) {
      if (block.type === 'table') last.rows.push(...block.rows);
      else last.items.push(...block.items);
      return;
    }
    section.content.push(block);
  };

  for (const m of body.matchAll(/(_build[A-Za-z]+)\(/g)) {
    const fn = m[1];
    const open = m.index + fn.length;
    const inner = body.slice(open + 1, matchParen(body, open));
    const args = splitArgs(inner);
    const texts = args.map(argValue);
    const strings = texts.filter((t) => typeof t === 'string');

    if (fn === '_buildSection') {
      const title = argValue(args.find((a) => a.startsWith('title:')));
      const icon = (inner.match(/icon:\s*Icons\.([a-z0-9_]+)/) ?? [])[1];
      section = {
        id: title.replace(/^\d+\.\s*/, '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        title,
        icon: SECTION_ICONS[icon] ?? '📖',
        content: [],
      };
      sections.push(section);
      continue;
    }
    if (fn === '_buildIntroCard') continue;

    if (fn === '_buildParagraph') push({ type: 'paragraph', text: html(strings[0]) });
    else if (fn === '_buildSubtitle') push({ type: 'subheading', text: html(strings[0]) });
    else if (fn === '_buildBullet') push({ type: 'list', items: [html(strings[0])], _from: fn });
    else if (fn === '_buildNumberedItem') {
      // (número, título, descripción, [subtítulo]...)
      const [, title, desc, sub] = strings;
      push({ type: 'ordered-list', items: [`<strong>${html(title)}</strong>: ${html(desc)}${sub ? ` <em>(${html(sub)})</em>` : ''}`], _from: fn });
    } else if (fn === '_buildInfoBox' || fn === '_buildRestBox') {
      push({ type: 'note', text: `<strong>${html(strings[0])}.</strong> ${html(strings[1])}` });
    } else if (fn === '_buildPathHeader') {
      push({ type: 'subheading', text: html(strings[0]) });
      if (strings[1]) push({ type: 'paragraph', text: `<em>${html(strings[1])}</em>` });
    } else if (TITLED_LISTS.has(fn)) {
      push({ type: 'list', items: [`<strong>${html(strings[0])}:</strong> ${html(strings[1])}`], _from: fn });
    } else if (fn === '_buildComparisonRow') {
      push({ type: 'table', headers: TABLES[fn].headers, rows: [[html(strings[0]), texts[1] ? '✔' : '—', texts[2] ? '✔' : '—']], _from: fn });
    } else if (TABLES[fn]) {
      const { headers, row } = TABLES[fn];
      const cells = row ? row(strings) : strings.slice(0, headers.length);
      push({ type: 'table', headers, rows: [cells.map((c) => html(c ?? ''))], _from: fn });
    } else {
      throw new Error(`Función sin traducir en ${file}: ${fn}. Añádela a sync-manuals.mjs.`);
    }
  }

  for (const s of sections) for (const b of s.content) delete b._from;
  return sections;
}

const manuals = Object.fromEntries(MANUALS.map((m) => [m.id, convert(m.file)]));
mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, JSON.stringify(manuals, null, 2) + '\n');
for (const [id, sections] of Object.entries(manuals)) {
  console.log(`${id}: ${sections.length} secciones, ${sections.reduce((n, s) => n + s.content.length, 0)} bloques`);
}
