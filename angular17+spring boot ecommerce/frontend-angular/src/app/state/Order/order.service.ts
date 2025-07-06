import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, of } from 'rxjs';
import {
  confirmedOrderFailure,
  confirmedOrderSuccess,
  createOrderFailure,
  createOrderSuccess,
  deleteOrderFailure,
  deleteOrderSuccess,
  deliverOrderFailure,
  deliverOrderSuccess,
  getAllOrdersFailure,
  getAllOrdersSuccess,
  getOrderByIdSuccess,
  getOrderHistoryFailure,
  getOrderHistoryRequest,
  getOrderHistorySuccess,
  shipOrderFailure,
  shipOrderSuccess,
} from './Actions';
import { BASE_API_URL } from '../../config/api';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private API_BASE_URL = BASE_API_URL;
  private headers;

  constructor(
    private store: Store,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });
  }

  createOrder(reqData: any) {
    console.log('create order', reqData);
    const url = `${this.API_BASE_URL}/api/orders/`;

    return this.http
      .post(url, reqData, { headers: this.headers })
      .pipe(
        map((data: any) => {
          console.log('created order ', data);
          if (data.id) {
            this.router.navigate([`/checkout/payment/${data.id}`], {
              queryParams: { step: '3', order_id: data.id },
            });
          }
          console.log('created order -', data);
          return createOrderSuccess({ order: data });
        }),
        catchError((error: any) => {
          console.log('catch error:', error);
          return of(
            createOrderFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  getOrderById(orderId: string) {
    console.log('get order req', orderId);
    const url = `${this.API_BASE_URL}/api/orders/${orderId}`;

    return this.http
      .get(url, { headers: this.headers })
      .pipe(
        map((data: any) => {
          console.log('order by id', data);
          return getOrderByIdSuccess({ order: data });
        }),
        catchError((error: any) => {
          console.log('catch', error);
          return of(
            getOrderHistoryFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  getOrderHistory() {
    const url = `${this.API_BASE_URL}/api/orders/user`;

    this.store.dispatch(getOrderHistoryRequest());

    return this.http
      .get<any>(url, { headers: this.headers })
      .pipe(
        map((data) => {
          console.log('order history', data);
          return getOrderHistorySuccess({ orders: data });
        }),
        catchError((error: any) => {
          return of(
            getOrderHistoryFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  getAllOrders() {
    return this.http
      .get(`${this.API_BASE_URL}/api/admin/orders/`, { headers: this.headers })
      .pipe(
        map((data) => {
          console.log(' get all orders ', data);
          return getAllOrdersSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            getAllOrdersFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  confirmedOrder(orderId: Number) {
    return this.http
      .put(`${this.API_BASE_URL}/api/admin/orders/${orderId}/confirmed`,{}, {
        headers: this.headers,
      })
      .pipe(
        map((data) => {
          console.log('confirmed order ', data);
          return confirmedOrderSuccess({ payload: data });
        }),
        catchError((error) => {
          return of(
            confirmedOrderFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  shipOrder(orderId: Number) {
    return this.http
      .put(`${BASE_API_URL}/api/admin/orders/${orderId}/ship`,{}, {
        headers: this.headers,
      })
      .pipe(
        map((data) => {
          return shipOrderSuccess({ payload: data });
        }),
        catchError((error) => {
          return of(
            shipOrderFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  deliverOrder(orderId: Number) {
    return this.http
      .put(`${this.API_BASE_URL}/api/admin/orders/${orderId}/deliver`,{}, {
        headers: this.headers,
      })
      .pipe(
        map((data) => {
          return deliverOrderSuccess({ payload: data });
        }),
        catchError((error) => {
          return of(
            deliverOrderFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  deleteOrder(orderId: Number) {
    return this.http
      .put(`${this.API_BASE_URL}/api/admin/orders/${orderId}/delete`,{}, { headers: this.headers })
      .pipe(
        map((data) => {
          console.log(' get all orders ', data);
          return deleteOrderSuccess({payload:orderId})
        }),
        catchError((error: any) => {
          return of(
            deleteOrderFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
   
  }
}
