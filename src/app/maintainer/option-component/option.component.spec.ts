import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionComponent } from './option.component';

describe('Option', () => {
	let component: OptionComponent;
	let fixture: ComponentFixture<OptionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [OptionComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(OptionComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
