import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentComponent } from './student/student';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StudentComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Student Management System');
}
