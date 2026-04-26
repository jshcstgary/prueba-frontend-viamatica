import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Profile } from '../types/maintainer';
import { Response } from '../types/response';

@Injectable({
	providedIn: 'root',
})
export class ProfileService {
	private apiUrl = 'http://localhost:3000/profiles';

	constructor(private http: HttpClient) { }

	getAll(): Observable<Response<Profile[]>> {
		return this.http.get<Response<Profile[]>>(this.apiUrl);
	}

	getById(id: string): Observable<Response<Profile>> {
		return this.http.get<Response<Profile>>(`${this.apiUrl}/${id}`);
	}

	create(profile: Omit<Profile, 'id'>): Observable<Profile> {
		return this.http.post<Profile>(this.apiUrl, profile);
	}

	update(id: string, profile: Partial<Profile>): Observable<Profile> {
		return this.http.patch<Profile>(`${this.apiUrl}/${id}`, profile);
	}

	delete(id: string): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
