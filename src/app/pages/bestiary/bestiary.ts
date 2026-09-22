import { Component, HostListener, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BestiaryEnemy, ENEMIES, EnemyTier, TIERS, signed } from '../../data/bestiary.data';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-bestiary',
  imports: [RouterLink],
  templateUrl: './bestiary.html',
  styleUrl: './bestiary.scss',
})
export class Bestiary {
  protected readonly tiers = TIERS;
  protected readonly total = ENEMIES.length;
  protected readonly freeCount = ENEMIES.filter((e) => !e.premium).length;
  protected readonly signed = signed;

  protected readonly tier = signal<EnemyTier | 'todos'>('todos');
  protected readonly search = signal('');
  protected readonly selected = signal<BestiaryEnemy | null>(null);

  protected readonly enemies = computed(() => {
    const tier = this.tier();
    const query = this.search().trim().toLowerCase();
    return ENEMIES.filter((e) => (tier === 'todos' || e.tier === tier) && (!query || e.name.toLowerCase().includes(query)));
  });

  constructor(seo: SeoService) {
    seo.setPage({
      title: 'Bestiario',
      description: `Los ${ENEMIES.length} enemigos pregenerados de La Codicia del Sabio, de minions a jefes, con sus estadísticas, armas y habilidades.`,
      path: '/bestiario',
    });
  }

  protected tierInfo(id: EnemyTier) {
    return TIERS.find((t) => t.id === id)!;
  }

  protected countFor(id: EnemyTier): number {
    return ENEMIES.filter((e) => e.tier === id).length;
  }

  protected onSearch(event: Event) {
    this.search.set((event.target as HTMLInputElement).value);
  }

  @HostListener('document:keydown.escape')
  protected close() {
    this.selected.set(null);
  }
}
