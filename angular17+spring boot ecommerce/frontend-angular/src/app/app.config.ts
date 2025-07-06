import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { authReducer } from './state/Auth/auth.reducer';
import { productReducer } from './state/Product/product.reducer';
import { userReducer } from './state/User/Reducer';
import { cartReducer } from './state/Cart/cart.reducer';
import { orderReducer } from './state/Order/order.reducer';
import { reviewReducer } from './state/Review/review.reducer';
import { routers } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routers),
    provideAnimationsAsync(),
    provideStore({
      auth: authReducer,
      user: userReducer,
      product: productReducer,
      cart: cartReducer,
      order: orderReducer,
      review:reviewReducer
    }),
    provideHttpClient(),
  ],
};
