import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { GmapService } from 'src/app/core/services/gmap.service';
import { UserService } from 'src/app/core/services/user.service';

declare var google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone : true,   
})

export class MapComponent  implements OnInit {

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
  isPartner: boolean = false;
  originAddress: string = ''; // Variable para la dirección de origen
  destinationAddress: string = ''; // Variable para la dirección de destino


  constructor(
    private maps: GmapService,
    private renderer: Renderer2,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getUserLocation();
    this.checkUserRole();
    this.initMap();
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  initMap() {
    this.maps.loadGoogleMaps().then(() => {
      this.map = new google.maps.Map(this.mapElementRef.nativeElement, {
        center: { lat: -33.45, lng: -70.6667 }, // Coordenadas por defecto
        zoom: 12,
      });
    });
  }

  calculateAndDisplayRoute() {
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer({ map: this.map });

    directionsService.route(
      {
        origin: this.originAddress,
        destination: this.destinationAddress,
        travelMode: 'DRIVING',
      },
      (response: any, status: any) => {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('No se encontró una ruta.');
        }
      }
    );
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
        zoom: 13,
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

      //BLOQUE DE RUTA MANUAL DESDE MALL PLAZA TOBALABA HACIA DUOC PUENTE ALTO
      const sourceIconUrl = 'assets/imgs/car.png';
      const destinationIconUrl = 'assets/imgs/pin.png';
      
      const source_position = new googleMaps.LatLng(this.source.lat, this.source.lng);
      const destination_position = new googleMaps.LatLng(this.dest.lat, this.dest.lng);

      const source_icon = {
        url: sourceIconUrl,
        scaledSize: new googleMaps.Size(50, 50), // scaled size
        origin: new googleMaps.Point(0, 0), // origin
        anchor: new googleMaps.Point(0, 0) // anchor
      };
      const destination_icon = {
        url: destinationIconUrl,
        scaledSize: new googleMaps.Size(50, 50), // scaled size
        origin: new googleMaps.Point(0, 0), // origin
        anchor: new googleMaps.Point(0, 0) // anchor
      };
      this.source_marker = new googleMaps.Marker({
        map: this.map,
        position: source_position,
        animation: googleMaps.Animation.DROP,
        icon: source_icon,
      });

      this.destination_marker = new googleMaps.Marker({
        map: this.map,
        position: destination_position,
        animation: googleMaps.Animation.DROP,
        icon: destination_icon
      });

      this.source_marker.setMap(this.map);
      this.destination_marker.setMap(this.map);

      this.directionsDisplay.setMap(this.map);
      this.directionsDisplay.setOptions({
        polylineOptions: {
          strokeWeight: 4,
          strokeOpacity: 1,
          strokeColor: 'black'
        },
        suppressMarkers: true
      });

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

  checkUserRole() {
    this.userService.isPartnerDriver().then((isDriver) => {
      this.isPartner = isDriver || false;
      this.setUserRole(this.isPartner);
    });
  }

  setUserRole(partner: boolean) {
    this.isPartner = partner;
    if (partner) {
      // Lógica para mostrar funciones de socio conductor
      this.showStartTripButton();
      this.enableGoogleMapsDirectionInput();
    } else {
      // Lógica para mostrar funciones de estudiante
      this.requestRideButton();
      this.enableGoogleMapsDirectionInput();
    }
  }

  requestRideButton() {
    // Implementa la lógica para mostrar el botón de "Solicitar viaje" para el estudiante
  }

  showStartTripButton() {
    // Implementa la lógica para mostrar el botón de "Iniciar viaje" para el socio conductor
  }

  enableGoogleMapsDirectionInput() {
    // Implementa la lógica para habilitar la entrada de direcciones en Google Maps
  }
  
}