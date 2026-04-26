import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-layout',
	standalone: false,
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.css',
})
export class LayoutComponent {
	user: any;

	constructor(private authService: AuthService) {
		this.user = this.authService.user;
	}

	logout(): void {
		this.authService.logout();
	}
}
