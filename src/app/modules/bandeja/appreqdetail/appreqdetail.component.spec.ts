import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppreqdetailComponent } from './appreqdetail.component';

describe('AppreqdetailComponent', () => {
  let component: AppreqdetailComponent;
  let fixture: ComponentFixture<AppreqdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppreqdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppreqdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
