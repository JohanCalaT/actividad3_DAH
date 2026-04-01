import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, 
  IonContent, IonList, IonListHeader, IonItem, IonIcon, IonLabel,
  IonThumbnail, IonBadge, IonButton, AlertController, IonItemSliding,
  IonItemOptions, IonItemOption
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  warningOutline, chevronForward, 
  locationOutline, calendarOutline, trashOutline 
} from 'ionicons/icons';
import { IncidenciasService } from '../services/incidencias.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonButtons, IonBackButton, 
    IonTitle, IonContent, IonList, IonListHeader, IonItem, IonIcon, 
    IonLabel, IonThumbnail, IonBadge, IonButton, IonItemSliding, 
    IonItemOptions, IonItemOption, RouterLink
  ]
})
export class ListadoPage {
  public incidencias = this.incidenciasService.incidencias;

  constructor(
    private alertCtrl: AlertController,
    private incidenciasService: IncidenciasService
  ) {
    addIcons({ 
      warningOutline, chevronForward, 
      locationOutline, calendarOutline, trashOutline 
    });
  }

  async mostrarEnConstruccion() {
    const alert = await this.alertCtrl.create({
      header: '🚧 En construcción',
      message: 'Esta funcionalidad estará disponible próximamente en futuras actualizaciones.',
      buttons: [
        {
          text: 'Entendido',
          role: 'cancel',
          cssClass: 'primary'
        }
      ]
    });

    await alert.present();
  }
}
