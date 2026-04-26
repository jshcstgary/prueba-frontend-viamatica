import { Component, OnInit, signal } from '@angular/core';
import { ModuleService } from '../../services/module.service';
import { Module } from '../../types/maintainer';

@Component({
	selector: 'app-module',
	standalone: false,
	templateUrl: './module.component.html',
	styleUrl: './module.component.css',
})
export class ModuleComponent implements OnInit {
	modules = signal<Module[]>([]);
	loading = signal<boolean>(true);

	constructor(private moduleService: ModuleService) { }

	ngOnInit(): void {
		this.loadModules();
	}

	loadModules(): void {
		this.loading.set(true);
		this.moduleService.getAll().subscribe({
			next: (response) => {
				this.modules.set(response.data);
				this.loading.set(false);
			},
			error: (err) => {
				console.error(err);
				this.loading.set(false);
			},
		});
	}
}
