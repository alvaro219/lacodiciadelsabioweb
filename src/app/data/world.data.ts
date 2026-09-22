// Mapamundi y lore de Magna (game/world.json y game/lore.json, se actualizan
// con `npm run sync-app`).

import appWorld from './game/world.json';
import appLore from './game/lore.json';
import { AppMundo, AppRelato } from '../models/app-data.model';

export const WORLD = appWorld as unknown as AppMundo;
export const LORE = appLore as unknown as AppRelato[];

/** Trazado SVG de los contornos de un país: «M x y L x y … Z». */
export function outlinePath(outlines: number[][]): string {
  return outlines
    .map((points) => {
      let d = '';
      for (let i = 0; i < points.length; i += 2) d += `${i === 0 ? 'M' : 'L'}${points[i]} ${points[i + 1]}`;
      return d + 'Z';
    })
    .join('');
}
