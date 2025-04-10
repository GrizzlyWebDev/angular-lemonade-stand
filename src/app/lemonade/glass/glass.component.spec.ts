/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GlassComponent } from './glass.component';

describe('GlassComponent', () => {
  let component: GlassComponent;
  let fixture: ComponentFixture<GlassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
