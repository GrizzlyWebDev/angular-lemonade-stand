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
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CartService } from '../cart.service';

interface LemonadeStand {
  id: number;
  name: string;
}

@Component({
  selector: 'app-customer-form',
  imports: [CommonModule, ReactiveFormsModule, InputComponent],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent implements OnInit {
  constructor(private cartData: CartService, private router: Router) {}
  lemonadeStands: LemonadeStand[] = [
    { id: 1, name: 'Cooksys Lemonade Stand 1' },
    { id: 2, name: 'Cooksys Lemonade Stand 2' },
    { id: 3, name: 'Cooksys Lemonade Stand 3' },
    { id: 4, name: 'Cooksys Lemonade Stand 4' },
    { id: 5, name: 'Cooksys Lemonade Stand 5' },
  ];

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

  onSubmit() {
    this.cartData.updateSelectedStand(
      this.customerForm.controls['selectedStand'].value
    );

    this.cartData.updateStandOptions(this.lemonadeStands);

    this.router.navigateByUrl('/lemonade');
  }

  ngOnInit() {}
}
