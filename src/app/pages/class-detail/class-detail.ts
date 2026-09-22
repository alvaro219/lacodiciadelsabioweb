import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GameDataService } from '../../services/game-data.service';
import { SeoService } from '../../services/seo.service';
import { AbilityInfo, AbilityVersion, GameClass } from '../../models/class.model';
import { ABILITY_PROPERTIES, WEAPON_PROPERTIES } from '../../data/properties.data';
import { AppPropiedad } from '../../models/app-data.model';
import { dieLabel } from '../../utils/game.utils';

@Component({
  selector: 'app-class-detail',
  imports: [RouterLink],
  templateUrl: './class-detail.html',
  styleUrl: './class-detail.scss',
})
export class ClassDetail {
  protected readonly gameClass = signal<GameClass | undefined>(undefined);
  protected readonly activeSubclass = signal(0);
  /** Muestra las habilidades mejoradas (al subir de nivel) en lugar de las base. */
  protected readonly improved = signal(false);
  protected readonly allClasses: GameClass[];
  protected readonly dieLabel = dieLabel;

  constructor(
    private route: ActivatedRoute,
    private gameData: GameDataService,
    private seo: SeoService,
  ) {
    this.allClasses = this.gameData.getClasses();
    this.route.params.subscribe((params) => {
      const cls = this.gameData.getClassById(params['id']);
      this.gameClass.set(cls);
      this.activeSubclass.set(0);
      this.improved.set(false);
      if (cls) {
        this.seo.setPage({
          title: cls.name,
          description: `${cls.name}: ${cls.role}. Pasiva, maestría y habilidades de sus subclases ${cls.subclasses.map((s) => s.name).join(', ')}.`,
          path: `/clases/${cls.id}`,
          image: cls.preset?.avatar,
        });
      }
      window.scrollTo({ top: 0 });
    });
  }

  /** Versión de la habilidad que se muestra: la mejorada si está activa y existe. */
  protected version(ability: AbilityInfo): AbilityVersion {
    return this.improved() && ability.improved ? ability.improved : ability;
  }

  /** Propiedades de la versión mostrada: la mejorada hereda las base si no tiene propias. */
  protected properties(ability: AbilityInfo): AppPropiedad[] {
    const keys =
      this.improved() && ability.improved && ability.improvedProperties.length ? ability.improvedProperties : ability.properties;
    return keys.map((k) => ABILITY_PROPERTIES[k]).filter((p): p is AppPropiedad => !!p);
  }

  protected weaponProperties(keys: string[]): AppPropiedad[] {
    return keys.map((k) => WEAPON_PROPERTIES[k]).filter((p): p is AppPropiedad => !!p);
  }

  protected abilityClass(ability: AbilityInfo): string {
    if (ability.kind === 'Definitiva') return 'ability--ultimate';
    if (ability.kind === 'Reacción') return 'ability--reaction';
    return '';
  }
}
