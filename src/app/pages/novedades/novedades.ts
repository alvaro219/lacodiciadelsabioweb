import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NovedadService } from '../../services/novedad.service';
import { Novedad } from '../../models/novedad.model';

@Component({
  selector: 'app-novedades',
  imports: [RouterLink, DatePipe],
  templateUrl: './novedades.html',
  styleUrl: './novedades.scss'
})
export class Novedades implements OnInit {
  protected readonly novedades = signal<Novedad[]>([]);
  protected readonly loading = signal(true);

  constructor(private novedadService: NovedadService) {}

  async ngOnInit() {
    await this.novedadService.loadNovedades();
    this.novedades.set(this.novedadService.novedades());
    this.loading.set(false);
  }
}
