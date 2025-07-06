import { Component } from '@angular/core';
import { AppState } from '../../../Models/AppState';
import { Store, select } from '@ngrx/store';
import { ProductService } from '../../../state/Product/product.service';
import { OrderService } from '../../../state/Order/order.service';
import { UserService } from '../../../state/User/user.service';
import { OrderTableComponent } from '../order-table/order-table.component';
import { CommonModule } from '@angular/common';
import { CustomerTableComponent } from '../customer-table/customer-table.component';
import { ProductTableComponent } from '../product-table/product-table.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    OrderTableComponent,
    CustomerTableComponent,
    ProductTableComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  recentProducts: any;
  recentOrders: any;
  customers: any;

  constructor(
    private store: Store<AppState>,
    private productService: ProductService,
    private orderService: OrderService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.productService.findRecentllyAddedProduct();
    this.orderService.getAllOrders();
    this.userService.getAllCustomers();

    this.store.pipe(select((store) => store)).subscribe((store) => {
      this.recentProducts = store.product.recent;
      this.recentOrders = store.order.orders.slice(0, 10);
      this.customers = store.user.customers.slice(0, 10);
      console.log('store ---- ', store);
    });
  }

  displayedColumns: string[] = [
    'imageUrl',
    'title',
    'category',
    'discountedPrice',
    'quantity',
    'delete',
  ];
}
