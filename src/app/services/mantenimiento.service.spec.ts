import { TestBed } from '@angular/core/testing';

import { MantenimientoService } from './mantenimiento.service';

describe('MantenimientoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MantenimientoService = TestBed.get(MantenimientoService);
    expect(service).toBeTruthy();
  });
});
