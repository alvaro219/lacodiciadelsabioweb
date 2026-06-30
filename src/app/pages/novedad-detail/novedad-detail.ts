import { Component, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private novedadService: NovedadService,
    private social: SocialService,
    private seo: SeoService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.notFound.set(true); this.loading.set(false); return; }

    try {
      await this.novedadService.loadNovedades();
      const found = this.novedadService.novedades().find(n => n.id === id);
      if (!found) {
        this.notFound.set(true);
      } else {
        this.novedad.set(found);
        this.seo.setNovedad({
          title: found.title,
          description: found.synopsis ?? this.stripMarkdown(found.body),
          image: found.image_url,
          slug: id
        });
        const list = await this.novedadService.getComments(id);
        this.comments.set(list);
      }
    } catch (err) {
      console.error('[NovedadDetail]', err);
      this.notFound.set(true);
    } finally {
      this.loading.set(false);
    }
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
    if (!this.replyText().trim()) return;
    this.replySaving.set(true);
    await this.novedadService.replyComment(comment.id!, this.replyText().trim());
    this.comments.set(await this.novedadService.getComments(comment.novedad_id));
    this.replyingId.set(null);
    this.replyText.set('');
    this.replySaving.set(false);
  }

  async deleteComment(comment: NovComment) {
    if (!confirm('¿Eliminar este comentario?')) return;
    await this.novedadService.deleteComment(comment.id!);
    this.comments.set(await this.novedadService.getComments(comment.novedad_id));
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
