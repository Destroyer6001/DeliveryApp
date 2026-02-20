import {Component, inject} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  AlertController
} from "@ionic/angular/standalone";
import {AuthService} from "../../Services/auth-service";
import {Login} from "../../Models/login";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgOptimizedImage,
    IonInput,
    IonButton,
  ]
})
export class LoginPage  {

  private fb = inject(FormBuilder);
  private alertController = inject(AlertController);
  private authService = inject(AuthService);
  private router = inject(Router);
  imgSrc = "https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=gzhbzBpXBa%2bxMA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-big-image-png-2240.png&ehk=VeWsrun%2fvDy5QDv2Z6Xm8XnIMXyeaz2fhR3AgxlvxAc%3d&risl=&pid=ImgRaw&r=0";
  loginForm : FormGroup;
  errorMsg: string = '';

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })

  }

  getValidationErrors(): string[]
  {
    const errors: string[] = [];

    Object.keys(this.loginForm.controls).forEach((field) => {
      const controlErrors = this.loginForm.get(field)?.errors;

      if (controlErrors)
      {
        Object.keys(controlErrors).forEach((fieldError) => {
          switch (fieldError)
          {
            case 'required':
              errors.push(`El campo ${field} es obligatorio`);
              break;

            case 'email':
              errors.push(`El campo ${field} debe ser un email valido`);
              break;
          }
        });
      }
    });

    return errors;
  }

  async Login()
  {
    if (this.loginForm.valid)
    {
      const login: Login = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.authService.login(login).subscribe({
        next: async (result) =>
        {
          await this.authService.setStorage(result);

          const alert = await this.alertController.create({
            header: 'Exito',
            message: 'Inicio de sesion realizado con exito',
            buttons: ['OK'],
          })

          await alert.present();
          this.router.navigate(['/home']);
        },
        error: async (err) =>
        {
          this.errorMsg = err.message;
          const alert = await this.alertController.create({
            header: "Ha ocurrido un error",
            message: this.errorMsg,
            buttons: ['OK'],
          });
          await alert.present();
        }
      });
    }
    else
    {
      const errors: string[] = this.getValidationErrors();
      const alert = await this.alertController.create({
        header: "Antes de continuar debes solucionar los siguientes errores",
        message: errors.join('<br>'),
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

}
