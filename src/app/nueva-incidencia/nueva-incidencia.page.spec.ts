import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { NuevaIncidenciaPage } from './nueva-incidencia.page';
import { IncidenciasService } from '../services/incidencias.service';

describe('NuevaIncidenciaPage', () => {
  let component: NuevaIncidenciaPage;
  let fixture: ComponentFixture<NuevaIncidenciaPage>;
  let service: IncidenciasService;

  beforeEach(async () => {
    const serviceMock = {
      capturarIncidenciaCompleta: jasmine.createSpy('capturarIncidenciaCompleta'),
      guardarIncidencia: jasmine.createSpy('guardarIncidencia')
    };

    await TestBed.configureTestingModule({
      imports: [NuevaIncidenciaPage],
      providers: [
        provideRouter([]),
        provideIonicAngular(),
        { provide: IncidenciasService, useValue: serviceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevaIncidenciaPage);
    component = fixture.componentInstance;
    service = TestBed.inject(IncidenciasService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show placeholder when no photo is captured', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.placeholder-container')).toBeTruthy();
  });

  it('should call service when capturarIncidencia is triggered', async () => {
    (service.capturarIncidenciaCompleta as jasmine.Spy).and.returnValue(Promise.resolve({
      foto: 'path', latitud: 1, longitud: 2
    }));
    
    await component.capturarIncidencia();
    
    expect(service.capturarIncidenciaCompleta).toHaveBeenCalled();
  });
});
