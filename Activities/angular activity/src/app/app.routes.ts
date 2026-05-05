import { Routes } from '@angular/router';
import { HomePage } from './home.component';
import { AboutPage } from './about.component';
import { ContactPage } from './contact.component';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'about', component: AboutPage },
  { path: 'contact', component: ContactPage },
  { path: '**', redirectTo: '' }
];
