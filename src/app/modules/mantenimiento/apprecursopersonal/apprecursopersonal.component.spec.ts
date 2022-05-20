import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprecursopersonalComponent } from './apprecursopersonal.component';

describe('ApprecursopersonalComponent', () => {
  let component: ApprecursopersonalComponent;
  let fixture: ComponentFixture<ApprecursopersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprecursopersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprecursopersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
