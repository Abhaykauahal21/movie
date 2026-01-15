import { Component, Input, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OmdbSearchItem } from '../../../core/models/omdb.models';
import { FavoritesService } from '../../../core/services/favorites.service';
import { LazyImgDirective } from '../../directives/lazy-img.directive';
import { OmdbService } from '../../../core/services/omdb.service';

@Component({
  standalone: true,
  selector: 'movie-card',
  imports: [CommonModule, RouterLink, LazyImgDirective],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() item!: OmdbSearchItem;
  private fav = inject(FavoritesService);
  private omdb = inject(OmdbService);

  actors = signal('');
  rating = signal('');

  ngOnInit() {
    const id = this.item?.imdbID;
    if (!id) return;
    this.omdb.detailsById(id).subscribe(detail => {
      const actors = (detail?.Actors || '').split(',').map(s => s.trim()).slice(0, 2).join(', ');
      this.actors.set(actors);
      this.rating.set(detail?.imdbRating || '');
    });
  }

  toggleFavorite() {
    if (this.fav.isFavorite(this.item.imdbID)) {
      this.fav.remove(this.item.imdbID);
    } else {
      this.fav.add({
        Title: this.item.Title,
        Year: this.item.Year,
        imdbID: this.item.imdbID,
        Poster: this.item.Poster
      });
    }
  }

  isFav() {
    return this.fav.isFavorite(this.item.imdbID);
  }
}
