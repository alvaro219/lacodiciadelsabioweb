import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-delete-account',
  imports: [RouterLink, FormsModule],
  templateUrl: './delete-account.html',
  styleUrl: './delete-account.scss'
})
export class DeleteAccount {
  protected email = signal('');
  protected password = signal('');
  protected confirmText = signal('');
  protected loginError = signal('');
  protected isAuthenticated = signal(false);
  protected userEmail = signal('');
  protected deleting = signal(false);
  protected deleted = signal(false);
  protected deleteError = signal('');

  // Confirm modal
  protected showConfirm = signal(false);

  constructor(private supabase: SupabaseService) {}

  async login() {
    this.loginError.set('');
    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email: this.email(),
      password: this.password()
    });

    if (error) {
      this.loginError.set('Credenciales incorrectas. Verifica tu email y contraseña.');
      return;
    }

    if (data.user) {
      this.isAuthenticated.set(true);
      this.userEmail.set(data.user.email ?? '');
    }
  }

  openConfirm() {
    if (this.confirmText() !== 'ELIMINAR') {
      this.deleteError.set('Debes escribir ELIMINAR para confirmar.');
      return;
    }
    this.deleteError.set('');
    this.showConfirm.set(true);
  }

  closeConfirm() {
    this.showConfirm.set(false);
  }

  async confirmDelete() {
    this.deleting.set(true);
    this.deleteError.set('');

    try {
      const { data: { user } } = await this.supabase.client.auth.getUser();
      if (!user) throw new Error('No se encontró el usuario.');

      const userId = user.id;

      // 1. Delete event signups associated with user email
      await this.supabase.client
        .from('event_signups')
        .delete()
        .eq('email', user.email);

      // 2. Delete user profile
      await this.supabase.client
        .from('user_profiles')
        .delete()
        .eq('id', userId);

      // 3. Delete auth user via RPC function
      const { error: rpcError } = await this.supabase.client.rpc('delete_own_account');

      if (rpcError) throw rpcError;

      // 4. Sign out
      await this.supabase.client.auth.signOut();

      this.deleted.set(true);
      this.showConfirm.set(false);
    } catch (err: any) {
      this.deleteError.set(err.message || 'Error al eliminar la cuenta. Contacta con soporte en Discord.');
      this.showConfirm.set(false);
    } finally {
      this.deleting.set(false);
    }
  }
}
