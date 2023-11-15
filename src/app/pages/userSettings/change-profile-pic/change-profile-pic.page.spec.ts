import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeProfilePicPage } from './change-profile-pic.page';

describe('ChangeProfilePicPage', () => {
  let component: ChangeProfilePicPage;
  let fixture: ComponentFixture<ChangeProfilePicPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChangeProfilePicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
