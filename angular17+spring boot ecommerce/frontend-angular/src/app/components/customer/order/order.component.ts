import { Component } from '@angular/core';
import { OrderService } from '../../../state/Order/order.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../Models/AppState';
import { MatCheckbox } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { OrderCardComponent } from '../../../order-card/order-card.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule,MatCheckbox,OrderCardComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  orders: any;
  orderFilter = [
    { value: 'on_the_way', label: 'On The Way' },
    { value: 'deliverd', label: 'Deliverd' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'returned', label: 'Returned' },
  ];

  constructor(
    private orderService: OrderService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.orderService.getOrderHistory();

    this.store
      .pipe(select((store: AppState) => store.order))
      .subscribe((order) => {
        this.orders = order.orders;
        console.log('state ------------ ', this.orders);
      });
  }

  navigateToOrderDetail = (path: string) => {
    this.router.navigate([path]);
  };
}
