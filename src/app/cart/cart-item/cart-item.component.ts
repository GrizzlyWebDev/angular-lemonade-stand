import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlassComponent } from '../../lemonade/glass/glass.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
  imports: [GlassComponent, CommonModule],
})
export class CartItemComponent {
  @Input() lemonade: any;
  @Output() passLemonadeEvent = new EventEmitter<number>();

  passLemonadeId(id: number) {
    this.passLemonadeEvent.emit(id);
  }
}
