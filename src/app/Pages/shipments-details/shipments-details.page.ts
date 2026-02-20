import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  AlertController,
  IonButtons,
  IonMenuButton, IonList, IonItemSliding, IonItem, IonLabel, IonChip, IonItemOptions, IonItemOption, IonIcon
} from '@ionic/angular/standalone';
import {ShipmentsDetails} from "../../Models/shipments-details";
import {ShipmentService} from "../../Services/shipment-service";
import {AuthService} from "../../Services/auth-service";
import {addIcons} from "ionicons";
import {closeOutline, checkmarkOutline, carOutline} from "ionicons/icons";

addIcons({
  checkmarkOutline, closeOutline, carOutline
})

@Component({
  selector: 'app-shipments-details',
  templateUrl: './shipments-details.page.html',
  styleUrls: ['./shipments-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonList, IonItemSliding, IonItem, IonLabel, IonChip, IonItemOptions, IonItemOption, IonIcon]
})
export class ShipmentsDetailsPage {

  private shipmentService = inject(ShipmentService);
  private alertController = inject(AlertController);
  private authService = inject(AuthService);

  listShipments: ShipmentsDetails[] = [];
  errorMessage: string = "";
  constructor() { }

  async ionViewWillEnter (){
    await this.getShipments();
  }

  async getShipments()
  {
    const userId = Number( await this.authService.GetUserId());
    this.shipmentService.GetShipmentsUser(userId).subscribe({
      next: async (data) =>
      {
        this.listShipments = data;
      },
      error: async (error) =>
      {
        this.errorMessage = error.message;
        const alert = await this.alertController.create({
          header: "Ha ocurrido un error",
          message: this.errorMessage,
          buttons: ["OK"]
        });
        await alert.present();
      }
    });
  }

  async ConfirmShipmentCancel(shipmentId: number, sliding?: IonItemSliding)
  {
    const alert = await this.alertController.create({
      header: "Atencion",
      message: "Esta seguro de cancelar el proceso de entrega",
      buttons:
      [
        {text: 'Cancelar', role: 'cancel'},
        {
          text: 'Si, Cancelar',
          role: 'destructive',
          handler: () => {
            this.CancelShipment(shipmentId, sliding);
          }
        }
      ]
    });
    await alert.present();
  }

  CancelShipment(shipmentId: number, sliding?: IonItemSliding)
  {
    this.shipmentService.CancelShipment(shipmentId).subscribe({
      next: async (data) =>
      {
        const alert = await this.alertController.create({
          header: "Exito",
          message: "Se ha cancelado con exito la orden de entrega",
          buttons: ["Ok"]
        });
        await this.getShipments();
        await alert.present();
        await sliding?.close();
      },
      error: async (error) =>
      {
        this.errorMessage = error.message;
        const alert = await this.alertController.create({
          header: "Ha ocurrido un error",
          message: this.errorMessage,
          buttons: ["Ok"]
        });
        await alert.present();
        await sliding?.close();
      }
    });
  }

  ConfirmShipment(shipmentId: number, sliding?: IonItemSliding)
  {
    this.shipmentService.ConfirmShipment(shipmentId).subscribe({
      next: async (data) =>
      {
        const alert = await this.alertController.create({
          header: "Exito",
          message: "Se ha completado con exito la orden de entrega",
          buttons: ["Ok"]
        })
        await this.getShipments();
        await alert.present();
        await sliding?.close();
      },
      error: async (error) =>
      {
        this.errorMessage = error.message;
        const alert = await this.alertController.create({
          header: "Ha ocurrido un error",
          message: this.errorMessage,
          buttons: ["Ok"]
        });
        await alert.present();
        await sliding?.close();
      }
    })
  }
}
