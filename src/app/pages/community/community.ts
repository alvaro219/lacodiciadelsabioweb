import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'evento' | 'beta' | 'torneo' | 'sesion';
  icon: string;
  spots: number;
  spotsTotal: number;
  active: boolean;
}

@Component({
  selector: 'app-community',
  imports: [RouterLink, FormsModule],
  templateUrl: './community.html',
  styleUrl: './community.scss'
})
export class Community {
  protected readonly events: Event[] = [
    {
      id: '1',
      title: 'Beta Testing — App v2.0',
      description: 'Prueba las nuevas funcionalidades de la app antes que nadie. Necesitamos testers para el nuevo sistema de campañas y combate.',
      date: '2026-03-15',
      type: 'beta',
      icon: '🧪',
      spots: 12,
      spotsTotal: 20,
      active: true
    },
    {
      id: '2',
      title: 'Sesión de Introducción al Sistema',
      description: 'Sesión guiada para nuevos jugadores. Aprende las mecánicas básicas y crea tu primer personaje con ayuda del equipo.',
      date: '2026-03-22',
      type: 'sesion',
      icon: '📜',
      spots: 4,
      spotsTotal: 8,
      active: true
    },
    {
      id: '3',
      title: 'Torneo PvP — Arena del Sabio',
      description: 'Primer torneo oficial de PvP. Enfrenta tu personaje contra otros jugadores en combates 1v1 con reglas especiales.',
      date: '2026-04-05',
      type: 'torneo',
      icon: '⚔️',
      spots: 10,
      spotsTotal: 16,
      active: true
    },
    {
      id: '4',
      title: 'Evento Comunitario — Creación de Lore',
      description: 'Contribuye al lore del mundo de La Codicia del Sabio. Las mejores propuestas serán incorporadas al canon oficial.',
      date: '2026-04-20',
      type: 'evento',
      icon: '📖',
      spots: 0,
      spotsTotal: 0,
      active: true
    }
  ];

  protected readonly signupName = signal('');
  protected readonly signupEmail = signal('');
  protected readonly signupEvent = signal('');
  protected readonly signupSuccess = signal(false);
  protected readonly signupError = signal('');

  getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      evento: 'Evento',
      beta: 'Beta Testing',
      torneo: 'Torneo',
      sesion: 'Sesión'
    };
    return labels[type] || type;
  }

  getActiveEvents(): Event[] {
    return this.events.filter(e => e.active);
  }

  onSignup() {
    this.signupError.set('');
    this.signupSuccess.set(false);

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

    // Simulate signup (in production, this would call a backend)
    this.signupSuccess.set(true);
    this.signupName.set('');
    this.signupEmail.set('');
    this.signupEvent.set('');
  }
}
