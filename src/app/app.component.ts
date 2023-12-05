import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './core/services/user.service';
import { TranslateService } from '@ngx-translate/core';  

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent implements OnInit{

  public appPages: Array<{ title: string; url: string; icon: string}> = [
    { title: 'menu.label.home', url: '/home', icon: 'home'},
    { title: 'menu.label.profile', url: '/profile', icon: 'person' },
    { title: 'menu.label.settings', url: '/settings', icon: 'build' },
    { title: 'menu.label.map', url: '/google-maps', icon: 'build' },
  ];

  public partnerMenu: Array<{ title: string; url: string; icon: string}> = [
    { title: 'menu.label.startTrip', url: '', icon: 'speedometer'},
    { title: 'menu.label.listPartnerTrip', url: '', icon: 'reader'},
  ];

  public noPartnerMenu: Array<{ title: string; url: string; icon: string }> = [
    { title: 'menu.label.askTrip', url: '/ask-trip', icon: 'location'},
    { title: 'menu.label.listStudentTrip', url: '/list-student-trip', icon: 'document-text'},
  ];
  
  public adminMenu: Array<{ title: string; url: string; icon: string}> = [  
    { title: 'menu.label.adminSettings', url: '/admin-page', icon: 'terminal' },        
  ];

  public profileSettings: Array<{ title: string; url: string; icon: string}> = [
    { title: 'menu.label.changePassword', url: '/change-password', icon: 'key' },
    { title: 'menu.label.changePicture', url: '/change-profile-pic', icon: 'image' },
  ];

  public logoutMenu: Array<{ title: string; url: string; icon: string}> = [ 
    { title: 'menu.label.logout', url: '',  icon: 'log-out'},
  ];

  public showSettingsMenu = false;
  public showPartnerMenu = false;
  public showNoPartnerMenu = false;
  public showAdminMenu = false;

  constructor(
    public router: Router,
    private userService: UserService,
    private translateService: TranslateService,
  ) {
    this.translateService.setDefaultLang('Latino');
    this.translateService.addLangs(['English','Français','Русский','Latino']);
    const browserLang = this.translateService.getBrowserLang();

  }

  ngOnInit(){
    const termsAccepted = localStorage.getItem('termsAccepted');
    this.translateService.use(localStorage.getItem('languaje'))
    
    if (termsAccepted === 'true') {
    } else {
      this.router.navigate(['/terms']); 
    }
  }

  showMenu() {
    return this.router.url !== '/login' 
    && this.router.url !== '/register'
    && this.router.url !== '/change-password'
    && this.router.url !== '/change-profile-pic'
    && this.router.url !== '/forgot-password'
    && this.router.url !== '/terms';
  }

  toggleSettingsMenu(show: boolean) {
    this.showSettingsMenu = show;
  }

  logout() {
    this.userService.logout();
    this.showPartnerMenu = false
    this.showNoPartnerMenu = false
    this.showAdminMenu = false
  }

  async verifyPartner(){
    const user = await this.userService.getUserData()
    if (user){
      if(user.partner){
        this.showPartnerMenu = true
      } else {
        this.showNoPartnerMenu = true
      }
      if(user.administrator){
        this.showAdminMenu = true
      }
    }
  }
}
