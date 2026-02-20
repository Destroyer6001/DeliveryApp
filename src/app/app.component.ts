import {Component, inject} from '@angular/core';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonIcon, IonItem, IonLabel, IonList,
  IonMenu, IonMenuToggle,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  AlertController, IonFooter
} from '@ionic/angular/standalone';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {addIcons} from "ionicons";
import {timeOutline, homeOutline, carOutline, cashOutline, constructOutline, logOutOutline} from "ionicons/icons"
import {AuthService} from "./Services/auth-service";
import {Router} from "@angular/router";


addIcons({
  timeOutline, homeOutline, carOutline, cashOutline, constructOutline, logOutOutline
})

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonIcon, IonContent, IonList, IonMenuToggle, IonItem, RouterLink, IonLabel, RouterLinkActive, IonFooter],
})
export class AppComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private alertController: AlertController = inject(AlertController);
  constructor() {}

  async Logout(): Promise<void>
  {
    await this.authService.Logout();
    const alert = await this.alertController.create({
      header: 'Exito',
      message: "Se ha cerrado la sesion correctamente",
      buttons: ["Ok"]
    });
    await alert.present();
    this.router.navigate(['']);
  }
}
