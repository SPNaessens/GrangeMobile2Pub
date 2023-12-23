import { TestBed } from '@angular/core/testing';

import { LecturerdataService } from './lecturerdata.service';

describe('LecturerdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LecturerdataService = TestBed.get(LecturerdataService);
    expect(service).toBeTruthy();
  });
});
