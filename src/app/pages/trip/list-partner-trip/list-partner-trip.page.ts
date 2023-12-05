import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { Trip } from 'src/app/core/models/trip.model';
import { TripService } from 'src/app/core/services/trip.service';

@Component({
  selector: 'app-list-partner-trip',
  templateUrl: './list-partner-trip.page.html',
  styleUrls: ['./list-partner-trip.page.scss'],
})
export class ListPartnerTripPage implements OnInit {
  trips: Trip[];

  constructor(
    private menuCtrl: MenuController,
    private appComponent: AppComponent,
    private tripService: TripService,
  ) { }

  async ngOnInit() {
    try {
      const email = localStorage.getItem('email');
      this.trips = await this.tripService.getAllPartnerTrips(email)
    } catch (error) {
      console.error('Error loading locations: ', error);
    }
  }

  openSettingsMenu() {
    this.menuCtrl.enable(true, 'menuSettings');
    this.menuCtrl.open('menuSettings');
  }

  ionViewWillEnter() {
    this.appComponent.toggleSettingsMenu(true);
  }

  ionViewWillLeave() {
    this.appComponent.toggleSettingsMenu(false);
  }

}
