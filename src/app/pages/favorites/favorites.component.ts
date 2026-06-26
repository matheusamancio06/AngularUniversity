import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { University } from '../../interfaces/university.interface';
import { FavoritesService } from '../../services/favorites.service';
import { UniversityCardComponent } from '../../components/university-card/university-card.component';

@Component({
  selector: 'app-favorites',
  imports: [NgFor, NgIf, RouterLink, FormsModule, UniversityCardComponent],
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent {
  filterText = '';

  constructor(public favoritesService: FavoritesService) {}

  get favorites(): University[] {
    return this.favoritesService.getFavorites()();
  }

  get filtered(): University[] {
    const term = this.filterText.toLowerCase().trim();
    if (!term) return this.favorites;
    return this.favorites.filter(u =>
      u.name.toLowerCase().includes(term) || u.country.toLowerCase().includes(term)
    );
  }
}
