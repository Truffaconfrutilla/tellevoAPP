import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AskTripPage } from './ask-trip.page';

describe('AskTripPage', () => {
  let component: AskTripPage;
  let fixture: ComponentFixture<AskTripPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AskTripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
