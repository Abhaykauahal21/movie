import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OmdbSearchItem } from '../../../core/models/omdb.models';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  standalone: true,
  selector: 'movie-list',
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {
  @Input() title = '';
  @Input() items: OmdbSearchItem[] = [];
  @Input() horizontal = false;
}
