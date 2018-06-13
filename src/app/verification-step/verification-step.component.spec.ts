import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationStepComponent } from './verification-step.component';

describe('VerificationStepComponent', () => {
  let component: VerificationStepComponent;
  let fixture: ComponentFixture<VerificationStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
