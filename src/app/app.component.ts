import { Component } from '@angular/core';
import { Router } from '@angular/router';


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
    { title: 'Cerrar Sesión', url: '/login', icon: 'log-out' },
  ];





  constructor(
    public router: Router
  ) {}

  showMenu() {
    return this.router.url !== '/login' && this.router.url !== '/register';
  }






}
