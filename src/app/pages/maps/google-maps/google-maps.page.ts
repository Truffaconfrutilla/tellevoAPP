import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MapComponent } from 'src/app/components/map/map.component';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.page.html',
  styleUrls: ['./google-maps.page.scss'],
  standalone: true,
  imports: [IonicModule,MapComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoogleMapsPage {
  @ViewChild('mapComponent') mapComponent: MapComponent;
  
  constructor() { }
  
  getUserLocation() {
    if (this.mapComponent) {
      this.mapComponent.getUserLocation();
    }
  }

  showRoute() {
    if (this.mapComponent) {
      this.mapComponent.drawRoute();
    }
  }

}