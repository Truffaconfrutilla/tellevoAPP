import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './core/services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
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
    private userService: UserService
  ) {}

  showMenu() {
    return this.router.url !== '/login' && this.router.url !== '/register';
  }

  toggleSettingsMenu(show: boolean) {
    this.showSettingsMenu = show;
  }

  

  logout() {
    this.userService.logout();
  }

}
