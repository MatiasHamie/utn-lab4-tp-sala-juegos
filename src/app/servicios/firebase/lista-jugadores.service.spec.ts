import { TestBed } from '@angular/core/testing';

import { ListaJugadoresService } from './lista-jugadores.service';

describe('ListaJugadoresService', () => {
  let service: ListaJugadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaJugadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
