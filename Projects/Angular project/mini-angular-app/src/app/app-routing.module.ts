import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DataComponent } from './data/data.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'data', component: DataComponent },
  { path: '**', redirectTo: '' }
];
