import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiusergeneratorPage } from './multiusergenerator.page';

describe('MultiusergeneratorPage', () => {
  let component: MultiusergeneratorPage;
  let fixture: ComponentFixture<MultiusergeneratorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MultiusergeneratorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
