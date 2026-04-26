import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Response } from '../types/response';
import { Ticket } from '../types/ticket';

@Injectable({
	providedIn: 'root',
})
export class TicketService {
	private apiUrl = 'http://localhost:3000/tickets';

	constructor(private http: HttpClient) {}

	getAll(): Observable<Response<Ticket[]>> {
		return this.http.get<Response<Ticket[]>>(this.apiUrl);
	}

	getById(id: string): Observable<Response<Ticket>> {
		return this.http.get<Response<Ticket>>(`${this.apiUrl}/${id}`);
	}

	create(ticket: Omit<Ticket, 'id'>): Observable<Ticket> {
		return this.http.post<Ticket>(this.apiUrl, ticket);
	}

	update(id: string, ticket: Partial<Ticket>): Observable<Ticket> {
		return this.http.patch<Ticket>(`${this.apiUrl}/${id}`, ticket);
	}

	delete(id: string): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
