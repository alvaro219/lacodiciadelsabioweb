import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameDataService } from '../../services/game-data.service';
import { ConditionGroup } from '../../models/condition.model';

@Component({
  selector: 'app-conditions',
  imports: [RouterLink],
  templateUrl: './conditions.html',
  styleUrl: './conditions.scss'
})
export class Conditions {
  protected readonly conditionGroups: ConditionGroup[];

  constructor(private gameData: GameDataService) {
    this.conditionGroups = this.gameData.getConditionGroups();
  }
}
