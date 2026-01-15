import { Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../../core/state/app-state.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, SearchBarComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private router = inject(Router);
  private appState = inject(AppStateService);

  scrolled = signal(false);

  loadingCount = this.appState.loadingCount;

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 30);
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goSearch() {
    this.router.navigate(['/search']);
  }

  goFavorites() {
    this.router.navigate(['/favorites']);
  }
}
