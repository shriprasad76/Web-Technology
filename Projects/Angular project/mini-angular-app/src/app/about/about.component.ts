import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../app.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  providers: [AppService],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  message: string;

  constructor(private appService: AppService) {
    this.message = this.appService.getWelcomeMessage();
  }
}
