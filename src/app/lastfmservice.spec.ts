import { TestBed } from '@angular/core/testing';

import { Lastfmservice } from './lastfmservice';

describe('Lastfmservice', () => {
  let service: Lastfmservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Lastfmservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
