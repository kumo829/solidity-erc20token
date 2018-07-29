import { TestBed, inject } from '@angular/core/testing';

import { StandardTokenService } from './standard-token.service';

describe('StandardTokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StandardTokenService]
    });
  });

  it('should be created', inject([StandardTokenService], (service: StandardTokenService) => {
    expect(service).toBeTruthy();
  }));
});
