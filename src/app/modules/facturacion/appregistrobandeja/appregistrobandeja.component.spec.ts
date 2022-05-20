import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRegistroBandejaComponent } from './appregistrobandeja.component';

describe('AppRegistrobandejaComponent', () => {
  let component: AppRegistroBandejaComponent;
  let fixture: ComponentFixture<AppRegistroBandejaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppRegistroBandejaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRegistroBandejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
