import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaningListComponent } from './planing-list.component';

describe('PlaningListComponent', () => {
  let component: PlaningListComponent;
  let fixture: ComponentFixture<PlaningListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaningListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaningListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
