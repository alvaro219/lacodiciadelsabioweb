import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GameDataService } from '../../services/game-data.service';
import { Race } from '../../models/race.model';

@Component({
  selector: 'app-race-detail',
  imports: [RouterLink],
  templateUrl: './race-detail.html',
  styleUrl: './race-detail.scss'
})
export class RaceDetail {
  protected readonly race = signal<Race | undefined>(undefined);
  protected readonly allRaces;

  constructor(private route: ActivatedRoute, private gameData: GameDataService) {
    this.allRaces = this.gameData.getRaces();
    this.route.params.subscribe(params => {
      const r = this.gameData.getRaceById(params['id']);
      this.race.set(r);
      window.scrollTo({ top: 0 });
    });
  }

  getModifierText(mod: number): string {
    return mod > 0 ? `+${mod}` : `${mod}`;
  }
}
