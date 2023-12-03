import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})


export class TermsPage {
  termsAccepted = false;
  langs: string[] = [];
  language!: string;
  
  constructor(
    private router: Router,
    private translateService: TranslateService,
    ) {
      this.langs = this.translateService.getLangs();
    }

  acceptTerms() {
    this.termsAccepted = true;
    localStorage.setItem('termsAccepted', "true")
    this.router.navigate(['/loading'], { replaceUrl: true });  
  }

  dismiss() {
    localStorage.setItem('termsAccepted', "false")
    Swal.fire({
      title: this.translateService.instant("terms.reject.title"),
      text: this.translateService.instant("terms.reject.text"),
      footer: this.translateService.instant("terms.reject.footer"),
      icon: 'warning',
      confirmButtonText: this.translateService.instant("terms.reject.confirmButtonText"),
      heightAuto: false
    });
  }

  changeLang(event:any) {
    this.translateService.use(event.detail.value);
    localStorage.setItem('languaje',event.detail.value)
  }
}


