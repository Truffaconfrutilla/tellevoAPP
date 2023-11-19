import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage  {
  termsAccepted = false;

  constructor(
    private modalController: ModalController,
    private router: Router,
  ) { }


  acceptTerms() {
    this.termsAccepted = true;
    this.dismiss();
    this.router.navigate(['/loading'])
  }

  dismiss() {
    this.modalController.dismiss({
      accepted: this.termsAccepted
    });
  }

  

}
