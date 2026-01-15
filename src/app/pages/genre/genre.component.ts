import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OmdbService } from '../../core/services/omdb.service';
import { OmdbSearchItem } from '../../core/models/omdb.models';
import { MovieListComponent } from '../../shared/components/movie-list/movie-list.component';
import { catchError } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-genre',
  imports: [CommonModule, MovieListComponent],
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private omdb = inject(OmdbService);

  genre = signal('');
  items = signal<OmdbSearchItem[]>([]);
  error = signal('');

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const g = params.get('genreName') ?? '';
      this.genre.set(g);
      if (g) {
        this.load(g);
      }
    });
  }

  private load(genre: string) {
    this.error.set('');
    this.omdb.search(genre, 1)
      .pipe(catchError(err => { this.error.set('Failed to load'); throw err; }))
      .subscribe(res => {
        this.items.set(res.Search ?? []);
      });
  }
}

