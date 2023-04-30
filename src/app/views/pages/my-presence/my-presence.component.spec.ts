import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPresenceComponent } from './my-presence.component';

describe('MyPresenceComponent', () => {
  let component: MyPresenceComponent;
  let fixture: ComponentFixture<MyPresenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPresenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
