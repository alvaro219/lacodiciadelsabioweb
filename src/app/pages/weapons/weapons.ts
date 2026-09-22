import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameDataService } from '../../services/game-data.service';
import { SeoService } from '../../services/seo.service';
import { Weapon, WeaponAbility } from '../../models/weapon.model';
import { WEAPON_PROPERTIES } from '../../data/properties.data';

@Component({
  selector: 'app-weapons',
  imports: [RouterLink],
  templateUrl: './weapons.html',
  styleUrl: './weapons.scss',
})
export class Weapons {
  protected readonly weaponAbilities: WeaponAbility[];
  protected readonly primaryWeapons: Weapon[];
  protected readonly secondaryWeapons: Weapon[];
  /** Color de cada propiedad de arma por su nombre visible. */
  protected readonly propertyColor: Record<string, string> = Object.fromEntries(
    Object.values(WEAPON_PROPERTIES).map((p) => [p.nombre, p.color]),
  );

  constructor(gameData: GameDataService, seo: SeoService) {
    const weapons = gameData.getWeapons();
    this.weaponAbilities = gameData.getWeaponAbilities();
    this.primaryWeapons = weapons.filter((w) => w.slot === 'Principal');
    this.secondaryWeapons = weapons.filter((w) => w.slot === 'Secundaria');
    seo.setPage({
      title: 'Armas',
      description: 'Todas las armas de La Codicia del Sabio: dado de daño, atributo, propiedades y las subclases que las usan.',
      path: '/armas',
    });
  }
}
