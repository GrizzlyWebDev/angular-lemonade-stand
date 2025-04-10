import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from './input/input.component';
import { PhoneFormControl } from './phone-form-control';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import LemonadeStand from '../interfaces/LemonadeStand';

@Component({
  selector: 'app-customer-form',
  imports: [CommonModule, ReactiveFormsModule, InputComponent],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent implements OnInit {
  lemonadeStands: LemonadeStand[] = [];

  customerForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    phoneNumber: new PhoneFormControl('', [
      Validators.required,
      Validators.minLength(13),
      Validators.maxLength(13),
    ]),
    selectedStand: new FormControl<LemonadeStand | undefined>(undefined, [
      Validators.required,
    ]),
  });

  constructor(private cartData: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartData.loadLemonadeStands().subscribe((response) => {
      this.cartData.updateStandOptions(response);
    });
    this.cartData.selectedStandOptions.subscribe(
      (currentStandOptions) => (this.lemonadeStands = currentStandOptions)
    );
  }

  onSubmit() {
    this.cartData.updateCustomerName(this.customerForm.controls['name'].value);

    this.cartData.updateCustomerPhoneNumber(
      this.customerForm.controls['phoneNumber'].value
    );

    this.cartData.updateSelectedStand(
      this.customerForm.controls['selectedStand'].value
    );

    this.router.navigateByUrl('/lemonade');
  }
}
