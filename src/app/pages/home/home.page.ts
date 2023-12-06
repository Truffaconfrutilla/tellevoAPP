import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { WeatherService } from 'src/app/core/services/weather.service';
import { Weather } from 'src/app/core/models/wheater.model';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Capacitor } from "@capacitor/core";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  langs: string[] = [];
  language!: string;
  weather: Weather;

  constructor(
    private userService: UserService,
    private translateService: TranslateService,
    private weatherService: WeatherService,
    )
    {
      this.langs = this.translateService.getLangs();
    }

  ngOnInit() {
    this.userService.checkLogin()
    this.checkGPSPermission()
    this.askToTurnOnGPS()
    this.weatherService.getWeather().subscribe(
      (data) => {
        this.weather = data
      },
      (error) => {
        console.error(error);
      }
    );
  }

  changeLang(event:any) {
    this.translateService.use(event.detail.value);
  }

  async askToTurnOnGPS(): Promise<boolean> {
    return await new Promise((resolve, reject) => {
        LocationAccuracy.canRequest().then((canRequest: boolean) => {
            if (canRequest) {
                // the accuracy option will be ignored by iOS
                LocationAccuracy.request(LocationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                    () => {
                        resolve(true);
                    },
                    error => { resolve(false); }
                );
            }
            else { resolve(false); }
        });
    })
  }

  async checkGPSPermission(): Promise<boolean> {
    return await new Promise((resolve, reject) => {
        if (Capacitor.isNativePlatform) {
            AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
                result => {
                    if (result.hasPermission) {
                        // If having permission show 'Turn On GPS' dialogue
                        resolve(true);
                    } else {
                        // If not having permission ask for permission
                        resolve(false);
                    }
                },
                err => { alert(err); }
            );
        }
        else { resolve(true); }
    })
  }

  async requestGPSPermission(): Promise<string> {
    return await new Promise((resolve, reject) => {
        LocationAccuracy.canRequest().then((canRequest: boolean) => {
            if (canRequest) {
                resolve('CAN_REQUEST');
            } else {
                // Show 'GPS Permission Request' dialogue
                AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
                    .then(
                        (result) => {
                            if (result.hasPermission) {
                                // call method to turn on GPS
                                resolve('GOT_PERMISSION');
                            } else {
                                resolve('DENIED_PERMISSION');
                            }
                        },
                        error => {
                            // Show alert if user click on 'No Thanks'
                            alert('requestPermission Error requesting location permissions ' + error);
                        }
                    );
            }
        });
    })
}

}
