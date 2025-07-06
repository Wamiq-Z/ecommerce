import { Component } from '@angular/core';
import { homeCarouselData } from '../../../Data/mainCarousel';

@Component({
  selector: 'app-main-caurosel',
  standalone: true,
  imports: [],
  templateUrl: './main-caurosel.component.html',
  styleUrl: './main-caurosel.component.css'
})
export class MainCauroselComponent {
  carouselData=homeCarouselData;

  currentSlide= 0;
  interval: any;

  ngOnInit() {
    this.autoPlay();
  }

  autoPlay() {
    setInterval(() => {
      this.nextSlide();
    }, 2000); 
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselData.length;
    // console.log("current slide - ", this.currentSlide)
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.carouselData.length) % this.carouselData.length;
  }
}
