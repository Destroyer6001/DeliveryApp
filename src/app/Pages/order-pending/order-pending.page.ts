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
  IonMenuButton, IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonIcon
} from '@ionic/angular/standalone';
import {OrderDetails} from "../../Models/order-details";
import {ShipmentService} from "../../Services/shipment-service";
import {OrderService} from "../../Services/order-service";
import {addIcons} from "ionicons";
import {addCircleOutline, timeOutline} from 'ionicons/icons';

addIcons({
  addCircleOutline,
  timeOutline
})

@Component({
  selector: 'app-order-pending',
  templateUrl: './order-pending.page.html',
  styleUrls: ['./order-pending.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonIcon]
})
export class OrderPendingPage{

  private alertController: AlertController = inject(AlertController);
  private orderService = inject(OrderService);
  private shipmentService = inject(ShipmentService);
  listOrders: OrderDetails[] = [];
  errorMessage: string = "";

  constructor() { }

  ionViewWillEnter() {
    this.GetOrdersPending();
  }

  GetOrdersPending():void
  {
    this.orderService.GetOrdersPendingDelivery().subscribe({
      next: async (data) =>
      {
        this.listOrders = data;
      },
      error: async (error) =>
      {
        this.errorMessage = error.message;
        const alert = await this.alertController.create({
          header: "Ha ocurrido un error inesperado.",
          message: this.errorMessage,
          buttons: ['Ok']
        });
        await alert.present();
      }
    });
  }

  SelectedOrderShipment(id: number, sliding?: IonItemSliding): void
  {
    this.shipmentService.CreateShipment(id).subscribe({
      next: async (data) =>
      {
        const alert = await this.alertController.create({
          header: "Exito",
          message: "Se ha creado con exito la orden de entrega",
          buttons: ['Ok']
        });
        this.GetOrdersPending();
        await alert.present();
        await sliding?.close();
      },
      error: async (error) =>
      {
        this.errorMessage = error.message;
        const alert = await this.alertController.create({
          header: "Ha ocurrido un error inesperado.",
          message: this.errorMessage,
          buttons: ['Ok']
        });
        await alert.present();
        await sliding?.close();
      }
    });
  }
}
