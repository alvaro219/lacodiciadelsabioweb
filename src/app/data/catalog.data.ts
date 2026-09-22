// Lista mínima de clases y razas para los menús de la web (cabecera y pie),
// que se cargan en todas las páginas y no deben traer todos los datos.

import appCatalog from './game/catalog.json';
import { CLASS_ICONS, DEFAULT_CLASS_ICON, DEFAULT_RACE_ICON, RACE_ICONS } from './icons.data';
import { slugify } from '../utils/game.utils';

export interface CatalogItem {
  id: string;
  name: string;
  icon: string;
}

const catalog = appCatalog as { clases: { nombre: string; esMagica: boolean }[]; razas: string[] };

const classItem = (name: string): CatalogItem => {
  const id = slugify(name);
  return { id, name, icon: CLASS_ICONS[id] ?? DEFAULT_CLASS_ICON };
};

export const MARTIAL_CLASSES: CatalogItem[] = catalog.clases.filter((c) => !c.esMagica).map((c) => classItem(c.nombre));
export const MAGIC_CLASSES: CatalogItem[] = catalog.clases.filter((c) => c.esMagica).map((c) => classItem(c.nombre));

export const RACE_ITEMS: CatalogItem[] = catalog.razas.map((name) => {
  const id = slugify(name);
  return { id, name, icon: RACE_ICONS[id] ?? DEFAULT_RACE_ICON };
});
