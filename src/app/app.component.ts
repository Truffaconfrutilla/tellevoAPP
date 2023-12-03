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

  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home'},
    { title: 'Perfil', url: '/profile', icon: 'person' },
    { title: 'Ajustes', url: '/settings', icon: 'build' },
    { title: 'mapa', url: '/google-maps', icon: 'build' },
  ];

  public partnerMenu: Array<{ title: string; url: string; icon: string}> = [
    { title: 'Iniciar Viaje', url: '', icon: 'speedometer'},
    { title: 'Registro Viajes', url: '', icon: 'reader'},
  ];

  public noPartnerMenu: Array<{ title: string; url: string; icon: string }> = [
    { title: 'Pedir Viaje', url: '', icon: 'location'},
    { title: 'Ver mis viajes', url: '', icon: 'document-text'},
  ];
  
  public adminMenu = [    
    { title: 'Opciones Administrador', url: '/admin-page', icon: 'terminal' },        
  ];

  public profileSettings = [    
    { title: 'Cambiar mi contraseña', url: '/change-password', icon: 'key' },
    { title: 'Cambiar mi foto', url: '/change-profile-pic', icon: 'image' },
  ];

  public logoutMenu = [    
    { title: 'Cerrar Sesión', url: '/login',  icon: 'log-out'},
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
    
    if (termsAccepted === 'true') {
      this.router.navigate(['/terms']); 
    } else {
      this.showTermsAlert();
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
    && this.router.url !== '/forgot-password'
    && this.router.url !== '/terms';
  }

  toggleSettingsMenu(show: boolean) {
    this.showSettingsMenu = show;
  }

  logout() {
    this.userService.logout();
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
