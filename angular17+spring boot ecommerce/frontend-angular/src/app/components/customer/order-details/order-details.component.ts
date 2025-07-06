import { Component } from '@angular/core';
import { AppState } from '../../../Models/AppState';
import { Store, select } from '@ngrx/store';
import { OrderService } from '../../../state/Order/order.service';
import { ActivatedRoute } from '@angular/router';
import { AdressCardComponent } from '../adress-card/adress-card.component';
import { OrderCardComponent } from '../../../order-card/order-card.component';
import { OrderTrackerComponent } from '../order-tracker/order-tracker.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,
    AdressCardComponent,
    OrderCardComponent,
    OrderTrackerComponent,
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent {
  activeStep = 3;

  order: any = {};

  constructor(
    private store: Store<AppState>,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute
  ) {
    this.store.pipe(select((state) => state.order)).subscribe((order) => {
      this.order = order.order;
      console.log('order from state ', this.order);
    });
  }

  ngOnInit() {
    // this.orderService.getOrderById({orderId:this.activatedRoute.paramMap.ge})
    this.activatedRoute.paramMap.subscribe((params) => {
      const orderId = params.get('orderId');
      console.log('order id params ', orderId);
      if (orderId) this.orderService.getOrderById(orderId);
    });

    this.store.pipe(select((state) => state.order)).subscribe((order) => {
      this.order = order.order;
      if (order.order.orderStatus == 'PLACED') {
        this.activeStep = 1;
      } else if (order.order.orderStatus == 'CONFIRMED') {
        this.activeStep = 2;
      } else if (order.order.orderStatus == 'SHIPPED') {
        this.activeStep = 3;
      } else if (order.order.orderStatus == 'DELIVERED') {
        this.activeStep = 4;
      }
      console.log('order from state ', this.activeStep);
      this.steps = [
        { id: 0, title: 'PLACED', isCompleted: this.activeStep >= 1 },
        { id: 1, title: 'CONFIRMED', isCompleted: this.activeStep >= 2 },
        { id: 2, title: 'SHIPPED', isCompleted: this.activeStep >= 3 },
        { id: 3, title: 'Delivered', isCompleted: this.activeStep >= 4 },
      ];
    });
  }
  // orderStatus
  // "PLACED"
  steps: any;
}
