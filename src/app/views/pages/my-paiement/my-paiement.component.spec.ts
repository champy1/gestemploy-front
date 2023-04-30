import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPaiementComponent } from './my-paiement.component';

describe('MyPaiementComponent', () => {
  let component: MyPaiementComponent;
  let fixture: ComponentFixture<MyPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPaiementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
