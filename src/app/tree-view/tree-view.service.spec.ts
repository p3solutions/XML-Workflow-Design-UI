import { TestBed, inject } from '@angular/core/testing';

import { TreeViewService } from './tree-view.service';

describe('TreeViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeViewService]
    });
  });

  it('should be created', inject([TreeViewService], (service: TreeViewService) => {
    expect(service).toBeTruthy();
  }));
});
