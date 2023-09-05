import { TestBed } from '@angular/core/testing';

import { EthersProviderService } from './ethers-provider.service';

describe('EthProviderService', () => {
  let service: EthersProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EthersProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
