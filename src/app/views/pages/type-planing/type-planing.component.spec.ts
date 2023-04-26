import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePlaningComponent } from './type-planing.component';

describe('TypePlaningComponent', () => {
  let component: TypePlaningComponent;
  let fixture: ComponentFixture<TypePlaningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypePlaningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypePlaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
