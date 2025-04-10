import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import LemonadeStand from '../interfaces/LemonadeStand';
import Lemonade from '../interfaces/Lemonade';
import Order from '../interfaces/Order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CartItemComponent, CommonModule, ReactiveFormsModule],
})
export class CartComponent implements OnInit {
  @Input() lemonades: Lemonade[] = [];

  @Output() secondPassLemonadeIdEvent = new EventEmitter<number>();

  customerName: string = '';

  customerPhoneNumber: string = '';

  lemonadeStands: LemonadeStand[] = [];

  lemonadeStandForm: FormGroup = new FormGroup({
    selectedStand: new FormControl<LemonadeStand | undefined>(undefined),
  });

  totalPrice: number = 0;

  constructor(private cartData: CartService, private router: Router) {}

  ngOnInit() {
    this.cartData.selectedStandOptions.subscribe(
      (selectedStandOptions) => (this.lemonadeStands = selectedStandOptions)
    );
    this.cartData.selectedStand.subscribe((selectedStand) =>
      this.lemonadeStandForm.setValue({ selectedStand: selectedStand })
    );
    this.lemonades.forEach((lemonade) => {
      this.totalPrice += lemonade.price;
      this.cartData.updateTotalPrice(this.totalPrice);
    });
    this.cartData.customerName.subscribe(
      (currentCustomerName) => (this.customerName = currentCustomerName)
    );
    this.cartData.customerPhoneNumber.subscribe(
      (currentCustomerPhoneNumber) =>
        (this.customerPhoneNumber = currentCustomerPhoneNumber)
    );
  }

  receiveLemonadeId(id: number) {
    this.secondPassLemonadeIdEvent.emit(id);
    this.cartData.currentTotalPrice.subscribe(
      (currentTotalPrice) => (this.totalPrice = currentTotalPrice)
    );
  }

  updateSelectedStand() {
    this.cartData.updateSelectedStand(
      this.lemonadeStandForm.controls['selectedStand'].value
    );
  }

  onSubmit() {
    let order: Order = {
      lemonades: this.lemonades,
      customer: {
        name: this.customerName,
        phoneNumber: this.customerPhoneNumber,
      },
      lemonadeStand: {
        name: this.lemonadeStandForm.controls['selectedStand'].value.name,
      },
    };
    this.cartData.placeOrder(order).subscribe((response) => {
      if (response.total) {
        this.cartData.updateTotalPrice(response.total);
      }
    });
    this.cartData.updateSelectedStand(
      this.lemonadeStandForm.controls['selectedStand'].value
    );
    this.cartData.updateTotalPrice(this.totalPrice);
    this.router.navigateByUrl('/checkout');
  }
}
