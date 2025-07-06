import { Component } from '@angular/core';
import { homeCarouselData2 } from '../../Data/mainCarousel';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  bannerImages:any=homeCarouselData2

}
