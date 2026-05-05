import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'contact-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactPage {
  name = '';
  email = '';
  message = '';
  submitted = false;

  submitForm(): void {
    this.submitted = true;
  }
}
