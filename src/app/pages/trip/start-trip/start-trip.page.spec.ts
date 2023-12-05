import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartTripPage } from './start-trip.page';

describe('StartTripPage', () => {
  let component: StartTripPage;
  let fixture: ComponentFixture<StartTripPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StartTripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
