// Cifras del juego para la portada y el SEO. Vienen de la app en
// game/stats.json y se actualizan con `npm run sync-app`.

import appStats from './game/stats.json';
import { AppStats } from '../models/app-data.model';

export const GAME_STATS = appStats as AppStats;
