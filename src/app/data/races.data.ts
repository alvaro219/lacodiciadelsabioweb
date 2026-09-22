// Razas de la web, construidas con los datos de la app (game/races.json, se
// actualiza con `npm run sync-app`) y los textos propios de la web
// (race-extras.ts).

import appRaces from './game/races.json';
import { AppRaza } from '../models/app-data.model';
import { Race } from '../models/race.model';
import { gameImage, parseTrait, slugify } from '../utils/game.utils';
import { RACE_EXTRAS } from './race-extras';
import { DEFAULT_RACE_ICON, RACE_ICONS } from './icons.data';

/** Avatares que se muestran por raza (los que copia scripts/sync-images.mjs). */
const MAX_RACE_AVATARS = 8;

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Los Omnimek no tienen avatares propios: se usa el de su personaje preparado. */
const FALLBACK_AVATARS: Record<string, string[]> = {
  omnimek: ['assets/avatars/sticker_noble_unknow_man_01.png'],
};

export const RACES: Race[] = (appRaces as unknown as AppRaza[]).map((r) => {
  const id = slugify(r.nombre);
  const extras = RACE_EXTRAS[id];
  const avatars = (r.avatares.length ? r.avatares : FALLBACK_AVATARS[id] ?? []).slice(0, MAX_RACE_AVATARS);
  return {
    id,
    name: r.nombre,
    size: capitalize(r.tamano),
    speed: r.velocidad,
    traits: (r.subrazas[0]?.rasgos ?? []).map(parseTrait),
    passiveName: extras?.passiveName ?? 'Pasiva',
    passive: r.pasiva,
    description: extras?.description ?? r.definicion,
    lore: extras?.lore ?? '',
    icon: RACE_ICONS[id] ?? DEFAULT_RACE_ICON,
    color: extras?.color ?? '#a78bfa',
    avatars: avatars.map((a) => gameImage(a)!),
    subraces: r.subrazas.map((s) => ({
      name: s.nombre,
      description: s.definicion,
      passive: s.pasiva,
      traits: s.rasgos.map(parseTrait),
      speed: s.velocidad,
      size: s.tamano ? capitalize(s.tamano) : undefined,
    })),
  };
});
