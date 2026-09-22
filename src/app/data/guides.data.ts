// Manuales de la web.
// Las secciones son las de los manuales de la app, convertidas en
// game/manuals.json por scripts/sync-manuals.mjs (`npm run sync-app`).
// Aquí solo va la presentación de cada manual.

import appManuals from './game/manuals.json';
import { Guide, GuideSection } from '../models/guide.model';

const manuals = appManuals as unknown as Record<string, GuideSection[]>;

export const GUIDES: Guide[] = [
  {
    id: 'manual-del-jugador',
    name: 'Manual del Jugador',
    subtitle: 'Todo lo que necesitas saber para crear tu personaje, entender las reglas de combate y dominar el sistema de juego.',
    description: 'La guía completa para jugadores de La Codicia del Sabio. Aprende a crear tu personaje, dominar el combate y entender todas las mecánicas del juego.',
    icon: '📖',
    color: '#8b5cf6',
    pdfFile: 'assets/pdf/Manual_del_Jugador_LCDS.pdf',
    sections: manuals['manual-del-jugador'] ?? [],
  },
  {
    id: 'manual-del-master',
    name: 'Manual del Dungeon Master',
    subtitle: 'Todo lo que necesitas para dirigir partidas, diseñar encuentros, manejar enemigos y crear aventuras memorables.',
    description: 'La guía completa para Dungeon Masters de La Codicia del Sabio. Aprende a dirigir partidas, diseñar encuentros y crear aventuras épicas.',
    icon: '👑',
    color: '#f0c040',
    pdfFile: 'assets/pdf/Manual_del_Master_LCDS.pdf',
    sections: manuals['manual-del-master'] ?? [],
  },
];
