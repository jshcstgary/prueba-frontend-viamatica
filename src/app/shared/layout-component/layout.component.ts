import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Module } from '../../types/maintainer';
import { User } from '../../types/user';

@Component({
	selector: 'app-layout',
	standalone: false,
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
	user = signal<User | null>(null);
	allowedModules = signal<Module[]>([]);

	constructor(
		private authService: AuthService,
		private userService: UserService
	) {
		this.user.set(this.authService.user());
	}

	ngOnInit(): void {
		this.loadAllowedModules();
	}

	loadAllowedModules(): void {
		const currentUser = this.user;
		if (currentUser && (currentUser as any).id) {
			this.userService.getUserAllowedModules((currentUser as any).id).subscribe({
				next: (modules) => {
					this.allowedModules.set(modules);
				},
				error: (err) => {
					console.error('Error loading allowed modules', err);
				},
			});
		}
	}

	isModuleAllowed(moduleName: string): boolean {
		// Si no hay módulos cargados (o cargando), por defecto permitimos ver para evitar sidebar vacía en dev
		// Pero para una lógica real, filtraríamos estrictamente:
		if (this.allowedModules().length === 0) return true; 

		return this.allowedModules().some(
			(m) => m.name.toLowerCase() === moduleName.toLowerCase()
		);
	}

	logout(): void {
		this.authService.logout();
	}
}
