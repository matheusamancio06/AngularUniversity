import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { University } from '../interfaces/university.interface';

@Injectable({ providedIn: 'root' })
export class UniversityService {
  private readonly apiUrl = 'https://universities.hipolabs.com/search';

  constructor(private http: HttpClient) {}

  searchByCountry(country: string): Observable<University[]> {
    return this.http.get<University[]>(`${this.apiUrl}?country=${encodeURIComponent(country)}`);
  }
}
