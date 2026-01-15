import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OmdbService } from '../../core/services/omdb.service';
import { OmdbSearchItem } from '../../core/models/omdb.models';
import { MovieListComponent } from '../../shared/components/movie-list/movie-list.component';
import { catchError } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-search',
  imports: [CommonModule, MovieListComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private omdb = inject(OmdbService);

  results = signal<OmdbSearchItem[]>([]);
  error = signal('');
  query = signal('');

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const q = params.get('query') ?? '';
      const page = parseInt(params.get('page') ?? '1', 10) || 1;
      this.query.set(q);
      if (q) {
        this.search(q, page);
      } else {
        this.results.set([]);
      }
    });
  }

  private search(term: string, page: number) {
    this.error.set('');
    this.omdb.search(term, page)
      .pipe(catchError(err => { this.error.set('Failed to load'); throw err; }))
      .subscribe(res => {
        this.results.set(res.Search ?? []);
      });
  }
}

