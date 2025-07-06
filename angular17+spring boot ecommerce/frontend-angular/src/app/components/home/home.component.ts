import { Component } from '@angular/core';
import { gounsPage1 } from '../../Data/Gouns/gouns';
import { lehngacholiPage2 } from '../../Data/Saree/lenghaCholiPage2';
import { mens_kurta } from '../../Data/Men/men_kurta';
import { mensShoesPage1 } from '../../Data/shoes';
import { MainCauroselComponent } from './main-caurosel/main-caurosel.component';
import { ProductCardSliderComponent } from './product-card-slider/product-card-slider.component';
import { productData } from '../../Data/productData';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, MainCauroselComponent, ProductCardSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: any[] = [];
  gouns: any;
  saree: any;
  men_kurta: any;
  shoes: any;

  constructor() {
    this.products = productData.slice(0, 4);
    this.gouns = gounsPage1.slice(0, 4);
    this.saree = lehngacholiPage2.slice(0, 4);
    this.men_kurta = mens_kurta.slice(0, 4);
    this.shoes = mensShoesPage1.slice(0, 4);
  }
}
