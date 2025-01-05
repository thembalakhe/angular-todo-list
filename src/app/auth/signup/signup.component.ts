import { Component } from '@angular/core';
//
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth, onAuthStateChanged} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    username: FormControl<string | null>;
  }>;

  private auth = getAuth();
  private db = getDatabase();

  username: string | null | undefined = null;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialize the form with validation
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  // Getter for easy access to form controls
  get f() {
    return this.signupForm.controls;
  }

  // Handle form submission
  onSignup() {
    if (this.signupForm.invalid) {
      return;
    }

    const { email, password, username } = this.signupForm.value;

    this.authService
      .signup(email as string, password as string)
      .then(() => {
        console.log('Account created successfully');
        
        onAuthStateChanged(this.auth, async (user) => {
          set(ref(this.db, 'users/' + user?.uid), {
            name: username,
            email: email,
          });
        });

        console.log('Name & Email Added!');

        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }

  // Navigate to login page
  onLogin() {
    this.router.navigate(['/login']);
  }
}
