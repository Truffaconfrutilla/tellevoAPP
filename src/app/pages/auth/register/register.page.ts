import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../core/services/location.service'
import { Location } from '../../../core/models/location.model'
import Swal from 'sweetalert2';
import { UserService } from 'src/app/core/services/user.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { TranslateService } from '@ngx-translate/core';


function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const password2 = control.get('password2');

  if (!password || !password2 || password.value === password2.value) {
    return null; 
  }

  return { passwordMismatch: true };
}


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  locations: Location[] = [];
  registerForm: FormGroup;
  langs: string[] = [];

  constructor(   
    private locationService: LocationService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required , Validators.minLength(6)]],
      password2: ['',[Validators.required , Validators.minLength(6)]],
      location: ['',[Validators.required]],
      partner: [''],
      plate: [''],
      licence: [''],
    },
    {validators: passwordMatchValidator}
    );
    this.langs = this.translateService.getLangs();
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
    if (this.validateData()){
      var partner = false
      if (this.registerForm.get('partner')?.value === "true"){
        partner = true
      }
      const user: User = {
        name: this.registerForm.get('name')?.value,
        email: this.registerForm.get('email')?.value,
        administrator: false,
        licence: this.registerForm.get('licence')?.value,
        location: this.registerForm.get('location')?.value,
        partner: partner,
        plate: this.registerForm.get('plate')?.value,
        password: this.registerForm.get('password')?.value,
      }
      this.userService.registerUser(user)
    }
  }

validateData(){
  const passwordControl = this.registerForm.get('password');
    const password2 = this.registerForm.get('password2');
  
    if (passwordControl && password2 && passwordControl.value !== password2.value) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coinciden.',
        heightAuto: false,
      });
      return false; // Detener el registro si las contraseñas no coinciden.
    }
  
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

}