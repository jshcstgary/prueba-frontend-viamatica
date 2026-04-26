import { Component, OnInit, signal } from '@angular/core';
import { OptionService } from '../../services/option.service';
import { Option } from '../../types/maintainer';

@Component({
	selector: 'app-option',
	standalone: false,
	templateUrl: './option.component.html',
	styleUrl: './option.component.css',
})
export class OptionComponent implements OnInit {
	options = signal<Option[]>([]);
	loading = signal<boolean>(true);

	constructor(private optionService: OptionService) { }

	ngOnInit(): void {
		this.loadOptions();
	}

	loadOptions(): void {
		this.loading.set(true);
		this.optionService.getAll().subscribe({
			next: (response) => {
				this.options.set(response.data);
				this.loading.set(false);
			},
			error: (err) => {
				console.error(err);
				this.loading.set(false);
			},
		});
	}
}
