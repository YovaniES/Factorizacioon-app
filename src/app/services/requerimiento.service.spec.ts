import { TestBed } from '@angular/core/testing';

import { RequerimientoService } from './requerimiento.service';

describe('RequerimientoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequerimientoService = TestBed.get(RequerimientoService);
    expect(service).toBeTruthy();
  });
});
