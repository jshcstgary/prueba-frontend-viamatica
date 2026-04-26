import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Module } from '../types/maintainer';
import { Response } from '../types/response';

@Injectable({
	providedIn: 'root',
})
export class ModuleService {
	private apiUrl = 'http://localhost:3000/modules';

	constructor(private http: HttpClient) { }

	getAll(): Observable<Response<Module[]>> {
		return this.http.get<Response<Module[]>>(this.apiUrl);
	}

	getById(id: string): Observable<Response<Module>> {
		return this.http.get<Response<Module>>(`${this.apiUrl}/${id}`);
	}

	create(module: Omit<Module, 'id'>): Observable<Module> {
		return this.http.post<Module>(this.apiUrl, module);
	}

	update(id: string, module: Partial<Module>): Observable<Module> {
		return this.http.patch<Module>(`${this.apiUrl}/${id}`, module);
	}

	delete(id: string): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
