import { createReducer, on, Action } from '@ngrx/store';
import * as OrderActions from './Actions';

export interface OrderState {
  loading: boolean;
  error: string | null;
  order: any | null;
  orders: any[];
}

export const initialState: OrderState = {
  loading: false,
  error: null,
  order: null,
  orders: [],
};

export const orderReducer = createReducer(
  initialState,
  on(OrderActions.createOrderRequest, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(OrderActions.createOrderSuccess, (state, { order }) => ({
    ...state,
    loading: false,
    order,
  })),
  on(OrderActions.createOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(OrderActions.getOrderByIdRequest, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(OrderActions.getOrderByIdSuccess, (state, { order }) => ({
    ...state,
    loading: false,
    order,
  })),
  on(OrderActions.getOrderByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(OrderActions.getOrderHistoryRequest, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(OrderActions.getOrderHistorySuccess, (state, { orders }) => ({
    ...state,
    loading: false,
    orders,
  })),
  on(OrderActions.getOrderHistoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(OrderActions.getAllOrdersSuccess,(state,{payload})=>({
    ...state,
    loading:false,
    orders:payload,
  })),

  on(OrderActions.confirmedOrderSuccess,
    OrderActions.shipOrderSuccess,
    OrderActions.deliverOrderSuccess,
    (state,{payload})=>({
    ...state,
    orders:state.orders.map((order)=>order.id===payload.id?payload:order),
    loading:false,
  })),
  on(OrderActions.deleteOrderSuccess,(state,{payload})=>({
    ...state,
    orders:state.orders.filter((order)=>order.id!==payload),
    loading:false
  }))

  // on(bookSeatsSuccess,(state,{bookedSeats})=>({...state,bookedSeats,loading:false, error:null})),
);
