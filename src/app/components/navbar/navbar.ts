import { Component, signal, HostListener, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SocialService } from '../../services/social.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  protected readonly isMenuOpen = signal(false);
  protected readonly isScrolled = signal(false);
  protected readonly isClassesOpen = signal(false);
  protected readonly isRacesOpen = signal(false);
  protected readonly isMecanicasOpen = signal(false);
  protected readonly isUserMenuOpen = signal(false);
  protected readonly showAuthModal = signal(false);
  protected readonly loginEmail = signal('');
  protected readonly loginPassword = signal('');
  protected readonly loginUsername = signal('');
  protected readonly loginError = signal('');
  protected readonly loginLoading = signal(false);
  protected readonly authMode = signal<'login' | 'register'>('login');

  protected readonly currentUser = computed(() => this.social.currentUser());
  protected readonly authLoading = computed(() => this.social.authLoading());
  protected readonly isAdmin = computed(() => this.social.isAdmin());

  constructor(private social: SocialService) {}

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: Event) {
    const target = e.target as HTMLElement;
    if (!target.closest('.navbar__user')) {
      this.isUserMenuOpen.set(false);
    }
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
    if (this.isMenuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu() {
    this.isMenuOpen.set(false);
    this.isClassesOpen.set(false);
    this.isRacesOpen.set(false);
    this.isMecanicasOpen.set(false);
    this.isUserMenuOpen.set(false);
    document.body.style.overflow = '';
  }

  toggleUserMenu(e: Event) {
    e.stopPropagation();
    this.isUserMenuOpen.update(v => !v);
  }

  openAuthModal(mode: 'login' | 'register' = 'login') {
    this.showAuthModal.set(true);
    this.authMode.set(mode);
    this.loginError.set('');
    this.loginEmail.set('');
    this.loginPassword.set('');
    this.loginUsername.set('');
    this.isUserMenuOpen.set(false);
  }

  switchAuthMode(mode: 'login' | 'register') {
    this.authMode.set(mode);
    this.loginError.set('');
  }

  closeAuthModal() {
    this.showAuthModal.set(false);
  }

  async onLogin() {
    this.loginError.set('');
    const email = this.loginEmail().trim();
    const pass = this.loginPassword();
    if (!email || !pass) { this.loginError.set('Introduce email y contraseña.'); return; }
    this.loginLoading.set(true);
    try {
      await this.social.signInWithEmail(email, pass);
      this.closeAuthModal();
    } catch {
      this.loginError.set('Email o contraseña incorrectos.');
    } finally {
      this.loginLoading.set(false);
    }
  }

  async onRegister() {
    this.loginError.set('');
    const email = this.loginEmail().trim();
    const pass = this.loginPassword();
    const username = this.loginUsername().trim();
    if (!email || !pass) { this.loginError.set('Introduce email y contraseña.'); return; }
    if (pass.length < 6) { this.loginError.set('La contraseña debe tener al menos 6 caracteres.'); return; }
    this.loginLoading.set(true);
    try {
      await this.social.signUpWithEmail(email, pass, username || email.split('@')[0]);
      this.loginError.set('');
      this.closeAuthModal();
    } catch (e: any) {
      this.loginError.set(e?.message ?? 'Error al registrarse.');
    } finally {
      this.loginLoading.set(false);
    }
  }

  async onLoginGoogle() {
    try {
      await this.social.signInWithGoogle();
      this.closeAuthModal();
    } catch {
      this.loginError.set('Error al iniciar sesión con Google.');
    }
  }

  async onLogout() {
    await this.social.signOut();
    this.isUserMenuOpen.set(false);
  }

  getAvatarLetter(): string {
    const u = this.currentUser();
    if (!u) return '';
    return (u.display_name ?? u.username)[0].toUpperCase();
  }

  toggleClasses() {
    this.isClassesOpen.update(v => !v);
    this.isRacesOpen.set(false);
    this.isMecanicasOpen.set(false);
  }

  toggleRaces() {
    this.isRacesOpen.update(v => !v);
    this.isClassesOpen.set(false);
    this.isMecanicasOpen.set(false);
  }

  toggleMecanicas() {
    this.isMecanicasOpen.update(v => !v);
    this.isClassesOpen.set(false);
    this.isRacesOpen.set(false);
  }
}
