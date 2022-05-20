import { TestBed } from '@angular/core/testing';

import { UnAuthenticatedAdminGuard } from './un-authenticated-admin.guard';

describe('UnAuthenticatedAdminGuard', () => {
  let guard: UnAuthenticatedAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnAuthenticatedAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
