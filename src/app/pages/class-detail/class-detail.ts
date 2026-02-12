import { Component, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GameDataService } from '../../services/game-data.service';
import { GameClass } from '../../models/class.model';

@Component({
  selector: 'app-class-detail',
  imports: [RouterLink],
  templateUrl: './class-detail.html',
  styleUrl: './class-detail.scss'
})
export class ClassDetail {
  protected readonly gameClass = signal<GameClass | undefined>(undefined);
  protected readonly activeSubclass = signal(0);
  protected readonly allClasses;

  constructor(private route: ActivatedRoute, private gameData: GameDataService) {
    this.allClasses = this.gameData.getClasses();
    this.route.params.subscribe(params => {
      const cls = this.gameData.getClassById(params['id']);
      this.gameClass.set(cls);
      this.activeSubclass.set(0);
      window.scrollTo({ top: 0 });
    });
  }

  setActiveSubclass(index: number) {
    this.activeSubclass.set(index);
  }

  getAbilityEntries(abilities: Record<string, string | undefined>): { key: string; label: string; value: string }[] {
    const labelMap: Record<string, string> = {
      hap1: 'HAP1 — Habilidad Principal 1',
      hap2: 'HAP2 — Habilidad Principal 2',
      hap3: 'HAP3 — Habilidad Principal 3',
      hap4: 'HAP4 — Reacción',
      has1: 'HAS1 — Habilidad Secundaria 1',
      has2: 'HAS2 — Reacción',
      had: 'HAD — Definitiva'
    };
    return Object.entries(abilities)
      .filter(([_, v]) => v)
      .map(([key, value]) => ({
        key,
        label: labelMap[key] || key.toUpperCase(),
        value: value as string
      }));
  }
}
