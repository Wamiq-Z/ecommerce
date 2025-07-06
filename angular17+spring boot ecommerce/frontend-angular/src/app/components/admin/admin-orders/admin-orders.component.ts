import { Component } from '@angular/core';
import { OrderTableComponent } from '../order-table/order-table.component';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../Models/AppState';
import { OrderService } from '../../../state/Order/order.service';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [OrderTableComponent],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent {

  order: any;

  constructor(
    private store: Store<AppState>,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.orderService.getAllOrders();
    

    this.store.pipe(select((store) => store.order)).subscribe((order) => {
      this.order = order.orders;
      console.log("or ",order)
    });
  }


}
