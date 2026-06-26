import { Injectable, signal } from '@angular/core';
import { SearchHistory } from '../interfaces/search-history.interface';

const STORAGE_KEY = 'au_history';
const MAX_ENTRIES = 10;

@Injectable({ providedIn: 'root' })
export class HistoryService {
  private history = signal<SearchHistory[]>(this.load());

  getHistory() {
    return this.history;
  }

  add(country: string, resultCount: number): void {
    const entry: SearchHistory = {
      country,
      resultCount,
      date: new Date().toLocaleString('pt-BR')
    };
    const updated = [entry, ...this.history().filter(h => h.country !== country)].slice(0, MAX_ENTRIES);
    this.history.set(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  clear(): void {
    this.history.set([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  private load(): SearchHistory[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SearchHistory[]) : [];
  }
}
