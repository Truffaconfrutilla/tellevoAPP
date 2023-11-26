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
    private userService: UserService,
    private menuCtrl: MenuController,
    private appComponent: AppComponent,
    private translateService: TranslateService,
  ) {
    this.langs = this.translateService.getLangs();
  }

  async ngOnInit() {
    await this.getUserData();
  }


  async getUserData() {
    const user = await this.userService.getUserData();
    if (user) {
      this.userName = user.name || "";
      this.userLocation = user.location || "";
      this.isPartner = user.partner || null;
      this.userPlate = user.plate || "";
      this.userLicence = user.licence || "";
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
