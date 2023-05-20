import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaningMonthComponent } from './planing-month.component';

describe('PlaningMonthComponent', () => {
  let component: PlaningMonthComponent;
  let fixture: ComponentFixture<PlaningMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaningMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaningMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
