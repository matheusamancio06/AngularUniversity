import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'au_theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = signal<boolean>(localStorage.getItem(STORAGE_KEY) === 'dark');

  constructor() {
    this.apply();
  }

  toggle(): void {
    this.isDark.update(v => !v);
    localStorage.setItem(STORAGE_KEY, this.isDark() ? 'dark' : 'light');
    this.apply();
  }

  private apply(): void {
    document.documentElement.setAttribute('data-bs-theme', this.isDark() ? 'dark' : 'light');
  }
}
