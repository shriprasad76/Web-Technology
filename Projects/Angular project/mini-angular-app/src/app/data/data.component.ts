import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../app.service';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [CommonModule],
  providers: [AppService],
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {
  items = this.appService.getDataItems();
  selectedTitle = '';

  constructor(private appService: AppService) {}

  selectItem(title: string) {
    this.selectedTitle = title;
  }
}
