import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MAGIC_CLASSES, MARTIAL_CLASSES } from '../../data/catalog.data';
import { CONDITION_GROUPS } from '../../data/conditions.data';
import { WEAPON_PROPERTIES } from '../../data/properties.data';
import { GAME_STATS } from '../../data/stats.data';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-mechanics',
  imports: [RouterLink],
  templateUrl: './mechanics.html',
  styleUrl: './mechanics.scss',
})
export class Mechanics {
  protected readonly martialNames = MARTIAL_CLASSES.map((c) => c.name).join(', ');
  protected readonly magicNames = MAGIC_CLASSES.map((c) => c.name).join(', ');
  protected readonly weaponProperties = Object.values(WEAPON_PROPERTIES);
  protected readonly conditionGroups = CONDITION_GROUPS;
  protected readonly stats = GAME_STATS;
  /** Clase de estilo de cada grupo de condiciones (ver mechanics.scss). */
  protected readonly conditionClass: Record<string, string> = {
    restriccion: 'restriction',
    debilitacion: 'debuff',
    potenciacion: 'buff',
    danino: 'damage',
  };

  constructor(seo: SeoService) {
    seo.setPage({
      title: 'Mecánicas',
      description:
        'Cómo se juega a La Codicia del Sabio: recursos, atributos, salvaciones, margen de daño, progresión, condiciones, enemigos y combate.',
      path: '/mecanicas',
    });
  }
}
