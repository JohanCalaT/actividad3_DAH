import { TestBed } from '@angular/core/testing';
import { IncidenciasService, Incidencia } from './incidencias.service';
import { Camera } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Preferences } from '@capacitor/preferences';

describe('IncidenciasService', () => {
  let service: IncidenciasService;

  beforeEach(() => {
    // Mocks para Capacitor ANTES de inyectar
    spyOn(Preferences, 'get').and.returnValue(Promise.resolve({ value: null }));
    spyOn(Preferences, 'set').and.returnValue(Promise.resolve());

    TestBed.configureTestingModule({});
    service = TestBed.inject(IncidenciasService);
  });

  it('should be created', async () => {
    await service.ready;
    expect(service).toBeTruthy();
  });

  it('should initialize with an empty list of incidencias', async () => {
    await service.ready;
    expect(service.incidencias()).toEqual([]);
    expect(service.totalIncidencias()).toBe(0);
  });

  it('should add an incidence to the list and signal state', async () => {
    await service.ready;
    const mockIncidencia: Incidencia = {
      foto: 'test-path',
      latitud: 10,
      longitud: 20,
      fecha: Date.now()
    };

    await service.guardarIncidencia(mockIncidencia);

    expect(service.incidencias().length).toBe(1);
    expect(service.incidencias()[0].foto).toBe('test-path');
    expect(Preferences.set).toHaveBeenCalled();
  });

  it('should capture photo using Camera plugin', async () => {
    spyOn(Camera, 'getPhoto').and.returnValue(Promise.resolve({ webPath: 'captured-path' } as any));
    
    const path = await service.capturarFoto();
    
    expect(path).toBe('captured-path');
    expect(Camera.getPhoto).toHaveBeenCalled();
  });

  it('should obtain coordinates using Geolocation plugin', async () => {
    spyOn(Geolocation, 'getCurrentPosition').and.returnValue(Promise.resolve({
      coords: { latitude: 12.34, longitude: 56.78 }
    } as any));

    const geo = await service.obtenerGeolocalizacion();

    expect(geo.latitud).toBe(12.34);
    expect(geo.longitud).toBe(56.78);
    expect(Geolocation.getCurrentPosition).toHaveBeenCalled();
  });
});
