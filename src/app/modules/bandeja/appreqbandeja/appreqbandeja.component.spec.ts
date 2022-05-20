import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppreqbandejaComponent } from './appreqbandeja.component';

describe('AppreqbandejaComponent', () => {
  let component: AppreqbandejaComponent;
  let fixture: ComponentFixture<AppreqbandejaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppreqbandejaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppreqbandejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
