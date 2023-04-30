import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHeuresuppComponent } from './my-heuresupp.component';

describe('MyHeuresuppComponent', () => {
  let component: MyHeuresuppComponent;
  let fixture: ComponentFixture<MyHeuresuppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyHeuresuppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyHeuresuppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
