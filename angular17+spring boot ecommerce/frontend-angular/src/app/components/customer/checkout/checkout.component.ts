import { Component } from '@angular/core';
import { AddressFormComponent } from '../address-form/address-form.component';
// import { AddressFormComponent } from '../address-form/address-form.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [AddressFormComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

}
