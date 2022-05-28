import { TestBed } from '@angular/core/testing';

import { GeoListService } from './geo-list.service';

describe('GeoListService', () => {
  let service: GeoListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
