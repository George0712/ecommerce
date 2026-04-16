import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-modal.html',
  styleUrl: './auth-modal.css'
})
export class AuthModalComponent {
  authService = inject(AuthService);
  private fb = inject(FormBuilder);

  // 'login' | 'register'
  view = signal<'login' | 'register'>('login');
  
  loginForm: FormGroup;
  registerForm: FormGroup;

  errorMsg = signal<string | null>(null);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get isOpen() {
    return this.authService.isAuthModalOpen();
  }

  close() {
    this.authService.closeModal();
    this.resetForms();
  }

  toggleView() {
    this.errorMsg.set(null);
    this.view.set(this.view() === 'login' ? 'register' : 'login');
    this.loginForm.reset();
    this.registerForm.reset();
  }

  onLoginSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.loginForm.value;
    const success = this.authService.login(email, password);
    if (success) {
      this.close();
    } else {
      this.errorMsg.set('Credenciales inválidas o usuario no encontrado.');
    }
  }

  onRegisterSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const { name, email, password } = this.registerForm.value;
    const success = this.authService.register(name, email, password);
    if (success) {
      this.close();
    } else {
      this.errorMsg.set('El correo ya está en uso.');
    }
  }

  private resetForms() {
    this.loginForm.reset();
    this.registerForm.reset();
    this.errorMsg.set(null);
    this.view.set('login');
  }

  // Prevent closing when clicking inside the modal content
  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
