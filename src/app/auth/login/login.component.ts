import { Component } from '@angular/core';
//
import { AuthService } from '../auth.service'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  loginForm: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,

  ) {
    // Initialize the form with validation
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Getter for easy access to form controls
  get f() {
    return this.loginForm.controls;
  }

  // Handle form submission
  async onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password }: any = this.loginForm.value;

    // Access form values with ['email'] instead of .email
    await this.authService.login(email, password)
      .then(async () => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }

  // Navigate to signup page
  onSignup() {
    this.router.navigate(['/signup']);
  }
}