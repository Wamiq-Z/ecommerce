import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../state/Auth/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, 
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  @Input() changeTemplate!: () => void;

  registrationForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private authService: AuthService
  ) {}

  submitForm(): void {
    if (this.registrationForm.valid) {
      console.log('register req data', this.registrationForm.value);
      this.authService.register(this.registrationForm.value)
    }
  }

}
