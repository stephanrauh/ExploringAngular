import { TestBed, inject } from '@angular/core/testing';

import { HistoryService } from './history.service';

describe('HistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoryService]
    });
  });

  it('should ...', inject([HistoryService], (service: HistoryService) => {
    expect(service).toBeTruthy();
  }));
});
