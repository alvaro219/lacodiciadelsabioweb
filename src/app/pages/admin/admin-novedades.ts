import { Component, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NovedadService } from '../../services/novedad.service';
import { SupabaseService } from '../../services/supabase.service';
import { Novedad } from '../../models/novedad.model';

@Component({
  selector: 'app-admin-novedades',
  imports: [RouterLink, FormsModule, DatePipe],
  templateUrl: './admin-novedades.html',
  styleUrl: './admin-events.scss'
})
export class AdminNovedades implements OnInit {
  protected readonly novedades = signal<Novedad[]>([]);
  protected readonly loading = signal(true);
  protected readonly isAuthenticated = signal(false);
  protected readonly accessDenied = signal(false);
  protected readonly loginError = signal('');
  protected readonly loginEmail = signal('');
  protected readonly loginPassword = signal('');

  protected readonly showForm = signal(false);
  protected readonly editingNovedad = signal<Novedad | null>(null);
  protected readonly saving = signal(false);
  protected readonly formError = signal('');
  protected readonly uploadingImage = signal(false);

  protected readonly formTitle = signal('');
  protected readonly formSynopsis = signal('');
  protected readonly formBody = signal('');
  protected readonly formImageUrl = signal('');
  protected readonly formTags = signal('');
  protected readonly formPinned = signal(false);

  protected readonly showConfirm = signal(false);
  protected readonly confirmTitle = signal('');
  protected readonly confirmMessage = signal('');
  protected readonly confirmLoading = signal(false);
  private confirmAction: (() => Promise<void>) | null = null;

  constructor(
    private novedadService: NovedadService,
    private supabase: SupabaseService
  ) {}

  async ngOnInit() {
    const { data } = await this.supabase.client.auth.getSession();
    if (data.session) {
      const isAdmin = await this.checkAdminRole(data.session.user.id);
      if (isAdmin) {
        this.isAuthenticated.set(true);
        await this.loadNovedades();
      } else {
        this.accessDenied.set(true);
        await this.supabase.client.auth.signOut();
      }
    }
    this.loading.set(false);
  }

  async login() {
    this.loginError.set('');
    this.accessDenied.set(false);
    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email: this.loginEmail(),
      password: this.loginPassword()
    });
    if (error) { this.loginError.set(error.message); return; }
    const isAdmin = await this.checkAdminRole(data.session!.user.id);
    if (!isAdmin) {
      this.accessDenied.set(true);
      await this.supabase.client.auth.signOut();
      return;
    }
    this.isAuthenticated.set(true);
    await this.loadNovedades();
  }

  async logout() {
    await this.supabase.client.auth.signOut();
    this.isAuthenticated.set(false);
    this.novedades.set([]);
  }

  private async checkAdminRole(userId: string): Promise<boolean> {
    const { data, error } = await this.supabase.client
      .from('user_profiles').select('role').eq('id', userId).single();
    if (error || !data) return false;
    return data.role === 'admin';
  }

  private async loadNovedades() {
    this.loading.set(true);
    await this.novedadService.loadNovedades();
    this.novedades.set(this.novedadService.novedades());
    this.loading.set(false);
  }

  openCreateForm() {
    this.editingNovedad.set(null);
    this.formTitle.set('');
    this.formSynopsis.set('');
    this.formBody.set('');
    this.formImageUrl.set('');
    this.formTags.set('');
    this.formPinned.set(false);
    this.formError.set('');
    this.showForm.set(true);
  }

  openEditForm(nov: Novedad) {
    this.editingNovedad.set(nov);
    this.formTitle.set(nov.title);
    this.formSynopsis.set(nov.synopsis ?? '');
    this.formBody.set(nov.body);
    this.formImageUrl.set(nov.image_url ?? '');
    this.formTags.set(nov.tags?.join(', ') ?? '');
    this.formPinned.set(nov.pinned ?? false);
    this.formError.set('');
    this.showForm.set(true);
  }

  closeForm() { this.showForm.set(false); }

  insertFormat(type: 'h1' | 'h2' | 'h3' | 'bold' | 'italic') {
    const textarea = document.getElementById('form-body') as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = this.formBody().substring(start, end);
    const before = this.formBody().substring(0, start);
    const after = this.formBody().substring(end);

    let wrapped = '';
    if (type === 'h1') wrapped = `# ${selected || 'Título 1'}`;
    else if (type === 'h2') wrapped = `## ${selected || 'Título 2'}`;
    else if (type === 'h3') wrapped = `### ${selected || 'Título 3'}`;
    else if (type === 'bold') wrapped = `**${selected || 'negrita'}**`;
    else if (type === 'italic') wrapped = `*${selected || 'cursiva'}*`;

    this.formBody.set(before + wrapped + after);
    setTimeout(() => {
      textarea.focus();
      const newPos = start + wrapped.length;
      textarea.setSelectionRange(newPos, newPos);
    }, 0);
  }

  async onImageFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.uploadingImage.set(true);
    const { url, error } = await this.novedadService.uploadImage(input.files[0]);
    this.uploadingImage.set(false);
    if (error) { this.formError.set('Error subiendo imagen: ' + error); return; }
    this.formImageUrl.set(url!);
  }

  async saveNovedad() {
    if (!this.formTitle().trim() || !this.formBody().trim()) {
      this.formError.set('El título y el contenido son obligatorios.');
      return;
    }
    this.saving.set(true);
    this.formError.set('');
    const tags = this.formTags().split(',').map(t => t.trim()).filter(Boolean);
    const payload: Omit<Novedad, 'id' | 'created_at'> = {
      title: this.formTitle().trim(),
      synopsis: this.formSynopsis().trim() || null,
      body: this.formBody().trim(),
      image_url: this.formImageUrl() || null,
      tags,
      pinned: this.formPinned()
    };
    const editing = this.editingNovedad();
    const result = editing
      ? await this.novedadService.update(editing.id!, payload)
      : await this.novedadService.create(payload);
    this.saving.set(false);
    if (result.error) { this.formError.set(result.error); return; }
    this.novedades.set(this.novedadService.novedades());
    this.closeForm();
  }

  deleteNovedad(nov: Novedad) {
    this.confirmTitle.set('Eliminar novedad');
    this.confirmMessage.set(`¿Seguro que quieres eliminar "${nov.title}"? Esta acción no se puede deshacer.`);
    this.showConfirm.set(true);
    this.confirmAction = async () => {
      await this.novedadService.delete(nov.id!);
      this.novedades.set(this.novedadService.novedades());
    };
  }

  async executeConfirm() {
    if (!this.confirmAction) return;
    this.confirmLoading.set(true);
    await this.confirmAction();
    this.confirmLoading.set(false);
    this.showConfirm.set(false);
    this.confirmAction = null;
  }

  closeConfirm() {
    this.showConfirm.set(false);
    this.confirmAction = null;
  }
}
