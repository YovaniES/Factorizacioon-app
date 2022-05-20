import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprecursohardwareComponent } from './apprecursohardware.component';

describe('apprecursohardwareComponent', () => {
  let component: ApprecursohardwareComponent;
  let fixture: ComponentFixture<ApprecursohardwareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprecursohardwareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprecursohardwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
