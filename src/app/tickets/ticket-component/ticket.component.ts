import { Component, OnInit, signal } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../types/ticket';

@Component({
	selector: 'app-ticket',
	standalone: false,
	templateUrl: './ticket.component.html',
	styleUrl: './ticket.component.css',
})
export class TicketComponent implements OnInit {
	tickets = signal<Ticket[]>([]);
	loading = signal<boolean>(true);

	constructor(private ticketService: TicketService) {}

	ngOnInit(): void {
		this.loadTickets();
	}

	loadTickets(): void {
		this.loading.set(true);
		this.ticketService.getAll().subscribe({
			next: (response) => {
				this.tickets.set(response.data);
				this.loading.set(false);
			},
			error: (err) => {
				console.error(err);
				this.loading.set(false);
			},
		});
	}

	getStatusClass(status: string): string {
		switch (status) {
			case 'OPEN':
				return 'bg-blue-100 text-blue-700';
			case 'IN_PROGRESS':
				return 'bg-yellow-100 text-yellow-700';
			case 'RESOLVED':
				return 'bg-green-100 text-green-700';
			case 'REJECTED':
				return 'bg-red-100 text-red-700';
			default:
				return 'bg-gray-100 text-gray-700';
		}
	}
}
