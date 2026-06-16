import { Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { SocialPost, SocialComment, AppUser } from '../models/social.model';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  readonly currentUser = signal<AppUser | null>(null);
  readonly authLoading = signal(true);

  constructor(private supabase: SupabaseService) {
    this.initAuth();
  }

  private async initAuth() {
    const { data: { session } } = await this.supabase.client.auth.getSession();
    if (session?.user) {
      await this.loadProfile(session.user.id, session.user.email ?? '');
    }
    this.authLoading.set(false);

    this.supabase.client.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await this.loadProfile(session.user.id, session.user.email ?? '');
      } else {
        this.currentUser.set(null);
      }
    });
  }

  private async loadProfile(userId: string, email: string) {
    const { data } = await this.supabase.client
      .from('profiles')
      .select('username')
      .eq('id', userId)
      .single();

    this.currentUser.set({
      id: userId,
      email,
      username: data?.username ?? email.split('@')[0]
    });
  }

  async signInWithEmail(email: string, password: string): Promise<void> {
    const { error } = await this.supabase.client.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async signOut(): Promise<void> {
    await this.supabase.client.auth.signOut();
    this.currentUser.set(null);
  }

  async getPosts(page = 0, limit = 12): Promise<SocialPost[]> {
    const userId = this.currentUser()?.id;
    const from = page * limit;
    const to = from + limit - 1;

    const { data, error } = await this.supabase.client
      .from('social_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    const posts = (data ?? []) as SocialPost[];

    if (userId && posts.length > 0) {
      const postIds = posts.map(p => p.id);
      const { data: likes } = await this.supabase.client
        .from('social_likes')
        .select('post_id')
        .eq('user_id', userId)
        .in('post_id', postIds);

      const likedIds = new Set((likes ?? []).map((l: { post_id: string }) => l.post_id));
      posts.forEach(p => { p.user_has_liked = likedIds.has(p.id); });
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
    const { data, error } = await this.supabase.client
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
        username: user.username,
        content: content.trim()
      })
      .select()
      .single();

    if (error) throw error;
    return data as SocialComment;
  }

  async deleteComment(commentId: string): Promise<void> {
    const { error } = await this.supabase.client
      .from('social_comments')
      .delete()
      .eq('id', commentId);
    if (error) throw error;
  }
}
