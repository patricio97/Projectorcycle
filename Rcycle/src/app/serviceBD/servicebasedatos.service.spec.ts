import { TestBed } from '@angular/core/testing';

import { ServicebasedatosService } from './servicebasedatos.service';

describe('ServicebasedatosService', () => {
  let service: ServicebasedatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicebasedatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
