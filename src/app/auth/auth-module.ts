import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing-module';
import { Auth } from './auth/auth';

@NgModule({
	declarations: [Auth],
	imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
})
export class AuthModule {}
