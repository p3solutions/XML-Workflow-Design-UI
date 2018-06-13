import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLandingPageComponent } from './base-landing-page.component';

describe('BaseLandingPageComponent', () => {
  let component: BaseLandingPageComponent;
  let fixture: ComponentFixture<BaseLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
