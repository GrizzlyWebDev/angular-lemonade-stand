import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConvertMeasurementPipe } from './convert-measurement.pipe';

@Component({
  selector: 'app-product',
  imports: [CommonModule, ConvertMeasurementPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input() name: string = '';
  @Input() amount: number = 0;
  @Input() max: number = 10;
  @Input() unit: string = '';

  @Output() incrementProductByName = new EventEmitter<string>();

  handleIncrement() {
    this.incrementProductByName.emit();
  }

  @Output() decrementProductByName = new EventEmitter<string>();

  handleDecrement() {
    this.decrementProductByName.emit();
  }
}
