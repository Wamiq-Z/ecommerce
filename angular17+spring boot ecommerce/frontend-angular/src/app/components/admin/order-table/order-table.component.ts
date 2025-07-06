import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../Models/AppState';
import { OrderService } from '../../../state/Order/order.service';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order-table',
  standalone: true,
  imports: [CommonModule,MatMenuModule,MatTableModule,MatButtonModule],
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.css'
})
export class OrderTableComponent {
  @Input() order: any;

  constructor(
    private store: Store<AppState>,
    private orderService: OrderService
  ) {}

  ngOnInit() {
   
  }

  handleConfirmedOrder(orderId:Number){
    console.log("co",orderId)
    this.orderService.confirmedOrder(orderId)
  }
  handleShippedOrder(orderId:Number){
    this.orderService.shipOrder(orderId);
  }
  handleDeliverOrder(orderId:Number){
    this.orderService.deliverOrder(orderId)
  }
  handleDeleteOrder(orderId:Number){
    this.orderService.deleteOrder(orderId)
    console.log("dlete order ",orderId)
  }
  

  displayedColumns: string[] = [
    'imageUrl',
    'title',
    'price',
    'id',
    'status',
    'update',
    'delete',
  ];
}
