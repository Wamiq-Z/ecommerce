import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../state/Order/order.service';
import { AppState } from '../../../Models/AppState';
import { Store, select } from '@ngrx/store';
import { PaymentService } from '../../../state/Payment/payment.service';
import { AdressCardComponent } from '../adress-card/adress-card.component';
import { MatDividerModule } from '@angular/material/divider';
import { OrderTrackerComponent } from '../order-tracker/order-tracker.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [
    CommonModule,
    AdressCardComponent,
    OrderTrackerComponent,
    MatDividerModule,
  ],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css',
})
export class PaymentSuccessComponent {
  activeStep = 2;

  order_id: any;
  razorpay_payment_id: any;
  order: any;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private store: Store<AppState>,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.order_id = params['order_id'];
      this.razorpay_payment_id = params['razorpay_payment_id'];
    });

    this.orderService.getOrderById(this.order_id);
    const reqData = {
      orderId: this.order_id,
      paymentId: this.razorpay_payment_id,
    };
    this.paymentService.updatePayment(reqData);

    this.store.pipe(select((store) => store.order)).subscribe((order) => {
      this.order = order.order;
      console.log('order ', order.order);
    });
  }

  steps = [
    { title: 'Placed', isCompleted: this.activeStep >= 1 },
    { title: 'Confirmed', isCompleted: this.activeStep >= 2 },
    { title: 'Shipped', isCompleted: this.activeStep >= 3 },
    { title: 'Delivered', isCompleted: this.activeStep >= 4 },
  ];
}
