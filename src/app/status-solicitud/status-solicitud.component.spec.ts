import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusSolicitudComponent } from './status-solicitud.component';

describe('StatusSolicitudComponent', () => {
  let component: StatusSolicitudComponent;
  let fixture: ComponentFixture<StatusSolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusSolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
