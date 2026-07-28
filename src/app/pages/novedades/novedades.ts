import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NovedadService } from '../../services/novedad.service';
import { SeoService } from '../../services/seo.service';
import { Novedad } from '../../models/novedad.model';

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

  constructor(
    private novedadService: NovedadService,
    private seo: SeoService
  ) {}

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
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    return `${base}-${id.slice(0, 8)}`;
  }

  ngOnDestroy() {
    this.clearLoadTimeout();
  }
}
