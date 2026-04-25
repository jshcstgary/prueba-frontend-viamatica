import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

	constructor(private fb: FormBuilder) {
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
	}

	onLogin() {
		if (this.loginForm.valid) {
			console.log('Login data:', this.loginForm.value);
		}
	}

	onRegister() {
		if (this.registerForm.valid) {
			console.log('Register data:', this.registerForm.value);
		}
	}
}
