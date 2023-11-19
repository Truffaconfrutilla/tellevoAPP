import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './core/services/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Perfil', url: '/profile', icon: 'person' }, 
    { title: 'Ajustes', url: '', icon: 'build' },    
    { title: 'Cerrar Sesión', url: '/login',  icon: 'log-out'},
  ];

  public profileSettings = [    
    { title: 'Cambiar mi contraseña', url: '/change-password', icon: 'key' },        
  ];

  public showSettingsMenu = false;


  constructor(
    public router: Router,
    private userService: UserService,
    private translateService: TranslateService,
  ) {
    this.translateService.setDefaultLang('es');
    this.translateService.addLangs(['en','fr','ru']);
    const browserLang = this.translateService.getBrowserLang();

  }

  showMenu() {
    return this.router.url !== '/login' 
    && this.router.url !== '/register'
    && this.router.url !== '/change-password'
    && this.router.url !== '/forgot-password';
  }

  toggleSettingsMenu(show: boolean) {
    this.showSettingsMenu = show;
  }

  

  logout() {
    this.userService.logout();
  }
}
