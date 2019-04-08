import { TestBed } from '@angular/core/testing';

import { ReceitaService } from './receita.service';

describe('ReceitaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReceitaService = TestBed.get(ReceitaService);
    expect(service).toBeTruthy();
  });
});
