import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/customer/products/products.component';
import { DemoComponent } from './components/demo/demo.component';
import { ProductDetailsComponent } from './components/customer/product-details/product-details.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/customer/checkout/checkout.component';
import { PaymentComponent } from './components/customer/payment/payment.component';
import { PaymentSuccessComponent } from './components/customer/payment-success/payment-success.component';
import { OrderComponent } from './components/customer/order/order.component';
import { OrderDetailsComponent } from './components/customer/order-details/order-details.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { OrderTableComponent } from './components/admin/order-table/order-table.component';
import { CustomersComponent } from './components/admin/customers/customers.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';

export const routers: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: DemoComponent },
    {path:'cart',component:CartComponent},
    {path:'product-details/:id',component:ProductDetailsComponent},
    {path:'checkout',component:CheckoutComponent},
    {path:'checkout/payment/:id',component:PaymentComponent},
    {path:'payment-success',component:PaymentSuccessComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
  { path: ':lavelOne/:lavelTwo/:lavelThree', component: ProductsComponent },
    { path: 'account/orders', component: OrderComponent },
    { path: 'order/:orderId', component: OrderDetailsComponent },
    {path: 'admin',component:AdminComponent,children:[
      {path:"",component:DashboardComponent},
      {path:"orders",component:AdminOrdersComponent},
      {path:"products",component:AdminProductsComponent},
      {path:"customers",component:CustomersComponent},
      {path:"add-products",component:AddProductComponent}
    ]}
  //   {path: 'admin',loadChildren:()=>import("./Module/admin/admin-routing.module").then(m=>m.AdminRoutingModule)}
];
