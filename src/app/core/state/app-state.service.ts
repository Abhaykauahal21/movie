import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private _loadingCount = signal(0);
  private _recentSearches = signal<string[]>(this.loadSearches());

  loadingCount = this._loadingCount.asReadonly();
  recentSearches = this._recentSearches.asReadonly();

  incLoading() {
    this._loadingCount.set(this._loadingCount() + 1);
  }
  decLoading() {
    const v = this._loadingCount() - 1;
    this._loadingCount.set(v < 0 ? 0 : v);
  }

  addRecentSearch(term: string) {
    const items = [term, ...this._recentSearches().filter(t => t !== term)].slice(0, 10);
    this._recentSearches.set(items);
    localStorage.setItem('recentSearches', JSON.stringify(items));
  }
  clearRecentSearches() {
    this._recentSearches.set([]);
    localStorage.removeItem('recentSearches');
  }

  private loadSearches(): string[] {
    try {
      const raw = localStorage.getItem('recentSearches');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}
