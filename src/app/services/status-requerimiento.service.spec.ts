import { TestBed } from '@angular/core/testing';

import { StatusRequerimientoService } from './status-requerimiento.service';

describe('StatusRequerimientoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatusRequerimientoService = TestBed.get(StatusRequerimientoService);
    expect(service).toBeTruthy();
  });
});
