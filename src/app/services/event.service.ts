import { Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { GameEvent, EventSignup } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  readonly events = signal<GameEvent[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(private supabase: SupabaseService) {}

  async loadEvents(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const { data, error } = await this.supabase.client
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      this.events.set(data as GameEvent[]);
    } catch (e: any) {
      this.error.set(e.message || 'Error al cargar eventos');
    } finally {
      this.loading.set(false);
    }
  }

  async getActiveEvents(): Promise<GameEvent[]> {
    const { data, error } = await this.supabase.client
      .from('events')
      .select('*')
      .eq('active', true)
      .order('date', { ascending: true });

    if (error) throw error;
    return data as GameEvent[];
  }

  async createEvent(event: Omit<GameEvent, 'id' | 'created_at'>): Promise<GameEvent> {
    const { data, error } = await this.supabase.client
      .from('events')
      .insert(event)
      .select()
      .single();

    if (error) throw error;
    await this.loadEvents();
    return data as GameEvent;
  }

  async updateEvent(id: string, updates: Partial<GameEvent>): Promise<GameEvent> {
    const { data, error } = await this.supabase.client
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    await this.loadEvents();
    return data as GameEvent;
  }

  async deleteEvent(id: string): Promise<void> {
    const { error } = await this.supabase.client
      .from('events')
      .delete()
      .eq('id', id);

    if (error) throw error;
    await this.loadEvents();
  }

  async toggleEventActive(id: string, active: boolean): Promise<void> {
    await this.updateEvent(id, { active });
  }

  private async syncSpots(eventId: string): Promise<void> {
    const { count, error } = await this.supabase.client
      .from('event_signups')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', eventId);

    if (error) throw error;

    await this.supabase.client
      .from('events')
      .update({ spots: count ?? 0 })
      .eq('id', eventId);
  }

  async signup(signup: EventSignup): Promise<void> {
    // Check capacity before inserting
    const { count, error: countError } = await this.supabase.client
      .from('event_signups')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', signup.event_id);

    if (countError) throw countError;

    const { data: event } = await this.supabase.client
      .from('events')
      .select('spots_total')
      .eq('id', signup.event_id)
      .single();

    if (event && event.spots_total > 0 && (count ?? 0) >= event.spots_total) {
      throw new Error('EVENT_FULL');
    }

    const { error } = await this.supabase.client
      .from('event_signups')
      .insert(signup);

    if (error) throw error;

    await this.syncSpots(signup.event_id);
    await this.loadEvents();
  }

  async deleteSignup(signupId: string, eventId: string): Promise<void> {
    const { error } = await this.supabase.client
      .from('event_signups')
      .delete()
      .eq('id', signupId);

    if (error) throw error;

    await this.syncSpots(eventId);
    await this.loadEvents();
  }

  async getSignups(eventId: string): Promise<EventSignup[]> {
    const { data, error } = await this.supabase.client
      .from('event_signups')
      .select('*')
      .eq('event_id', eventId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as EventSignup[];
  }
}
