import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPopup } from './list-popup';

describe('ListPopup', () => {
  let component: ListPopup;
  let fixture: ComponentFixture<ListPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPopup],
    }).compileComponents();

    fixture = TestBed.createComponent(ListPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
