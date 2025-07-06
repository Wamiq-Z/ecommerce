import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, of } from 'rxjs';
import { BASE_API_URL } from 'src/app/config/api';
import { createReviewFailure, createReviewSuccess, findReviewByProductIdFailure, findReviewByProductIdSuccess } from './Action';
import { findProductByIdFailure, createProductSuccess, createProductFailure } from '../Product/Actions';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  API_BASE_URL = BASE_API_URL;
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt'); // Get JWT token from localStorage

    // Set headers with the JWT token
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  constructor(
    private store: Store,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  findReviewByProductId(productId: any) {
    const headers = this.getHeaders();
    return this.http
      .get(`${this.API_BASE_URL}/api/reviews/product/${productId}`, { headers })
      .pipe(
        map((data: any) => findReviewByProductIdSuccess({payload: data})),
        catchError((error: any) => {
          return of(
            findReviewByProductIdFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  createReview(reqData: any) {
    const headers = this.getHeaders();
    return this.http
      .post(`${this.API_BASE_URL}/api/reviews/create`, reqData, {
        headers,
      })
      .pipe(
        map((data: any) => {
          console.log(' created product ', data);
          return createReviewSuccess({payload:data})
        }),
        catchError((error: any) => {
          return of(
            createReviewFailure(
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
