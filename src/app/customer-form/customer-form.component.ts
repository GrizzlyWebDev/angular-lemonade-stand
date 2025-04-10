import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from './input/input.component';

interface LemonadStand {
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
  lemonadeStands: LemonadStand[] = [
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
    phoneNumber: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    selectedStand: new FormControl<LemonadStand | undefined>(undefined, [
      Validators.required,
    ]),
  });

  onSubmit() {
    console.log(`name: ${this.customerForm.controls['name'].value}`);
    console.log(
      `phoneNumber: ${this.customerForm.controls['phoneNumber'].value}`
    );
    console.log(
      `selectedLemonadeStand: ${JSON.stringify(
        this.customerForm.controls['selectedStand'].value
      )}`
    );
  }

  constructor() {}

  ngOnInit() {}
}
