import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAddReqComponent } from './app-add-req.component';

describe('AppAddReqComponent', () => {
  let component: AppAddReqComponent;
  let fixture: ComponentFixture<AppAddReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppAddReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAddReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
