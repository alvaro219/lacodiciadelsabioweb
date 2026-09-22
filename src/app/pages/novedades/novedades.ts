import { Component, OnInit, OnDestroy, computed, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NovedadService } from '../../services/novedad.service';
import { SeoService } from '../../services/seo.service';
import { Novedad } from '../../models/novedad.model';
import { slugify } from '../../utils/game.utils';

/** Etiqueta de las novedades para el filtro. «Guía» y «Guia» son la misma (mismo slug). */
interface TagOption {
  slug: string;
  label: string;
  count: number;
}

/** Etiquetas que se ven sin desplegar: las usadas en al menos tantas novedades. */
const MAIN_TAG_MIN_COUNT = 2;

const normalize = (text: string) =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

@Component({
  selector: 'app-novedades',
  imports: [RouterLink, DatePipe],
  templateUrl: './novedades.html',
  styleUrl: './novedades.scss'
})
export class Novedades implements OnInit, OnDestroy {
  protected readonly novedades = signal<Novedad[]>([]);
  protected readonly loading = signal(true);
  protected readonly loadError = signal('');
  private loadTimeout: any;

  /** Filtros: etiqueta (slug, en ?etiqueta=) y texto de búsqueda (?q=). */
  protected readonly selectedTag = signal('');
  protected readonly query = signal('');
  protected readonly showAllTags = signal(false);
  protected readonly slug = slugify;

  protected readonly tagOptions = computed<TagOption[]>(() => {
    const bySlug = new Map<string, { count: number; labels: Map<string, number> }>();
    for (const nov of this.novedades()) {
      for (const tag of new Set(nov.tags ?? [])) {
        const slug = slugify(tag);
        if (!slug) continue;
        const entry = bySlug.get(slug) ?? { count: 0, labels: new Map<string, number>() };
        entry.count++;
        entry.labels.set(tag, (entry.labels.get(tag) ?? 0) + 1);
        bySlug.set(slug, entry);
      }
    }
    return [...bySlug]
      .map(([slug, { count, labels }]) => ({
        slug,
        count,
        // La forma más usada: «Guía» antes que «Guia».
        label: [...labels].sort((a, b) => b[1] - a[1] || b[0].localeCompare(a[0]))[0][0],
      }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'es'));
  });

  protected readonly mainTags = computed(() =>
    this.tagOptions().filter((t) => t.count >= MAIN_TAG_MIN_COUNT || t.slug === this.selectedTag()),
  );
  protected readonly extraTags = computed(() =>
    this.tagOptions().filter((t) => t.count < MAIN_TAG_MIN_COUNT && t.slug !== this.selectedTag()),
  );

  protected readonly filtered = computed(() => {
    const tag = this.selectedTag();
    const words = normalize(this.query().trim()).split(/\s+/).filter(Boolean);
    return this.novedades().filter((nov) => {
      if (tag && !(nov.tags ?? []).some((t) => slugify(t) === tag)) return false;
      if (!words.length) return true;
      const text = normalize([nov.title, nov.synopsis ?? '', ...(nov.tags ?? [])].join(' '));
      return words.every((w) => text.includes(w));
    });
  });

  constructor(
    private novedadService: NovedadService,
    private seo: SeoService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.selectedTag.set(this.route.snapshot.queryParamMap.get('etiqueta') ?? '');
    this.query.set(this.route.snapshot.queryParamMap.get('q') ?? '');
  }

  async ngOnInit() {
    this.seo.setNovedadesIndex();
    this.startLoadTimeout();
    try {
      await this.novedadService.loadNovedades();
      this.novedades.set(this.novedadService.novedades());
    } catch (err) {
      console.error('[Novedades] Error cargando novedades:', err);
      this.loadError.set('Error al cargar las novedades. Pulsa "Reintentar".');
    } finally {
      this.loading.set(false);
      this.clearLoadTimeout();
    }
  }

  protected selectTag(slug: string) {
    this.selectedTag.set(this.selectedTag() === slug ? '' : slug);
    this.syncUrl();
  }

  protected onSearch(event: Event) {
    this.query.set((event.target as HTMLInputElement).value);
    this.syncUrl();
  }

  protected clearFilters() {
    this.selectedTag.set('');
    this.query.set('');
    this.syncUrl();
  }

  /** Deja los filtros en la URL para poder compartirlos. */
  private syncUrl() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { etiqueta: this.selectedTag() || null, q: this.query().trim() || null },
      replaceUrl: true,
    });
  }

  private startLoadTimeout() {
    this.clearLoadTimeout();
    this.loadTimeout = setTimeout(() => {
      if (this.loading() && this.novedades().length === 0) {
        console.warn('[Novedades] Timeout de carga alcanzado');
        this.loading.set(false);
        this.loadError.set('La carga está tardando demasiado. Pulsa "Reintentar".');
      }
    }, 10000);
  }

  private clearLoadTimeout() {
    if (this.loadTimeout) {
      clearTimeout(this.loadTimeout);
      this.loadTimeout = null;
    }
  }

  async retryLoad() {
    this.loadError.set('');
    this.loading.set(true);
    await this.ngOnInit();
  }

  stripMarkdown(text: string): string {
    return text
      .replace(/^#{1,3} /gm, '')
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/\n/g, ' ')
      .slice(0, 160);
  }

  buildSlug(title: string, id: string): string {
    const base = title.toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    return `${base}-${id.slice(0, 8)}`;
  }

  ngOnDestroy() {
    this.clearLoadTimeout();
  }
}
