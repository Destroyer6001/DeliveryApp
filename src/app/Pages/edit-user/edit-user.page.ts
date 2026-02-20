import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  AlertController,
  IonInput,
  IonButton, IonButtons, IonIcon
} from '@ionic/angular/standalone';
import { AuthService } from "../../Services/auth-service";
import { User } from "../../Models/user";
import { Router } from "@angular/router";
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {addIcons} from "ionicons";
import {arrowBackOutline} from "ionicons/icons";

addIcons({
  arrowBackOutline
})

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonInput, IonButton, IonButtons, IonIcon]
})
export class EditUserPage implements OnInit {

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private alertController: AlertController = inject(AlertController);
  private fb: FormBuilder = inject(FormBuilder);

  updateForm: FormGroup;
  errorMessage: string = '';
  idUser: number = 0;

  constructor()
  {
    this.updateForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.maxLength(32)]],
      lastname: ['', [Validators.required, Validators.maxLength(32)]],
      username: ['', [Validators.required, Validators.maxLength(32)]],
      cellphone: ['', [Validators.required, Validators.maxLength(32)]],
      address: ['', [Validators.required, Validators.maxLength(32)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  async ngOnInit()
  {
    await this.GetUserData();
  }

  GetValidationErrors(): string[]
  {
    const errors : string[] = [];

    Object.keys(this.updateForm.controls).forEach(field => {
      const controlErrors = this.updateForm.get(field)?.errors;

      if (controlErrors)
      {
        Object.keys(controlErrors).forEach(fieldError => {
          switch(fieldError)
          {
            case 'required':
              errors.push(`El campo ${field} es obligatorio`);
              break;

            case 'email':
              errors.push(`El campo ${field} debe ser un email valido`);
              break;

            case 'maxlength':
              const requiredLength = controlErrors[fieldError].requiredLength;
              errors.push(`El campo ${field} no debe tener mas de ${requiredLength} caracteres`);
              break;
          }
        });
      }
    });

    return errors;
  }

  async GetUserData(): Promise<void>
  {
    this.idUser = Number(await this.authService.GetUserId());
    this.authService.GetUserById(this.idUser).subscribe({
      next: async (data) =>
      {
        this.updateForm.setValue({
          firstname: data.firstname,
          lastname:  data.lastname,
          username: data.username,
          cellphone: data.cellphone,
          address: data.address,
          email: data.email,
          password: "",
        });
      },
      error: async (error) =>
      {
        this.errorMessage = error.message;
        const alert = await this.alertController.create({
          header: "Ha ocurrido un error",
          message: this.errorMessage,
          buttons: ['Ok'],
        });
        await alert.present();
      }
    });
  }

  async UpdateUser(): Promise<void>
  {
    if(this.updateForm.valid)
    {
      const User:User = {
        firstname: this.updateForm.value.firstname,
        lastname: this.updateForm.value.lastname,
        username: this.updateForm.value.username,
        address: this.updateForm.value.address,
        cellphone: this.updateForm.value.cellphone,
        email: this.updateForm.value.email,
        typeUser: 0,
        id: 1,
        password: this.updateForm.value.password != '' ? this.updateForm.value.password : '',
      };

      this.authService.UpdateUser(this.idUser, User).subscribe({
        next: async (data) =>
        {
          const alert = await this.alertController.create({
            header: "Exito",
            message: "Se ha actualizado con exito la informacion del usuario",
            buttons: ['Ok'],
          });
          await alert.present();
          this.router.navigate(['/home']);
        },
        error: async (error) =>
        {
          this.errorMessage = error.message;
          const alert = await this.alertController.create({
            header: "Ha ocurrido un error",
            message: this.errorMessage,
            buttons: ['Ok'],
          });
          await alert.present();
        }
      });
    }
    else
    {
      const errors: string[] = this.GetValidationErrors();
      const alert = await this.alertController.create({
        header: "Antes de continuar con la actualizacion debes corregir",
        message: errors.join('<br>'),
        buttons: ['Ok'],
      });
      await alert.present();
    }
  }

  GoBack():void
  {
    this.router.navigate(['/home']);
  }
}
