// Propiedades de habilidades y de armas de la app (game/properties.json, se
// actualiza con `npm run sync-app`): nombre, descripción y color de cada una.

import appProperties from './game/properties.json';
import { AppPropiedad, AppPropiedades } from '../models/app-data.model';

const properties = appProperties as unknown as AppPropiedades;

export const ABILITY_PROPERTIES: Record<string, AppPropiedad> = properties.habilidad;
export const WEAPON_PROPERTIES: Record<string, AppPropiedad> = properties.arma;
