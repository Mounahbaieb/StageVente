import { TestBed } from '@angular/core/testing';

import { VendeursServiceService } from './vendeurs-service.service';

describe('VendeursServiceService', () => {
  let service: VendeursServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendeursServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
