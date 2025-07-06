import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PaymentService } from './payment.service';
import {
 
  createPaymentFailure,
  createPaymentRequest,
  createPaymentSuccess,
  updatePaymentFailure,
  updatePaymentRequest,
  updatePaymentSuccess
} from './Actions';

@Injectable()
export class PaymentEffects {
  createPayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPaymentRequest),
      mergeMap(({orderId}) =>
        this.paymentService.createPayment(orderId).pipe(
          map((response) => {console.log(
            "payment link",response);
           return createPaymentSuccess({ payload: response })}),
          catchError((error) => of(createPaymentFailure({ payload: error })))
        )
      )
    )
  );

  updatePayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePaymentRequest),
      mergeMap((action) =>
        this.paymentService.updatePayment(action.reqData).pipe(
          map((response) => updatePaymentSuccess({ payload: response })),
          catchError((error) => of(updatePaymentFailure({ payload: error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private paymentService: PaymentService) {}
}
