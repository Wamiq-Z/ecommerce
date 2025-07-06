import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../../Models/AppState';
import { Store } from '@ngrx/store';
import { OrderService } from '../../../state/Order/order.service';
import { Observable } from 'rxjs';
import { PaymentService } from '../../../state/Payment/payment.service';
import { getOrderByIdRequest } from '../../../state/Order/Actions';
import { MatDividerModule } from '@angular/material/divider';
import { CartItemComponent } from '../../cart-item/cart-item.component';
import { AdressCardComponent } from '../adress-card/adress-card.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    CartItemComponent,
    AdressCardComponent,

  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  order$!: Observable<any>;

  products = [1, 1, 1];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private orderService: OrderService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.orderService.getOrderById(id);
      this.store.dispatch(getOrderByIdRequest({ orderId: id }));
    }
    this.order$ = this.store.select((store) => store.order.order);
    this.order$.subscribe((order) => console.log('order from store - ', order));
  }

  redirectToPaymentPage = () => {
    this.order$.subscribe((order) => {
      console.log('redirect --- ');
      // this.store.dispatch(createPaymentRequest({ orderId: order.id }));
      this.paymentService.createPayment(order.id);
    });
  };
}
