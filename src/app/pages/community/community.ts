import { Component, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { GameEvent } from '../../models/event.model';

@Component({
  selector: 'app-community',
  imports: [RouterLink, FormsModule],
  templateUrl: './community.html',
  styleUrl: './community.scss'
})
export class Community implements OnInit {
  protected events = signal<GameEvent[]>([]);
  protected loading = signal(true);

  protected readonly signupName = signal('');
  protected readonly signupEmail = signal('');
  protected readonly signupEvent = signal('');
  protected readonly signupSuccess = signal(false);
  protected readonly signupFull = signal(false);
  protected readonly signupError = signal('');
  protected readonly signupLoading = signal(false);

  constructor(private eventService: EventService) {}

  async ngOnInit() {
    await this.loadEvents();
  }

  private async loadEvents() {
    this.loading.set(true);
    try {
      const events = await this.eventService.getActiveEvents();
      this.events.set(events);
    } catch {
      this.events.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      evento: 'Evento',
      beta: 'Beta Testing',
      torneo: 'Torneo',
      sesion: 'Sesión'
    };
    return labels[type] || type;
  }

  getUpcomingEvents(): GameEvent[] {
    const today = new Date().toISOString().split('T')[0];
    return this.events().filter(e => e.date >= today);
  }

  getPastEvents(): GameEvent[] {
    const today = new Date().toISOString().split('T')[0];
    return this.events().filter(e => e.date < today);
  }

  async onSignup() {
    this.signupError.set('');
    this.signupSuccess.set(false);
    this.signupFull.set(false);

    if (!this.signupName().trim()) {
      this.signupError.set('Por favor, introduce tu nombre.');
      return;
    }
    if (!this.signupEmail().trim() || !this.signupEmail().includes('@')) {
      this.signupError.set('Por favor, introduce un email válido.');
      return;
    }
    if (!this.signupEvent()) {
      this.signupError.set('Por favor, selecciona un evento.');
      return;
    }

    this.signupLoading.set(true);
    try {
      await this.eventService.signup({
        event_id: this.signupEvent(),
        name: this.signupName().trim(),
        email: this.signupEmail().trim()
      });
      this.signupSuccess.set(true);
      this.signupName.set('');
      this.signupEmail.set('');
      this.signupEvent.set('');
      await this.loadEvents();
    } catch (e: any) {
      if (e.message === 'EVENT_FULL') {
        this.signupFull.set(true);
      } else {
        this.signupError.set('Error al enviar la inscripción. Inténtalo de nuevo.');
      }
    } finally {
      this.signupLoading.set(false);
    }
  }
}
