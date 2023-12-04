import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/core/services/user.service';
import { LocationService } from '../../../core/services/location.service'
import { User } from 'src/app/core/models/user.model';
import { Location } from '../../../core/models/location.model'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  updateForm: FormGroup;
  detailForm: FormGroup;
  locations: Location[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private locationService: LocationService,
    private alertController: AlertController,
  ) {
    this.detailForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
    }
    );
    this.updateForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      location: ['',[Validators.required]],
      partner: ['false'],
      plate: [''],
      licence: [''],
      admin: ['false'],
    }
    );
    this.updateForm.disable()
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

  validateDetailData(){    
    if (this.detailForm.invalid) {
      Swal.fire({
        icon: 'warning',
        iconColor: 'red',
        title: 'Oops...',
        text: 'Debes llenar todos los datos!',
        heightAuto: false,
      });
      return false;
    }
    return true
  }

  validateUpdateData(){    
    if (this.detailForm.invalid) {
      Swal.fire({
        icon: 'warning',
        iconColor: 'red',
        title: 'Oops...',
        text: 'Debes llenar todos los datos!',
        heightAuto: false,
      });
      return false;
    }
    return true
  }

  async detailUser(){
    this.validateDetailData()
    const user = await this.userService.getUserDetail(this.detailForm.get('email')?.value)
    if (user){
      this.updateForm.enable()
      this.detailForm.disable()
      this.updateForm.controls['name'].setValue(user.name);
      this.updateForm.controls['location'].setValue(user.location);
      if (user.partner === true){
        this.updateForm.controls['partner'].setValue("true");
      }
      this.updateForm.controls['licence'].setValue(user.licence);
      this.updateForm.controls['plate'].setValue(user.plate);
      if (user.administrator === true){
        this.updateForm.controls['admin'].setValue("true");
      }
    }
  }

  async updateUser(){
    this.validateUpdateData()
    var partner = false
      var administrator = false
      if (this.updateForm.get('partner')?.value === "true"){
        partner = true
      }
      if (this.updateForm.get('admin')?.value === "true"){
        administrator = true
      }
      const user: User = {
        name: this.updateForm.get('name')?.value,
        email: this.detailForm.get('email')?.value,
        administrator: administrator,
        licence: this.updateForm.get('licence')?.value,
        location: this.updateForm.get('location')?.value,
        partner: partner,
        plate: this.updateForm.get('plate')?.value,
      }
      if (user.administrator === true) {
          await this.confirmAdministrator(user)
      } else {
          await this.userService.updateUser(user)
          .then(() => {
            this.cancelUpdate()
          });
      }
  }

  async cancelUpdate(){
    this.detailForm.enable()
    this.detailForm.controls['email'].setValue("");
    this.updateForm.controls['name'].setValue("");
    this.updateForm.controls['location'].setValue("");
    this.updateForm.controls['partner'].setValue("false");
    this.updateForm.controls['licence'].setValue("");
    this.updateForm.controls['plate'].setValue("");
    this.updateForm.controls['admin'].setValue("false");
    this.updateForm.disable()
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
            this.userService.updateUser(user)
            .then(() => {
              this.cancelUpdate()
            });
          }
        }
      ]
    });
  
    await alert.present();
  }  

}
