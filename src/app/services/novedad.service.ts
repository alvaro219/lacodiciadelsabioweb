import { Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Novedad, NovComment } from '../models/novedad.model';

@Injectable({ providedIn: 'root' })
export class NovedadService {
  readonly novedades = signal<Novedad[]>([]);

  constructor(private supabase: SupabaseService) {}

  async loadNovedades(): Promise<void> {
    const { data, error } = await this.supabase.client
      .from('novedades')
      .select('*')
      .order('pinned', { ascending: false })
      .order('published_at', { ascending: false });

    if (!error && data) {
      this.novedades.set(data as Novedad[]);
    }
  }

  async create(novedad: Omit<Novedad, 'id' | 'created_at'>): Promise<{ error: string | null }> {
    const { error } = await this.supabase.client
      .from('novedades')
      .insert({
        title: novedad.title,
        synopsis: novedad.synopsis ?? null,
        body: novedad.body,
        image_url: novedad.image_url ?? null,
        tags: novedad.tags ?? [],
        pinned: novedad.pinned ?? false,
        published_at: new Date().toISOString()
      });
    if (error) {
      if (error.code === '42501') return { error: 'Sin permisos. Ejecuta en Supabase: GRANT ALL ON novedades TO authenticated;' };
      return { error: error.message };
    }
    await this.loadNovedades();
    return { error: null };
  }

  async update(id: string, changes: Partial<Novedad>): Promise<{ error: string | null }> {
    const { error } = await this.supabase.client
      .from('novedades')
      .update(changes)
      .eq('id', id);
    if (error) return { error: error.message };
    await this.loadNovedades();
    return { error: null };
  }

  async delete(id: string): Promise<{ error: string | null }> {
    const { error } = await this.supabase.client
      .from('novedades')
      .delete()
      .eq('id', id);
    if (error) return { error: error.message };
    await this.loadNovedades();
    return { error: null };
  }

  async uploadImage(file: File): Promise<{ url: string | null; error: string | null }> {
    const ext = file.name.split('.').pop();
    const path = `novedades/${Date.now()}.${ext}`;
    const { error } = await this.supabase.client.storage
      .from('novedades-images')
      .upload(path, file, { upsert: false });
    if (error) {
      if (error.message.includes('403') || error.message.includes('Unauthorized') || error.message.includes('security'))
        return { url: null, error: 'Sin permisos para subir imágenes. Ve a Supabase → Storage → novedades-images → Policies y añade política INSERT para authenticated.' };
      return { url: null, error: error.message };
    }
    const { data } = this.supabase.client.storage
      .from('novedades-images')
      .getPublicUrl(path);
    return { url: data.publicUrl, error: null };
  }

  async getComments(novedadId: string): Promise<NovComment[]> {
    const { data, error } = await this.supabase.client
      .from('novedad_comments')
      .select('*')
      .eq('novedad_id', novedadId)
      .order('created_at', { ascending: true });
    if (error || !data) return [];
    return data as NovComment[];
  }

  async addComment(novedadId: string, userId: string, username: string, body: string): Promise<{ error: string | null }> {
    const { error } = await this.supabase.client
      .from('novedad_comments')
      .insert({ novedad_id: novedadId, user_id: userId, username, body });
    if (error) return { error: error.message };
    return { error: null };
  }

  async deleteComment(commentId: string): Promise<{ error: string | null }> {
    const { error } = await this.supabase.client
      .from('novedad_comments')
      .delete()
      .eq('id', commentId);
    if (error) return { error: error.message };
    return { error: null };
  }

  async replyComment(commentId: string, reply: string): Promise<{ error: string | null }> {
    const { error } = await this.supabase.client
      .from('novedad_comments')
      .update({ admin_reply: reply, admin_reply_at: new Date().toISOString() })
      .eq('id', commentId);
    if (error) return { error: error.message };
    return { error: null };
  }
}
