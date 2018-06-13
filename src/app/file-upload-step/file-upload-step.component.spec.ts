import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadStepComponent } from './file-upload-step.component';

describe('FileUploadStepComponent', () => {
  let component: FileUploadStepComponent;
  let fixture: ComponentFixture<FileUploadStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
