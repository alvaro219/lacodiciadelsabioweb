import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CAMPAIGN_SEASONS } from '../../data/campaigns.data';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-campaigns',
  imports: [RouterLink],
  templateUrl: './campaigns.html',
  styleUrl: './campaigns.scss',
})
export class Campaigns {
  protected readonly seasons = CAMPAIGN_SEASONS;
  protected readonly total = CAMPAIGN_SEASONS.reduce((n, s) => n + s.campaigns.length, 0);
  protected readonly free = CAMPAIGN_SEASONS.reduce((n, s) => n + s.campaigns.filter((c) => !c.premium).length, 0);
  /** Campañas con la descripción completa desplegada. */
  protected readonly expanded = signal(new Set<string>());

  constructor(seo: SeoService) {
    seo.setPage({
      title: 'Campañas',
      description: `Las ${this.total} campañas pregeneradas de La Codicia del Sabio, por temporadas: los capítulos de la campaña larga y los oneshots.`,
      path: '/campanas',
    });
  }

  protected toggle(id: string) {
    const next = new Set(this.expanded());
    if (next.has(id)) next.delete(id);
    else next.add(id);
    this.expanded.set(next);
  }
}
