import { Component, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { SupabaseService } from '../../services/supabase.service';
import { GameEvent, EventSignup } from '../../models/event.model';

@Component({
  selector: 'app-admin-events',
  imports: [RouterLink, FormsModule],
  templateUrl: './admin-events.html',
  styleUrl: './admin-events.scss'
})
export class AdminEvents implements OnInit {
  protected events = signal<GameEvent[]>([]);
  protected loading = signal(true);
  protected isAuthenticated = signal(false);
  protected accessDenied = signal(false);
  protected loginError = signal('');
  protected loginEmail = signal('');
  protected loginPassword = signal('');

  // Form state
  protected showForm = signal(false);
  protected editingEvent = signal<GameEvent | null>(null);
  protected formTitle = signal('');
  protected formDescription = signal('');
  protected formDate = signal('');
  protected formType = signal<GameEvent['type']>('evento');
  protected formIcon = signal('📅');
  protected formSpots = signal(0);
  protected formSpotsTotal = signal(0);
  protected formActive = signal(true);
  protected formError = signal('');
  protected saving = signal(false);

  // Signups viewer
  protected viewingSignups = signal<string | null>(null);
  protected signups = signal<EventSignup[]>([]);
  protected signupsLoading = signal(false);

  // Confirm modal
  protected showConfirm = signal(false);
  protected confirmTitle = signal('');
  protected confirmMessage = signal('');
  protected confirmLoading = signal(false);
  private confirmAction: (() => Promise<void>) | null = null;

  constructor(
    private eventService: EventService,
    private supabase: SupabaseService
  ) {}

  async ngOnInit() {
    const { data } = await this.supabase.client.auth.getSession();
    if (data.session) {
      const isAdmin = await this.checkAdminRole(data.session.user.id);
      if (isAdmin) {
        this.isAuthenticated.set(true);
        await this.loadEvents();
      } else {
        this.accessDenied.set(true);
        await this.supabase.client.auth.signOut();
      }
    }
    this.loading.set(false);
  }

  async login() {
    this.loginError.set('');
    this.accessDenied.set(false);
    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email: this.loginEmail(),
      password: this.loginPassword()
    });
    if (error) {
      this.loginError.set(error.message);
      return;
    }

    const isAdmin = await this.checkAdminRole(data.session!.user.id);
    if (!isAdmin) {
      this.accessDenied.set(true);
      await this.supabase.client.auth.signOut();
      return;
    }

    this.isAuthenticated.set(true);
    await this.loadEvents();
  }

  private async checkAdminRole(userId: string): Promise<boolean> {
    const { data, error } = await this.supabase.client
      .from('user_profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (error || !data) return false;
    return data.role === 'admin';
  }

  async logout() {
    await this.supabase.client.auth.signOut();
    this.isAuthenticated.set(false);
    this.events.set([]);
  }

  private async loadEvents() {
    this.loading.set(true);
    await this.eventService.loadEvents();
    this.events.set(this.eventService.events());
    this.loading.set(false);
  }

  openCreateForm() {
    this.editingEvent.set(null);
    this.formTitle.set('');
    this.formDescription.set('');
    this.formDate.set('');
    this.formType.set('evento');
    this.formIcon.set('📅');
    this.formSpots.set(0);
    this.formSpotsTotal.set(0);
    this.formActive.set(true);
    this.formError.set('');
    this.showForm.set(true);
  }

  openEditForm(event: GameEvent) {
    this.editingEvent.set(event);
    this.formTitle.set(event.title);
    this.formDescription.set(event.description);
    this.formDate.set(event.date);
    this.formType.set(event.type);
    this.formIcon.set(event.icon);
    this.formSpots.set(event.spots);
    this.formSpotsTotal.set(event.spots_total);
    this.formActive.set(event.active);
    this.formError.set('');
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
    this.editingEvent.set(null);
  }

  async saveEvent() {
    this.formError.set('');

    if (!this.formTitle().trim()) {
      this.formError.set('El título es obligatorio.');
      return;
    }
    if (!this.formDate()) {
      this.formError.set('La fecha es obligatoria.');
      return;
    }

    this.saving.set(true);
    try {
      const payload = {
        title: this.formTitle().trim(),
        description: this.formDescription().trim(),
        date: this.formDate(),
        type: this.formType(),
        icon: this.formIcon(),
        spots: this.formSpots(),
        spots_total: this.formSpotsTotal(),
        active: this.formActive()
      };

      if (this.editingEvent()) {
        await this.eventService.updateEvent(this.editingEvent()!.id, payload);
      } else {
        await this.eventService.createEvent(payload);
      }

      this.events.set(this.eventService.events());
      this.closeForm();
    } catch (e: any) {
      this.formError.set(e.message || 'Error al guardar el evento.');
    } finally {
      this.saving.set(false);
    }
  }

  deleteEvent(event: GameEvent) {
    this.openConfirm(
      'Eliminar evento',
      `¿Eliminar "${event.title}"? Esta acción no se puede deshacer.`,
      async () => {
        await this.eventService.deleteEvent(event.id);
        this.events.set(this.eventService.events());
      }
    );
  }

  async toggleActive(event: GameEvent) {
    try {
      await this.eventService.toggleEventActive(event.id, !event.active);
      this.events.set(this.eventService.events());
    } catch (e: any) {
      alert('Error: ' + (e.message || 'Error desconocido'));
    }
  }

  async viewSignups(eventId: string) {
    if (this.viewingSignups() === eventId) {
      this.viewingSignups.set(null);
      return;
    }
    this.viewingSignups.set(eventId);
    this.signupsLoading.set(true);
    try {
      const data = await this.eventService.getSignups(eventId);
      this.signups.set(data);
    } catch {
      this.signups.set([]);
    } finally {
      this.signupsLoading.set(false);
    }
  }

  deleteSignup(signupId: string, eventId: string) {
    this.openConfirm(
      'Eliminar inscripción',
      '¿Eliminar esta inscripción? El contador de plazas se actualizará.',
      async () => {
        await this.eventService.deleteSignup(signupId, eventId);
        this.events.set(this.eventService.events());
        const data = await this.eventService.getSignups(eventId);
        this.signups.set(data);
      }
    );
  }

  private openConfirm(title: string, message: string, action: () => Promise<void>) {
    this.confirmTitle.set(title);
    this.confirmMessage.set(message);
    this.confirmAction = action;
    this.showConfirm.set(true);
  }

  closeConfirm() {
    this.showConfirm.set(false);
    this.confirmAction = null;
  }

  async executeConfirm() {
    if (!this.confirmAction) return;
    this.confirmLoading.set(true);
    try {
      await this.confirmAction();
    } catch (e: any) {
      this.formError.set(e.message || 'Error al ejecutar la acción.');
    } finally {
      this.confirmLoading.set(false);
      this.closeConfirm();
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
}
