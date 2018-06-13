import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinitionStepComponent } from './definition-step.component';

describe('DefinitionStepComponent', () => {
  let component: DefinitionStepComponent;
  let fixture: ComponentFixture<DefinitionStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinitionStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinitionStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
