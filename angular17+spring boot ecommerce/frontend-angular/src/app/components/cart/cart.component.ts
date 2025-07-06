import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../state/Cart/cart.service';
import { AppState } from '../../Models/AppState';
import { Store, select } from '@ngrx/store';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent,MatDividerModule,MatButtonModule,MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  products = [1, 1, 1, 1, , 1];
  cart: any;
  cartItems:any;

  constructor(
    private router: Router,
    private cartService: CartService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.cartService.getCart();
  

    this.store.pipe(select((store) => store.cart)).subscribe((cart) => {
      this.cart = cart;
    });
  }

  navigateToCheckout = () => {
    this.router.navigate(['checkout']);
  };

  removeCartItem = (cartItemId: Number) => {
    this.cartService.removeCartItem(cartItemId);
  };


}
