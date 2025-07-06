import { Component, Input } from '@angular/core';
import { CartService } from '../../state/Cart/cart.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [MatIconModule,MatButtonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {

  @Input() product:any;
@Input() showButton:any;

constructor(private cartService:CartService){}

updateCartItem = (quantity: number) => {
  this.cartService.updateCartItem({
    cartItemId: this.product.id,
    data: { quantity: quantity + this.product.quantity },
  });
};

removeCartItem(){
  this.cartService.removeCartItem(this.product.id)
}


}
