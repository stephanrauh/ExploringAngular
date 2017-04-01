import {inject, TestBed} from "@angular/core/testing";

import {EngineService} from "./engine.service";

describe('EngineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EngineService]
    });
  });

  it('should ...', inject([EngineService], (service: EngineService) => {
    expect(service).toBeTruthy();
  }));
});
