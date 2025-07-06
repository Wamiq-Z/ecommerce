import { createAction, props } from '@ngrx/store';

export const createOrderRequest = createAction(
  '[Order] Create Order Request',
  props<{ reqData: any }>()
);
export const createOrderSuccess = createAction(
  '[Order] Create Order Success',
  props<{ order: any }>()
);
export const createOrderFailure = createAction(
  '[Order] Create Order Failure',
  props<{ error: any }>()
);

export const getOrderByIdRequest = createAction(
  '[Order] Get Order By Id Request',
  props<{ orderId: string }>()
);
export const getOrderByIdSuccess = createAction(
  '[Order] Get Order By Id Success',
  props<{ order: any }>()
);
export const getOrderByIdFailure = createAction(
  '[Order] Get Order By Id Failure',
  props<{ error: any }>()
);

export const getOrderHistoryRequest = createAction(
  '[Order] Get Order History Request'
);
export const getOrderHistorySuccess = createAction(
  '[Order] Get Order History Success',
  props<{ orders: any }>()
);
export const getOrderHistoryFailure = createAction(
  '[Order] Get Order History Failure',
  props<{ error: any }>()
);

export const getAllOrdersRequest=createAction(
    '[Order] Get All Orders Request'
);
export const getAllOrdersSuccess=createAction(
    '[Order] Get All Orders Success',
    props<{payload:any}>()
);
export const getAllOrdersFailure=createAction(
    '[Order] Get All Orders Failure',
    props<{error:any}>()
)

export const confirmedOrderRequest=createAction(
    '[Order] Confirmed Order Request'
)

export const confirmedOrderSuccess=createAction(
    '[Order] Confirmed Order Success',
    props<{payload:any}>()
)

export const confirmedOrderFailure=createAction(
    '[Order] Confirmed Order Failure',
    props<{error:any}>()
)

export const placeOrderRequest=createAction(
    '[Order] Place Order Request'
)

export const placeOrderSuccess=createAction(
    '[Order] Place Order Success',
    props<{payload:any}>()
)

export const placeOrderFailure=createAction(
    '[Order] Place Order Failure',
    props<{error:any}>()
)

export const shipOrderRequest=createAction(
    '[Order] Ship Order Request'
)

export const shipOrderSuccess=createAction(
    '[Order] Ship Order Success',
    props<{payload:any}>()
)

export const shipOrderFailure=createAction(
    '[Order] Ship Order Failure',
    props<{error:any}>()
)

export const deliverOrderRequest=createAction(
    '[Order] Deliver Order Request'
)

export const deliverOrderSuccess=createAction(
    '[Order] Deliver Order Success',
    props<{payload:any}>()
)

export const deliverOrderFailure=createAction(
    '[Order] Deliver Order Failure',
    props<{error:any}>()
)

export const deleteOrderRequest=createAction(
    '[Order] Delete Order Request'
)

export const deleteOrderSuccess=createAction(
    '[Order] Delete Order Success',
    props<{payload:any}>()
)

export const deleteOrderFailure=createAction(
    '[Order] Delete Order Failure',
    props<{error:any}>()
)
