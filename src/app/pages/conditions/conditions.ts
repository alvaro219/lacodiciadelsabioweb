import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameDataService } from '../../services/game-data.service';
import { ConditionGroup } from '../../models/condition.model';
import { CONDITION_COUNT } from '../../data/conditions.data';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-conditions',
  imports: [RouterLink],
  templateUrl: './conditions.html',
  styleUrl: './conditions.scss'
})
export class Conditions {
  protected readonly conditionGroups: ConditionGroup[];
  protected readonly total = CONDITION_COUNT;

  constructor(private gameData: GameDataService, seo: SeoService) {
    this.conditionGroups = this.gameData.getConditionGroups();
    seo.setPage({
      title: 'Condiciones',
      description: `Las ${CONDITION_COUNT} condiciones de La Codicia del Sabio: restricciones, debilitaciones, potenciaciones y dañinas, con su duración y su salvación.`,
      path: '/condiciones',
    });
  }
}
