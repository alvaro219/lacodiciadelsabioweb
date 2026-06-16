import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SocialService } from '../../services/social.service';
import { SocialPost } from '../../models/social.model';

const TYPE_LABELS: Record<string, string> = {
  clase: 'Clase', subclase: 'Subclase', raza: 'Raza', subraza: 'Subraza', accesorio: 'Accesorio'
};

@Component({
  selector: 'app-my-creations',
  imports: [RouterLink],
  templateUrl: './my-creations.html',
  styleUrl: './my-creations.scss'
})
export class MyCreations implements OnInit {
  protected posts = signal<SocialPost[]>([]);
  protected loading = signal(true);
  protected error = signal('');
  protected confirmId = signal<string | null>(null);
  protected deleting = signal(false);

  readonly TYPE_LABELS = TYPE_LABELS;

  constructor(protected social: SocialService) {}

  async ngOnInit() {
    if (!this.social.currentUser()) {
      this.loading.set(false);
      return;
    }
    try {
      this.posts.set(await this.social.getMyPosts());
    } catch (e: any) {
      this.error.set(e?.message ?? 'Error cargando creaciones.');
    } finally {
      this.loading.set(false);
    }
  }

  askDelete(id: string) { this.confirmId.set(id); }
  cancelDelete() { this.confirmId.set(null); }

  async confirmDelete() {
    const id = this.confirmId();
    if (!id) return;
    this.deleting.set(true);
    try {
      await this.social.deletePost(id);
      this.posts.update(list => list.filter(p => p.id !== id));
      this.confirmId.set(null);
    } catch (e: any) {
      this.error.set(e?.message ?? 'Error al eliminar.');
    } finally {
      this.deleting.set(false);
    }
  }

  formatDate(d: string) {
    return new Date(d).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  }
}
