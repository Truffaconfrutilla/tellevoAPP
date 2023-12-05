import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weather } from '../models/wheater.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class WeatherService {
    constructor(
        private http: HttpClient,
    ) { }
    
    getWeather(): Observable<Weather> {
        return new Observable((observer) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
    
              const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`;
              
              this.http.get<Weather>(apiUrl).subscribe(
                (weatherData) => {
                  observer.next(weatherData);
                  observer.complete();
                },
                (error) => {
                  observer.error(error);
                }
              );
            },
            (error) => {
              console.log('Error al obtener la ubicación del usuario:', error);
              observer.error(error);
            }
          );
        });
      }
}