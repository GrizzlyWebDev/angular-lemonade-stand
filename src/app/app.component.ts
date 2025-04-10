import { Component } from '@angular/core';
import { CustomerFormComponent } from './customer-form/customer-form.component';

@Component({
  selector: 'app-root',
  imports: [CustomerFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'lemonadestand';
}
