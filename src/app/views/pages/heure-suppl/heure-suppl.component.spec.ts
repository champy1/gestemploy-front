import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeureSupplComponent } from './heure-suppl.component';

describe('HeureSupplComponent', () => {
  let component: HeureSupplComponent;
  let fixture: ComponentFixture<HeureSupplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeureSupplComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeureSupplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
