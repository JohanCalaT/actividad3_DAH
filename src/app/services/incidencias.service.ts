import { Injectable, signal, computed } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Preferences } from '@capacitor/preferences';

export interface Incidencia {
  id: number;
  foto: string | undefined;
  latitud: number;
  longitud: number;
  titulo: string;
  descripcion: string;
  fecha: number;
}

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {
  private STORAGE_KEY = 'incidencias';
  
  // State using Signals
  private _incidencias = signal<Incidencia[]>([]);
  
  // Public exposure
  public readonly incidencias = computed(() => this._incidencias());
  public readonly totalIncidencias = computed(() => this._incidencias().length);

  public ready: Promise<void>;

  constructor() {
    this.ready = this.cargarIncidenciasIniciales();
  }

  private async cargarIncidenciasIniciales() {
    const { value } = await Preferences.get({ key: this.STORAGE_KEY });
    if (value) {
      this._incidencias.set(JSON.parse(value));
    }
  }

  async capturarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });
      return image.webPath;
    } catch (error) {
      throw error;
    }
  }

  async obtenerGeolocalizacion() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      return {
        latitud: coordinates.coords.latitude,
        longitud: coordinates.coords.longitude
      };
    } catch (error) {
      throw error;
    }
  }

  async capturarIncidenciaCompleta() {
    try {
      // Capturamos la foto primero
      const foto = await this.capturarFoto();
      
      // Obtenemos la geolocalización justo después, asegurando que sea el momento exacto
      const geo = await this.obtenerGeolocalizacion();
      
      return {
        foto,
        latitud: geo.latitud,
        longitud: geo.longitud
      };
    } catch (error) {
      throw error;
    }
  }

  async guardarIncidencia(incidencia: Incidencia) {
    try {
      const nuevaIncidencia = { 
        ...incidencia, 
        id: Date.now(), 
        fecha: Date.now() 
      };
      
      // Update Signal State
      this._incidencias.update(list => [...list, nuevaIncidencia]);
      
      // Persist
      await Preferences.set({
        key: this.STORAGE_KEY,
        value: JSON.stringify(this._incidencias())
      });
    } catch (error) {
      throw error;
    }
  }

  async obtenerIncidencias(): Promise<Incidencia[]> {
    return this.incidencias();
  }
}
