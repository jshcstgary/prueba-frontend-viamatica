import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AdminLayoutComponent', () => {
	let component: LayoutComponent;
	let fixture: ComponentFixture<LayoutComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LayoutComponent],
			imports: [RouterModule.forRoot([])],
			providers: [provideHttpClient(), provideHttpClientTesting()],
		}).compileComponents();

		fixture = TestBed.createComponent(LayoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
