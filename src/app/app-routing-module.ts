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
		path: 'maintainer',
		component: LayoutComponent,
		canActivate: [authGuard],
		children: [
			{
				path: '',
				loadChildren: () =>
					import('./maintainer/maintainer-module').then((m) => m.MaintainerModule),
			},
		],
	},
	{ path: '**', redirectTo: 'auth' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
