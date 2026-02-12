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

  constructor(private gameData: GameDataService) {
    this.classes = this.gameData.getClasses();
    this.races = this.gameData.getRaces();
    this.martialClasses = this.gameData.getMartialClasses();
    this.magicClasses = this.gameData.getMagicClasses();
  }
}
