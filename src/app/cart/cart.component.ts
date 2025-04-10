import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CommonModule } from '@angular/common';

interface Lemonade {
  id: number;
  lemonJuice: number;
  water: number;
  sugar: number;
  iceCubes: number;
  price: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CartItemComponent, CommonModule],
})
export class CartComponent implements OnInit {
  @Input() lemonades: Lemonade[] = [];

  @Output() secondPassLemonadeIdEvent = new EventEmitter<number>();

  totalPrice: number = 0;

  receiveLemonadeId(id: number) {
    this.secondPassLemonadeIdEvent.emit(id);
  }

  constructor() {}

  ngOnInit() {
    this.lemonades.forEach((lemonade) => (this.totalPrice += lemonade.price));
  }
}
