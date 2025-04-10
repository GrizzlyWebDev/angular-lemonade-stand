import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../cart.service';
import LemonadeStand from '../interfaces/LemonadeStand';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  totalPrice: number = 0;

  constructor(private cartData: CartService, private router: Router) {}

  customerName: string = '';

  customerPhoneNumber: string = '';

  selectedStand: LemonadeStand | undefined = undefined;

  ngOnInit() {
    this.cartData.customerName.subscribe(
      (currentCustomerName) => (this.customerName = currentCustomerName)
    );

    this.cartData.customerPhoneNumber.subscribe(
      (currentCustomerPhoneNumber) =>
        (this.customerPhoneNumber = currentCustomerPhoneNumber)
    );

    this.cartData.selectedStand.subscribe(
      (selectedStand) => (this.selectedStand = selectedStand)
    );

    this.cartData.currentTotalPrice.subscribe(
      (currentTotalPrice) => (this.totalPrice = currentTotalPrice)
    );

    if (
      !this.customerName ||
      !this.customerPhoneNumber ||
      !this.selectedStand ||
      this.totalPrice === 0
    ) {
      this.router.navigateByUrl('/');
    }
  }
}
