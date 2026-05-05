import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppService {
  private message = 'Hello from AppService!';

  getWelcomeMessage(): string {
    return this.message;
  }

  getDataItems() {
    return [
      { title: 'Component', description: 'Build reusable UI pieces with template and styles.' },
      { title: 'Service', description: 'Share logic and data across components.' },
      { title: 'Routing', description: 'Navigate between views inside the app.' },
      { title: 'Data binding', description: 'Bind UI and component data both ways.' }
    ];
  }
}
