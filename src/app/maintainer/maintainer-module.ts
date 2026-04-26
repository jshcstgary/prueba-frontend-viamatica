import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintainerRoutingModule } from './maintainer-routing-module';
import { ProfileComponent } from './profile-component/profile.component';
import { ModuleComponent } from './module-component/module.component';
import { OptionComponent } from './option-component/option.component';
import { SharedModule } from '../shared/shared-module';

@NgModule({
	declarations: [ProfileComponent, ModuleComponent, OptionComponent],
	imports: [CommonModule, MaintainerRoutingModule, SharedModule],
})
export class MaintainerModule {}
