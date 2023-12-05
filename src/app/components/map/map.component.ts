import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'], 
})

export class MapComponent  implements OnInit {

  map: any;
  marker: any;
  ubication = {lat: -33.56808, lng: -70.55470};
    

  constructor(
  ) { }

  ngOnInit() {}

  
  loadmap(){
    var map: HTMLElement = document.getElementById('map')

    this.map = new google.maps.Map(map, {
      center: this.ubication,
      zoom: 18,
    })
  }
  
}