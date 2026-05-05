import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomePage implements OnInit {
  student = {
    name: 'Aisha Khan',
    course: 'Web Technology Lab'
  };

  liveText = '';
  showDetails = signal(true);
  activePanel = signal('overview');
  loading = signal(false);
  users = signal<User[]>([]);
  error = signal('');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.loading.set(true);
    this.error.set('');

    this.http
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (data) => this.users.set(data),
        error: () => this.error.set('Unable to load users. Please check your connection.'),
        complete: () => this.loading.set(false)
      });
  }
}
