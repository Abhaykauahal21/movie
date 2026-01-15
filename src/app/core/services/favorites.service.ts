import { inject, Injectable, signal } from '@angular/core';
import { OmdbSearchItem } from '../models/omdb.models';

type FavItem = Pick<OmdbSearchItem, 'Title' | 'Year' | 'imdbID' | 'Poster' | 'imdbRating' | 'Actors'>;

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private storageKey = 'favorites';
  favorites = signal<FavItem[]>(this.load());

  private load(): FavItem[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private persist() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.favorites()));
  }

  add(item: FavItem) {
    const exists = this.favorites().some(f => f.imdbID === item.imdbID);
    if (!exists) {
      this.favorites.set([item, ...this.favorites()]);
      this.persist();
    }
  }

  remove(imdbID: string) {
    this.favorites.set(this.favorites().filter(f => f.imdbID !== imdbID));
    this.persist();
  }

  isFavorite(imdbID: string) {
    return this.favorites().some(f => f.imdbID === imdbID);
  }
}
