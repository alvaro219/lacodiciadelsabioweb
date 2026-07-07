import { Component, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { SocialService } from '../../services/social.service';
import { SocialPost, SocialComment, CreationType } from '../../models/social.model';
import { CreacionForm } from '../../components/creacion-form/creacion-form';

@Component({
  selector: 'app-creaciones',
  imports: [RouterLink, FormsModule, JsonPipe, CreacionForm],
  templateUrl: './creaciones.html',
  styleUrl: './creaciones.scss'
})
export class Creaciones implements OnInit {
  protected posts = signal<SocialPost[]>([]);
  protected postsLoading = signal(false);
  protected postsError = signal('');
  protected hasMorePosts = signal(true);
  protected currentPage = signal(0);
  private loadTimeout: any;

  protected readonly expandedPostId = signal<string | null>(null);
  protected readonly postComments = signal<Partial<Record<string, SocialComment[]>>>({});
  protected readonly commentsLoading = signal<Partial<Record<string, boolean>>>({});
  protected readonly newComment = signal<Record<string, string>>({});
  protected readonly commentSubmitting = signal<Record<string, boolean>>({});

  protected readonly loginEmail = signal('');
  protected readonly loginPassword = signal('');
  protected readonly loginError = signal('');
  protected readonly loginLoading = signal(false);
  protected readonly showLoginForm = signal(false);
  protected readonly showCreacionForm = signal(false);
  protected readonly activeTipo = signal<CreationType | null>(null);

  protected readonly searchQuery = signal('');
  protected readonly filteredPosts = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.posts();
    return this.posts().filter(p => {
      const inTitle = p.title.toLowerCase().includes(q);
      const inDesc  = (p.description ?? '').toLowerCase().includes(q);
      const tag = q.startsWith('#') ? q.slice(1) : q;
      const inTags  = (p.tags ?? []).some(t => t.toLowerCase().includes(tag));
      return inTitle || inDesc || inTags;
    });
  });

  protected readonly detailPost = signal<SocialPost | null>(null);
  protected readonly downloadedPost = signal<SocialPost | null>(null);
  protected readonly reportingPost = signal<SocialPost | null>(null);
  protected readonly reportReason = signal('');
  protected readonly reportSending = signal(false);
  protected readonly reportError = signal('');
  protected readonly reportSuccess = signal(false);

  readonly reportReasons = [
    'Contenido inapropiado',
    'Spam o publicidad',
    'Plagio o copia',
    'Mecánicas rotas / no balanceadas',
    'Otro'
  ];

  protected readonly currentUser = computed(() => this.social.currentUser());
  protected readonly authLoading = computed(() => this.social.authLoading());

  readonly tiposFiltro: { value: CreationType; icon: string; label: string }[] = [
    { value: 'clase',     icon: '🎯', label: 'Clases' },
    { value: 'subclase',  icon: '⚡',  label: 'Subclases' },
    { value: 'raza',      icon: '🌍', label: 'Razas' },
    { value: 'subraza',   icon: '🧬', label: 'Subrazas' },
    { value: 'accesorio', icon: '💍', label: 'Accesorios' }
  ];

  constructor(protected social: SocialService) {}

  async ngOnInit() {
    this.startLoadTimeout();
    try {
      await this.social.authReady;
      await this.loadPosts(true);
    } catch (err) {
      console.error('[Creaciones] ngOnInit error:', err);
      this.postsLoading.set(false);
      this.postsError.set('Error al cargar las creaciones. Pulsa "Reintentar".');
    } finally {
      this.clearLoadTimeout();
    }
  }

  private startLoadTimeout() {
    this.clearLoadTimeout();
    this.loadTimeout = setTimeout(() => {
      if (this.postsLoading() && this.posts().length === 0) {
        console.warn('[Creaciones] Timeout de carga alcanzado');
        this.postsLoading.set(false);
        this.postsError.set('La carga está tardando demasiado. Pulsa "Reintentar".');
      }
    }, 10000);
  }

  private clearLoadTimeout() {
    if (this.loadTimeout) {
      clearTimeout(this.loadTimeout);
      this.loadTimeout = null;
    }
  }

  async loadPosts(reset = false) {
    if (this.postsLoading()) return;

    if (reset) {
      this.currentPage.set(0);
      this.posts.set([]);
      this.hasMorePosts.set(true);
    }
    if (!this.hasMorePosts()) return;

    this.postsLoading.set(true);
    this.postsError.set('');
    this.startLoadTimeout();

    try {
      const newPosts = await this.social.getPosts(
        this.currentPage(), 12,
        this.activeTipo() ?? undefined
      );
      if (reset) {
        this.posts.set(newPosts);
      } else {
        this.posts.update(prev => [...prev, ...newPosts]);
      }
      this.hasMorePosts.set(newPosts.length === 12);
      this.currentPage.update(p => p + 1);
    } catch (err) {
      console.error('Error loading posts:', err);
      this.postsError.set('Error al cargar las creaciones. Pulsa "Reintentar".');
    } finally {
      this.postsLoading.set(false);
      this.clearLoadTimeout();
    }
  }

  async retryLoadPosts() {
    this.postsError.set('');
    await this.loadPosts(true);
  }

  async setTipoFilter(tipo: CreationType | null) {
    this.activeTipo.set(tipo);
    await this.loadPosts(true);
  }

  async onCreacionPublished() {
    this.showCreacionForm.set(false);
    await this.loadPosts(true);
  }

  async onToggleLike(post: SocialPost) {
    if (!this.currentUser()) {
      this.showLoginForm.set(true);
      return;
    }
    const wasLiked = post.user_has_liked;
    this.posts.update(posts =>
      posts.map(p => p.id === post.id
        ? { ...p, user_has_liked: !wasLiked, likes_count: p.likes_count + (wasLiked ? -1 : 1) }
        : p
      )
    );
    try {
      await this.social.toggleLike(post.id);
    } catch {
      this.posts.update(posts =>
        posts.map(p => p.id === post.id
          ? { ...p, user_has_liked: wasLiked, likes_count: p.likes_count + (wasLiked ? 1 : -1) }
          : p
        )
      );
    }
  }

  async toggleComments(postId: string) {
    if (this.expandedPostId() === postId) {
      this.expandedPostId.set(null);
      return;
    }
    this.expandedPostId.set(postId);
    if (!this.postComments()[postId]) {
      await this.loadComments(postId);
    }
  }

  private async loadComments(postId: string) {
    this.commentsLoading.update(s => ({ ...s, [postId]: true }));
    try {
      const comments = await this.social.getComments(postId);
      this.postComments.update(s => ({ ...s, [postId]: comments }));
    } catch {
      this.postComments.update(s => ({ ...s, [postId]: [] }));
    } finally {
      this.commentsLoading.update(s => ({ ...s, [postId]: false }));
    }
  }

  async onSubmitComment(postId: string) {
    const user = this.currentUser();
    if (!user) { this.showLoginForm.set(true); return; }

    const content = (this.newComment()[postId] ?? '').trim();
    if (!content) return;

    this.commentSubmitting.update(s => ({ ...s, [postId]: true }));
    try {
      const comment = await this.social.addComment(postId, content);
      this.postComments.update(s => ({ ...s, [postId]: [...(s[postId] ?? []), comment] }));
      this.newComment.update(s => ({ ...s, [postId]: '' }));
      this.posts.update(posts =>
        posts.map(p => p.id === postId ? { ...p, comments_count: p.comments_count + 1 } : p)
      );
    } catch {
    } finally {
      this.commentSubmitting.update(s => ({ ...s, [postId]: false }));
    }
  }

  getCommentText(postId: string): string {
    return this.newComment()[postId] ?? '';
  }

  setCommentText(postId: string, value: string) {
    this.newComment.update(s => ({ ...s, [postId]: value }));
  }

  getTypeIcon(type: string): string {
    const icons: Record<string, string> = {
      clase: '🎯', subclase: '⚡',
      raza: '🌍', subraza: '🧬', accesorio: '💍'
    };
    return icons[type] ?? '📜';
  }

  getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      clase: 'Clase', subclase: 'Subclase',
      raza: 'Raza', subraza: 'Subraza', accesorio: 'Accesorio'
    };
    return labels[type] ?? type;
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  async onLogin() {
    this.loginError.set('');
    const email = this.loginEmail().trim();
    const pass = this.loginPassword();
    if (!email || !pass) {
      this.loginError.set('Introduce email y contraseña.');
      return;
    }
    this.loginLoading.set(true);
    try {
      await this.social.signInWithEmail(email, pass);
      this.showLoginForm.set(false);
      this.loginEmail.set('');
      this.loginPassword.set('');
      await this.loadPosts(true);
    } catch {
      this.loginError.set('Email o contraseña incorrectos.');
    } finally {
      this.loginLoading.set(false);
    }
  }

  async onLoginGoogle() {
    try {
      await this.social.signInWithGoogle();
    } catch {
      this.loginError.set('Error al iniciar sesión con Google.');
    }
  }

  async onLogout() {
    await this.social.signOut();
    this.posts.update(posts => posts.map(p => ({ ...p, user_has_liked: false })));
  }

  async onDownload(post: SocialPost) {
    await this.social.downloadPost(post);
    this.posts.update(list =>
      list.map(p => p.id === post.id ? { ...p, downloads_count: (p.downloads_count ?? 0) + 1 } : p)
    );
    this.downloadedPost.set(post);
  }

  closeDownload() {
    this.downloadedPost.set(null);
  }

  onReport(post: SocialPost) {
    this.reportingPost.set(post);
    this.reportReason.set('');
    this.reportError.set('');
    this.reportSuccess.set(false);
  }

  closeReport() {
    this.reportingPost.set(null);
  }

  async submitReport() {
    const post = this.reportingPost();
    const reason = this.reportReason();
    if (!post || !reason) return;
    this.reportSending.set(true);
    this.reportError.set('');
    try {
      await this.social.reportPost(post.id, reason);
      this.reportSuccess.set(true);
      this.posts.update(list =>
        list.map(p => p.id === post.id ? { ...p, user_has_reported: true } : p)
      );
      setTimeout(() => this.closeReport(), 1500);
    } catch (e: any) {
      this.reportError.set(e?.message ?? 'Error al enviar el reporte.');
    } finally {
      this.reportSending.set(false);
    }
  }

  openDetail(post: SocialPost) { this.detailPost.set(post); }
  closeDetail() { this.detailPost.set(null); }
}
