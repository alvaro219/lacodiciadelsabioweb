// Campañas pregeneradas de la app (game/campaigns.json, se actualiza con
// `npm run sync-app`). Solo su presentación: la historia y los encuentros se
// quedan en la app.

import appCampaigns from './game/campaigns.json';
import { AppCampana } from '../models/app-data.model';

export interface Campaign {
  id: string;
  name: string;
  summary: string;
  description: string;
  players: number;
  sessions: number;
  premium: boolean;
  styles: string[];
  encounters: number;
  /** Capítulo de la campaña larga «La Codicia del Sabio» (si no, es un oneshot). */
  chapter: boolean;
}

export interface CampaignSeason {
  number: number;
  name: string;
  campaigns: Campaign[];
}

const campaigns = appCampaigns as unknown as AppCampana[];

/** Temporadas de la más reciente a la más antigua, con el capítulo primero. */
export const CAMPAIGN_SEASONS: CampaignSeason[] = [...new Set(campaigns.map((c) => c.temporadaNumero ?? 0))]
  .sort((a, b) => b - a)
  .map((number) => ({
    number,
    name: campaigns.find((c) => (c.temporadaNumero ?? 0) === number)?.temporada ?? 'Otras campañas',
    campaigns: campaigns
      .filter((c) => (c.temporadaNumero ?? 0) === number)
      .map((c) => ({
        id: c.id,
        name: c.nombre,
        summary: c.resumen,
        description: c.descripcion,
        players: c.jugadores,
        sessions: c.sesiones,
        premium: c.premium,
        styles: c.estilos,
        encounters: c.encuentros,
        chapter: c.nombre.startsWith('Capítulo'),
      }))
      .sort((a, b) => Number(b.chapter) - Number(a.chapter)),
  }));
