import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SliderProductCardComponent } from '../slider-product-card/slider-product-card.component';

@Component({
  selector: 'app-product-card-slider',
  standalone: true,
  imports: [SliderProductCardComponent],
  templateUrl: './product-card-slider.component.html',
  styleUrl: './product-card-slider.component.css'
})
export class ProductCardSliderComponent {

  @Input() title: string | undefined;
  @Input() products:any[] | undefined;

  // products:any[]=[]

  constructor(private router:Router) {
    
  }

  navigateToProducts(){
    console.log("navigate tot products")
    this.router.navigate(["/products"])
  }

}
