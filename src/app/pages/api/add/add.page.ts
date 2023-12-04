import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { LocationService } from '../../../core/services/location.service'
import { Location } from '../../../core/models/location.model'
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  locations: Location[] = [];
  registerForm: FormGroup;
  langs: string[] = [];

  constructor(
    private userService: UserService,
    private locationService: LocationService,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      location: ['',[Validators.required]],
      partner: ['false'],
      plate: [''],
      licence: [''],
      admin: ['false'],
    }
    );
    this.langs = this.translateService.getLangs();
  }

  ngOnInit() {
    this.loadLocations();
  }

  async loadLocations() {
    try {
      this.locations = await this.locationService.getAllLocations();
    } catch (error) {
      console.error('Error loading locations: ', error);
    }
  }

  validateData(){    
      if (this.registerForm.invalid) {
        Swal.fire({
          icon: 'warning',
          iconColor: 'red',
          title: 'Oops...',
          text: 'Debes llenar todos los datos!',
          heightAuto: false,
        });
        return false; // Detener el registro si el formulario es inválido.
      }
      return true
  }

  async addUser() {
    if (this.validateData()){
      var partner = false
      var administrator = false
      if (this.registerForm.get('partner')?.value === "true"){
        partner = true
      }
      if (this.registerForm.get('admin')?.value === "true"){
        administrator = true
      }
      const user: User = {
        name: this.registerForm.get('name')?.value,
        email: this.registerForm.get('email')?.value,
        administrator: administrator,
        licence: this.registerForm.get('licence')?.value,
        location: this.registerForm.get('location')?.value,
        partner: partner,
        plate: this.registerForm.get('plate')?.value,
        password: "Hola123",
      }
      if (user.administrator === true) {
        await this.confirmAdministrator(user);
      } else {
        await this.userService.addUser(user);
      }
    }
    
  }
  
  async confirmAdministrator(user: User) {
    const alert = await this.alertController.create({
      header: 'Confirmar acción',
      message: '¿Está seguro de hacer a este usuario administrador?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            Swal.fire({
              icon: 'warning',
              iconColor: 'red',
              title: 'Oops...',
              text: 'El usuario no se ha registrado!',
              heightAuto: false,
            });
          }
        },
        {
          text: 'Sí',
          handler: () => {
            user.administrator = true;
            this.userService.addUser(user); 
          }
        }
      ]
    });
  
    await alert.present();
  }  
}
