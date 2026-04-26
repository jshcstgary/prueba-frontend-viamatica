import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Option, Response } from '../types/maintainer';

@Injectable({
	providedIn: 'root',
})
export class OptionService {
	private apiUrl = 'http://localhost:3000/options';

	constructor(private http: HttpClient) { }

	getAll(): Observable<Response<Option[]>> {
		// return this.http.get<Response<Option[]>>(this.apiUrl);

		// This is only to use json-server
		return this.http.get<Option[]>(this.apiUrl).pipe(
			map((data) => ({
				success: 'success',
				data,
			})),
		);
	}

	getById(id: string): Observable<Response<Option>> {
		// return this.http.get<Response<Option>>(`${this.apiUrl}/${id}`);

		// This is only to use json-server
		return this.http.get<Option>(this.apiUrl).pipe(
			map((data) => ({
				success: 'success',
				data,
			})),
		);
	}

	create(option: Omit<Option, 'id'>): Observable<Option> {
		return this.http.post<Option>(this.apiUrl, option);
	}

	update(id: string, option: Partial<Option>): Observable<Option> {
		return this.http.patch<Option>(`${this.apiUrl}/${id}`, option);
	}

	delete(id: string): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
