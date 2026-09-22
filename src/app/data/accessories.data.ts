// Accesorios pregenerados de la app (game/accessories.json, se actualiza con
// `npm run sync-app`).

import appAccessories from './game/accessories.json';
import { AppAccesorio } from '../models/app-data.model';
import { gameImage, slugify } from '../utils/game.utils';

export type Rarity = AppAccesorio['rareza'];

export const RARITIES: { id: Rarity; label: string; color: string; description: string }[] = [
  { id: 'comun', label: 'Común', color: '#4caf50', description: 'Bonos sencillos. Se encuentran en tiendas, campamentos y mercaderes.' },
  { id: 'raro', label: 'Raro', color: '#2196f3', description: 'Resistencias elementales o bonos a atributos. Recompensas de misiones y jefes menores.' },
  { id: 'epico', label: 'Épico', color: '#b45cd6', description: 'Efectos potentes, normalmente limitados por turno o combate. Mazmorras y arcos narrativos.' },
  { id: 'legendario', label: 'Legendario', color: '#ffc107', description: 'Efectos únicos que cambian el combate. Muy escasos: los otorga el Director de Juego.' },
];

export interface Accessory {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  price: number;
  image: string | null;
}

export const ACCESSORIES: Accessory[] = (appAccessories as unknown as AppAccesorio[]).map((a) => ({
  id: slugify(a.nombre),
  name: a.nombre,
  description: a.descripcion,
  rarity: a.rareza,
  price: a.precio,
  image: gameImage(a.imagen),
}));
