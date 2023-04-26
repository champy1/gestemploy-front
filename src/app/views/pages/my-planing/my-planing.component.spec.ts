import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPlaningComponent } from './my-planing.component';

describe('MyPlaningComponent', () => {
  let component: MyPlaningComponent;
  let fixture: ComponentFixture<MyPlaningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPlaningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPlaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
