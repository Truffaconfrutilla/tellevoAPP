import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { FirecrudService } from 'src/app/core/services/firecrud.service';
import { LocationService } from '../../../core/services/location.service'
import { Location } from '../../../core/models/location.model'
import { MessageService } from 'src/app/core/services/message.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  locations: Location[] = [];

  user: User = {
    name: '',
    email: '',
    location: '',
    partner: false,
    plate: '',
    licence: '',
    administrator: false
  }

  constructor(
    private router: Router,
    private fireservices: FirecrudService,
    private message: MessageService,
    private locationService: LocationService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async loadLocations() {
    try {
      this.locations = await this.locationService.getAllLocations();
    } catch (error) {
      console.error('Error loading locations: ', error);
    }
  }

  async addUser() {
    const { name, email, location, partner, licence, plate, administrator } = this.user;
  
    //URGENTE ARREGLAR LOCATION if (!name || !email || !location || !administrator || (partner && (!licence || !plate))) {
    if (!name || !email || !administrator || (partner && (!licence || !plate))) {
      this.presentMissingFieldsAlert();
      return; 
    }
  
    if (this.user.administrator === true) {
      await this.confirmAdministrator();
    } else {
      await this.createUserAndNavigate();
    }
  }
  
  async confirmAdministrator() {
    const alert = await this.alertController.create({
      header: 'Confirmar acción',
      message: '¿Está seguro de hacer a este usuario administrador?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.user.administrator = false;
            this.createUserAndNavigate();
          }
        },
        {
          text: 'Sí',
          handler: () => {
            this.user.administrator = true;
            this.createUserAndNavigate();
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  async createUserAndNavigate() {
    await this.fireservices.createUser('pruebacrudadmin', this.user);
    this.message.messageToast('success', 'Usuario ' + this.user.name + ' agregado correctamente!', 2000, 'bottom');
    this.router.navigate(['/apilist']);
  }
  
  async presentMissingFieldsAlert() {
    const alert = await this.alertController.create({
      header: 'Campos faltantes',
      message: 'Se deben llenar todos los campos.',
      buttons: ['OK']
    });
  
    await alert.present();
  }
  
}
