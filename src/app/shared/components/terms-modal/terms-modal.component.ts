import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-terms-modal',
  templateUrl: 'terms-modal.component.html',
  styleUrls: ['terms-modal.component.scss'],
})
export class TermsModalComponent {
  termsAccepted = false;

  constructor(
    private modalController: ModalController,
    private router: Router,
    
    ) {}

  acceptTerms() {
    this.termsAccepted = true;
    this.dismiss();
    this.router.navigate(['/login'])
  }

  dismiss() {
    this.modalController.dismiss({
      accepted: this.termsAccepted
    });
  }
  
}