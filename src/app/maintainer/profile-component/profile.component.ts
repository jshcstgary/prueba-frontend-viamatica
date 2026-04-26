import { Component, OnInit, signal } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../types/maintainer';

@Component({
	selector: 'app-profile',
	standalone: false,
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
	profiles = signal<Profile[]>([]);
	loading = signal<boolean>(true);

	constructor(private profileService: ProfileService) { }

	ngOnInit(): void {
		this.loadProfiles();
	}

	loadProfiles(): void {
		this.loading.set(true);
		this.profileService.getAll().subscribe({
			next: (response) => {
				this.profiles.set(response.data);
				this.loading.set(false);
			},
			error: (err) => {
				console.error(err);
				this.loading.set(false);
			},
		});
	}
}
