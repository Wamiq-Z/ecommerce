import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import {
  createPaymentFailure,
  createPaymentRequest,
  createPaymentSuccess,
  updatePaymentFailure,
  updatePaymentRequest,
  updatePaymentSuccess,
} from './Actions';
import { BASE_API_URL } from '../../config/api';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private API_BASE_URL = BASE_API_URL; // Replace with your API base URL

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) {}

  createPayment(orderId: any) {
    console.log('create payment reqData ', orderId);
    const url = `${this.API_BASE_URL}/api/payments/${orderId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });
    return this.http
      .post(url, {}, { headers })
      .pipe(
        map((response: any) => {
          console.log(response)
          if (response.payment_link_url) {
            window.location.href = response.payment_link_url;
          }
          return createPaymentSuccess({ payload: response });
        }),
        catchError((error) => {
          console.log("error",error)
          return of(
            createPaymentFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  updatePayment(reqData: any) {
    console.log('update payment reqData ', reqData);
    const url = `${this.API_BASE_URL}/api/payments?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });
    return this.http
      .get(url, { headers })
      .pipe(
        map((response: any) => {
          return updatePaymentSuccess({ payload: response });
        }),
        catchError((error) => {
          const errorMessage = error.message;
          return of(
            updatePaymentFailure(
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
