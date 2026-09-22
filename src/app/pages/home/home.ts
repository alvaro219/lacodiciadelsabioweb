import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameDataService } from '../../services/game-data.service';
import { SeoService } from '../../services/seo.service';
import { GAME_STATS } from '../../data/stats.data';

/**
 * Día en que la temporada sale en Google Play. Hasta entonces la portada la
 * anuncia («El 25 de septiembre llega…») y desde ese día dice «Ya disponible»,
 * sin tener que volver a publicar la web.
 */
const SEASON_LAUNCH = new Date('2026-09-25T00:00:00+02:00');

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly stats = GAME_STATS;
  protected readonly seasonOut = Date.now() >= SEASON_LAUNCH.getTime();
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
