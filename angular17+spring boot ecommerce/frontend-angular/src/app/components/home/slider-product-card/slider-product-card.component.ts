import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slider-product-card',
  standalone: true,
  imports: [],
  templateUrl: './slider-product-card.component.html',
  styleUrl: './slider-product-card.component.css'
})
export class SliderProductCardComponent {
  @Input() product:any | undefined;
}
