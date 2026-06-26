import { Injectable, signal } from '@angular/core';
import { University } from '../interfaces/university.interface';

const STORAGE_KEY = 'au_favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private favorites = signal<University[]>(this.load());

  getFavorites() {
    return this.favorites;
  }

  isFavorite(university: University): boolean {
    return this.favorites().some(f => f.name === university.name && f.country === university.country);
  }

  toggle(university: University): void {
    const current = this.favorites();
    const exists = this.isFavorite(university);
    const updated = exists
      ? current.filter(f => !(f.name === university.name && f.country === university.country))
      : [...current, university];
    this.favorites.set(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  private load(): University[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as University[]) : [];
  }
}
