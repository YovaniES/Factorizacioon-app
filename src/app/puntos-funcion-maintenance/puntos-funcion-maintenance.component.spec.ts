import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosFuncionMaintenanceComponent } from './puntos-funcion-maintenance.component';

describe('PuntosFuncionMaintenanceComponent', () => {
  let component: PuntosFuncionMaintenanceComponent;
  let fixture: ComponentFixture<PuntosFuncionMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntosFuncionMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntosFuncionMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
