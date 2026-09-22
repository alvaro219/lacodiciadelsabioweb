import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GameDataService } from '../../services/game-data.service';
import { SeoService } from '../../services/seo.service';
import { Race } from '../../models/race.model';

@Component({
  selector: 'app-race-detail',
  imports: [RouterLink],
  templateUrl: './race-detail.html',
  styleUrl: './race-detail.scss',
})
export class RaceDetail {
  protected readonly race = signal<Race | undefined>(undefined);
  protected readonly allRaces;

  constructor(
    private route: ActivatedRoute,
    private gameData: GameDataService,
    private seo: SeoService,
  ) {
    this.allRaces = this.gameData.getRaces();
    this.route.params.subscribe((params) => {
      const r = this.gameData.getRaceById(params['id']);
      this.race.set(r);
      if (r) {
        this.seo.setPage({
          title: r.name,
          description: `${r.name}: ${r.description} Pasiva: ${r.passive}`,
          path: `/razas/${r.id}`,
          image: r.avatars[0],
        });
      }
      window.scrollTo({ top: 0 });
    });
  }

  getModifierText(mod: number): string {
    return mod > 0 ? `+${mod}` : `${mod}`;
  }
}
