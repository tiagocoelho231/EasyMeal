import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespensaPage } from './despensa.page';

describe('DespensaPage', () => {
  let component: DespensaPage;
  let fixture: ComponentFixture<DespensaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespensaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespensaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
