import { Component, signal, OnInit, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { TelegramService } from '../../services/telegram.service';
import { SocialService } from '../../services/social.service';
import { GameEvent } from '../../models/event.model';
import { SocialPost, SocialComment, CreationType } from '../../models/social.model';
import { CreacionForm } from '../../components/creacion-form/creacion-form';

@Component({
  selector: 'app-community',
  imports: [RouterLink, FormsModule, CreacionForm],
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

  // Social section
  protected readonly activeTab = signal<'eventos' | 'social'>('eventos');
  protected readonly posts = signal<SocialPost[]>([]);
  protected readonly postsLoading = signal(false);
  protected readonly postsError = signal('');
  protected readonly hasMorePosts = signal(true);
  protected readonly currentPage = signal(0);

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

  // Report state
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

  constructor(
    private eventService: EventService,
    private telegram: TelegramService,
    protected social: SocialService
  ) {}

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

  scrollToSignup() {
    document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
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
    const name = this.signupName().trim();
    const email = this.signupEmail().trim();
    const eventId = this.signupEvent();
    const eventTitle = this.events().find(e => e.id === eventId)?.title ?? eventId;

    try {
      await this.eventService.signup({
        event_id: eventId,
        name,
        email
      });
      this.signupSuccess.set(true);
      this.signupName.set('');
      this.signupEmail.set('');
      this.signupEvent.set('');
      this.telegram.sendSignupNotification(name, email, eventTitle);
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

  // ========== SOCIAL TAB ==========

  async switchTab(tab: 'eventos' | 'social') {
    this.activeTab.set(tab);
    if (tab === 'social' && this.posts().length === 0) {
      await this.loadPosts(true);
    }
  }

  async loadPosts(reset = false) {
    if (reset) {
      this.currentPage.set(0);
      this.posts.set([]);
      this.hasMorePosts.set(true);
    }
    if (!this.hasMorePosts()) return;

    this.postsLoading.set(true);
    this.postsError.set('');
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
    } catch {
      this.postsError.set('Error al cargar las creaciones. Inténtalo de nuevo.');
    } finally {
      this.postsLoading.set(false);
    }
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

  getTypeLabel2(type: string): string {
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
}
