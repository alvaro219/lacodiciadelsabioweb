import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameDataService } from '../../services/game-data.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  protected readonly classes;
  protected readonly races;
  protected readonly martialClasses;
  protected readonly magicClasses;
  protected readonly conditionGroups;
  protected readonly featuredWeapons;

  constructor(private gameData: GameDataService) {
    this.classes = this.gameData.getClasses();
    this.races = this.gameData.getRaces();
    this.martialClasses = this.gameData.getMartialClasses();
    this.magicClasses = this.gameData.getMagicClasses();
    this.conditionGroups = this.gameData.getConditionGroups();
    this.featuredWeapons = this.gameData.getWeapons().filter(w => w.slot === 'Principal').slice(0, 6);
  }
}
