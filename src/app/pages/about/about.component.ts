import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [NgFor],
  templateUrl: './about.component.html'
})
export class AboutComponent {
  technologies = [
    { name: 'Angular 19', icon: 'bi-lightning-fill', color: 'text-danger', desc: 'Framework principal, standalone components' },
    { name: 'TypeScript', icon: 'bi-code-slash', color: 'text-primary', desc: 'Tipagem estática e interfaces' },
    { name: 'Bootstrap 5', icon: 'bi-bootstrap-fill', color: 'text-purple', desc: 'Estilização responsiva' },
    { name: 'Chart.js', icon: 'bi-bar-chart-fill', color: 'text-success', desc: 'Gráficos estatísticos' },
    { name: 'HttpClient', icon: 'bi-cloud-arrow-down-fill', color: 'text-info', desc: 'Consumo de API REST' },
    { name: 'LocalStorage', icon: 'bi-device-hdd-fill', color: 'text-warning', desc: 'Persistência de favoritos e histórico' }
  ];

  features = [
    'Pesquisa de universidades por país via API pública',
    'Filtro local por nome sem nova requisição',
    'Ordenação A-Z e Z-A',
    'Paginação configurável de resultados',
    'Favoritos persistidos em LocalStorage',
    'Histórico de pesquisas com data e contagem',
    'Dashboard estatístico (total, domínios únicos, favoritos)',
    'Gráfico de barras com Chart.js por país pesquisado',
    'Dark Mode / Light Mode com persistência',
    'Interface responsiva: desktop, tablet e smartphone'
  ];
}
