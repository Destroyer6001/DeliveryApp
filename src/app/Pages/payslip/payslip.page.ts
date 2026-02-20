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
  IonMenuButton, IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonIcon, IonFab,
  IonFabButton
} from '@ionic/angular/standalone';
import { AuthService } from "../../Services/auth-service";
import { PayslipsService } from "../../Services/payslips-service";
import { PayslipDetails } from "../../Models/payslip-details";
import { Router } from "@angular/router";
import { addIcons } from "ionicons";
import {searchOutline, cardOutline, cashOutline} from "ionicons/icons";

addIcons({
  searchOutline, cardOutline, cashOutline
})

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.page.html',
  styleUrls: ['./payslip.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonIcon, IonFab, IonFabButton]
})
export class PayslipPage {

  private authService: AuthService = inject(AuthService);
  private payslipService: PayslipsService = inject(PayslipsService);
  private alertController: AlertController = inject(AlertController);
  private router: Router = inject(Router);

  payslipList: PayslipDetails[] = [];
  errorMessage: string = '';

  constructor() { }

  async ionViewWillEnter()
  {
    await this.GetPayslips();
  }

  async GetPayslips(): Promise<void>
  {
    const UserId = Number(await this.authService.GetUserId());

    this.payslipService.GetPaySlipsDetails(UserId).subscribe({
      next: async (data) =>
      {
        this.payslipList = data;
      },
      error: async (error) =>
      {
        this.errorMessage = error.message;
        const alert = await this.alertController.create({
          header: "Ha ocurrido un error inesperado",
          message: this.errorMessage,
          buttons: ["Ok"]
        });
        await alert.present();
      }
    });
  }

  CreatePayslips(): void
  {
    this.payslipService.CreatePayslip().subscribe({
      next: async (data) =>
      {
        const alert = await this.alertController.create({
          header: "Exito",
          message: "Se ha realizado la liquidacion de los pagos pendientes con exito",
          buttons: ["Ok"]
        });
        await this.GetPayslips();
        await alert.present();
      },
      error: async (error) =>
      {
        this.errorMessage = error.message;
        const alert = await this.alertController.create({
          header: "Ha ocurrido un error inesperado",
          message: this.errorMessage,
          buttons: ["Ok"]
        });
        await alert.present();
      }
    });
  }

  async RedirectedPayslipDetails(id: number, sliding?: IonItemSliding)
  {
    await sliding?.close();
    this.router.navigate(['payslip-details', id]);
  }

}
