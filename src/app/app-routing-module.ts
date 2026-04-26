import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout-component/layout.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth-module').then((m) => m.AuthModule),
	},
	{
		path: '',
		component: LayoutComponent,
		canActivate: [authGuard],
		children: [
			{
				path: 'maintainer',
				loadChildren: () =>
					import('./maintainer/maintainer-module').then((m) => m.MaintainerModule),
			},
			{
				path: 'tickets',
				loadChildren: () =>
					import('./tickets/tickets-module').then((m) => m.TicketsModule),
			},
			{ path: '', redirectTo: 'maintainer', pathMatch: 'full' },
		],
	},
	{ path: '**', redirectTo: 'auth' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
