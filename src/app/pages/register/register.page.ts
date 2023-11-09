import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, NavController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LocationService } from '../../core/services/location.service'
import { Location } from '../../core/models/location.model'
import Swal from 'sweetalert2';

// Función independiente para validar contraseñas
function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confpassword = control.get('confpassword');

  if (!password || !confpassword || password.value === confpassword.value) {
    return null; // Las contraseñas coinciden
  }

  return { passwordMismatch: true }; // Las contraseñas no coinciden
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formularioRegister: FormGroup;
  locations: Location[] = [];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private navCtrl: NavController,
    private locationService: LocationService
  ) {
    this.formularioRegister = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confpassword: ['', Validators.required],
        direccionSede: [''],
        conductor: [false], 
        licenciaConductor: [''],
        patenteVehiculo: [''],
      },
      {
        validators: passwordMatchValidator, // Usar la función de validación personalizada
      }
    );
  }

  async loadLocations() {
    try {
      this.locations = await this.locationService.getAllLocations();
    } catch (error) {
      console.error('Error loading locations: ', error);
    }
  }

  ngOnInit() {
    this.loadLocations();
  }

  async register() {
    const passwordControl = this.formularioRegister.get('password');
    const confpasswordControl = this.formularioRegister.get('confpassword');
  
    if (passwordControl && confpasswordControl && passwordControl.value !== confpasswordControl.value) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coinciden.',
        heightAuto: false,
      });
      return; // Detener el registro si las contraseñas no coinciden.
    }
  
    if (this.formularioRegister.invalid) {
      Swal.fire({
        icon: 'warning',
        iconColor: 'red',
        title: 'Oops...',
        text: 'Debes llenar todos los datos!',
        heightAuto: false,
      });
      return; // Detener el registro si el formulario es inválido.
    }

      // Registro exitoso, redirigimos al usuario a la página de inicio de sesión
      Swal.fire({
        heightAuto: false,
        title: 'Cuenta creada con éxito!',
        timer: 5000,
      });
      this.router.navigate(['login']);
      console.log('Registro exitoso');
    } catch (error: any) {
      // Manejo de errores si el usuario ya existe
      console.error(error.message);
    }
}  
