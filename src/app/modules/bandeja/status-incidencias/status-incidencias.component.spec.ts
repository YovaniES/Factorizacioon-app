import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusIncidenciasComponent } from './status-incidencias.component';

describe('StatusIncidenciasComponent', () => {
  let component: StatusIncidenciasComponent;
  let fixture: ComponentFixture<StatusIncidenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusIncidenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusIncidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
