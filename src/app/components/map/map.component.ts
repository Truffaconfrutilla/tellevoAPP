import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA,Component, ElementRef, NgZone, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GmapService } from 'src/app/core/services/gmap.service';
import { UserService } from 'src/app/core/services/user.service';

declare var google;

@Component({
  selector: 'app-maps',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone : true,   
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule]

})

export class MapComponent  implements OnInit , OnDestroy {

  places: any[] = [];
  @ViewChild('map',{static:true}) mapElementRef: ElementRef;
  googleMaps: any;
  source: any = {lat: -33.56808, lng: -70.55470};
  dest: any = {lat: -33.59829, lng: -70.57841};
  map: any;
  directionsService: any;
  directionsDisplay: any;
  source_marker: any;
  destination_marker: any;
  userPosition: any; 
  query: string;
  placesSub: Subscription;
  private _places = new BehaviorSubject<any[]>([]);

  get search_places() {
    return this._places.asObservable();
  }


  constructor(
    private maps: GmapService,
    private renderer: Renderer2,
    private userService: UserService,
    private zone: NgZone,
  ) { }

  ngOnInit() {
    this.getUserLocation();

    this.placesSub = this.search_places.subscribe({
      next: (places) => {
        this.places = places;
      },
      error: (e) => {
        console.log(e);
      }
    });
    
  }

  ngOnDestroy(): void {
    if(this.placesSub) this.placesSub.unsubscribe();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userPosition = { 
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.loadMap();
        },
        (error) => {
          console.log('Error al obtener la ubicación del usuario:', error);
          // Manejo de errores al obtener la ubicación
        }
      );
    } else {
      console.log('La geolocalización no es compatible con este dispositivo.');
      // Mensaje para dispositivos que no admiten geolocalización
    }
  } 
  
  async loadMap() {
    try {
      let googleMaps: any = await this.maps.loadGoogleMaps();
      const mapEl = this.mapElementRef.nativeElement;
      const mapCenter = this.userPosition ? this.userPosition : this.source;
  
      this.map = new googleMaps.Map(mapEl, {
        center: { lat: mapCenter.lat, lng: mapCenter.lng },
        disableDefaultUI: true,
        zoom: 15,
      });
  
      if (this.userPosition) {
        const userMarker = new googleMaps.Marker({
          position: this.userPosition,
          map: this.map,
          animation: googleMaps.Animation.DROP,
        });
        userMarker.setMap(this.map);
      }

      this.directionsService = new googleMaps.DirectionsService;
      this.directionsDisplay = new googleMaps.DirectionsRenderer;
      this.directionsDisplay = new googleMaps.DirectionsRenderer();

      // //BLOQUE DE RUTA MANUAL DESDE MALL PLAZA TOBALABA HACIA DUOC PUENTE ALTO
      // const sourceIconUrl = 'assets/imgs/car.png';
      // const destinationIconUrl = 'assets/imgs/pin.png';
      
      // const source_position = new googleMaps.LatLng(this.source.lat, this.source.lng);
      // const destination_position = new googleMaps.LatLng(this.dest.lat, this.dest.lng);

      // const source_icon = {
      //   url: sourceIconUrl,
      //   scaledSize: new googleMaps.Size(50, 50), // scaled size
      //   origin: new googleMaps.Point(0, 0), // origin
      //   anchor: new googleMaps.Point(0, 0) // anchor
      // };
      // const destination_icon = {
      //   url: destinationIconUrl,
      //   scaledSize: new googleMaps.Size(50, 50), // scaled size
      //   origin: new googleMaps.Point(0, 0), // origin
      //   anchor: new googleMaps.Point(0, 0) // anchor
      // };
      // this.source_marker = new googleMaps.Marker({
      //   map: this.map,
      //   position: source_position,
      //   animation: googleMaps.Animation.DROP,
      //   icon: source_icon,
      // });

      // this.destination_marker = new googleMaps.Marker({
      //   map: this.map,
      //   position: destination_position,
      //   animation: googleMaps.Animation.DROP,
      //   icon: destination_icon
      // });

      // this.source_marker.setMap(this.map);
      // this.destination_marker.setMap(this.map);

      // this.directionsDisplay.setMap(this.map);
      // this.directionsDisplay.setOptions({
      //   polylineOptions: {
      //     strokeWeight: 4,
      //     strokeOpacity: 1,
      //     strokeColor: 'black'
      //   },
      //   suppressMarkers: true
      // });

      await this.drawRoute();

      this.map.setCenter(mapCenter);
      this.renderer.addClass(mapEl, 'visible');
    } catch(e) {
      console.log(e);
  }
}

  drawRoute() {
    this.directionsService.route({
      origin: this.source,
      destination: this.dest,
      travelMode: 'DRIVING',
      provideRouteAlternatives: true
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        console.log('response: ', response);
        const directionsData = response.routes[0].legs[0];
        console.log(directionsData);
        const duration = directionsData.duration.text;
        console.log(duration);
      } else {
        console.log(status);
      }
    });
}

async onSearchChange(event: any){
  console.log(event);
  this.query = event.detail.value;
  if(
    this.query.length >0
  ) await this.getPlaces(this.query);
}

getPlaces(query: string) {
  try{
    let service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions({
      input: this.query,
      componentRestrictions: {
        country: 'CL'
          }
    }, (predictions) => {
      let autoCompleteItems = [];
      this.zone.run(()=>{
        if(predictions != null){
          predictions.forEach(async(prediction)=>{
            console.log('prediction:',prediction);
            let latLng: any = await this.geoCode(prediction.description);
            const places = {
              title: prediction.structured_formatting.main_text,
              addres: prediction.description,
              lat: latLng.lat,
              lng: latLng.lng
            };
            console.log('places:',places);
            autoCompleteItems.push(places);
          });
           // this.places = autoCompleteItems;
            // console.log('final places', this.places);
            // rxjs behaviorSubject
            this._places.next(autoCompleteItems);
        }
      });
    })
  }catch(e){
    console.log(e);
  }
}

geoCode(address){
  let latlng = {lat: '' , lng: ''};
  return new Promise ((resolve,reject) => {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address},(results) => {
      console.log('results', results);
      latlng.lat = results[0].geometry.location.lat();
      latlng.lng = results[0].geometry.location.lng();
      resolve(latlng);
    });
  });
}

}