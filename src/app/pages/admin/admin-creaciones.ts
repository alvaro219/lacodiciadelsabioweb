import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SocialService } from '../../services/social.service';
import { SupabaseService } from '../../services/supabase.service';
import { SocialPost } from '../../models/social.model';

const TYPE_LABELS: Record<string, string> = {
  clase: 'Clase', subclase: 'Subclase', raza: 'Raza', subraza: 'Subraza', accesorio: 'Accesorio'
};

@Component({
  selector: 'app-admin-creaciones',
  imports: [RouterLink, FormsModule],
  templateUrl: './admin-creaciones.html',
  styleUrl: './admin-creaciones.scss'
})
export class AdminCreaciones implements OnInit {
  protected isAuthenticated = signal(false);
  protected accessDenied = signal(false);
  protected loginError = signal('');
  protected loginEmail = signal('');
  protected loginPassword = signal('');
  protected loading = signal(true);

  protected tab = signal<'all' | 'reported'>('all');
  protected allPosts = signal<SocialPost[]>([]);
  protected reportedPosts = signal<Array<SocialPost & { report_reasons: string[] }>>([]);
  protected filterQuery = signal('');

  protected confirmId = signal<string | null>(null);
  protected confirmMsg = signal('');
  protected deleting = signal(false);
  protected error = signal('');
  protected viewingPost = signal<(SocialPost & { report_reasons?: string[] }) | null>(null);

  readonly TYPE_LABELS = TYPE_LABELS;

  constructor(
    private social: SocialService,
    private supabase: SupabaseService
  ) {}

  async ngOnInit() {
    const { data: { session } } = await this.supabase.client.auth.getSession();
    if (session?.user) {
      const isAdmin = await this.checkAdminRole(session.user.id);
      if (isAdmin) {
        this.isAuthenticated.set(true);
        await this.loadAll();
      } else {
        this.accessDenied.set(true);
      }
    }
    this.loading.set(false);
  }

  private async checkAdminRole(userId: string): Promise<boolean> {
    const { data } = await this.supabase.client
      .from('user_profiles').select('role').eq('id', userId).single();
    return data?.role === 'admin';
  }

  async login() {
    this.loginError.set('');
    this.accessDenied.set(false);
    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email: this.loginEmail(), password: this.loginPassword()
    });
    if (error) { this.loginError.set(error.message); return; }
    const isAdmin = await this.checkAdminRole(data.session!.user.id);
    if (!isAdmin) {
      this.accessDenied.set(true);
      await this.supabase.client.auth.signOut();
      return;
    }
    this.isAuthenticated.set(true);
    await this.loadAll();
  }

  async logout() {
    await this.supabase.client.auth.signOut();
    this.isAuthenticated.set(false);
    this.allPosts.set([]);
    this.reportedPosts.set([]);
  }

  private async loadAll() {
    this.loading.set(true);
    try {
      const [all, reported] = await Promise.all([
        this.loadAllPosts(),
        this.social.getReportedPosts()
      ]);
      this.allPosts.set(all);
      this.reportedPosts.set(reported);
    } finally {
      this.loading.set(false);
    }
  }

  private async loadAllPosts(): Promise<SocialPost[]> {
    const { data, error } = await this.supabase.client
      .from('social_posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data ?? []) as SocialPost[];
  }

  get filteredPosts(): SocialPost[] {
    const q = this.filterQuery().toLowerCase().trim();
    if (!q) return this.allPosts();
    return this.allPosts().filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.username.toLowerCase().includes(q) ||
      p.creation_type.includes(q)
    );
  }

  openPost(post: SocialPost & { report_reasons?: string[] }) { this.viewingPost.set(post); }
  closePost() { this.viewingPost.set(null); }

  askDelete(post: SocialPost) {
    this.confirmId.set(post.id);
    this.confirmMsg.set(`¿Eliminar "${post.title}" de ${post.username}?`);
  }

  cancelDelete() { this.confirmId.set(null); }

  async confirmDelete() {
    const id = this.confirmId();
    if (!id) return;
    this.deleting.set(true);
    this.error.set('');
    try {
      await this.social.adminDeletePost(id);
      this.allPosts.update(l => l.filter(p => p.id !== id));
      this.reportedPosts.update(l => l.filter(p => p.id !== id));
      this.confirmId.set(null);
    } catch (e: any) {
      this.error.set(e?.message ?? 'Error al eliminar.');
    } finally {
      this.deleting.set(false);
    }
  }

  postDataEntries(post: SocialPost): { key: string; value: string }[] {
    if (!post.data) return [];
    return Object.entries(post.data)
      .filter(([, v]) => v !== null && v !== undefined && v !== '')
      .map(([k, v]) => ({ key: k, value: String(v) }));
  }

  formatDate(d: string) {
    return new Date(d).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  }
}
