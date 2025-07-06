import { Component } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from '../../state/Auth/auth.reducer';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RegisterComponent,LoginComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoggedIn=true;

 
  changeTemplate=()=>{
    this.isLoggedIn=!this.isLoggedIn;
  }


}
