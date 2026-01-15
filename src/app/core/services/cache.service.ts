import { Injectable, signal } from '@angular/core';
import { OmdbSearchItem } from '../models/omdb.models';

@Injectable({ providedIn: 'root' })
export class CacheService {
  private store = signal<Record<string, OmdbSearchItem[]>>({});

  get(key: string) {
    return this.store()[key] ?? null;
  }
  set(key: string, value: OmdbSearchItem[]) {
    const next = { ...this.store(), [key]: value };
    this.store.set(next);
  }
}
