import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
	successMessage = '';
	isSubmitting = signal<boolean>(false);

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router
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
		this.successMessage = '';
	}

	onLogin() {
		if (this.loginForm.valid) {
			this.isSubmitting.set(true);
			this.error = '';
			const { email, password } = this.loginForm.value;

			this.authService.login(email, password).subscribe({
				next: (success) => {
					this.isSubmitting.set(false);
					this.router.navigate(['/maintainer/modules']);
					if (!success) {
						this.error = 'Credenciales inválidas.';
					}
				},
				error: (err) => {
					this.isSubmitting.set(false);
					this.error = 'Ocurrió un error en el servidor.';
				},
			});
		}
	}

	onRegister() {
		if (this.registerForm.valid) {
			const { password, confirmPassword } = this.registerForm.value;

			if (password !== confirmPassword) {
				this.error = 'Las contraseñas no coinciden.';
				return;
			}

			this.isSubmitting.set(true);
			this.error = '';
			this.successMessage = '';

			const { name, email } = this.registerForm.value;
			this.authService.register({ name, email, password }).subscribe({
				next: (response) => {
					this.isSubmitting.set(false);
					this.successMessage = 'Usuario registrado con éxito. Ahora puedes iniciar sesión.';
					this.showLogin = true;
					this.registerForm.reset();
				},
				error: (err) => {
					this.isSubmitting.set(false);
					this.error = 'Error al registrar el usuario. Inténtalo de nuevo.';
				},
			});
		}
	}
}
