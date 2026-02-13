import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameDataService } from '../../services/game-data.service';
import { Weapon, WeaponAbility } from '../../models/weapon.model';

@Component({
  selector: 'app-weapons',
  imports: [RouterLink],
  templateUrl: './weapons.html',
  styleUrl: './weapons.scss'
})
export class Weapons {
  protected readonly weapons: Weapon[];
  protected readonly weaponAbilities: WeaponAbility[];
  protected readonly primaryWeapons: Weapon[];
  protected readonly secondaryWeapons: Weapon[];

  constructor(private gameData: GameDataService) {
    this.weapons = this.gameData.getWeapons();
    this.weaponAbilities = this.gameData.getWeaponAbilities();
    this.primaryWeapons = this.weapons.filter(w => w.slot === 'Principal');
    this.secondaryWeapons = this.weapons.filter(w => w.slot === 'Secundario' || w.slot === 'Secundaria');
  }
}
