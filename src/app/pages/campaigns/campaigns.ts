import { Component, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CAMPAIGN_SEASONS, Campaign } from '../../data/campaigns.data';
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
  /** Campaña cuya presentación se está leyendo. */
  protected readonly reading = signal<Campaign | null>(null);

  constructor(seo: SeoService) {
    seo.setPage({
      title: 'Campañas',
      description: `Las ${this.total} campañas pregeneradas de La Codicia del Sabio, por temporadas: los capítulos de la campaña larga y los oneshots.`,
      path: '/campanas',
    });
  }

  @HostListener('document:keydown.escape')
  protected closeReading() {
    this.reading.set(null);
  }
}
