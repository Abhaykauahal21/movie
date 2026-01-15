import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OmdbService } from '../../core/services/omdb.service';
import { OmdbMovieDetail } from '../../core/models/omdb.models';
import { FavoritesService } from '../../core/services/favorites.service';
import { RuntimePipe } from '../../shared/pipes/runtime.pipe';
import { LazyImgDirective } from '../../shared/directives/lazy-img.directive';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { catchError, of } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-movie-details',
  imports: [CommonModule, RuntimePipe, LazyImgDirective, LoadingSpinnerComponent],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
  private route = inject(ActivatedRoute);
  private omdb = inject(OmdbService);
  private fav = inject(FavoritesService);

  movie = signal<OmdbMovieDetail | null>(null);
  loading = signal(false);
  error = signal<string>('');

  constructor() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('imdbId') ?? '';
      if (id) this.load(id);
    });
  }

  private load(id: string) {
    this.loading.set(true);
    this.error.set('');
    this.omdb.detailsById(id).pipe(
      catchError(() => { this.error.set('Failed to load'); return of(null); })
    ).subscribe(res => {
      this.movie.set(res);
      this.loading.set(false);
    });
  }

  toggleFavorite() {
    const m = this.movie();
    if (!m) return;
    if (this.fav.isFavorite(m.imdbID)) {
      this.fav.remove(m.imdbID);
    } else {
      this.fav.add({
        Title: m.Title,
        Year: m.Year,
        imdbID: m.imdbID,
        Poster: m.Poster,
        imdbRating: m.imdbRating,
        Actors: m.Actors
      });
    }
  }

  isFav() {
    const m = this.movie();
    return m ? this.fav.isFavorite(m.imdbID) : false;
  }
}
