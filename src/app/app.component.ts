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
    { title: 'Cerrar Sesión',  url: '', icon: 'log-out',  },
  ];





  constructor(
    public router: Router,
    private service: UserService
  ) {}

  showMenu() {
    return this.router.url !== '/login' && this.router.url !== '/register';
  }

  logout() {
    this.service.logout();
    this.router.navigate(['/login']);
  }





}
