import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../state/Auth/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { UserService } from '../../../state/User/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, 
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @Input()
  changeTemplate!: () => void;

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private authService: AuthService,
    private userService: UserService
  ) {}

  submitForm(): void {
    if (this.loginForm.valid) {
      console.log('login req data', this.loginForm.value);
      // this.store.dispatch(login(this.loginForm.value));
      this.authService.login(this.loginForm.value)
      
    }
  }
}
