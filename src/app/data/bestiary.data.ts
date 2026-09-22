// Bestiario de la web: los enemigos pregenerados de la app (game/enemies.json,
// se actualiza con `npm run sync-app`).

import appEnemies from './game/enemies.json';
import placeholderImages from './game/placeholder-images.json';
import { AppEnemigo } from '../models/app-data.model';
import { gameImage, slugify } from '../utils/game.utils';

/** Dibujos provisionales de la app, repetidos entre enemigos: la web no los muestra. */
const PLACEHOLDERS = new Set(placeholderImages as string[]);

export type EnemyTier = AppEnemigo['tier'];

export const TIERS: { id: EnemyTier; label: string; color: string; description: string }[] = [
  { id: 'minion', label: 'Minion', color: '#94a3b8', description: 'Débiles y numerosos. Mueren fácil y abruman en grupo.' },
  { id: 'normal', label: 'Normal', color: '#60a5fa', description: 'El estándar: estadísticas equilibradas.' },
  { id: 'miniBoss', label: 'Mini Boss', color: '#a78bfa', description: 'Potentes, con habilidades peligrosas. Exigen estrategia.' },
  { id: 'boss', label: 'Boss', color: '#f0c040', description: 'La amenaza máxima: varias habilidades y mucha vida.' },
];

const STAT_LABELS: [string, string][] = [
  ['fuerza', 'FUE'],
  ['destreza', 'DES'],
  ['constitucion', 'CON'],
  ['inteligencia', 'INT'],
  ['percepcion', 'PER'],
  ['carisma', 'CAR'],
];

const MOD_KEYS: Record<string, string> = {
  Fuerza: 'fuerza',
  Destreza: 'destreza',
  Constitución: 'constitucion',
  Inteligencia: 'inteligencia',
  Percepción: 'percepcion',
  Carisma: 'carisma',
};

export interface BestiaryEnemy {
  id: string;
  name: string;
  type: string;
  tier: EnemyTier;
  pv: number;
  shield: number;
  /** Dificultad de Acierto: 10 + Mod. Destreza. */
  da: number;
  stats: { label: string; value: number; mod: number }[];
  weapon: { name: string; damage: string; modifier: string };
  abilities: { name: string; description: string; cost: string }[];
  passives: { name: string; description: string }[];
  image: string | null;
  factions: string[];
  /** Solo aparece en campañas premium: en la web no se muestran sus estadísticas. */
  premium: boolean;
}

/** Número con signo: 2 → «+2», −1 → «-1». */
export const signed = (n: number) => (n >= 0 ? `+${n}` : `${n}`);

export const ENEMIES: BestiaryEnemy[] = (appEnemies as unknown as AppEnemigo[]).map((e) => {
  const mod = (key: string) => (e.stats[key] ?? 10) - 10;
  const weaponMod = mod(MOD_KEYS[e.arma.modificador] ?? 'fuerza');
  return {
    id: slugify(e.nombre),
    name: e.nombre,
    type: e.tipo,
    tier: e.tier,
    pv: e.pv,
    shield: e.escudo,
    da: 10 + mod('destreza'),
    stats: STAT_LABELS.map(([key, label]) => ({ label, value: e.stats[key] ?? 10, mod: mod(key) })),
    weapon: {
      name: e.arma.nombre,
      damage: `${e.arma.ataques}d${e.arma.dado}${weaponMod ? signed(weaponMod) : ''}`,
      modifier: e.arma.modificador,
    },
    abilities: e.habilidades.map((h) => ({ name: h.nombre, description: h.descripcion, cost: h.coste })),
    passives: e.pasivas.map((p) => ({ name: p.nombre, description: p.descripcion })),
    image: e.image && !PLACEHOLDERS.has(e.image) ? gameImage(e.image) : null,
    factions: e.facciones ?? [],
    premium: e.soloPremium,
  };
});
