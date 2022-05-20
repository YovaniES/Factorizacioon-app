import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCuentaComponent } from './appcuenta.component';

describe('AppCuentaComponent', () => {
  let component: AppCuentaComponent;
  let fixture: ComponentFixture<AppCuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
