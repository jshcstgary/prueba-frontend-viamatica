import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.html',
	styleUrl: './auth.css',
	standalone: false,
})
export class Auth {
	loginForm: FormGroup;
	registerForm: FormGroup;
	showLogin = true;
	error = '';

	constructor(
		private fb: FormBuilder,
		private authService: AuthService
	) {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
		});

		this.registerForm = this.fb.group({
			name: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			confirmPassword: ['', Validators.required],
		});
	}

	toggleForm() {
		this.showLogin = !this.showLogin;
		this.error = '';
	}

	onLogin() {
		if (this.loginForm.valid) {
			const { email, password } = this.loginForm.value;
			const success = this.authService.login(email, password);
			if (!success) {
				this.error = 'Credenciales inválidas. Usa admin@viamatica.com / admin123';
			}
		}
	}

	onRegister() {
		if (this.registerForm.valid) {
			console.log('Register data:', this.registerForm.value);
		}
	}
}
