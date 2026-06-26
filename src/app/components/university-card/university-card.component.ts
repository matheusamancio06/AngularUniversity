import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { University } from '../../interfaces/university.interface';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-university-card',
  imports: [NgIf],
  templateUrl: './university-card.component.html'
})
export class UniversityCardComponent {
  @Input() university!: University;
  @Output() favoriteToggled = new EventEmitter<University>();

  constructor(public favoritesService: FavoritesService) {}

  openWebsite(url: string): void {
    window.open(url, '_blank', 'noopener');
  }

  toggleFavorite(event: Event): void {
    event.stopPropagation();
    this.favoritesService.toggle(this.university);
    this.favoriteToggled.emit(this.university);
  }

  get isFavorite(): boolean {
    return this.favoritesService.isFavorite(this.university);
  }

  get primaryDomain(): string {
    return this.university.domains?.[0] ?? '—';
  }

  get primaryWebsite(): string {
    return this.university.web_pages?.[0] ?? '';
  }
}
