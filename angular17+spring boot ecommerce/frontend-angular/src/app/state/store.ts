import { ActionReducerMap } from "@ngrx/store";
import { AuthState, authReducer } from "./Auth/auth.reducer";
import { CartState, cartReducer } from "./Cart/cart.reducer";
import { OrderState, orderReducer } from "./Order/order.reducer";
import { ProductState, productReducer } from "./Product/product.reducer";
import { ReviewState, reviewReducer } from "./Review/review.reducer";
import { UserState, userReducer } from "./User/Reducer";


export interface AppState {
  auth: AuthState;
  user: UserState;
  product: ProductState;
  cart: CartState;
  order: OrderState;
  review: ReviewState;
  // ... other feature states
}

export const rootReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
  order: orderReducer,
  review: reviewReducer,
  // ... other feature reducers
};