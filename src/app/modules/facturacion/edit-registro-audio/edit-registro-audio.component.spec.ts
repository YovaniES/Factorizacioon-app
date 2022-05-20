import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRegistroAudioComponent } from './edit-registro-audio.component';

describe('EditRegistroAudioComponent', () => {
  let component: EditRegistroAudioComponent;
  let fixture: ComponentFixture<EditRegistroAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRegistroAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRegistroAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
