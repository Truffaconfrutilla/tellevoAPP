import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/core/services/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {  
  public userName: String = "";
  public userLocation: String = "";
  langs: string[] = [];
  
  constructor(
    private userService: UserService,
    private menuCtrl: MenuController,
    private appComponent: AppComponent,
    private translateService: TranslateService,
  ) {
    this.langs = this.translateService.getLangs();
  }

  ngOnInit() {
    this.getUserName()
    this.getUserLocation()
  }

  async getUserName(){
    const user = await this.userService.getUserData()
    if (user){
      this.userName = user?.name
    }
  }

  async getUserLocation(){
    const user = await this.userService.getUserData()
    if (user){
      this.userLocation = user?.location
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
