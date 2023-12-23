import { TestBed } from '@angular/core/testing';

import { StudentcreateService } from './studentcreate.service';

describe('StudentcreateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentcreateService = TestBed.get(StudentcreateService);
    expect(service).toBeTruthy();
  });
});
