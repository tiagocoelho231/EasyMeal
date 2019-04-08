import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaPage } from './conta.page';

describe('ContaPage', () => {
  let component: ContaPage;
  let fixture: ComponentFixture<ContaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
