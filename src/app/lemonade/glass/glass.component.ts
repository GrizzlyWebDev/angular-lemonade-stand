import { Component, Input } from '@angular/core';
import { LiquidComponent } from './liquid/liquid.component';

@Component({
  selector: 'app-glass',
  templateUrl: './glass.component.html',
  styleUrls: ['./glass.component.css'],
  imports: [LiquidComponent],
})
export class GlassComponent {
  @Input() percentLemonJuice: number = 0;
  @Input() percentWater: number = 0;
  @Input() percentSugar: number = 0;
  @Input() iceCubes: number = 0;
  @Input() classNames: string = '';
}
