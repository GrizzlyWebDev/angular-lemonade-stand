/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WaveComponent } from './wave.component';

describe('WaveComponent', () => {
  let component: WaveComponent;
  let fixture: ComponentFixture<WaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
