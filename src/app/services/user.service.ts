import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Response } from '../types/response';
import { Module } from '../types/maintainer';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private baseUrl = 'http://localhost:3000';

	constructor(private http: HttpClient) {}

	getUserAllowedModules(userId: string): Observable<Module[]> {
		// 1. Obtener el usuario para saber su profileId
		return this.http.get<any>(`${this.baseUrl}/users/${userId}`).pipe(
			switchMap((user) => {
				// 2. Obtener las opciones permitidas para ese perfil
				return this.http
					.get<any[]>(`${this.baseUrl}/profiles_options?profileId=${user.profileId}`)
					.pipe(
						switchMap((profileOptions) => {
							const optionIds = profileOptions.map((po) => po.optionId);
							if (optionIds.length === 0) return Array.of([]);

							// 3. Obtener los detalles de las opciones para sacar los módulos
							const optionRequests = optionIds.map((id) =>
								this.http.get<any>(`${this.baseUrl}/options/${id}`)
							);
							return forkJoin(optionRequests);
						}),
						switchMap((options: any[]) => {
							const moduleIds = [...new Set(options.map((o) => o.moduleId))];
							if (moduleIds.length === 0) return Array.of([]);

							// 4. Obtener los detalles de los módulos únicos
							const moduleRequests = moduleIds.map((id) =>
								this.http.get<Module>(`${this.baseUrl}/modules/${id}`)
							);
							return forkJoin(moduleRequests);
						})
					);
			}),
			map((modules) => modules.filter((m) => m.active))
		);
	}
}
