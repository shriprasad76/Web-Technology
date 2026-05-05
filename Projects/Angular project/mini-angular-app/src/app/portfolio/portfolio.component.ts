import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  projects = [
    { title: 'Simple Website', description: 'A basic page built with Angular and routing.' },
    { title: 'Portfolio Page', description: 'A clean portfolio layout with easy navigation.' },
    { title: 'Interactive Data', description: 'A small example showing event binding and templates.' }
  ];
}
