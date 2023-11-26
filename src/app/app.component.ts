import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './core/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
  

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent implements OnInit{
  public userName: string = "";
  public isPartner: boolean | null = null;

  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Perfil', url: '/profile', icon: 'person' }, 
    { title: 'Ajustes', url: '/settings', icon: 'build' },    
    { title: 'Cerrar Sesión', url: '/login',  icon: 'log-out'},
  ];

  public profileSettings = [    
    { title: 'Cambiar mi contraseña', url: '/change-password', icon: 'key' },        
    { title: 'Cambiar mi foto', url: '/change-profile-pic', icon: 'image' },        
  ];

  public showSettingsMenu = false;


  constructor(
    public router: Router,
    private userService: UserService,
    private translateService: TranslateService,
  ) {
    this.translateService.setDefaultLang('Latino');
    this.translateService.addLangs(['English','Français','Русский','Latino']);
    const browserLang = this.translateService.getBrowserLang();

  }

  async ngOnInit() {
    const termsAccepted = localStorage.getItem('termsAccepted');
    await this.getUserData();

    if (termsAccepted === 'true') {
      this.router.navigate(['/terms']); 
    } else {
      this.showTermsAlert();
    }

  }

  async getUserData() {
    const user = await this.userService.getUserData();
    if (user) {
      this.userName = user.name || "";     
      this.isPartner = user.partner || null;     
    }
  }


  showTermsAlert() {
    Swal.fire({
      title: '¡Quiet@ ahí!',
      text: 'Debes aceptar los términos y condiciones para continuar.',
      footer: 'Esta escrito en la constitución 	┐(￣∀￣)┌',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      heightAuto: false
    });
  }


  showMenu() {
    return this.router.url !== '/login' 
    && this.router.url !== '/register'
    && this.router.url !== '/change-password'
    && this.router.url !== '/change-profile-pic'
    && this.router.url !== '/forgot-password';
  }

  toggleSettingsMenu(show: boolean) {
    this.showSettingsMenu = show;
  }

  logout() {
    this.userService.logout();
  }
}
