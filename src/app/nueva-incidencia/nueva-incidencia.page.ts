import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, 
  IonContent, IonIcon, IonItem, IonLabel, IonButton,
  IonInput, IonTextarea, IonBadge, LoadingController, ToastController, AlertController 
} from '@ionic/angular/standalone';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IncidenciasService } from '../services/incidencias.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  cameraOutline, location, cloudUploadOutline, 
  refreshOutline, createOutline, camera, checkmarkCircleOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-nueva-incidencia',
  templateUrl: './nueva-incidencia.page.html',
  styleUrls: ['./nueva-incidencia.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonButtons, IonBackButton, 
    IonTitle, IonContent, IonIcon, IonItem, IonLabel, IonButton, 
    IonInput, IonTextarea, IonBadge
  ]
})
export class NuevaIncidenciaPage {
  foto?: SafeResourceUrl;
  rawFoto?: string;
  latitud?: number;
  longitud?: number;
  titulo: string = '';
  descripcion: string = '';
  guardando = false;

  constructor(
    private incidenciasService: IncidenciasService,
    private sanitizer: DomSanitizer,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private router: Router
  ) {
    addIcons({ 
      cameraOutline, location, cloudUploadOutline, 
      refreshOutline, createOutline, camera, checkmarkCircleOutline 
    });
  }

  async capturarIncidencia() {
    const loading = await this.loadingCtrl.create({
      message: 'Obteniendo datos...',
      spinner: 'circles'
    });
    
    try {
      await loading.present();
      const resultado = await this.incidenciasService.capturarIncidenciaCompleta();
      
      this.rawFoto = resultado.foto;
      if (resultado.foto) {
        this.foto = this.sanitizer.bypassSecurityTrustResourceUrl(resultado.foto);
      }
      this.latitud = resultado.latitud;
      this.longitud = resultado.longitud;
      
    } catch (error) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'No se pudieron obtener los datos de la cámara o GPS. Asegúrate de dar los permisos necesarios.',
        buttons: ['Entendido']
      });
      await alert.present();
    } finally {
      loading.dismiss();
    }
  }

  async guardar() {
    if (!this.rawFoto || !this.latitud || !this.longitud || !this.titulo.trim()) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor, completa el título y toma una foto.',
        duration: 2000,
        color: 'warning'
      });
      await toast.present();
      return;
    }

    this.guardando = true;
    const loading = await this.loadingCtrl.create({
      message: 'Guardando reporte...'
    });

    try {
      await loading.present();
      
      await this.incidenciasService.guardarIncidencia({
        id: Date.now(),
        foto: this.rawFoto,
        latitud: this.latitud,
        longitud: this.longitud,
        titulo: this.titulo,
        descripcion: this.descripcion,
        fecha: Date.now()
      });

      const toast = await this.toastCtrl.create({
        message: 'Incidencia guardada con éxito',
        duration: 2000,
        position: 'bottom',
        color: 'success',
        icon: 'checkmark-circle-outline'
      });
      await toast.present();
      
      this.router.navigate(['/home']);
      
    } catch (error) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Hubo un problema al guardar la incidencia localmente.',
        buttons: ['Cerrar']
      });
      await alert.present();
    } finally {
      this.guardando = false;
      loading.dismiss();
    }
  }
}
