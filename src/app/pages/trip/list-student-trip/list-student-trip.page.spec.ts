import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListStudentTripPage } from './list-student-trip.page';

describe('ListStudentTripPage', () => {
  let component: ListStudentTripPage;
  let fixture: ComponentFixture<ListStudentTripPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListStudentTripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
