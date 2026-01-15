import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../core/services/favorites.service';
import { MovieListComponent } from '../../shared/components/movie-list/movie-list.component';

@Component({
  standalone: true,
  selector: 'app-favorites',
  imports: [CommonModule, MovieListComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  private fav = inject(FavoritesService);

  get items() {
    return this.fav.favorites();
  }
}

