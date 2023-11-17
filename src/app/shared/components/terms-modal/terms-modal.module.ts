import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TermsModalComponent } from './terms-modal.component';

@NgModule({
    declarations: [TermsModalComponent],
    imports: [
    IonicModule // Asegúrate de importar IonicModule u otros módulos de Ionic necesarios
    // Puedes agregar otros módulos necesarios para este módulo si los tienes
    ],
    exports: [TermsModalComponent],
})
export class TermsModalModule {}
