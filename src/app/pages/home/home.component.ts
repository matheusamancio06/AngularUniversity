import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { HistoryService } from '../../services/history.service';
import { SearchHistory } from '../../interfaces/search-history.interface';

const COUNTRIES: string[] = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia',
  'Austria', 'Belgium', 'Bolivia', 'Brazil', 'Canada',
  'Chile', 'China', 'Colombia', 'Costa Rica', 'Cuba',
  'Czech Republic', 'Denmark', 'Ecuador', 'Egypt', 'Ethiopia',
  'Finland', 'France', 'Germany', 'Ghana', 'Greece',
  'Hungary', 'India', 'Indonesia', 'Iran', 'Iraq',
  'Ireland', 'Israel', 'Italy', 'Japan', 'Jordan',
  'Kenya', 'Malaysia', 'Mexico', 'Morocco', 'Netherlands',
  'New Zealand', 'Nigeria', 'Norway', 'Pakistan', 'Panama',
  'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Romania', 'Russia', 'Saudi Arabia', 'Singapore', 'South Africa',
  'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Taiwan',
  'Thailand', 'Tunisia', 'Turkey', 'Ukraine', 'United Kingdom',
  'United States', 'Uruguay', 'Venezuela', 'Vietnam', 'Zimbabwe'
];

@Component({
  selector: 'app-home',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  selectedCountry = '';
  countries: string[] = COUNTRIES;

  constructor(
    public historyService: HistoryService,
    private router: Router
  ) {}

  get history(): SearchHistory[] {
    return this.historyService.getHistory()();
  }

  search(): void {
    if (!this.selectedCountry.trim()) return;
    this.router.navigate(['/results'], { queryParams: { country: this.selectedCountry.trim() } });
  }

  searchFromHistory(country: string): void {
    this.selectedCountry = country;
    this.search();
  }

  clearHistory(): void {
    this.historyService.clear();
  }
}
