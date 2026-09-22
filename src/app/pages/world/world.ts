import { Component, HostListener, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LORE, WORLD, outlinePath } from '../../data/world.data';
import { AppRelato } from '../../models/app-data.model';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-world',
  imports: [RouterLink],
  templateUrl: './world.html',
  styleUrl: './world.scss',
})
export class World {
  protected readonly world = WORLD;
  protected readonly lore = LORE;
  protected readonly countries = WORLD.paises.map((p) => ({ ...p, path: outlinePath(p.contornos) }));
  protected readonly islands = WORLD.islas.map((i) => ({
    ...i,
    countries: this.countries.filter((c) => c.isla === i.nombre),
  }));

  protected readonly selectedId = signal<string | null>(null);
  protected readonly selected = computed(() => this.countries.find((c) => c.id === this.selectedId()) ?? null);
  protected readonly selectedLore = computed(() => {
    const country = this.selected();
    return country ? LORE.filter((e) => country.lore.includes(e.id)) : [];
  });
  protected readonly reading = signal<AppRelato | null>(null);

  constructor(seo: SeoService) {
    seo.setPage({
      title: 'El mundo de Magna',
      description: `Mapamundi de Magna con sus ${WORLD.paises.length} países y el lore del mundo de La Codicia del Sabio: relatos, trasfondo y las Cartas del Sabio.`,
      path: '/mundo',
    });
  }

  protected select(id: string) {
    this.selectedId.set(this.selectedId() === id ? null : id);
  }

  protected read(entry: AppRelato) {
    this.reading.set(entry);
  }

  @HostListener('document:keydown.escape')
  protected closeReading() {
    this.reading.set(null);
  }
}
