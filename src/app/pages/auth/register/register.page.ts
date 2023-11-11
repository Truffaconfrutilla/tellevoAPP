import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../core/services/location.service'
import { Location } from '../../../core/models/location.model'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  locations: Location[] = [];

  constructor(   
    private locationService: LocationService
  ) {}

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

}