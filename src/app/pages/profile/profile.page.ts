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
  public userName: string = "";
  public userLocation: string = "";
  public isPartner: boolean | null = null;
  public userPlate: string = "";
  public userLicence: string = "";
  langs: string[] = [];
  
  constructor(
    private menuCtrl: MenuController,
    private appComponent: AppComponent,
    private translateService: TranslateService,
  ) {
    this.langs = this.translateService.getLangs();
  }

   ngOnInit() {
    this.getUserData();
  }


  getUserData() {
      this.userName = localStorage.getItem('name');
      this.userLocation = localStorage.getItem('location');
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
