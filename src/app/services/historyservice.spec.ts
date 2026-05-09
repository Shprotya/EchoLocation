import { TestBed } from '@angular/core/testing';

import { HistoryserviceTs } from './historyservice.js';

describe('HistoryserviceTs', () => {
  let service: HistoryserviceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryserviceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
