import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketComponent } from './ticket.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TicketService } from '../../services/ticket.service';
import { CommonModule } from '@angular/common';

describe('TicketComponent', () => {
	let component: TicketComponent;
	let fixture: ComponentFixture<TicketComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TicketComponent],
			imports: [CommonModule],
			providers: [TicketService, provideHttpClient(), provideHttpClientTesting()],
		}).compileComponents();

		fixture = TestBed.createComponent(TicketComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
