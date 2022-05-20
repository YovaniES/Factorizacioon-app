import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegistroAudioComponent } from './add-registro-audio.component';

describe('AddRegistroAudioComponent', () => {
  let component: AddRegistroAudioComponent;
  let fixture: ComponentFixture<AddRegistroAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRegistroAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRegistroAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
