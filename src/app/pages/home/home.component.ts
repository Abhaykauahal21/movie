import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OmdbService } from '../../core/services/omdb.service';
import { CacheService } from '../../core/services/cache.service';
import { MovieListComponent } from '../../shared/components/movie-list/movie-list.component';
import { GenreBarComponent } from '../../shared/components/genre-bar/genre-bar.component';
import { OmdbSearchItem } from '../../core/models/omdb.models';
import { catchError } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterLink, MovieListComponent, GenreBarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private omdb = inject(OmdbService);
  private cache = inject(CacheService);

  categories = ['Action', 'Adventure', 'Comedy', 'Drama', 'Thriller', 'Horror', 'Sci-Fi', 'Romance'];
  data = signal<Record<string, OmdbSearchItem[]>>({});
  error = signal<string>('');

  featured = signal<OmdbSearchItem | null>(null);

  ngOnInit() {
    this.categories.forEach(cat => {
      this.loadCategory(cat);
    });
  }

  loadCategory(cat: string) {
    const cached = this.cache.get(`home:${cat}`);
    if (cached) {
      this.data.update(d => ({ ...d, [cat]: cached }));
      if (!this.featured() && cached.length) {
        this.featured.set(cached[0]);
      }
    } else {
      this.omdb.search(cat, 1)
        .pipe(catchError(err => { this.error.set('Failed to load'); throw err; }))
        .subscribe(res => {
          const items = (res.Search ?? []).slice(0, 10);
          this.cache.set(`home:${cat}`, items);
          this.data.update(d => ({ ...d, [cat]: items }));
          if (!this.featured() && items.length) {
            this.featured.set(items[0]);
          }
        });
    }
  }
}
