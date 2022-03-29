import { TestBed } from '@angular/core/testing';

import { NetworkHttpService } from './network-http.service';

describe('NetworkHttpService', () => {
  let service: NetworkHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
