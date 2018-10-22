import { TestBed, inject } from '@angular/core/testing';

import { CommonFnService } from './common-fn.service';

describe('CommonFnService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonFnService]
    });
  });

  it('should be created', inject([CommonFnService], (service: CommonFnService) => {
    expect(service).toBeTruthy();
  }));
});
