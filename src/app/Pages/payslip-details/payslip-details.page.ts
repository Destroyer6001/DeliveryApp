import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  AlertController,
  IonCard,
  IonCardHeader, IonCardContent, IonList, IonItem, IonLabel, IonButtons, IonButton, IonIcon
} from '@ionic/angular/standalone';
import { PayslipsService } from "../../Services/payslips-service";
import { PayslipDetails } from "../../Models/payslip-details";
import { Router, ActivatedRoute } from '@angular/router';
import { addIcons } from "ionicons";
import {arrowBackOutline} from "ionicons/icons";

addIcons({
  arrowBackOutline
})

@Component({
  selector: 'app-payslip-details',
  templateUrl: './payslip-details.page.html',
  styleUrls: ['./payslip-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardContent, IonList, IonItem, IonLabel, IonButtons, IonButton, IonIcon]
})
export class PayslipDetailsPage implements OnInit {

  private payslipService: PayslipsService = inject(PayslipsService);
  private alertController: AlertController = inject(AlertController);
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  payslip!: PayslipDetails | null;
  errorMessage: string = '';
  id: number = 0;

  constructor() {
  }

  ngOnInit(){
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.GetPayslipDetails();
  }

  GetPayslipDetails(): void
  {
    this.payslipService.GetPayslip(this.id).subscribe({
      next: async (data) =>
      {
        console.log(data);
        this.payslip = data;
      },
      error: async (error) =>
      {
        this.errorMessage = error.message;
        const alert = await this.alertController.create({
          header: "Ha ocurrido un error",
          message: this.errorMessage,
          buttons: ["Ok"]
        });
      }
    });
  }

  GoBack():void
  {
    this.router.navigate(['/payslip']);
  }



}
