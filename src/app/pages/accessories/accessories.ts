import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ACCESSORIES, RARITIES, Rarity } from '../../data/accessories.data';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-accessories',
  imports: [RouterLink],
  templateUrl: './accessories.html',
  styleUrl: './accessories.scss',
})
export class Accessories {
  protected readonly rarities = RARITIES;
  protected readonly total = ACCESSORIES.length;
  protected readonly rarity = signal<Rarity | 'todas'>('todas');
  protected readonly search = signal('');

  /** Rarezas con sus accesorios filtrados, sin las que se quedan vacías. */
  protected readonly groups = computed(() => {
    const query = this.search().trim().toLowerCase();
    return RARITIES.filter((r) => this.rarity() === 'todas' || this.rarity() === r.id)
      .map((r) => ({
        ...r,
        items: ACCESSORIES.filter(
          (a) =>
            a.rarity === r.id &&
            (!query || a.name.toLowerCase().includes(query) || a.description.toLowerCase().includes(query)),
        ),
      }))
      .filter((g) => g.items.length);
  });

  constructor(seo: SeoService) {
    seo.setPage({
      title: 'Accesorios',
      description: `Los ${ACCESSORIES.length} accesorios de La Codicia del Sabio, de comunes a legendarios, con su efecto y su precio.`,
      path: '/accesorios',
    });
  }

  protected countFor(id: Rarity): number {
    return ACCESSORIES.filter((a) => a.rarity === id).length;
  }

  protected onSearch(event: Event) {
    this.search.set((event.target as HTMLInputElement).value);
  }
}
