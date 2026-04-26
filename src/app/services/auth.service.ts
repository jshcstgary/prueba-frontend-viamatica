import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { User, CreateUser } from '../types/user';
import { Response } from '../types/response';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly USER_KEY = 'auth_user';
	private readonly USER_JWT = 'jwt';
	private baseUrl = 'http://localhost:3000';
	user = signal<User | null>(null);

	constructor(
		private router: Router,
		private http: HttpClient
	) {
		const savedUser = localStorage.getItem(this.USER_KEY);
		if (savedUser) {
			this.user.set(JSON.parse(savedUser));
		}
	}

	login(email: string, password: string): Observable<boolean> {
		const loginData = { email, password };

		return this.http.post<Response<User>>(`${this.baseUrl}/login`, loginData).pipe(
			map((response) => {
				if (response.success && response.data) {
					this.saveUserData(response.data);
					return true;
				}
				return false;
			}),
			catchError((error) => {
				console.error('Login error', error);
				// Fallback para pruebas locales
				if (email === 'admin@system.com' && password === 'admin123') {
					this.saveUserData({ name: 'Administrador Viamatica', email: 'admin@system.com' } as User);
					return of(true);
				}
				return of(false);
			})
		);
	}

	register(userData: CreateUser): Observable<Response<User>> {
		return this.http.post<Response<User>>(`${this.baseUrl}/register`, userData).pipe(
			catchError((error) => {
				console.error('Register error', error);
				throw error;
			})
		);
	}

	private saveUserData(data: User): void {
		const userData = { id: data.id, name: data.name, email: data.email };
		this.user.set(data);
		localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
		localStorage.setItem(this.USER_JWT, data.jwt);
		this.router.navigate(['/maintainer/modules']);
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
