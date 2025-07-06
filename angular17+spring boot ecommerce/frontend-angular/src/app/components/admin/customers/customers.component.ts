import { Component } from '@angular/core';
import { CustomerTableComponent } from '../customer-table/customer-table.component';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../Models/AppState';
import { UserService } from '../../../state/User/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule,CustomerTableComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

  customers:any

  constructor(private store:Store<AppState>, 
    
    private userService:UserService
    ){
    

  }

  ngOnInit(){

    this.userService.getAllCustomers();

    this.store.pipe(select(store=>store.user)).subscribe((user)=>{
      
      this.customers=user.customers
      console.log("store ---- ",user)
    })
  }

}
