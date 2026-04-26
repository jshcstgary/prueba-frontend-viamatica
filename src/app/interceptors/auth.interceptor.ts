import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const jwt = localStorage.getItem('jwt');

	// Excluir rutas de autenticación
	const isAuthRoute = req.url.includes('/login') || req.url.includes('/register');

	if (jwt && !isAuthRoute) {
		const clonedReq = req.clone({
			setHeaders: {
				Authorization: `Bearer ${jwt}`,
			},
		});
		return next(clonedReq);
	}

	return next(req);
};
