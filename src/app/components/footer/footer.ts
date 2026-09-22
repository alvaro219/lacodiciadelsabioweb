import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MAGIC_CLASSES, MARTIAL_CLASSES, RACE_ITEMS } from '../../data/catalog.data';
import { GAME_STATS } from '../../data/stats.data';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly currentYear = new Date().getFullYear();
  protected readonly martialClasses = MARTIAL_CLASSES;
  protected readonly magicClasses = MAGIC_CLASSES;
  protected readonly races = RACE_ITEMS;
  protected readonly stats = GAME_STATS;
}
