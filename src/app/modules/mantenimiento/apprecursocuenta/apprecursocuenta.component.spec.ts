import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprecursocuentaComponent } from './apprecursocuenta.component';

describe('apprecursocuentaComponent', () => {
  let component: ApprecursocuentaComponent;
  let fixture: ComponentFixture<ApprecursocuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprecursocuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprecursocuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
