import { Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Novedad, NovComment } from '../models/novedad.model';

@Injectable({ providedIn: 'root' })
export class NovedadService {
  readonly novedades = signal<Novedad[]>([]);

  constructor(private supabase: SupabaseService) {}

  async loadNovedades(): Promise<void> {
    const { data, error } = await this.supabase.anonClient
      .from('novedades')
      .select('*, novedad_comments(id)')
      .order('pinned', { ascending: false })
      .order('published_at', { ascending: false });

    if (error) {
      console.error('[NovedadService] loadNovedades error:', error);
    }
    const list = (data ?? []).map((n: any) => ({
      ...n,
      novedad_comments: undefined,
      comments_count: Array.isArray(n.novedad_comments) ? n.novedad_comments.length : 0
    })) as Novedad[];
    this.novedades.set(list);
  }

  async create(novedad: Omit<Novedad, 'id' | 'created_at'>): Promise<{ error: string | null }> {
    const { error } = await this.supabase.authClient
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
    const { error } = await this.supabase.authClient
      .from('novedades')
      .update(changes)
      .eq('id', id);
    if (error) return { error: error.message };
    await this.loadNovedades();
    return { error: null };
  }

  async delete(id: string): Promise<{ error: string | null }> {
    const { error } = await this.supabase.authClient
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
    const { error } = await this.supabase.authClient.storage
      .from('novedades-images')
      .upload(path, file, { upsert: false });
    if (error) {
      if (error.message.includes('403') || error.message.includes('Unauthorized') || error.message.includes('security'))
        return { url: null, error: 'Sin permisos para subir imágenes. Ve a Supabase → Storage → novedades-images → Policies y añade política INSERT para authenticated.' };
      return { url: null, error: error.message };
    }
    const { data } = this.supabase.authClient.storage
      .from('novedades-images')
      .getPublicUrl(path);
    return { url: data.publicUrl, error: null };
  }

  async getComments(novedadId: string): Promise<NovComment[]> {
    const { data, error } = await this.supabase.anonClient
      .from('novedad_comments')
      .select('*')
      .eq('novedad_id', novedadId)
      .order('created_at', { ascending: true });
    if (error || !data) return [];
    return this.nestComments(data as NovComment[]);
  }

  private nestComments(flat: NovComment[]): NovComment[] {
    const map = new Map<string, NovComment>();
    const roots: NovComment[] = [];
    for (const c of flat) {
      map.set(c.id!, { ...c, replies: [] });
    }
    for (const c of flat) {
      const node = map.get(c.id!);
      if (!node) continue;
      if (c.parent_id && map.has(c.parent_id)) {
        const parent = map.get(c.parent_id)!;
        parent.replies = parent.replies ?? [];
        parent.replies.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }

  async addComment(novedadId: string, userId: string, username: string, body: string, parentId?: string | null): Promise<{ error: string | null }> {
    const payload: any = { novedad_id: novedadId, user_id: userId, username, body };
    if (parentId) payload.parent_id = parentId;
    const { error } = await this.supabase.authClient
      .from('novedad_comments')
      .insert(payload);
    if (error) return { error: error.message };
    return { error: null };
  }

  async updateComment(commentId: string, body: string): Promise<{ error: string | null }> {
    const { error } = await this.supabase.authClient
      .from('novedad_comments')
      .update({ body })
      .eq('id', commentId);
    if (error) return { error: error.message };
    return { error: null };
  }

  async deleteComment(commentId: string): Promise<{ error: string | null }> {
    const { error } = await this.supabase.authClient
      .from('novedad_comments')
      .delete()
      .eq('id', commentId);
    if (error) return { error: error.message };
    return { error: null };
  }

  async replyComment(commentId: string, reply: string): Promise<{ error: string | null }> {
    const { error } = await this.supabase.authClient
      .from('novedad_comments')
      .update({ admin_reply: reply, admin_reply_at: new Date().toISOString() })
      .eq('id', commentId);
    if (error) return { error: error.message };
    return { error: null };
  }

  /** Count top-level comments without admin reply and without a reply from the current admin user */
  async getPendingAdminCommentsCount(): Promise<number> {
    const { data: { user } } = await this.supabase.authClient.auth.getUser();
    if (!user) return 0;

    const { data: pending, error } = await this.supabase.authClient
      .from('novedad_comments')
      .select('id')
      .is('parent_id', null)
      .is('admin_reply', null);
    if (error) {
      console.error('[NovedadService] getPendingAdminCommentsCount error:', error);
      return 0;
    }
    const pendingIds = (pending ?? []).map(c => c.id);
    if (pendingIds.length === 0) return 0;

    const { data: replied } = await this.supabase.authClient
      .from('novedad_comments')
      .select('parent_id')
      .in('parent_id', pendingIds)
      .eq('user_id', user.id);
    const repliedIds = new Set((replied ?? []).map((r: any) => r.parent_id));
    return pendingIds.length - repliedIds.size;
  }
}
