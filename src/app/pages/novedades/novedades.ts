import { Component, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NovedadService } from '../../services/novedad.service';
import { SocialService } from '../../services/social.service';
import { Novedad, NovComment } from '../../models/novedad.model';

@Component({
  selector: 'app-novedades',
  imports: [RouterLink, DatePipe, FormsModule],
  templateUrl: './novedades.html',
  styleUrl: './novedades.scss'
})
export class Novedades implements OnInit {
  protected readonly novedades = signal<Novedad[]>([]);
  protected readonly loading = signal(true);

  protected readonly currentUser = computed(() => this.social.currentUser());
  protected readonly isAdmin = computed(() => this.social.isAdmin());

  protected readonly expandedId = signal<string | null>(null);
  protected readonly comments = signal<Record<string, NovComment[]>>({});
  protected readonly commentsLoading = signal<Record<string, boolean>>({});
  protected readonly newComment = signal('');
  protected readonly commentSaving = signal(false);
  protected readonly commentError = signal('');

  protected readonly replyingId = signal<string | null>(null);
  protected readonly replyText = signal('');
  protected readonly replySaving = signal(false);

  constructor(
    private novedadService: NovedadService,
    private social: SocialService
  ) {}

  async ngOnInit() {
    await this.novedadService.loadNovedades();
    this.novedades.set(this.novedadService.novedades());
    this.loading.set(false);
  }

  async toggleComments(novId: string) {
    if (this.expandedId() === novId) {
      this.expandedId.set(null);
      return;
    }
    this.expandedId.set(novId);
    this.newComment.set('');
    this.commentError.set('');
    if (!this.comments()[novId]) {
      this.commentsLoading.update(s => ({ ...s, [novId]: true }));
      const list = await this.novedadService.getComments(novId);
      this.comments.update(s => ({ ...s, [novId]: list }));
      this.commentsLoading.update(s => ({ ...s, [novId]: false }));
    }
  }

  async submitComment(novId: string) {
    const user = this.currentUser();
    if (!user || !this.newComment().trim()) return;
    this.commentSaving.set(true);
    this.commentError.set('');
    const result = await this.novedadService.addComment(novId, user.id, user.username, this.newComment().trim());
    if (result.error) {
      this.commentError.set(result.error);
    } else {
      this.newComment.set('');
      const list = await this.novedadService.getComments(novId);
      this.comments.update(s => ({ ...s, [novId]: list }));
    }
    this.commentSaving.set(false);
  }

  startReply(commentId: string) {
    this.replyingId.set(commentId);
    this.replyText.set('');
  }

  cancelReply() {
    this.replyingId.set(null);
    this.replyText.set('');
  }

  async submitReply(comment: NovComment) {
    if (!this.replyText().trim()) return;
    this.replySaving.set(true);
    await this.novedadService.replyComment(comment.id!, this.replyText().trim());
    const list = await this.novedadService.getComments(comment.novedad_id);
    this.comments.update(s => ({ ...s, [comment.novedad_id]: list }));
    this.replyingId.set(null);
    this.replyText.set('');
    this.replySaving.set(false);
  }

  async deleteComment(comment: NovComment) {
    if (!confirm('¿Eliminar este comentario?')) return;
    await this.novedadService.deleteComment(comment.id!);
    const list = await this.novedadService.getComments(comment.novedad_id);
    this.comments.update(s => ({ ...s, [comment.novedad_id]: list }));
  }

  commentsCount(novId: string): number {
    return (this.comments()[novId] ?? []).length;
  }
}
