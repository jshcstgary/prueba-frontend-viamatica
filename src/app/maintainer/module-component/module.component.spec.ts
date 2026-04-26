import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleComponent } from './module.component';

describe('Module', () => {
	let component: ModuleComponent;
	let fixture: ComponentFixture<ModuleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ModuleComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ModuleComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
