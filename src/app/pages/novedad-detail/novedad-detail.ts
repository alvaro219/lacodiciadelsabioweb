import { Component, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownPipe } from '../../pipes/markdown.pipe';
import { NovedadService } from '../../services/novedad.service';
import { SocialService } from '../../services/social.service';
import { SeoService } from '../../services/seo.service';
import { Novedad, NovComment } from '../../models/novedad.model';

@Component({
  selector: 'app-novedad-detail',
  imports: [RouterLink, DatePipe, FormsModule, MarkdownPipe],
  templateUrl: './novedad-detail.html',
  styleUrl: './novedad-detail.scss'
})
export class NovedadDetail implements OnInit {
  protected readonly novedad = signal<Novedad | null>(null);
  protected readonly loading = signal(true);
  protected readonly notFound = signal(false);

  protected readonly currentUser = computed(() => this.social.currentUser());
  protected readonly isAdmin = computed(() => this.social.isAdmin());

  protected readonly comments = signal<NovComment[]>([]);
  protected readonly newComment = signal('');
  protected readonly commentSaving = signal(false);
  protected readonly commentError = signal('');

  protected readonly replyingId = signal<string | null>(null);
  protected readonly replyText = signal('');
  protected readonly replySaving = signal(false);

  protected readonly editingId = signal<string | null>(null);
  protected readonly editText = signal('');
  protected readonly editSaving = signal(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private novedadService: NovedadService,
    private social: SocialService,
    private seo: SeoService
  ) {}

  async ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) { this.notFound.set(true); this.loading.set(false); return; }

    try {
      await this.novedadService.loadNovedades();
      const found = this.findBySlug(slug);
      if (!found) {
        this.notFound.set(true);
      } else {
        this.novedad.set(found);
        this.seo.setNovedad({
          title: found.title,
          description: found.synopsis ?? this.stripMarkdown(found.body),
          image: found.image_url,
          slug
        });
        const list = await this.novedadService.getComments(found.id!);
        this.comments.set(list);
      }
    } catch (err) {
      console.error('[NovedadDetail]', err);
      this.notFound.set(true);
    } finally {
      this.loading.set(false);
    }
  }

  private findBySlug(slug: string): Novedad | undefined {
    return this.novedadService.novedades().find(n => this.buildSlug(n.title, n.id!) === slug)
      ?? this.novedadService.novedades().find(n => n.id === slug);
  }

  buildSlug(title: string, id: string): string {
    const base = title.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    return `${base}-${id.slice(0, 8)}`;
  }

  formatUsername(username: string): string {
    if (!username) return 'Anónimo';
    if (username.includes('@')) return username.split('@')[0];
    return username;
  }

  async submitComment() {
    const user = this.currentUser();
    const nov = this.novedad();
    if (!user || !nov || !this.newComment().trim()) return;
    this.commentSaving.set(true);
    this.commentError.set('');
    const result = await this.novedadService.addComment(nov.id!, user.id, user.username, this.newComment().trim());
    if (result.error) {
      this.commentError.set(result.error);
    } else {
      this.newComment.set('');
      this.comments.set(await this.novedadService.getComments(nov.id!));
    }
    this.commentSaving.set(false);
  }

  startReply(commentId: string) { this.replyingId.set(commentId); this.replyText.set(''); }
  cancelReply() { this.replyingId.set(null); this.replyText.set(''); }

  async submitReply(comment: NovComment) {
    const user = this.currentUser();
    if (!user || !this.replyText().trim()) return;
    this.replySaving.set(true);
    const result = await this.novedadService.addComment(
      comment.novedad_id,
      user.id,
      user.username,
      this.replyText().trim(),
      comment.id
    );
    if (!result.error) {
      this.comments.set(await this.novedadService.getComments(comment.novedad_id));
    }
    this.replyingId.set(null);
    this.replyText.set('');
    this.replySaving.set(false);
  }

  goBack() {
    this.router.navigate(['/novedades']);
  }

  async deleteComment(comment: NovComment) {
    if (!confirm('¿Eliminar este comentario?')) return;
    await this.novedadService.deleteComment(comment.id!);
    this.comments.set(await this.novedadService.getComments(comment.novedad_id));
  }

  isOwnComment(comment: NovComment): boolean {
    const user = this.currentUser();
    return !!user && user.id === comment.user_id;
  }

  startEdit(comment: NovComment) {
    this.editingId.set(comment.id!);
    this.editText.set(comment.body);
  }

  cancelEdit() {
    this.editingId.set(null);
    this.editText.set('');
  }

  async submitEdit(comment: NovComment) {
    const text = this.editText().trim();
    if (!text || text === comment.body) {
      this.cancelEdit();
      return;
    }
    this.editSaving.set(true);
    const result = await this.novedadService.updateComment(comment.id!, text);
    if (!result.error) {
      this.comments.set(await this.novedadService.getComments(comment.novedad_id));
    }
    this.editingId.set(null);
    this.editText.set('');
    this.editSaving.set(false);
  }

  stripMarkdown(text: string): string {
    return text
      .replace(/^#{1,3} /gm, '')
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/\n/g, ' ')
      .slice(0, 155);
  }
}
