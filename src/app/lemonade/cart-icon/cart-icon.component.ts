import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-icon',
  imports: [CommonModule],
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.css'],
})
export class CartIconComponent {
  cartCount: number = 0;
}
