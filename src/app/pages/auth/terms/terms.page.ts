import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})


export class TermsPage {
  termsAccepted = false;

  constructor(private router: Router) {}

  acceptTerms() {
    this.termsAccepted = true;
  this.router.navigate(['/loading'], { replaceUrl: true });  
  }

  dismiss() {
    Swal.fire({
      title: '¡Quiet@ ahí!',
      text: 'Debes aceptar los términos y condiciones para continuar.',
      footer: 'Esta escrito en la constitución ┐(￣∀￣)┌',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      heightAuto: false
    });
  }
}


