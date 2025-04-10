import { Component } from '@angular/core';
import { CardComponent } from './card/card.component';
import { ProductComponent } from './product/product.component';
import { CommonModule } from '@angular/common';
import { GlassComponent } from './glass/glass.component';
import { CartComponent } from '../cart/cart.component';
import { CartIconComponent } from './cart-icon/cart-icon.component';

interface Product {
  name: string;
  amount: number;
  max: number;
  price: number;
  unit: string;
}

interface Lemonade {
  id: number;
  lemonJuice: number;
  water: number;
  sugar: number;
  iceCubes: number;
  price: number;
}

@Component({
  selector: 'app-lemonade',
  imports: [
    CardComponent,
    ProductComponent,
    CommonModule,
    GlassComponent,
    CartComponent,
    CartIconComponent,
  ],
  templateUrl: './lemonade.component.html',
  styleUrl: './lemonade.component.css',
})
export class LemonadeComponent {
  products: Product[] = [
    {
      name: 'Lemon Juice',
      amount: 0,
      max: 10,
      price: 0.5,
      unit: 'oz',
    },
    {
      name: 'Water',
      amount: 0,
      max: 10,
      price: 0.01,
      unit: 'oz',
    },
    {
      name: 'Sugar',
      amount: 0,
      max: 10,
      price: 0.25,
      unit: 'tsp',
    },
    {
      name: 'Ice Cubes',
      amount: 0,
      max: 12,
      price: 0.05,
      unit: 'cubes',
    },
  ];

  cartLemonades: Lemonade[] = [];

  currentLemonade: Lemonade = {
    id: 0,
    lemonJuice: 0,
    water: 0,
    sugar: 0,
    iceCubes: 0,
    price: 0.0,
  };

  cartIdCount = 0;

  increment(productName: string) {
    LemonadeComponent.bind(this);
    let match = this.products.find((product) => product.name === productName);
    if (match) match.amount < match.max ? (match.amount += 1) : match.amount;
  }

  decrement(productName: string) {
    LemonadeComponent.bind(this);
    let match = this.products.find((product) => product.name === productName);
    if (match) match.amount > 0 ? (match.amount -= 1) : match.amount;
  }

  cartShown: boolean = false;

  toggleCart() {
    this.cartShown = !this.cartShown;
  }

  addToCart() {
    if (
      this.products[0].amount > 0 ||
      this.products[1].amount > 0 ||
      this.products[2].amount > 0 ||
      this.products[3].amount > 0
    ) {
      this.currentLemonade = {
        id: this.cartIdCount,
        lemonJuice: this.products[0].amount,
        water: this.products[1].amount,
        sugar: this.products[2].amount,
        iceCubes: this.products[3].amount,
        price: 0,
      };
      this.currentLemonade.price = this.calculatePrice();
      this.cartLemonades.push(this.currentLemonade);
      this.cartIdCount++;
      this.resetProducts();
    }
  }

  calculatePrice(): number {
    return (
      this.currentLemonade.lemonJuice * this.products[0].price +
      this.currentLemonade.water * this.products[1].price +
      this.currentLemonade.sugar * this.products[2].price +
      this.currentLemonade.iceCubes * this.products[3].price
    );
  }

  resetProducts() {
    this.products = [
      {
        name: 'Lemon Juice',
        amount: 0,
        max: 10,
        price: 0.5,
        unit: 'oz',
      },
      {
        name: 'Water',
        amount: 0,
        max: 10,
        price: 0.01,
        unit: 'oz',
      },
      {
        name: 'Sugar',
        amount: 0,
        max: 10,
        price: 0.25,
        unit: 'tsp',
      },
      {
        name: 'Ice Cubes',
        amount: 0,
        max: 12,
        price: 0.05,
        unit: 'cubes',
      },
    ];
  }

  removeFromCart(id: number) {
    const itemIdx = this.cartLemonades.findIndex(
      (lemonade) => lemonade.id === id
    );
    itemIdx > -1 ? this.cartLemonades.splice(itemIdx, 1) : null;
  }
}
