import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { University } from '../interfaces/university.interface';

@Injectable({ providedIn: 'root' })
export class UniversityService {
  // On HTTPS (Netlify) use the server-side proxy to avoid mixed content.
  // On HTTP (localhost dev) call the API directly.
  private get apiUrl(): string {
    return window.location.protocol === 'https:'
      ? '/api/search'
      : 'http://universities.hipolabs.com/search';
  }

  constructor(private http: HttpClient) {}

  searchByCountry(country: string): Observable<University[]> {
    return this.http.get<University[]>(`${this.apiUrl}?country=${encodeURIComponent(country)}`);
  }
}
