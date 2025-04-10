import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../cart.service';

interface Lemonade {
  id: number;
  lemonJuice: number;
  water: number;
  sugar: number;
  iceCubes: number;
  price: number;
}

interface LemonadeStand {
  id: number;
  name: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CartItemComponent, CommonModule, ReactiveFormsModule],
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService, private router: Router) {}

  @Input() lemonades: Lemonade[] = [];

  @Output() secondPassLemonadeIdEvent = new EventEmitter<number>();

  lemonadeStands: LemonadeStand[] = [];

  lemonadeStandForm: FormGroup = new FormGroup({
    selectedStand: new FormControl<LemonadeStand | undefined>(undefined),
  });

  onSubmit() {
    this.cartService.updateSelectedStand(
      this.lemonadeStandForm.controls['selectedStand'].value
    );
    this.cartService.updateTotalPrice(this.totalPrice);
    this.router.navigateByUrl('/checkout');
  }

  totalPrice: number = 0;

  receiveLemonadeId(id: number) {
    this.secondPassLemonadeIdEvent.emit(id);
    this.cartService.currentTotalPrice.subscribe(
      (currentTotalPrice) => (this.totalPrice = currentTotalPrice)
    );
  }

  updateSelectedStand() {
    this.cartService.updateSelectedStand(
      this.lemonadeStandForm.controls['selectedStand'].value
    );
  }

  ngOnInit() {
    this.cartService.currentStandOptions.subscribe(
      (currentStandOptions) => (this.lemonadeStands = currentStandOptions)
    );
    this.cartService.currentStand.subscribe((currentStand) =>
      this.lemonadeStandForm.setValue({ selectedStand: currentStand })
    );
    this.lemonades.forEach((lemonade) => {
      this.totalPrice += lemonade.price;
      this.cartService.updateTotalPrice(this.totalPrice);
    });
  }
}
