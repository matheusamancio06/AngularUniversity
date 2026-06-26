import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';

import { University } from '../../interfaces/university.interface';
import { UniversityService } from '../../services/university.service';
import { HistoryService } from '../../services/history.service';
import { UniversityCardComponent } from '../../components/university-card/university-card.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';

Chart.register(...registerables);

type SortOption = 'az' | 'za';

@Component({
  selector: 'app-results',
  imports: [FormsModule, NgFor, NgIf, UniversityCardComponent, DashboardComponent],
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  country = '';
  allUniversities: University[] = [];
  filterText = '';
  sortOrder: SortOption = 'az';
  loading = false;
  error = '';

  // Pagination
  pageSize = 12;
  currentPage = 1;

  // Chart
  private chart: Chart | null = null;
  chartData: { country: string; count: number }[] = [];

  private sub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private universityService: UniversityService,
    private historyService: HistoryService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params => {
      const c = params['country'];
      if (c) {
        this.country = c;
        this.load(c);
      }
    });

    const raw = localStorage.getItem('au_chart_data');
    if (raw) {
      this.chartData = JSON.parse(raw) as { country: string; count: number }[];
    }
  }

  ngAfterViewInit(): void {
    this.renderChart();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.chart?.destroy();
  }

  private load(country: string): void {
    this.loading = true;
    this.error = '';
    this.allUniversities = [];
    this.filterText = '';
    this.currentPage = 1;

    this.universityService.searchByCountry(country).subscribe({
      next: (data) => {
        this.allUniversities = data;
        this.loading = false;
        this.historyService.add(country, data.length);
        this.updateChartData(country, data.length);
        this.renderChart();
      },
      error: () => {
        this.error = 'Erro ao buscar universidades. Verifique sua conexão e tente novamente.';
        this.loading = false;
      }
    });
  }

  private updateChartData(country: string, count: number): void {
    const idx = this.chartData.findIndex(d => d.country === country);
    if (idx >= 0) {
      this.chartData[idx].count = count;
    } else {
      this.chartData.push({ country, count });
    }
    localStorage.setItem('au_chart_data', JSON.stringify(this.chartData));
  }

  private renderChart(): void {
    if (!this.chartCanvas || this.chartData.length === 0) return;

    this.chart?.destroy();

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.chartData.map(d => d.country),
        datasets: [{
          label: 'Universidades por País',
          data: this.chartData.map(d => d.count),
          backgroundColor: 'rgba(13, 110, 253, 0.7)',
          borderColor: 'rgba(13, 110, 253, 1)',
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Universidades retornadas por país pesquisado'
          }
        },
        scales: {
          y: { beginAtZero: true, ticks: { precision: 0 } }
        }
      }
    });
  }

  get filtered(): University[] {
    let list = [...this.allUniversities];
    const term = this.filterText.toLowerCase().trim();
    if (term) {
      list = list.filter(u => u.name.toLowerCase().includes(term));
    }
    list.sort((a, b) =>
      this.sortOrder === 'az'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    return list;
  }

  get totalPages(): number {
    return Math.ceil(this.filtered.length / this.pageSize);
  }

  get paginated(): University[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(p: number): void {
    if (p >= 1 && p <= this.totalPages) this.currentPage = p;
  }

  onFilterChange(): void {
    this.currentPage = 1;
  }

  onSortChange(): void {
    this.currentPage = 1;
  }
}
