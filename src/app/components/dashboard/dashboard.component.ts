import { Component, Input } from '@angular/core';
import { University } from '../../interfaces/university.interface';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  @Input() universities: University[] = [];

  constructor(public favoritesService: FavoritesService) {}

  get totalCount(): number {
    return this.universities.length;
  }

  get uniqueDomains(): number {
    const domains = this.universities.flatMap(u => u.domains);
    return new Set(domains).size;
  }

  get favoritesCount(): number {
    return this.favoritesService.getFavorites()().length;
  }
}
