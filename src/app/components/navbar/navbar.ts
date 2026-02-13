import { Component, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  protected readonly isMenuOpen = signal(false);
  protected readonly isScrolled = signal(false);
  protected readonly isClassesOpen = signal(false);
  protected readonly isRacesOpen = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 20);
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
    document.body.style.overflow = '';
  }

  toggleClasses() {
    this.isClassesOpen.update(v => !v);
    this.isRacesOpen.set(false);
  }

  toggleRaces() {
    this.isRacesOpen.update(v => !v);
    this.isClassesOpen.set(false);
  }
}
