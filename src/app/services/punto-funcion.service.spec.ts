import { TestBed } from '@angular/core/testing';

import { PuntoFuncionService } from './punto-funcion.service';

describe('PuntoFuncionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PuntoFuncionService = TestBed.get(PuntoFuncionService);
    expect(service).toBeTruthy();
  });
});
