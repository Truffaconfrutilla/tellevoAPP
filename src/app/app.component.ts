import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './core/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { TermsPageModule } from './pages/auth/terms/terms.module';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent implements OnInit{

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
    private modalController: ModalController
  ) {
    this.translateService.setDefaultLang('Latino');
    this.translateService.addLangs(['English','Français','Русский','Latino']);
    const browserLang = this.translateService.getBrowserLang();

  }

  ngOnInit() {
    this.presentModal();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: TermsPageModule,
      cssClass: 'terms-modal'
    });

    modal.onDidDismiss().then((data) => {
      if (data && data.data && data.data.accepted) {
        this.router.navigate(['/login']);
      } else {
        this.showTermsAlert();
        this.presentModal(); 
      }
    });

    return await modal.present();
  }


  async showTermsAlert() {
    await Swal.fire({
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
    && this.router.url !== '/forgot-password';
  }

  toggleSettingsMenu(show: boolean) {
    this.showSettingsMenu = show;
  }

  

  logout() {
    this.userService.logout();
  }
}
