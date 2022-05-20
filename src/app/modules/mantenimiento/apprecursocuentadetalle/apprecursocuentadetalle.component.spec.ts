import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprecursocuentadetalleComponent } from './apprecursocuentadetalle.component';

describe('apprecursocuentadetalleComponent', () => {
  let component: ApprecursocuentadetalleComponent;
  let fixture: ComponentFixture<ApprecursocuentadetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprecursocuentadetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprecursocuentadetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
