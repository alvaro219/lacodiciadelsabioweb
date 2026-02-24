import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameDataService } from '../../services/game-data.service';
import { Guide } from '../../models/guide.model';

@Component({
  selector: 'app-guides',
  imports: [RouterLink],
  templateUrl: './guides.html',
  styleUrl: './guides.scss'
})
export class Guides {
  protected readonly guides: Guide[];

  constructor(private gameData: GameDataService) {
    this.guides = this.gameData.getGuides();
  }
}
