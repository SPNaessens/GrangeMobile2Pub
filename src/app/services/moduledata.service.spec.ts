import { TestBed } from '@angular/core/testing';

import { ModuledataService } from './moduledata.service';

describe('ModuledataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModuledataService = TestBed.get(ModuledataService);
    expect(service).toBeTruthy();
  });
});
