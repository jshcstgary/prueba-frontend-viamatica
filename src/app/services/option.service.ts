import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Option } from '../types/maintainer';
import { Response } from '../types/response';

@Injectable({
	providedIn: 'root',
})
export class OptionService {
	private apiUrl = 'http://localhost:3000/options';

	constructor(private http: HttpClient) { }

	getAll(): Observable<Response<Option[]>> {
		return this.http.get<Response<Option[]>>(this.apiUrl);
	}

	getById(id: string): Observable<Response<Option>> {
		return this.http.get<Response<Option>>(`${this.apiUrl}/${id}`);
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
