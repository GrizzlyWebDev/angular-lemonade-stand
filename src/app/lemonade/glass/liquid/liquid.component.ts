import { Component, Input, OnInit } from '@angular/core';
import { WaveComponent } from './wave/wave.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liquid',
  templateUrl: './liquid.component.html',
  styleUrls: ['./liquid.component.css'],
  imports: [WaveComponent, CommonModule],
})
export class LiquidComponent implements OnInit {
  @Input() percentLemonJuiceLiquid: number = 0;
  @Input() percentWaterLiquid: number = 0;
  @Input() percentSugarLiquid: number = 0;
  @Input() iceCubesLiquid: number = 0;
  constructor() {}

  ngOnInit() {}
}
