import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly USER_KEY = 'auth_user';
	user = signal<{ name: string } | null>(null);

	constructor(private router: Router) {
		const savedUser = localStorage.getItem(this.USER_KEY);
		if (savedUser) {
			this.user.set(JSON.parse(savedUser));
		}
	}

	login(email: string, password: string): boolean {
		// Hardcoded "burned" data
		if (email === 'admin@viamatica.com' && password === 'admin123') {
			const userData = { name: 'Administrador Viamatica' };
			this.user.set(userData);
			localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
			this.router.navigate(['/maintainer/modules']);
			return true;
		}
		return false;
	}

	logout(): void {
		this.user.set(null);
		localStorage.removeItem(this.USER_KEY);
		this.router.navigate(['/auth']);
	}

	isAuthenticated(): boolean {
		return this.user() !== null || localStorage.getItem(this.USER_KEY) !== null;
	}
}
