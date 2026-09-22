import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameDataService } from '../../services/game-data.service';
import { SeoService } from '../../services/seo.service';
import { GAME_STATS } from '../../data/stats.data';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly stats = GAME_STATS;
  protected readonly classes;
  protected readonly races;
  protected readonly martialClasses;
  protected readonly magicClasses;
  protected readonly conditionGroups;
  protected readonly featuredWeapons;
  /** Novedades de la temporada que se destacan en la portada. */
  protected readonly newClass;
  protected readonly newRace;

  constructor(gameData: GameDataService, seo: SeoService) {
    this.classes = gameData.getClasses();
    this.races = gameData.getRaces();
    this.martialClasses = gameData.getMartialClasses();
    this.magicClasses = gameData.getMagicClasses();
    this.conditionGroups = gameData.getConditionGroups();
    this.featuredWeapons = gameData.getWeapons().filter((w) => w.slot === 'Principal').slice(0, 6);
    this.newClass = gameData.getClassById('apotecario');
    this.newRace = gameData.getRaceById('myridian');
    seo.setDefault();
  }
}
