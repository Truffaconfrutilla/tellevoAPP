import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../core/services/location.service'
import { Location } from '../../../core/models/location.model'
import Swal from 'sweetalert2';
import { UserService } from 'src/app/core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  locations: Location[] = [];
  formRegister: FormGroup;

  constructor(   
    private locationService: LocationService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastController: ToastController
    
  ) {
    this.formRegister = this.formBuilder.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required]],
      password: ['',[Validators.required , Validators.minLength(6)]],
      password2: ['',[Validators.required , Validators.minLength(6)]],
      location: ['',[Validators.required]],
      partner: ['',[Validators.required]],
      plate: ['',[Validators.required]],
      licence: ['',[Validators.required]],
      administrator: ['',[Validators.required]],
    })
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

async register(){}


}