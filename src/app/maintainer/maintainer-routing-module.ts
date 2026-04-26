import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile-component/profile.component';
import { ModuleComponent } from './module-component/module.component';
import { OptionComponent } from './option-component/option.component';

const routes: Routes = [
	{ path: 'profiles', component: ProfileComponent },
	{ path: 'modules', component: ModuleComponent },
	{ path: 'options', component: OptionComponent },
	{ path: '', redirectTo: 'modules', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MaintainerRoutingModule {}
