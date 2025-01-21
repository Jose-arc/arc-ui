import { TestBed } from '@angular/core/testing';

import { ArcSdkService } from './arc-sdk.service';

describe('ArcSdkService', () => {
  let service: ArcSdkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArcSdkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
