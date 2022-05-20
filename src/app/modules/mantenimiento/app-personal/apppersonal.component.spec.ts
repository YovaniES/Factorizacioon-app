import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPersonalComponent } from './apppersonal.component';

describe('AppreqbandejaComponent', () => {
  let component: AppPersonalComponent;
  let fixture: ComponentFixture<AppPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
