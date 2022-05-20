import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRecursoComponent } from './apprecurso.component';

describe('AppreqbandejaComponent', () => {
  let component: AppRecursoComponent;
  let fixture: ComponentFixture<AppRecursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppRecursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
