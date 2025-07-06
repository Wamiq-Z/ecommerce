import { Component } from '@angular/core';
import { getCartRequest } from '../../../state/Cart/cart.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../../Models/AppState';
import { Store } from '@ngrx/store';
import { ProductService } from '../../../state/Product/product.service';
import { CartService } from '../../../state/Cart/cart.service';
import { Observable } from 'rxjs';
import { productData } from '../../../Data/productData';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { StarRatingComponent } from '../../star-rating/star-rating.component';
import { ProductReviewCardComponent } from '../../product-review-card/product-review-card.component';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,ProductCardComponent,ProductReviewCardComponent,MatProgressBarModule,MatRadioModule,MatButtonModule,FormsModule,StarRatingComponent,],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  selectedSize!: string;
  relatedProducts: any;
  reviews = [1, 1, 1];
  productDetails$!: Observable<any>;
  productId!: Number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private productService: ProductService,
    private cartService:CartService,
  ) {
    this.relatedProducts = productData;
  }

  navigateToCart = () => {
    this.router.navigate(['/cart']);
  };

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log('productId', id);

    if (id) {
      console.log('id ', id);
      this.productService.findProductById(id)
    }

    this.productDetails$ = this.store.select(
      (state) => state.product.selectedProduct
    );

    this.productDetails$.subscribe((productdata) => {
      this.productId = Number(productdata.id);
      console.log('product details from store - ', productdata.id);
    });
  }

  handleAddToCart = () => {
    const data = { size: this.selectedSize, productId: this.productId };
    console.log("data ----- ",data)
    this.cartService.addItemToCart(data)
    this.cartService.getCart()

    this.store.dispatch(getCartRequest());

    this.navigateToCart();
  };

}
