import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementMakeComponent } from './paiement-make.component';

describe('PaiementMakeComponent', () => {
  let component: PaiementMakeComponent;
  let fixture: ComponentFixture<PaiementMakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementMakeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaiementMakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
