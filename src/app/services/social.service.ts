import { Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { SocialPost, SocialComment, SocialReport, AppUser, CreationType } from '../models/social.model';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  readonly currentUser = signal<AppUser | null>(null);
  readonly authLoading = signal(true);
  readonly isAdmin = signal(false);

  constructor(private supabase: SupabaseService) {
    this.initAuth();
  }

  private initAuth(): void {
    // Register listener — it will receive the INITIAL_SESSION event
    this.supabase.client.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await this.loadProfile(session.user.id, session.user.email ?? '');
      } else {
        this.currentUser.set(null);
        this.isAdmin.set(false);
      }
      this.authLoading.set(false);
    });

    // Trigger the INITIAL_SESSION event (fire-and-forget)
    this.supabase.client.auth.getSession().catch(err => {
      console.error('[SocialService] getSession error:', err);
    });

    // Fallback: if getSession hangs (navigator lock), restore session from localStorage
    setTimeout(() => {
      if (this.authLoading()) {
        this.restoreSessionFromStorage();
      }
    }, 2000);
  }

  private async restoreSessionFromStorage(): Promise<void> {
    try {
      const storageKey = 'sb-tuqwzvlsaeqlhgjrgvze-auth-token';
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        const user = parsed?.user;
        if (user?.id && user?.email) {
          await this.loadProfile(user.id, user.email);
          this.authLoading.set(false);
          return;
        }
      }
    } catch (e) {
      console.warn('[SocialService] restoreSessionFromStorage error:', e);
    }
    this.authLoading.set(false);
  }

  private async loadProfile(userId: string, email: string) {
    const { data, error } = await this.supabase.anonClient
      .from('user_profiles')
      .select('role, display_name, username')
      .eq('id', userId)
      .maybeSingle();

    if (error) console.error('[SocialService] loadProfile error:', error);

    const username = data?.username ?? email.split('@')[0];
    const display_name = data?.display_name || undefined;
    this.currentUser.set({ id: userId, email, username, display_name });
    this.isAdmin.set(data?.role === 'admin');
  }

  async signInWithEmail(email: string, password: string): Promise<void> {
    const signInPromise = this.supabase.client.auth.signInWithPassword({ email, password });
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT')), 10000)
    );
    const { error } = await Promise.race([signInPromise, timeout]);
    if (error) throw error;
  }

  async signUpWithEmail(email: string, password: string, username: string): Promise<void> {
    const { data, error } = await this.supabase.client.auth.signUp({ email, password });
    if (error) throw error;
    if (data.user) {
      await this.supabase.client
        .from('user_profiles')
        .upsert({ id: data.user.id, username });
      this.currentUser.set({ id: data.user.id, email, username });
    }
  }

  async signInWithGoogle(): Promise<void> {
    const { error } = await this.supabase.client.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'https://alvaro219.github.io/lacodiciadelsabioweb/comunidad' }
    });
    if (error) throw error;
  }

  async signOut(): Promise<void> {
    await this.supabase.client.auth.signOut();
    this.currentUser.set(null);
  }

  async getPosts(page = 0, limit = 12, tipo?: CreationType, query?: string): Promise<SocialPost[]> {
    const userId = this.currentUser()?.id;
    const from = page * limit;
    const to = from + limit - 1;

    // Always use anonClient for reading posts — bypasses auth lock completely
    let q = this.supabase.anonClient
      .from('social_posts')
      .select('*, social_comments(id)')
      .order('created_at', { ascending: false })
      .range(from, to);

    if (tipo) q = (q as any).eq('creation_type', tipo);
    if (query?.trim()) q = (q as any).ilike('title', `%${query.trim()}%`);

    const { data, error } = await q;
    if (error) throw error;

    const posts = (data ?? []).map((p: any) => ({
      ...p,
      comments_count: Array.isArray(p.social_comments) ? p.social_comments.length : (p.comments_count ?? 0),
      social_comments: undefined
    })) as SocialPost[];

    // Likes lookup — use anonClient with user_id filter (no auth needed for SELECT on social_likes)
    if (userId && posts.length > 0) {
      try {
        const postIds = posts.map(p => p.id);
        const { data: likes } = await this.supabase.anonClient
          .from('social_likes')
          .select('post_id')
          .eq('user_id', userId)
          .in('post_id', postIds);

        const likedIds = new Set((likes ?? []).map((l: { post_id: string }) => l.post_id));
        posts.forEach(p => { p.user_has_liked = likedIds.has(p.id); });
      } catch {
        // Non-critical: likes info couldn't load, posts still display
      }
    }

    return posts;
  }

  async toggleLike(postId: string): Promise<void> {
    const user = this.currentUser();
    if (!user) throw new Error('NOT_LOGGED_IN');

    const { data: existing } = await this.supabase.client
      .from('social_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .maybeSingle();

    if (existing) {
      const { error } = await this.supabase.client
        .from('social_likes')
        .delete()
        .eq('id', existing.id);
      if (error) throw error;
    } else {
      const { error } = await this.supabase.client
        .from('social_likes')
        .insert({ post_id: postId, user_id: user.id });
      if (error) throw error;
    }

    await this.supabase.client.rpc('sync_post_likes', { p_post_id: postId }).then(() => {});
  }

  async getComments(postId: string): Promise<SocialComment[]> {
    const { data, error } = await this.supabase.anonClient
      .from('social_comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return (data ?? []) as SocialComment[];
  }

  async addComment(postId: string, content: string): Promise<SocialComment> {
    const user = this.currentUser();
    if (!user) throw new Error('NOT_LOGGED_IN');

    const { data, error } = await this.supabase.client
      .from('social_comments')
      .insert({
        post_id: postId,
        user_id: user.id,
        username: user.display_name ?? user.username,
        content: content.trim()
      })
      .select()
      .single();

    if (error) throw error;
    await this.syncCommentsCount(postId);
    return data as SocialComment;
  }

  async deleteComment(commentId: string, postId?: string): Promise<void> {
    const { error } = await this.supabase.client
      .from('social_comments')
      .delete()
      .eq('id', commentId);
    if (error) throw error;
    if (postId) await this.syncCommentsCount(postId);
  }

  private async syncCommentsCount(postId: string): Promise<void> {
    const { count } = await this.supabase.client
      .from('social_comments')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', postId);
    await this.supabase.client
      .from('social_posts')
      .update({ comments_count: count ?? 0 })
      .eq('id', postId);
  }

  async createPost(post: {
    creation_type: CreationType;
    title: string;
    description: string;
    image_url?: string | null;
    data?: Record<string, unknown>;
    tags?: string[];
  }): Promise<SocialPost> {
    const user = this.currentUser();
    if (!user) throw new Error('NOT_LOGGED_IN');
    const { data, error } = await this.supabase.client
      .from('social_posts')
      .insert({
        creation_type: post.creation_type,
        title: post.title,
        description: post.description ?? null,
        image_url: post.image_url ?? null,
        data: post.data ?? null,
        tags: post.tags ?? [],
        user_id: user.id,
        username: user.display_name ?? user.username,
        likes_count: 0,
        comments_count: 0,
        downloads_count: 0,
        rating: 0,
        rating_count: 0,
        version: '1.0'
      })
      .select()
      .single();
    if (error) throw new Error(`${error.message} (code: ${error.code}, details: ${error.details})`);
    return data as SocialPost;
  }

  async downloadPost(post: SocialPost): Promise<void> {
    const TYPE_MAP: Record<string, string> = {
      clase: 'classes', subclase: 'subclasses',
      raza: 'races', subraza: 'subrazas', accesorio: 'accessories'
    };

    const payload = {
      type: TYPE_MAP[post.creation_type] ?? post.creation_type,
      version: '1.0',
      data: [{ ...post.data, nombre: post.title }],
      metadata: {
        source: 'web_social',
        author: post.username,
        downloadDate: new Date().toISOString(),
        webId: post.id,
        description: post.description ?? ''
      }
    };

    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeName = post.title.replace(/[^a-z0-9áéíóúüñ\s]/gi, '').trim().replace(/\s+/g, '_');
    a.href = url;
    a.download = `${safeName}_${post.creation_type}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Increment downloads_count (fire-and-forget)
    this.supabase.client
      .from('social_posts')
      .update({ downloads_count: (post.downloads_count ?? 0) + 1 })
      .eq('id', post.id)
      .then(() => {});
  }

  async updatePost(postId: string, patch: {
    title: string;
    description: string;
    image_url?: string | null;
    data?: Record<string, unknown>;
    tags?: string[];
  }): Promise<void> {
    const user = this.currentUser();
    if (!user) throw new Error('NOT_LOGGED_IN');
    const { error } = await this.supabase.client
      .from('social_posts')
      .update({
        title: patch.title,
        description: patch.description ?? null,
        image_url: patch.image_url ?? null,
        data: patch.data ?? null,
        tags: patch.tags ?? []
      })
      .eq('id', postId)
      .eq('user_id', user.id);
    if (error) throw new Error(`${error.message} (code: ${error.code})`);
  }

  async deletePost(postId: string): Promise<void> {
    const user = this.currentUser();
    if (!user) throw new Error('NOT_LOGGED_IN');
    const { error } = await this.supabase.client
      .from('social_posts')
      .delete()
      .eq('id', postId)
      .eq('user_id', user.id);
    if (error) throw error;
  }

  async getMyPosts(): Promise<SocialPost[]> {
    const user = this.currentUser();
    if (!user) return [];
    const { data, error } = await this.supabase.client
      .from('social_posts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data ?? []) as SocialPost[];
  }

  async adminDeletePost(postId: string): Promise<void> {
    const { error } = await this.supabase.client
      .from('social_posts')
      .delete()
      .eq('id', postId);
    if (error) throw error;
  }

  async reportPost(postId: string, reason: string): Promise<void> {
    const user = this.currentUser();
    if (!user) throw new Error('NOT_LOGGED_IN');

    // Try insert first
    const { error: insertError } = await this.supabase.client
      .from('social_reports')
      .insert({ post_id: postId, user_id: user.id, reason });

    if (!insertError) return; // success

    // If duplicate key, update the reason instead
    if (insertError.code === '23505') {
      const { error: updateError } = await this.supabase.client
        .from('social_reports')
        .update({ reason })
        .eq('post_id', postId)
        .eq('user_id', user.id);
      if (updateError) throw updateError;
      return;
    }

    throw insertError;
  }

  async getReportedPosts(): Promise<Array<SocialPost & { report_reasons: string[] }>> {
    const { data, error } = await this.supabase.client
      .from('social_posts')
      .select('*, social_reports(reason, user_id, created_at)')
      .gt('reports_count', 0)
      .order('reports_count', { ascending: false });
    if (error) throw error;
    return (data ?? []).map((p: any) => ({
      ...p,
      report_reasons: (p.social_reports ?? []).map((r: SocialReport) => r.reason)
    }));
  }

  async incrementDownloads(postId: string): Promise<void> {
    await this.supabase.client.rpc('increment_downloads', { p_post_id: postId }).then(() => {});
  }

  async uploadImage(file: File, bucket = 'social-images'): Promise<string> {
    const ext = file.name.split('.').pop();
    const path = `creaciones/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await this.supabase.client.storage
      .from(bucket)
      .upload(path, file, { upsert: false });
    if (error) throw error;
    const { data } = this.supabase.client.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }
}
