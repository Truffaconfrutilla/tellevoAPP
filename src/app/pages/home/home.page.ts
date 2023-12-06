import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { WeatherService } from 'src/app/core/services/weather.service';
import { Weather } from 'src/app/core/models/wheater.model';

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


}
