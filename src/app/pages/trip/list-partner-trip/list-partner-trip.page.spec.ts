import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPartnerTripPage } from './list-partner-trip.page';

describe('ListPartnerTripPage', () => {
  let component: ListPartnerTripPage;
  let fixture: ComponentFixture<ListPartnerTripPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListPartnerTripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
