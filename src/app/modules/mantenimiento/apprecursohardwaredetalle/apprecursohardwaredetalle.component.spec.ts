import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprecursohardwaredetalleComponent } from './apprecursohardwaredetalle.component';

describe('apprecursohardwaredetalleComponent', () => {
  let component: ApprecursohardwaredetalleComponent;
  let fixture: ComponentFixture<ApprecursohardwaredetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprecursohardwaredetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprecursohardwaredetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
